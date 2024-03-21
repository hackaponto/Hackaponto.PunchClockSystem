import { UserWorkDays } from '../entities/user-work-days';
import { ClokingEvents } from '../entities/cloking-events';

export const PunchClockGatewayPortKey = 'PunchClockGatewayPort';

export interface PunchClockGatewayPort {
  existUserDay(userId: string, date: Date): Promise<boolean>;
  findLastRegistry(userId: string, date: Date): Promise<ClokingEvents | null>;
  findUserDay(userId: string, date: Date): Promise<UserWorkDays>;
  createFirstPunchClock(userDay: UserWorkDays): Promise<UserWorkDays>;
  createNewPunchClock(registry: ClokingEvents): Promise<void>;
  updateTotalWorkHour(
    userId: string,
    date: Date,
    totalHour: string,
  ): Promise<void>;
}
