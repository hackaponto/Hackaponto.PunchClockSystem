import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  Index,
  PrimaryColumn,
} from 'typeorm';
import { UserDay } from './user-day.entity';
import { RegistryType } from 'src/domain/enums/registry-type.enum';

@Entity({ name: 'registry' })
@Index(['userId', 'date'])
export class Registry {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @ManyToOne(() => UserDay, { nullable: false })
  @JoinColumn([
    { name: 'user_id', referencedColumnName: 'userId' },
    { name: 'date', referencedColumnName: 'date' },
  ])
  userDay: UserDay;

  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ type: 'timestamptz', nullable: false })
  time: Date;

  @Column({ enum: RegistryType, nullable: false })
  type: RegistryType;
}
