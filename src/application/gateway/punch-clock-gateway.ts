import { Inject } from '@nestjs/common';
import { Registry } from 'src/domain/entities/registry';
import { PunchClockGatewayPort } from 'src/domain/ports/punch-clock-gateway.port';
import { UserDay } from 'src/domain/entities/user-day';
import { UserDay as UserDayEntity } from 'src/infrastructure/db/entities/user-day.entity';
import { Registry as RegistryEntity } from 'src/infrastructure/db/entities/registry.entity';
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

  async findUserDay(userId: string, date: Date): Promise<UserDay> {
    const userDayEntity = await this.userDayRepository.findUserDay(
      userId,
      date,
    );
    const userDay = new UserDay(
      userDayEntity.userId,
      userDayEntity.date,
      userDayEntity.totalWorkHour,
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

  async createNewPunchClock(registry: Registry): Promise<void> {
    const entity = new RegistryEntity();
    entity.date = registry.date;
    entity.id = registry.id;
    entity.time = registry.time;
    entity.userId = registry.userId;
    entity.type = registry.type;

    await this.registryRepository.createRegistry(entity);
  }

  async createFirstPunchClock(userDay: UserDay): Promise<UserDay> {
    console.log(userDay);

    const userDayEntity = await this.userDayRepository.createUserDay(
      userDay as unknown as UserDayEntity,
    );
    const user = new UserDay(userDayEntity.userId, userDayEntity.date);
    return user;
  }

  async findLastRegistry(userId: string, date: Date): Promise<Registry | null> {
    const entity = await this.registryRepository.findLastRegistry(userId, date);

    if (!entity) return null;

    const registry = new Registry(
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
