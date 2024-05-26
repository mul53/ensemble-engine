import { Module } from '@nestjs/common';
import { GasPriceService } from './gas-price.service';
import { CommandExecutorsModule } from '../../command-executors/command-executors.module';
import { BlockchainProviderModule } from 'src/utils/blockchain-provider/blockchain-provider.module';

@Module({
  providers: [GasPriceService],
  imports: [CommandExecutorsModule, BlockchainProviderModule]
})
export class GasPriceModule {}
