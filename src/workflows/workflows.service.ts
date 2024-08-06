import { Injectable } from '@nestjs/common';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import fs from 'fs';
import yaml from 'js-yaml';

@Injectable()
export class WorkflowsService {
  create(createWorkflowDto: CreateWorkflowDto) {
    return 'This action adds a new workflow';
  }

  findAll() {
    const doc = yaml.load(fs.readFileSync('./sample/workflow.yml', 'utf8'))[0];
    return [doc];
    // return `This action returns all workflows`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workflow`;
  }

  update(id: number, updateWorkflowDto: UpdateWorkflowDto) {
    return `This action updates a #${id} workflow`;
  }

  remove(id: number) {
    return `This action removes a #${id} workflow`;
  }
}