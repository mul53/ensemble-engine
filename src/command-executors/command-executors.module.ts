import { Module } from '@nestjs/common';
import { CommandExecutorsService } from './command-executors.service';
import { CommandExecutorsController } from './command-executors.controller';
import { CommandExecutorFactory } from './command-executor.factory';
import { GasPriceService } from 'src/queries/gas-price/gas-price.service';
import { GasCommandExecutor } from './gas-command-executor';
import { ExecutorModule } from 'src/executor/executor.module';
import { CommandsModule } from 'src/commands/commands.module';
import { BlockchainProviderModule } from 'src/utils/blockchain-provider/blockchain-provider.module';
import { GameActivityCommandExecutor } from './game-activity-command-executor';
import { VolumeModule } from 'src/queries/volume/volume.module';
import { WalletModule } from '../wallet/wallet.module'; // Adjust the import path as necessary


@Module({
  imports: [ExecutorModule, CommandsModule, BlockchainProviderModule, VolumeModule, WalletModule],
  controllers: [CommandExecutorsController],
  providers: [CommandExecutorsService, CommandExecutorFactory, GasPriceService, GasCommandExecutor, GameActivityCommandExecutor],
  exports: [CommandExecutorFactory],
})
export class CommandExecutorsModule {}
