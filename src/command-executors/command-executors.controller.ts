import { Controller } from '@nestjs/common';
import { CommandExecutorsService } from './command-executors.service';

@Controller()
export class CommandExecutorsController {
  constructor(private readonly commandExecutorsService: CommandExecutorsService) {}
}
