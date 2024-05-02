import { Module } from '@nestjs/common';
import { ExecutorModule } from '../../executor/executor.module';
import { GasStrategyService } from './gas-strategy.service';

@Module({
  imports: [ExecutorModule],
  providers: [GasStrategyService],
})
export class GasStrategyModule {}