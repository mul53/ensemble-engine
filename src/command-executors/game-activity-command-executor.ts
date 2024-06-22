import { Injectable } from '@nestjs/common';
import {  } from 'src/queries/gas-price/gas-price.service';
import { Command } from '../commands/schemas/command.schema';
import { ExecutorService } from 'src/executor/executor.service';
import { BaseCommandExecutor } from './base-command-executor';
import { CommandsService } from '../commands/commands.service';
import { VolumeService } from 'src/queries/volume/volume.service';
import { WalletService } from '../wallet/wallet.service';
import { Wallet as EthersWallet } from 'ethers';

/**
 * Returns true with a 5% chance.
 * @returns {boolean} true with a 5% chance, otherwise false.
 */
function randomChance(): boolean {
  return Math.random() < 0.3;
}

@Injectable()
export class GameActivityCommandExecutor extends BaseCommandExecutor {
  lastRound = 0;
  playersInRound = [];
  maxPlayers = 1;

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
    const round = await this.executorService.getRoundInfo(contractAddress, network)
    console.log(`Current round is ${round}`)
    
    if (round > this.lastRound) {
      console.log(`Round ${round} is newer than the last round ${this.lastRound}, resetting`)
      this.lastRound = round
      this.playersInRound = []
    }

    if (this.playersInRound.length >= this.maxPlayers) {
      console.log(`Round ${round} is full, skipping`)
      return
    } else if (randomChance()) {
      console.log(`Round ${round} is not full, playing`)
      console.log(`selecting a wallet for group ${command.groupId}`)
      const wallet = await this.walletService.pickWalletFromGroup(command.groupId)
      console.log(`selected wallet with address ${wallet.address}`)
      await this.executorService.playGame(wallet.address, wallet.privateKey, contractAddress, tokenAddress, network)
      this.playersInRound.push(wallet.address)
    } else {
      console.log(`Round ${round} is not full, skipping`)
    }

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
