import { Injectable } from '@nestjs/common';
import { Workflow } from './workflow-parser';

@Injectable()
export class WorkflowProcessor {
  process(workflow: Workflow) {
    // TODO: how to handle the ABI
    for (const workflowStep of workflow.steps) {
        
    }
  }
}
