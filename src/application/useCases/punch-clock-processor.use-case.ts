import { Inject } from '@nestjs/common';
import { Registry, UserDay } from '../../domain/entities';
import { RegistryType } from '../../domain/enums/registry-type.enum';
import {
  PunchClockGatewayPort,
  PunchClockGatewayPortKey,
} from '../../domain/ports/punch-clock-gateway.port';

export class PunchClockProcessorUseCase {
  constructor(
    @Inject(PunchClockGatewayPortKey)
    private readonly punchClockGateway: PunchClockGatewayPort,
  ) {}

  async handleFirstRegistry(userId: string): Promise<void> {
    const userDay = new UserDay(userId);
    const registry = new Registry(RegistryType.IN, userId);

    userDay.resgitry.push(registry);

    await this.punchClockGateway.createFirstPunchClock(userDay);
  }

  async handleInRegistry(
    userId: string,
    lastRegistry: Registry,
  ): Promise<void> {
    const registry = new Registry(RegistryType.OUT, userId);
    lastRegistry.checkDateDifference(registry.time);

    const userDay = await this.punchClockGateway.findUserDay(
      userId,
      lastRegistry.date,
    );

    const hour = userDay.calculateHourMinuteDifference(
      registry.time,
      lastRegistry.time,
    );
    const totalWorkHour = userDay.sumTimes(hour);
    await this.punchClockGateway.createNewPunchClock(registry);
    await this.punchClockGateway.updateTotalWorkHour(
      userId,
      lastRegistry.date,
      totalWorkHour,
    );
  }

  async handleOutRegistry(
    userId: string,
    lastRegistry: Registry,
  ): Promise<void> {
    const registry = new Registry(RegistryType.IN, userId);
    lastRegistry.checkDateDifference(registry.time);
    await this.punchClockGateway.createNewPunchClock(registry);
  }
}
