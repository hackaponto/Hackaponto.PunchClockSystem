import { UserWorkDays } from '../entities/user-work-days.entity';

export const UserDayRepositoryPortKey = 'UserDayRepositoryPort';

export interface UserDayRepositoryPort {
  existUserDay(userId: string, date: Date): Promise<boolean>;
  createUserDay(userDay: UserWorkDays): Promise<UserWorkDays>;
  findUserDay(userId: string, date: Date): Promise<UserWorkDays>;
  updateTotalWorkHour(
    userId: string,
    date: Date,
    totalHours: string,
  ): Promise<void>;
}
