import { User } from './../user/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop()
    refreshToken: string;
};

export const TokenSchema = SchemaFactory.createForClass(Token);