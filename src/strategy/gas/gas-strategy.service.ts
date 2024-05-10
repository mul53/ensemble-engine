import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { JsonRpcProvider, Provider } from 'ethers';
import { ExecutorService } from '../../executor/executor.service';

@Injectable()
export class GasStrategyService {
  private provider: Provider;

  constructor(private executorService: ExecutorService) {
    console.log('GasStrategyService initialized');
    console.log(`Using RPC endpoint: ${process.env.PROVIDER_URL}}`);
    this.provider = new JsonRpcProvider(process.env.PROVIDER_URL)
  }

  @Interval(60000)
  async execute() {
    if (process.env.GAS_STRATEGY_GROUP_ID === undefined) {
      console.log('Gas strategy group ID is not set');
      return;
    }
    const feeData = await this.provider.getFeeData()
    if (feeData.gasPrice > BigInt(process.env.MAX_GAS_PRICE)) {
      console.log(`Gas price ${feeData.gasPrice} is higher than the maximum allowed gas price ${process.env.MAX_GAS_PRICE}`);
      const commandDto = {
        groupId: process.env.GAS_STRATEGY_GROUP_ID,
        name: 'OnBoard',
        description: 'Onboard wallets',
        status: 'PENDING',
        depositAmount: process.env.DEPOSIT_AMOUNT
      }
      this.executorService.executeOnboard(commandDto)
    } else {
      console.log(`Gas price ${feeData.gasPrice} is within the acceptable range`);
    }
  }
}