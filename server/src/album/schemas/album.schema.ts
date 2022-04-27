import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Track } from 'src/track/schemas/track.schema';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
    @ApiProperty({ example: 'Album 1', description: 'Album name' })
    @Prop()
    name: string;

    @ApiProperty({ example: 'Author 1', description: 'Album author' })
    @Prop()
    author: string;

    @ApiProperty({ example: 'Picture.jpg', description: 'Album cover' })
    @Prop()
    picture: string;

    @ApiProperty({ example: '123456789, 987654321', description: 'Album tracks id' })
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] })
    tracks: Track[];
};

export const AlbumSchema = SchemaFactory.createForClass(Album);