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

  static parseKpi(kpiString: string): Object {
    try {
      console.log(kpiString);
      const kpi: Object = JSON.parse(kpiString);
      
      return kpi;
    } catch (error) {
      throw new Error('Invalid KPI JSON string');
    }
  }
}

export const CommandSchema = SchemaFactory.createForClass(Command);
