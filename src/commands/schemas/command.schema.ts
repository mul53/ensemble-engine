// src/commands/schemas/command.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { COMMANDS } from '../entities/command.config';

@Schema()
export class Command extends Document {
  @Prop({ required: true, enum: COMMANDS.map(cmd => cmd.name) })
  name: string;

  @Prop({ required: true, type: Object })
  kpi: Object;

  @Prop({ required: true })
  network: string;

  @Prop({ default: false })
  isActive: boolean;
}

export const CommandSchema = SchemaFactory.createForClass(Command);
