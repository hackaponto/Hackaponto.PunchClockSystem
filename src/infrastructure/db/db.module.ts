import { Module } from '@nestjs/common';
import { UserDayRepository } from './repositories/user-day.repository';
import { UserDayRepositoryPortKey } from './ports/user-day-repository.port';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDatabase } from './config';
import { UserDay } from './entities/user-day.entity';
import { Registry } from './entities/registry.entity';
import { RegistryRepository } from './repositories/registry.repository';
import { RegistryRepositoryPortKey } from './ports/registry-repository.port';

@Module({
  imports: [
    TypeOrmModule.forRoot(configDatabase),
    TypeOrmModule.forFeature([UserDay, Registry]),
  ],
  providers: [
    {
      provide: UserDayRepositoryPortKey,
      useClass: UserDayRepository,
    },
    {
      provide: RegistryRepositoryPortKey,
      useClass: RegistryRepository,
    },
  ],
  exports: [
    TypeOrmModule,
    {
      provide: UserDayRepositoryPortKey,
      useClass: UserDayRepository,
    },
    {
      provide: RegistryRepositoryPortKey,
      useClass: RegistryRepository,
    },
  ],
})
export class DbModule {}
