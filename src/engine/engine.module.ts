import { Module } from '@nestjs/common';
import { CommandsModule } from '../commands/commands.module';
import { CommandExecutorsModule } from '../command-executors/command-executors.module';
import { EngineService } from './engine.service';

@Module({
  imports: [CommandsModule, CommandExecutorsModule],
  providers: [EngineService]
})
export class EngineModule {}
