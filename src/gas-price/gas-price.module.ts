import { Module } from '@nestjs/common';
import { GasPriceService } from './gas-price.service';
import { CommandExecutorsModule } from '../command-executors/command-executors.module';

@Module({
  providers: [GasPriceService],
  imports: [CommandExecutorsModule]
})
export class GasPriceModule {}
