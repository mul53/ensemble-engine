import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWorkflowV2Dto } from 'src/workflows-v2/common/dto/create-workflow-v2.dto';
import { Workflow } from '../entities/workflow.entitiy';

@Injectable()
export class WorkflowRepository {
  constructor(
    @InjectModel(Workflow.name) private readonly workflowModel: Model<Workflow>,
  ) {}

  create(createWorkflowV2: CreateWorkflowV2Dto) {
    return this.workflowModel.create(createWorkflowV2);
  }
}
