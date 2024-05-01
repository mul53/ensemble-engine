import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { WalletService } from './wallet.service';

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
   * @returns {Wallet[]} Returns an array of wallets associated with the group ID.
   */
    @Get('/wallets/:groupId')
    getWallets(@Param('groupId') groupId: string): any[] {
      return this.walletService.getWalletsByGroup(groupId);
    }
}
