import { InjectRepository } from '@nestjs/typeorm';
import { UserDayRepositoryPort } from '../ports/user-day-repository.port';
import { UserWorkDays } from '../entities/user-work-days.entity';
import { Repository } from 'typeorm';

export class UserDayRepository implements UserDayRepositoryPort {
  constructor(
    @InjectRepository(UserWorkDays)
    private repo: Repository<UserWorkDays>,
  ) {}

  async findUserDay(userId: string, date: Date): Promise<UserWorkDays> {
    return await this.repo.findOneBy({ userId, date });
  }

  async updateTotalWorkHour(
    userId: string,
    date: Date,
    totalHours: string,
  ): Promise<void> {
    await this.repo.update({ date, userId }, { totalHours });
  }

  async createUserDay(userDay: UserWorkDays): Promise<UserWorkDays> {
    return await this.repo.save(userDay);
  }

  async existUserDay(userId: string, date: Date): Promise<boolean> {
    return await this.repo.exists({
      where: {
        date,
        userId,
      },
    });
  }
}
