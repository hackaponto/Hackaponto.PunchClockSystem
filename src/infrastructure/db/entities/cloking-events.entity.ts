import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserWorkDays } from './user-work-days.entity';
import { RegistryType } from 'src/domain/enums/registry-type.enum';

@Entity({ name: 'cloking_events' })
@Index(['userId', 'date'])
export class ClokingEvents {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserWorkDays, { nullable: false })
  @JoinColumn([
    { name: 'user_id', referencedColumnName: 'userId' },
    { name: 'date', referencedColumnName: 'date' },
  ])
  userWorkDays: UserWorkDays;

  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ type: 'timestamptz', nullable: false })
  time: Date;

  @Column({ enum: RegistryType, nullable: false })
  type: RegistryType;
}
