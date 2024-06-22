import { Injectable } from '@nestjs/common';
import { WalletService } from '../wallet/wallet.service'; // Adjust the import path as necessary
import { BaseWallet, Contract, parseEther, Provider, SigningKey, Wallet, MaxUint256 } from 'ethers';
import { LoadTestCommandDto } from 'src/commands-lib/load-test.dto';
import { CallCommandDto } from 'src/commands-lib/call-command.dto';
import { BlockchainProviderService } from 'src/utils/blockchain-provider/blockchain-provider.service';
import DGRouletteAbi from 'abi/DGRoulette.abi.json';
import erc20Abi from 'abi/erc20.abi.json';

function pickRandomValue(arr) {
  if (arr.length === 0) {
      throw new Error('The array cannot be empty');
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}


/**
 * Generates a random number between 5 and 20.
 * @returns {number} A random number between 5 and 20.
 */
function generateRandomAmount(): number {
  return Math.floor(Math.random() * (20 - 5 + 1)) + 5;
}

@Injectable()
export class ExecutorService {
  private depositAccount: BaseWallet;
  private provider: Provider;

  constructor(private walletService: WalletService, private blockchainProviderService: BlockchainProviderService) {
    // console.log(`Using RPC endpoint: ${process.env.PROVIDER_URL}}`);
    // this.provider = new JsonRpcProvider(process.env.PROVIDER_URL)
    // this.depositAccount = new BaseWallet(new SigningKey(process.env.DEPOSIT_ACCOUNT_PRIVATE_KEY), this.provider);
  }

  async getRoundInfo(contractAddress: string, network: string): Promise<number> {
    const provider = this.blockchainProviderService.getProvider(network);

    const gameContract = new Contract(contractAddress, DGRouletteAbi, provider);
    let round = await gameContract.currentRoundIndex.staticCall()
    return round
  }
  
  async playGame(walletAddress: string, walletPk: string, contractAddress: string, tokenAddress: string, network: string) {
    console.log(`Playing game with wallet ${walletAddress} on network ${network}`);

    const provider = this.blockchainProviderService.getProvider(network);
    
    const wallet = new BaseWallet(new SigningKey(walletPk), provider);

    const gameContract = new Contract(contractAddress, DGRouletteAbi, wallet);
    const tokenContract = new Contract(tokenAddress, erc20Abi, wallet);

    // TODO: check if not played before in the round
    try {
      const allowance = await tokenContract.allowance(walletAddress, contractAddress);
      console.log(`Allowance: ${allowance}`);
      if (allowance < 1) {
        console.log(`Allowance ${allowance} is less than 1, approving contract ${contractAddress} to spend tokens`);
        const approveTx = await tokenContract.approve(contractAddress, MaxUint256);
        await approveTx.wait();
        console.log(`Approved contract ${contractAddress} to spend tokens`);
      }
      
      const amount = generateRandomAmount();
      console.log(`Placing bet of ${amount} on game ${contractAddress}`) 
      const tx = await gameContract.placeBet(parseEther(amount.toString()));
      console.log(`Transaction hash: ${tx.hash}`)
      await tx.wait();
      console.log(`Transaction successful with hash: ${tx.hash}`);
    } catch (error) {
      console.error(`Error playing game: ${error}`);
    }
  
  }


  async sendNativeBatch(groupId: string, amount: string, network: string) {
    // Implementation of task execution
    const provider = this.blockchainProviderService.getProvider(network);
    const depositAccount = new BaseWallet(new SigningKey(process.env.DEPOSIT_ACCOUNT_PRIVATE_KEY), provider);

    console.log(`Deposit account address: ${depositAccount.address}`);
    const wallets = await this.walletService.getWalletsByGroup(groupId);
    let nonce = await this.provider.getTransactionCount(this.depositAccount.address);

    const transactionPromises = wallets.map(async (wallet, index) => {
      console.log(`Transferring funds to wallet: ${wallet.address}, using nonce: ${nonce + index}`);
      const txResponse = await this.depositAccount.sendTransaction({
        to: wallet.address,
        value: amount,
        nonce: nonce + index,
        gasPrice: process.env.GAS_PRICE || undefined,
        gasLimit: 21000
      });
      console.log(`Transaction hash: ${txResponse.hash}`);
      // Wait for the transaction to be confirmed
      const receipt = await txResponse.wait();
      console.log(`Transaction confirmed: ${receipt.hash}`);
    });

    await Promise.all(transactionPromises);
    console.log('All transactions confirmed');
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

      const amount = parseEther('0.000000001');
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
