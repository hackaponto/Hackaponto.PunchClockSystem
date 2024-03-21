import { ClokingEvents } from '../entities/cloking-events.entity';

export const RegistryRepositoryPortKey = 'RegistryRepositoryPort';

export interface RegistryRepositoryPort {
  findLastRegistry(userId: string, date: Date): Promise<ClokingEvents>;
  createRegistry(registry: ClokingEvents): Promise<ClokingEvents>;
}
