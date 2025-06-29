import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    Patch,
    NotFoundException,
} from '@nestjs/common';
import { TimerService, Timer } from '../';

@Controller('timers')
export class TimerController {
    constructor(private readonly timerService: TimerService) { }


    @Post()
    async createTimer(@Body() body: Partial<Timer>): Promise<Timer> {
        return this.timerService.create(body);
    }

    @Get()
    async getAllTimers(): Promise<Timer[]> {
        return this.timerService.findAll();
    }

    @Get(':id')
    async getTimer(@Param('id') id: string): Promise<Timer> {
        const timer = await this.timerService.findById(id);
        if (!timer) throw new NotFoundException('Timer not found');
        return timer;
    }

    @Patch(':id/cancel')
    async cancelTimer(@Param('id') id: string): Promise<void> {
        await this.timerService.cancel(id);
    }
}
