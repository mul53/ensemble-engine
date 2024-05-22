// src/command-executors/command-one-executor.ts
import { Injectable } from '@nestjs/common';
import { Command } from '../commands/schemas/command.schema';
import { CommandsService } from 'src/commands/commands.service';

@Injectable()
export abstract class BaseCommandExecutor {

  constructor(private readonly commandsService: CommandsService) {}
  
  async execute(command: Command) : Promise<void> {
    console.log('Base Command Executor');
    await this.commandsService.setPending(command.id, false);
    await this.executeImpl(command);
    await this.commandsService.setPending(command.id, true);
  }

  abstract executeImpl(command: Command);
}

