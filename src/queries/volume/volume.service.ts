import { Injectable } from '@nestjs/common';
import { ethers, JsonRpcProvider } from 'ethers';
import fs from 'fs';

@Injectable()
export class VolumeService {
  provider: JsonRpcProvider;
  contract: ethers.Contract;

  constructor(private contractAddress: string, private tokenAddress: string) {
    console.log('GasStrategyService initialized');
    console.log(`Using RPC endpoint: ${process.env.PROVIDER_URL}}`);
    this.provider = new JsonRpcProvider(process.env.PROVIDER_URL);

    const abiPath = './abi/erc20.abi.json'
    const abi = JSON.parse(fs.readFileSync(abiPath, 'utf-8'));
    this.contract = new ethers.Contract(tokenAddress, abi);

    this.contract.on('Transfer', (from: string, to: string, value: ethers.BigNumberish, event) => {
      console.log(`Transfer event detected: from ${from} to ${to} value ${value.toString()}`);
    });


  }

  async fetch(): Promise<bigint> {
    const feeData = await this.provider.getFeeData();
    console.log(`Gas price: ${feeData.gasPrice}`)
    return feeData.gasPrice;
  }
}
