// block-trigger.module.ts
import { Module } from '@nestjs/common';
import { BlockTriggerService } from './block-trigger.service';
import { ExecutorModule } from 'src/executor/executor.module';

@Module({
  imports: [ExecutorModule],
  providers: [BlockTriggerService],
})

export class BlockTriggerModule {}
