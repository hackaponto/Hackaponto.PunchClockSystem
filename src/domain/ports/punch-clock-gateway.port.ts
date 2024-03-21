import { UserDay } from '../entities/user-day';
import { Registry } from '../entities/registry';

export const PunchClockGatewayPortKey = 'PunchClockGatewayPort';

export interface PunchClockGatewayPort {
  existUserDay(userId: string, date: Date): Promise<boolean>;
  findLastRegistry(userId: string, date: Date): Promise<Registry | null>;
  findUserDay(userId: string, date: Date): Promise<UserDay>;
  createFirstPunchClock(userDay: UserDay): Promise<UserDay>;
  createNewPunchClock(registry: Registry): Promise<void>;
  updateTotalWorkHour(
    userId: string,
    date: Date,
    totalWorkHour: string,
  ): Promise<void>;
}
