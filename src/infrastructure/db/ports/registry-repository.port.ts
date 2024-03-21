import { Registry } from '../entities/registry.entity';

export const RegistryRepositoryPortKey = 'RegistryRepositoryPort';

export interface RegistryRepositoryPort {
  findLastRegistry(userId: string, date: Date): Promise<Registry>;
  createRegistry(registry: Registry): Promise<Registry>;
}
