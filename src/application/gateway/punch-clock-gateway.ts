import { Inject } from '@nestjs/common';
import { ClokingEvents } from 'src/domain/entities/cloking-events';
import { PunchClockGatewayPort } from 'src/domain/ports/punch-clock-gateway.port';
import { UserWorkDays } from 'src/domain/entities/user-work-days';
import { UserWorkDays as UserWorkDaysEntity } from 'src/infrastructure/db/entities/user-work-days.entity';
import { ClokingEvents as ClokingEventsEntity } from 'src/infrastructure/db/entities/cloking-events.entity';
import {
  RegistryRepositoryPort,
  RegistryRepositoryPortKey,
} from 'src/infrastructure/db/ports/registry-repository.port';
import {
  UserDayRepositoryPort,
  UserDayRepositoryPortKey,
} from 'src/infrastructure/db/ports/user-day-repository.port';

export class PunchClockGateway implements PunchClockGatewayPort {
  constructor(
    @Inject(UserDayRepositoryPortKey)
    private readonly userDayRepository: UserDayRepositoryPort,
    @Inject(RegistryRepositoryPortKey)
    private readonly registryRepository: RegistryRepositoryPort,
  ) {}

  async findUserDay(userId: string, date: Date): Promise<UserWorkDays> {
    const userDayEntity = await this.userDayRepository.findUserDay(
      userId,
      date,
    );
    const userDay = new UserWorkDays(
      userDayEntity.userId,
      userDayEntity.date,
      userDayEntity.totalHours,
    );
    return userDay;
  }

  async updateTotalWorkHour(
    userId: string,
    date: Date,
    totalWorkHour: string,
  ): Promise<void> {
    await this.userDayRepository.updateTotalWorkHour(
      userId,
      date,
      totalWorkHour,
    );
  }

  async createNewPunchClock(registry: ClokingEvents): Promise<void> {
    const entity = new ClokingEventsEntity();
    entity.date = registry.date;
    entity.id = registry.id;
    entity.time = registry.time;
    entity.userId = registry.userId;
    entity.type = registry.type;

    await this.registryRepository.createRegistry(entity);
  }

  async createFirstPunchClock(userDay: UserWorkDays): Promise<UserWorkDays> {
    const userDayEntity = await this.userDayRepository.createUserDay(
      userDay as unknown as UserWorkDaysEntity,
    );
    const user = new UserWorkDays(userDayEntity.userId, userDayEntity.date);
    return user;
  }

  async findLastRegistry(
    userId: string,
    date: Date,
  ): Promise<ClokingEvents | null> {
    const entity = await this.registryRepository.findLastRegistry(userId, date);

    if (!entity) return null;

    const registry = new ClokingEvents(
      entity.type,
      entity.userId,
      entity.date,
      entity.id,
      entity.time,
    );
    return registry;
  }

  async existUserDay(userId: string, date: Date): Promise<boolean> {
    return await this.userDayRepository.existUserDay(userId, date);
  }
}
