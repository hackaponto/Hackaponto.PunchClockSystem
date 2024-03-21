import { UserDay } from '../entities/user-day.entity';

export const UserDayRepositoryPortKey = 'UserDayRepositoryPort';

export interface UserDayRepositoryPort {
  existUserDay(userId: string, date: Date): Promise<boolean>;
  createUserDay(userDay: UserDay): Promise<UserDay>;
  findUserDay(userId: string, date: Date): Promise<UserDay>;
  updateTotalWorkHour(
    userId: string,
    date: Date,
    totalWorkHour: string,
  ): Promise<void>;
}
