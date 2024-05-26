import { Injectable } from '@nestjs/common';
import { BlockchainProviderService } from '../../utils/blockchain-provider/blockchain-provider.service';

@Injectable()
export class GasPriceService {

  constructor(private providerService: BlockchainProviderService) {
    console.log('GasStrategyService initialized');
  }

  async fetch(networkName: string, ): Promise<bigint> {
    const provider = this.providerService.getProvider(networkName);

    const feeData = await provider.getFeeData();
    console.log(`Gas price: ${feeData.gasPrice}`)
    return feeData.gasPrice;
  }
}
