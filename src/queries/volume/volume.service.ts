import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { BlockchainProviderService } from 'src/utils/blockchain-provider/blockchain-provider.service';
import * as fs from 'fs';

@Injectable()
export class VolumeService {
  tokenAbi: any;

  constructor(private blockchainProviderService: BlockchainProviderService) {
    console.log(`Using RPC endpoint: ${process.env.PROVIDER_URL}}`);

    const abiPath = './abi/erc20.abi.json'
    this.tokenAbi = JSON.parse(fs.readFileSync(abiPath, 'utf-8'));
  }

  // private async loadAbi() {
  //   const abiPath = './abi/erc20.abi.json';
  //   try {
  //     const abiContent = await fs.readFile(abiPath, 'utf-8');
  //     this.tokenAbi = JSON.parse(abiContent);
  //     console.log('ABI loaded successfully');
  //   } catch (error) {
  //     console.error('Error reading ABI file:', error);
  //   }
  // }

  async fetch(contractAddress: string, tokenAddress: string, network: string): Promise<bigint> {
    const provider = this.blockchainProviderService.getProvider(network);
    const contract = new ethers.Contract(tokenAddress, this.tokenAbi, provider);


    const events = await contract.queryFilter('Transfer');
    console.log(`Transfer events: ${events.length}`);
    return BigInt(events.length) as bigint;
  }
}
