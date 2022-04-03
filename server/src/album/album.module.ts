import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileService } from 'src/file/file.service';
import { Track, TrackSchema } from 'src/track/schemas/track.schema';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Album, AlbumSchema } from './schemas/album.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
        MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    ],
    controllers: [AlbumController],
    providers: [AlbumService, FileService],
})
export class AlbumModule { };