import { Module } from '@nestjs/common';
import { WorkflowsModule } from 'src/workflows/workflows.module';
import { WorkflowEngineService } from './workflow-engine.service';
import { BlockchainProviderModule } from 'src/utils/blockchain-provider/blockchain-provider.module';
import { WalletModule } from 'src/wallet/wallet.module';
@Module({
  imports: [WorkflowsModule, BlockchainProviderModule, WalletModule],
  providers: [WorkflowEngineService]
})
export class WorkflowEngineModule {}
