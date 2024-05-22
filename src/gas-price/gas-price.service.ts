import { Injectable } from '@nestjs/common';
import { JsonRpcProvider } from 'ethers';

@Injectable()
export class GasPriceService {
  provider: JsonRpcProvider;
  constructor() {
    console.log('GasStrategyService initialized');
    console.log(`Using RPC endpoint: ${process.env.PROVIDER_URL}}`);
    this.provider = new JsonRpcProvider(process.env.PROVIDER_URL)
  }

  async fetch(): Promise<bigint> {
    const feeData = await this.provider.getFeeData();
    console.log(`Gas price: ${feeData.gasPrice}`)
    return feeData.gasPrice;
  }
}
