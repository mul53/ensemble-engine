import { Module } from '@nestjs/common';
import { WalletModule } from '../wallet/wallet.module'; // Adjust the import path as necessary
import { ExecutorService } from './executor.service';
import { BlockchainProviderModule } from 'src/utils/blockchain-provider/blockchain-provider.module';

@Module({
  imports: [WalletModule, BlockchainProviderModule],
  controllers: [],
  providers: [ExecutorService],
  exports: [ExecutorService]
})
export class ExecutorModule {}  