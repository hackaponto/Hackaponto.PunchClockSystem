import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { Registry } from './registry.entity';

@Entity({ name: 'user_day' })
@Index(['userId', 'date'])
export class UserDay {
  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
  userId: string;

  @PrimaryColumn({ type: 'date' })
  date: Date;

  @Column({
    name: 'total_work_hour',
    type: 'time',
    nullable: true,
  })
  totalWorkHour: string | null;

  @OneToMany(() => Registry, (registry) => registry.userDay, { cascade: true })
  resgitry: Registry[];
}
