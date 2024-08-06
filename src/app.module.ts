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
import { GasPriceModule } from './queries/gas-price/gas-price.module';
import { BlockchainProviderModule } from './utils/blockchain-provider/blockchain-provider.module';
import { WorkflowsModule } from './workflows/workflows.module';
import { WorkflowEngineModule } from './engine-v2/workflow-engine.module';

@Module({
  imports: [
    WalletModule, ExecutorModule, BlockchainProviderModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ScheduleModule.forRoot(),
    CommandsModule,
    EngineModule,
    WorkflowEngineModule,
    GasPriceModule,
    BlockchainProviderModule,
    WorkflowsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
