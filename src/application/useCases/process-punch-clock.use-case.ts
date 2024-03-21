import { Inject } from '@nestjs/common';
import {
  PunchClockGatewayPort,
  PunchClockGatewayPortKey,
} from '../../domain/ports/punch-clock-gateway.port';
import { RegistryType } from '../../domain/enums/registry-type.enum';
import { PunchClockProcessorUseCase } from './punch-clock-processor.use-case';

export class ProcessPunchClockUseCase {
  constructor(
    @Inject(PunchClockGatewayPortKey)
    private readonly punchClockGateway: PunchClockGatewayPort,
    private readonly punchClockProcessor: PunchClockProcessorUseCase,
  ) {}

  async execute(userId: string): Promise<void> {
    const currentDate = new Date();
    const lastRegistry = await this.punchClockGateway.findLastRegistry(
      userId,
      currentDate,
    );

    if (!lastRegistry) {
      await this.punchClockProcessor.handleFirstRegistry(userId);
      return;
    }

    if (lastRegistry.type === RegistryType.IN) {
      await this.punchClockProcessor.handleInRegistry(userId, lastRegistry);
      return;
    }

    if (lastRegistry.type === RegistryType.OUT) {
      await this.punchClockProcessor.handleOutRegistry(userId, lastRegistry);
      return;
    }
  }
}
