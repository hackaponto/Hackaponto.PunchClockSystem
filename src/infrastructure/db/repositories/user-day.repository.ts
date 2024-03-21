import { InjectRepository } from '@nestjs/typeorm';
import { UserDayRepositoryPort } from '../ports/user-day-repository.port';
import { UserDay } from '../entities/user-day.entity';
import { Repository } from 'typeorm';

export class UserDayRepository implements UserDayRepositoryPort {
  constructor(
    @InjectRepository(UserDay)
    private repo: Repository<UserDay>,
  ) {}

  async findUserDay(userId: string, date: Date): Promise<UserDay> {
    return await this.repo.findOneBy({ userId, date });
  }

  async updateTotalWorkHour(
    userId: string,
    date: Date,
    totalWorkHour: string,
  ): Promise<void> {
    await this.repo.update({ date, userId }, { totalWorkHour });
  }

  async createUserDay(userDay: UserDay): Promise<UserDay> {
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
