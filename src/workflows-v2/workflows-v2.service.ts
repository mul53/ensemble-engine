import { Injectable } from '@nestjs/common';
import { WorkflowRepository } from 'src/common/repositories/workflow.repository';
import { CreateWorkflowV2Dto } from './common/dto/create-workflow-v2.dto';

@Injectable()
export class WorkflowsV2Service {
  constructor(private readonly workflowRepository: WorkflowRepository) {}

  create(createWorkflowV2Dto: CreateWorkflowV2Dto) {
    return this.workflowRepository.create(createWorkflowV2Dto);
  }
}
