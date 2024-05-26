import { Module } from '@nestjs/common';
import { VolumeService } from './volume.service';


@Module({
  providers: [VolumeService],
  imports: []
})
export class VolumeModule {}