import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletModule } from './wallet/wallet.module';
import { ExecutorModule } from './executor/executor.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { CommandsModule } from './commands/commands.module';
import { EngineModule } from './engine/engine.module';
import { GasPriceModule } from './gas-price/gas-price.module';

@Module({
  imports: [
    WalletModule, ExecutorModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ScheduleModule.forRoot(),
    CommandsModule,
    EngineModule,
    GasPriceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
