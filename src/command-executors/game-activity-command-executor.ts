// src/command-executors/command-one-executor.ts
import { CommandExecutor } from './command-executor.interface';

export class GameActivityCommandExecutor implements CommandExecutor {
  execute() {
    console.log('Executing Command One');
  }
}
