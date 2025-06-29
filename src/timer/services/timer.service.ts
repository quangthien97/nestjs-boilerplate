import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimerRepository } from '../repositories';
import { Timer } from '../entities';

@Injectable()
export class TimerService {
    constructor(
        @InjectRepository(Timer)
        private readonly timerRepository: TimerRepository,
    ) { }


    async create(data: Partial<Timer>): Promise<Timer> {
        const timer = this.timerRepository.create(data);
        return this.timerRepository.save(timer);
    }

    async findAll(): Promise<Timer[]> {
        return this.timerRepository.find();
    }

    async findDueTimers(from: Date, to: Date): Promise<Timer[]> {
        return this.timerRepository.findDueTimers(from, to);
    }

    async findById(id: string): Promise<Timer> {
        const timer = await this.timerRepository.findOneBy({ id });
        if (!timer) throw new NotFoundException('Timer not found');
        return timer;
    }

    async markCompleted(id: string): Promise<void> {
        await this.timerRepository.update(id, {
            status: 'completed',
        });
    }

    async markFailed(id: string): Promise<void> {
        const timer = await this.findById(id);
        await this.timerRepository.update(id, {
            status: 'failed',
            retry_count: timer.retry_count + 1,
            retry_at: new Date(Date.now() + 10_000),
        });
    }

    async cancel(id: string): Promise<void> {
        await this.timerRepository.update(id, {
            status: 'cancelled',
        });
    }

    async findRetryTimers(now: Date): Promise<Timer[]> {
        return this.timerRepository.findRetryTimers(now);
    }
}

