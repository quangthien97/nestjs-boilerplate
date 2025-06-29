import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export type TimerType = 'duration' | 'weekday' | 'specific_date';
export type TimerStatus = 'active' | 'completed' | 'cancelled' | 'failed';

@Entity({ name: 'timers' })
export class Timer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  type: TimerType;

  @Column({ type: 'timestamp with time zone' })
  trigger_time: Date;

  @Column({ type: 'jsonb' })
  job_data: Record<string, any>;

  @Column({ type: 'text', default: 'active' })
  status: TimerStatus;

  @Column({ type: 'int', default: 0 })
  retry_count: number;

  @Column({ type: 'timestamp with time zone', nullable: true })
  retry_at: Date | null;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}
