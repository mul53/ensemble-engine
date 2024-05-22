// src/commands/schemas/command.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { COMMANDS } from '../entities/command.config';
import { Wallet } from 'src/wallet/wallet.schema';

export interface Kpi {
  template: string;
  params: Object; // Adjust the type as necessary
  func: string;
}

@Schema()
export class Command extends Document {
  @Prop({ required: true, enum: COMMANDS.map(cmd => cmd.name) })
  name: string;

  @Prop({ required: true, type: Object })
  kpi: Kpi;

  @Prop({ required: true })
  network: string;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ default: true })
  isPending: boolean;

  @Prop({ type: Types.ObjectId, ref: Wallet.name })
  groupId: string;
}

export const CommandSchema = SchemaFactory.createForClass(Command);
