import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GasDocument = Gas & Document;

@Schema()
export class Gas {
    @Prop({ required: true })
    groupId: string;

    @Prop()
    gasPrice: bigint;

    @Prop({ required: true, default: Date.now })
    timestamp: Date
}

export const GasSchema = SchemaFactory.createForClass(Gas);