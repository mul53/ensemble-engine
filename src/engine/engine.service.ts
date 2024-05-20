import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { CommandsService } from 'src/commands/commands.service';

@Injectable()
export class EngineService {
  constructor(private readonly commandsService: CommandsService) {}

  @Interval(5000)
  async loop() {
    const commands = await this.commandsService.findAll();
//     console.log('commands', commands);
//     for (const command of commands) {
//       console.log('command', command);
  }
}
