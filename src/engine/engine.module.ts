import { Module } from '@nestjs/common';
import { CommandsModule } from '../commands/commands.module';
import { WorkflowsModule } from 'src/workflows/workflows.module';
import { CommandExecutorsModule } from '../command-executors/command-executors.module';
import { EngineService } from './engine.service';

@Module({
  imports: [CommandsModule, CommandExecutorsModule, WorkflowsModule],
  providers: [EngineService]
})
export class EngineModule {}
