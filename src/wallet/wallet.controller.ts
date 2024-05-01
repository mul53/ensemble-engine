import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Wallet } from './wallet.schema';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('/wallets/')
  createWallets(@Body('numberOfWallets') numberOfWallets: number): string {
    return this.walletService.createWallets(numberOfWallets);
  }

  @Post('/wallets/:groupId')
  onboard(@Param('groupId') numberOfWallets: number): string {
    return this.walletService.createWallets(numberOfWallets);
  }

  /**
   * Fetches wallets by a group identifier.
   * @param {string} id - The unique identifier for the wallet group.
   * @returns {Promise<Wallet[]>} Returns an array of wallets associated with the group ID.
   */
    @Get('/wallets/group/:groupId')
    getWallets(@Param('groupId') groupId: string): Promise<Wallet[]> {
      return this.walletService.getWalletsByGroup(groupId);
    }
}
