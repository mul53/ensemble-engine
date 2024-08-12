import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { WorkflowsV2Service } from './workflows-v2.service';

@Controller('/api/v2/workflows')
export class WorflowsV2Controller {
  constructor(private readonly workflowV2Service: WorkflowsV2Service) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(@UploadedFile() file: Express.Multer.File) {
    const fileString = file.buffer.toString('utf-8');
    const workflow = await this.workflowV2Service.create({
      configFile: fileString,
    });
    return { id: workflow.id };
  }
}
