// src/command-executors/command-one-executor.ts
import { Injectable } from '@nestjs/common';
import { GasPriceService } from 'src/gas-price/gas-price.service';
import { Command } from '../commands/schemas/command.schema';
import { ExecutorService } from 'src/executor/executor.service';
import { BaseCommandExecutor } from './base-command-executor';
import { CommandsService } from '../commands/commands.service';

@Injectable()
export class GasCommandExecutor extends BaseCommandExecutor {

  constructor(private readonly gasPriceService: GasPriceService,
    private readonly executorService: ExecutorService,
    commandsService: CommandsService
  ) {
    super(commandsService);
  }

  async executeImpl(command: Command) : Promise<void> {
    const maxGasPrice = command.kpi.params['max_gas_price']
    console.log('Checking Command Gas');
    const gasPrice = await this.gasPriceService.fetch()
    console.log(maxGasPrice)
    const diff = gasPrice - BigInt(maxGasPrice);
    if (diff > 0) {
      console.log(`Gas price is ${diff} over the limit`);
      await this.executorService.sendNativeBatch(command.groupId, process.env.DEPOSIT_AMOUNT)
    }
  }
}
