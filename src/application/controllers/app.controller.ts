import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PunchClockDto } from '../presenters/punch-clock.dto';
import { ProcessPunchClockUseCase } from 'src/application/useCases/process-punch-clock.use-case';
import { AuthGuard } from '../guards/auth.guard';
import { GetUser } from '../decorators/get-user.decorator';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Puch Clock')
@Controller('punch-clock')
export class AppController {
  constructor(
    private readonly processPunchClockUseCase: ProcessPunchClockUseCase,
  ) {}

  @Post()
  async puchClock(@GetUser() { userId }: PunchClockDto): Promise<string> {
    await this.processPunchClockUseCase.execute(userId);
    return 'ok';
  }
}
