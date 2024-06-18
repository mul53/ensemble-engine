import { Injectable } from '@nestjs/common';
import {  } from 'src/queries/gas-price/gas-price.service';
import { Command } from '../commands/schemas/command.schema';
import { ExecutorService } from 'src/executor/executor.service';
import { BaseCommandExecutor } from './base-command-executor';
import { CommandsService } from '../commands/commands.service';
import { VolumeService } from 'src/queries/volume/volume.service';
import { WalletService } from '../wallet/wallet.service';
import { Wallet as EthersWallet } from 'ethers';

@Injectable()
export class GameActivityCommandExecutor extends BaseCommandExecutor {
  constructor(private readonly volumeService: VolumeService,
    private readonly executorService: ExecutorService,
    commandsService: CommandsService,
    private walletService: WalletService,
  ) {
    super(commandsService);
  }

  async executeImpl(command: Command) : Promise<void> {
    const { network, goal } = command
    const tokenAddress = goal.params['token_address']
    const contractAddress = goal.params['contract_address']

    console.log(`Executing game activity command for game ${contractAddress}  with token ${tokenAddress} on network ${network}`)
    console.log(`selecting a wallet for group ${command.groupId}`)
    const wallet = await this.walletService.pickWalletFromGroup(command.groupId)
    console.log(`selected wallet with address ${wallet.address}`)

    await this.executorService.playGame(wallet.address, wallet.privateKey, contractAddress, tokenAddress, network)
    // const volume = await this.volumeService.fetch(contractAddress, tokenAddress, network)
    // if 
    // console.log({ volume })
    // console.log(maxGasPrice)
    // const diff = gasPrice - BigInt(maxGasPrice);
    // if (diff > 0) {
      // console.log(`Gas price is ${diff} over the limit`);
      // await this.executorService.sendNativeBatch(command.groupId, process.env.DEPOSIT_AMOUNT, network)
    // }
  }
}
