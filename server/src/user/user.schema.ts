import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    // email: { type: String, unique: true, required: true };
    email: string

    @Prop()
    // password: { type: String, required: true };
    password: string;

    @Prop()
    // isActivated: { type: Boolean, default: false };
    isActivated: boolean;

    @Prop()
    // activationLink: { type: String };
    activationLink: string;
};

export const UserSchema = SchemaFactory.createForClass(User);