import { Injectable } from '@nestjs/common';
import { DataSource, Repository, Between } from 'typeorm';
import { Timer } from '../entities'

@Injectable()
export class TimerRepository extends Repository<Timer> {
  constructor(private _dataSource: DataSource) {
    super(Timer, _dataSource.createEntityManager());
  }

  async findDueTimers(from: Date, to: Date): Promise<Timer[]> {
    return this.find({
      where: {
        status: 'active',
        trigger_time: Between(from, to),
      },
    });
  }

  async findRetryTimers(now: Date): Promise<Timer[]> {
    return this.find({
      where: {
        status: 'failed',
        retry_at: Between(new Date(0), now),
      },
    });
  }
}
