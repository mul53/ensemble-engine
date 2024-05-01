import { Injectable, Inject } from '@nestjs/common';
import { WalletService } from '../wallet/wallet.service'; // Adjust the import path as necessary
import { BaseWallet, JsonRpcProvider, parseEther, Provider, SigningKey } from 'ethers';

@Injectable()
export class ExecutorService {
  private depositAccount: BaseWallet;
  private provider: Provider;

  constructor(private walletService: WalletService) {
    console.log(process.env.PROVIDER_URL);
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
    const depositAmount = parseEther('0.0001');
    // Implementation of task execution
    console.log(`Executing task: ${taskName}`);
    const wallets = await this.walletService.getWalletsByGroup(groupId);
    const nonce = await this.provider.getTransactionCount(this.depositAccount.address);
    for (const wallet of wallets) {
      this.depositAccount.sendTransaction({
        to: wallet.address,
        value: depositAmount,
        nonce: nonce
      });
    }
    // fetch a deposit account and use it to transfer funds to the wallets
    // console.log(`Onboarding wallets: ${wallets}`);
    console.log(`Task ${taskName} executed successfully.`);
  }
}
