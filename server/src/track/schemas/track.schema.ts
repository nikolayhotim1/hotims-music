import { Album } from './../../album/schemas/album.schema';
import { Comment } from './comment.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
    @ApiProperty({ example: 'Track 1', description: 'Track name' })
    @Prop()
    name: string;

    @ApiProperty({ example: 'Artist 1', description: 'Artist name' })
    @Prop()
    artist: string;

    @ApiProperty({ example: 'Text 1', description: 'Lyrics' })
    @Prop()
    text: string;

    @ApiProperty({ example: '5', description: 'Listens count' })
    @Prop()
    listens: number;

    @ApiProperty({ example: 'Picture.jpg', description: 'Track cover' })
    @Prop()
    picture: string;

    @ApiProperty({ example: 'Audio.mp3', description: 'Track audio' })
    @Prop()
    audio: string;

    @ApiProperty({ example: '123456789, 987654321', description: 'Track comments' })
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
    comments: Comment[];

    @ApiProperty({ example: 'Album 1', description: 'Track album' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Album' })
    album: Album;
};

export const TrackSchema = SchemaFactory.createForClass(Track);