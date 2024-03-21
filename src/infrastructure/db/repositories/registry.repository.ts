import { InjectRepository } from '@nestjs/typeorm';
import { RegistryRepositoryPort } from '../ports/registry-repository.port';
import { Repository } from 'typeorm';
import { ClokingEvents } from '../entities/cloking-events.entity';

export class RegistryRepository implements RegistryRepositoryPort {
  constructor(
    @InjectRepository(ClokingEvents)
    private repo: Repository<ClokingEvents>,
  ) {}

  async createRegistry(registry: ClokingEvents): Promise<ClokingEvents> {
    return await this.repo.save(registry);
  }

  async findLastRegistry(userId: string, date: Date): Promise<ClokingEvents> {
    return await this.repo.findOne({
      where: { userWorkDays: { userId, date } },
      order: { time: 'DESC' },
    });
  }
}
