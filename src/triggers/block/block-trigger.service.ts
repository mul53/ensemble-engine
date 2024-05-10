// block-trigger.service.ts
import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { JsonRpcProvider } from 'ethers';
import { ExecutorService } from 'src/executor/executor.service';

@Injectable()
export class BlockTriggerService {
  provider: JsonRpcProvider;
  processedBlockNumber = 0;

  constructor(private executorService: ExecutorService) {
    console.log('GasStrategyService initialized');
    console.log(`Using RPC endpoint: ${process.env.PROVIDER_URL}}`);
    this.provider = new JsonRpcProvider(process.env.PROVIDER_URL)
  }

  @Interval(5000)
  async execute() {
    const latestBlockNumber = await this.provider.getBlockNumber()
    if (latestBlockNumber > this.processedBlockNumber) {
      console.log('new block!!');
      return;
    }
  }
}
