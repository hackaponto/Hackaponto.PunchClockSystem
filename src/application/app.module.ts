import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { PunchClockGateway } from './gateway/punch-clock-gateway';
import { PunchClockGatewayPortKey } from 'src/domain/ports/punch-clock-gateway.port';
import { ProcessPunchClockUseCase } from 'src/application/useCases/process-punch-clock.use-case';
import { DbModule } from 'src/infrastructure/db/db.module';
import { ConfigModule } from '@nestjs/config';
import { PunchClockProcessorUseCase } from 'src/application/useCases/punch-clock-processor.use-case';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DbModule],
  controllers: [AppController],
  providers: [
    ProcessPunchClockUseCase,
    PunchClockProcessorUseCase,
    JwtService,
    {
      provide: PunchClockGatewayPortKey,
      useClass: PunchClockGateway,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
