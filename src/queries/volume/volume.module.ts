import { Module } from '@nestjs/common';
import { VolumeService } from './volume.service';
import { BlockchainProviderModule } from 'src/utils/blockchain-provider/blockchain-provider.module';


@Module({
  providers: [VolumeService],
  imports: [BlockchainProviderModule],
  exports: [VolumeService]
})
export class VolumeModule {}
