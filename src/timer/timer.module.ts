import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TimerController, TimerRepository, TimerService } from '.';

@Module({
    imports: [DatabaseModule],
    controllers: [TimerController],
    providers: [TimerService, TimerRepository]
})

export class TimerModule { }
