import { Injectable, Inject } from '@nestjs/common';
import { WalletService } from '../wallet/wallet.service'; // Adjust the import path as necessary
import { BaseWallet, Contract, JsonRpcProvider, parseEther, parseUnits, Provider, SigningKey, Wallet } from 'ethers';
import { CommandDto } from 'src/commands-lib/commad.dto';
import { LoadTestCommandDto } from 'src/commands-lib/load-test.dto';
import { OnboardCommandDto } from 'src/commands-lib/onboard.dto';
import { CallCommandDto } from 'src/commands-lib/call-command.dto';

function pickRandomValue(arr) {
  if (arr.length === 0) {
      throw new Error('The array cannot be empty');
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

@Injectable()
export class ExecutorService {
  private depositAccount: BaseWallet;
  private provider: Provider;

  constructor(private walletService: WalletService) {
    console.log(`Using RPC endpoint: ${process.env.PROVIDER_URL}}`);
    this.provider = new JsonRpcProvider(process.env.PROVIDER_URL)
    this.depositAccount = new BaseWallet(new SigningKey(process.env.DEPOSIT_ACCOUNT_PRIVATE_KEY), this.provider);
  }
  
  executeCommand(commandDto: CommandDto) {
    let command: CommandDto
    switch (commandDto.name) {
      case 'LoadTest':
        command = commandDto as LoadTestCommandDto;
        const loadTestCommandDto = commandDto as LoadTestCommandDto;
        this.executeLoadTest(loadTestCommandDto);
        break;
      case 'OnBoard':
        const onBoardCommandDto = commandDto as OnboardCommandDto;
        this.executeOnboard(onBoardCommandDto);
        break;
        case 'CallContract':
          const callCommandDto = commandDto as CallCommandDto;
          this.executeCall(callCommandDto);
          break;
      default:
          console.log('Unknown command');
          throw new Error('Method not implemented.'); 
    }
  }

  async executeOnboard(commandDto: OnboardCommandDto) {
    const groupId = commandDto.groupId;
    const { depositAmount } = commandDto;
    // Implementation of task execution
    console.log(`Executing task: ${commandDto.name}`);
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
    console.log(`Task ${commandDto.name} executed successfully.`);
  }

  async sendNativeBatch(groupId: string, amount: string) {
    // Implementation of task execution
    console.log(`Deposit account address: ${this.depositAccount.address}`);
    const wallets = await this.walletService.getWalletsByGroup(groupId);
    let nonce = await this.provider.getTransactionCount(this.depositAccount.address);
    for (const wallet of wallets) {
      console.log(`Transferring funds to wallet: ${wallet.address}, using nonce: ${nonce}`);
      const txResponse = await this.depositAccount.sendTransaction({
        to: wallet.address,
        value: amount,
        nonce: nonce,
        gasPrice: process.env.GAS_PRICE || undefined,
        gasLimit: 21000
      });
      console.log(`Transaction hash: ${txResponse.hash}`);
      nonce++;
    }
    // fetch a deposit account and use it to transfer funds to the wallets
    // console.log(`Onboarding wallets: ${wallets}`);
  }

  async executeLoadTest(commandDto: LoadTestCommandDto) {
    const  { groupId } = commandDto
    const wallets = await this.walletService.getWalletsByGroup(groupId);

    const start = new Date()
    
    const nOfTransctions = 100
    for (let i=0; i < nOfTransctions; i++) {
      const fromWallet = pickRandomValue(wallets)
      const toWallet = pickRandomValue(wallets)
      const wallet = new Wallet(fromWallet.privateKey)

      const amount = parseEther('0.0000001');
      console.log(`Transferring funds from ${fromWallet.address} to ${toWallet.address}`);
      const txResponse = await wallet.sendTransaction({
        to: toWallet.address,
        value: amount,
        gasLimit: 21000
      });
      console.log(`Transaction hash: ${txResponse.hash}`);
    }
    const end = new Date()
    
    // assogn a group ID to the command or onb  oard the command
    // take two wallets from the group
    // send a transaction from one wallet to another

  }

  async executeCall(callCommandDto: CallCommandDto) {
    // Implementation of task execution
    const fromWallet = await this.walletService.getWallet(callCommandDto.fromWalletAddress);
    const senderWallet = new Wallet(fromWallet.privateKey);
    
    const abi = callCommandDto.contractAbi
    const contract = new Contract(callCommandDto.contractAddress, abi, senderWallet);
    throw new Error('Method not implemented.');
  }
}
