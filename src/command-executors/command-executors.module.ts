import { Module } from '@nestjs/common';
import { CommandExecutorsService } from './command-executors.service';
import { CommandExecutorsController } from './command-executors.controller';
import { CommandExecutorFactory } from './command-executor.factory';
import { GasPriceService } from 'src/queries/gas-price/gas-price.service';
import { GasCommandExecutor } from './gas-command-executor';
import { ExecutorModule } from 'src/executor/executor.module';
import { CommandsModule } from 'src/commands/commands.module';
import { BlockchainProviderModule } from 'src/utils/blockchain-provider/blockchain-provider.module';



@Module({
  imports: [ExecutorModule, CommandsModule, BlockchainProviderModule],
  controllers: [CommandExecutorsController],
  providers: [CommandExecutorsService, CommandExecutorFactory, GasPriceService, GasCommandExecutor],
  exports: [CommandExecutorFactory],
})
export class CommandExecutorsModule {}
