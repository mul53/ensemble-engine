import { Injectable, Inject } from '@nestjs/common';
import { WalletService } from '../wallet/wallet.service'; // Adjust the import path as necessary
import { BaseWallet, JsonRpcProvider, parseEther, parseUnits, Provider, SigningKey } from 'ethers';

@Injectable()
export class ExecutorService {
  private depositAccount: BaseWallet;
  private provider: Provider;

  constructor(private walletService: WalletService) {
    console.log(`Using RPC endpoint: ${process.env.PROVIDER_URL}}`);
    this.provider = new JsonRpcProvider(process.env.PROVIDER_URL)
    this.depositAccount = new BaseWallet(new SigningKey(process.env.DEPOSIT_ACCOUNT_PRIVATE_KEY), this.provider);
  }
  
  executeTask(taskName: string): string {
    // Implementation of task execution
    console.log(`Executing task: ${taskName}`);
    if (taskName === 'create') {
      return `Task ${taskName} executed successfully.`;
    }
  }

  async executeOnboard(groupId: string) {
    const taskName = 'onboard';
    const depositAmount = parseEther(process.env.DEPOSIT_AMOUNT);
    // Implementation of task execution
    console.log(`Executing task: ${taskName}`);
    console.log(`Deposit account address: ${this.depositAccount.address}`);
    const wallets = await this.walletService.getWalletsByGroup(groupId);
    let nonce = await this.provider.getTransactionCount(this.depositAccount.address);
    for (const wallet of wallets) {
      console.log(`Transferring funds to wallet: ${wallet.address}, using nonce: ${nonce}`);
      const txResponse = await this.depositAccount.sendTransaction({
        to: wallet.address,
        value: depositAmount,
        nonce: nonce,
        gasPrice: process.env.GAS_PRICE || undefined,
        gasLimit: 21000
      });
      console.log(`Transaction hash: ${txResponse.hash}`);
      nonce++;
    }
    // fetch a deposit account and use it to transfer funds to the wallets
    // console.log(`Onboarding wallets: ${wallets}`);
    console.log(`Task ${taskName} executed successfully.`);
  }
}
