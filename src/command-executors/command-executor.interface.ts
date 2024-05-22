// src/command-executors/command-executor.interface.ts
import { Command } from '../commands/schemas/command.schema';

export interface CommandExecutor {
  execute(command: Command): void;
}
