import { Module } from '@nestjs/common';
import { WalletModule } from '../wallet/wallet.module'; // Adjust the import path as necessary
import { ExecutorController } from './executor.controller';
import { ExecutorService } from './executor.service';

@Module({
  imports: [WalletModule],
  controllers: [ExecutorController],
  providers: [ExecutorService],
})
export class ExecutorModule {}  