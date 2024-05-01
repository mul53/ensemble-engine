import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletModule } from './wallet/wallet.module';
import { ExecutorModule } from './executor/executor.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    WalletModule, ExecutorModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
