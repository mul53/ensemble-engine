import { Controller, Post, Body } from '@nestjs/common';
import { ExecutorService } from './executor.service';
import { CommandDto } from 'src/commands/commad.dto';

@Controller('execute')
export class ExecutorController {
  constructor(private readonly executorService: ExecutorService) {}

  @Post('onboard')
  async executeOnboard(@Body('groupId') groupId: string) {
    const commandDto = {
      groupId: groupId,
      name: 'OnBoard',
      description: 'Onboard wallets',
      status: 'PENDING',
      depositAmount: process.env.DEPOSIT_AMOUNT
    }
    return this.executorService.executeOnboard(commandDto)
  }


  async executeCommand(@Body() commandDto: CommandDto) {
    return this.executorService.executeCommand(commandDto)
  }
}
