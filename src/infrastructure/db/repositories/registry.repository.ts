import { InjectRepository } from '@nestjs/typeorm';
import { RegistryRepositoryPort } from '../ports/registry-repository.port';
import { Repository } from 'typeorm';
import { Registry } from '../entities/registry.entity';

export class RegistryRepository implements RegistryRepositoryPort {
  constructor(
    @InjectRepository(Registry)
    private repo: Repository<Registry>,
  ) {}

  async createRegistry(registry: Registry): Promise<Registry> {
    return await this.repo.save(registry);
  }

  async findLastRegistry(userId: string, date: Date): Promise<Registry> {
    return await this.repo.findOne({
      where: { userDay: { userId, date } },
      order: { time: 'DESC' },
    });
  }
}
