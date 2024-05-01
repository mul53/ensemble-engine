import { Injectable, NotFoundException } from '@nestjs/common';
import { Wallet } from 'ethers';

// const generateId = () =>  Math.random().toString(16).slice(2)
let id = 0
const generateId = () => {
  id++
  return id.toString()
}

@Injectable()
export class WalletService {
  public groups: { [key: string]: any } = {}
  
    /**
   * Creates a specified number of Ethereum wallets and groups them under a unique identifier.
   * Each wallet is randomly generated.
   * 
   * @param {number} numberOfWallets - The number of wallets to create.
   * @returns {string} The identifier for the group of created wallets. This identifier can be used to retrieve the group.
   */
  createWallets(numberOfWallets: number) {
    const wallets = []
    for (let i = 0; i < numberOfWallets; i++) {
      const wallet = Wallet.createRandom()
      console.log(wallet.address)
      wallets.push(wallet)
    }
    const id = generateId()
    this.groups[id] = wallets
    return id
  }

    /**
   * Retrieves a group of wallets by their identifier.
   * @param {string} id - The identifier of the wallet group.
   * @returns {Wallet[]} An array of wallets if the group is found.
   * @throws {NotFoundException} Throws if no group is found for the given ID.
   */
    getWalletsByGroup(id: string): Wallet[] {
      const group = this.groups[id];
      if (!group) {
        throw new NotFoundException(`Wallet group with ID ${id} not found.`);
      }
      return group;
    }
}
