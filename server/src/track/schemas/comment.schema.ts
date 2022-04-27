import { ApiProperty } from '@nestjs/swagger';
import { Track } from './track.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    @ApiProperty({ example: 'User 1', description: 'Comment author 1' })
    @Prop()
    username: string;

    @ApiProperty({ example: 'Text 1', description: 'Comment text 1' })
    @Prop()
    text: string;

    @ApiProperty({ example: '123456789', description: 'Comment track id' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Track' })
    track: Track;
};

export const CommentSchema = SchemaFactory.createForClass(Comment);