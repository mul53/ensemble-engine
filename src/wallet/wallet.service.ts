import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet, WalletDocument } from './wallet.schema';
import { Wallet as EthersWallet } from 'ethers';
import { group } from 'console';

const generateId = () =>  Math.random().toString(16).slice(2)

@Injectable()
export class WalletService {
  public groups: { [key: string]: any } = {}
  
  constructor(@InjectModel(Wallet.name) private walletModel: Model<WalletDocument>) {}

    /**
   * Creates a specified number of Ethereum wallets and groups them under a unique identifier.
   * Each wallet is randomly generated.
   * 
   * @param {number} numberOfWallets - The number of wallets to create.
   * @returns {string} The identifier for the group of created wallets. This identifier can be used to retrieve the group.
   */
  createWallets(numberOfWallets: number) {
    const groupId = generateId()
    for (let i = 0; i < numberOfWallets; i++) {
      const wallet = EthersWallet.createRandom()
      console.log(`generating wallet with address ${wallet.address}`)
      const newWallet = new this.walletModel({
        groupId,
        address: wallet.address,
        privateKey: wallet.privateKey
      });
      // TODO: Maybe add await here
      newWallet.save();
    }
    return groupId
  }

    /**
   * Retrieves a group of wallets by their identifier.
   * @param {string} id - The identifier of the wallet group.
   * @returns {Wallet[]} An array of wallets if the group is found.
   * @throws {NotFoundException} Throws if no group is found for the given ID.
   */
    async getWalletsByGroup(groupId: string): Promise<Wallet[]> {
      const wallets = await this.walletModel.find({ groupId }, ['address']).exec();
      if (!group) {
        throw new NotFoundException(`Wallet group with ID ${groupId} not found.`);
      }
      return wallets;
    }
}
