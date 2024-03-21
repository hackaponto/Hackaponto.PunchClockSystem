import { ClokingEvents } from './cloking-events';

export class UserWorkDays {
  userId: string;
  date: Date;
  totalWorkHour: string | null;
  clokingEvents: ClokingEvents[];

  constructor(userId: string, date?: Date, totalWorkHour?: string) {
    if (!userId) {
      throw new Error('O ID do usuário é obrigatório.');
    }
    this.userId = userId;
    this.date = date ?? new Date();
    this.totalWorkHour = totalWorkHour ?? null;
    this.clokingEvents = [];
  }

  sumTimes(newTime: string): string {
    if (!this.totalWorkHour) return newTime;

    const [hours1, minutes1] = newTime.split(':').map(Number);
    const [hours2, minutes2] = this.totalWorkHour.split(':').map(Number);

    let totalHours = hours1 + hours2;
    let totalMinutes = minutes1 + minutes2;

    if (totalMinutes >= 60) {
      totalHours += Math.floor(totalMinutes / 60);
      totalMinutes %= 60;
    }

    const formattedTotal = `${String(totalHours).padStart(2, '0')}:${String(totalMinutes).padStart(2, '0')}`;

    return formattedTotal;
  }

  calculateHourMinuteDifference(initialDate: Date, finalDate: Date): string {
    const initialTime = initialDate.getTime();
    const finalTime = finalDate.getTime();

    const differenceInMilliseconds = Math.abs(finalTime - initialTime);

    const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));

    const remainingMinutes = Math.floor(
      (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
    );
    const formattedDifference = `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;

    return formattedDifference;
  }
}
