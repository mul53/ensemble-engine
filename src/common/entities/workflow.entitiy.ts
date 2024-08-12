import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Workflow extends Document {
  @Prop()
  configFile: string;
}

export const WorkflowSehema = SchemaFactory.createForClass(Workflow);
