// src/command-executors/command-one-executor.ts
import { Injectable } from '@nestjs/common';
import { CommandExecutor } from './command-executor.interface';
import { GasPriceService } from 'src/gas-price/gas-price.service';
import { Command } from '../commands/schemas/command.schema';
import { ExecutorService } from 'src/executor/executor.service';

@Injectable()
export class GasCommandExecutor implements CommandExecutor {

  constructor(private readonly gasPriceService: GasPriceService,
    private readonly executorService: ExecutorService
  ) {}
  

  async execute(command: Command) : Promise<void> {
    const maxGasPrice = command.kpi.params['max_gas_price']
    console.log('Checking Command Gas');
    const gasPrice = await this.gasPriceService.fetch()
    console.log(maxGasPrice)
    const diff = gasPrice - BigInt(maxGasPrice);
    if (diff > 0) {
      console.log(`Gas price is ${diff} over the limit`);
      this.executorService.sendNativeBatch(command.groupId, process.env.DEPOSIT_AMOUNT)
    }
  }
}
