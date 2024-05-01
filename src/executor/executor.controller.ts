import { Controller, Post, Body } from '@nestjs/common';
import { ExecutorService } from './executor.service';

@Controller('execute')
export class ExecutorController {
  constructor(private readonly executorService: ExecutorService) {}

  @Post('onboard')
  async executeOnboard(@Body('groupId') groupId: string) {
    return this.executorService.executeOnboard(groupId)
  }
}
