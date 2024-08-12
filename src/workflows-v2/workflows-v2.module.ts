import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Workflow, WorkflowSehema } from 'src/common/entities/workflow.entitiy';
import { DatabaseModule } from 'src/common/modules/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Workflow.name, schema: WorkflowSehema },
    ]),
  ],
})
export class WorkflowsV2Module {}
