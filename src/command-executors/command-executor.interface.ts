import { Command } from '../commands/schemas/command.schema';
// src/command-executors/command-executor.interface.ts
export interface CommandExecutor {
  execute(command: Command): void;
}
