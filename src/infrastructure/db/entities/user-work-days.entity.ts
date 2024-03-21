import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { ClokingEvents } from './cloking-events.entity';

@Entity({ name: 'user_work_days' })
@Index(['userId', 'date'])
export class UserWorkDays {
  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
  userId: string;

  @PrimaryColumn({ type: 'date' })
  date: Date;

  @Column({
    name: 'total_hours',
    type: 'time',
    nullable: true,
  })
  totalHours: string | null;

  @OneToMany(
    () => ClokingEvents,
    (clokingEvents) => clokingEvents.userWorkDays,
    { cascade: true },
  )
  clokingEvents: ClokingEvents[];
}
