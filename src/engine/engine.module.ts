import { Module } from '@nestjs/common';
import { CommandsModule } from '../commands/commands.module';
import { EngineService } from './engine.service';

@Module({
  imports: [CommandsModule],
  providers: [EngineService]
})
export class EngineModule {}
