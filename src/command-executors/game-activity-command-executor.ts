import { Injectable } from '@nestjs/common';
import {  } from 'src/queries/gas-price/gas-price.service';
import { Command } from '../commands/schemas/command.schema';
import { ExecutorService } from 'src/executor/executor.service';
import { BaseCommandExecutor } from './base-command-executor';
import { CommandsService } from '../commands/commands.service';
import { VolumeService } from 'src/queries/volume/volume.service';

@Injectable()
export class GameActivityCommandExecutor extends BaseCommandExecutor {
  constructor(private readonly volumeService: VolumeService,
    private readonly executorService: ExecutorService,
    commandsService: CommandsService
  ) {
    super(commandsService);
  }

  async executeImpl(command: Command) : Promise<void> {
    const { network, kpi } = command
    const tokenAddress = kpi.params['token_address']
    const contractAddress = kpi.params['token_address']

    console.log('Checking Command Gas');
    const volume = await this.volumeService.fetch(contractAddress, tokenAddress, network)
    console.log({ volume })
    // console.log(maxGasPrice)
    // const diff = gasPrice - BigInt(maxGasPrice);
    // if (diff > 0) {
      // console.log(`Gas price is ${diff} over the limit`);
      // await this.executorService.sendNativeBatch(command.groupId, process.env.DEPOSIT_AMOUNT, network)
    // }
  }
}
