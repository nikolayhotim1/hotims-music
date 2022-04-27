import { ApiProperty } from '@nestjs/swagger';
import { Album } from './../../album/schemas/album.schema';

export class CreateTrackDto {
    @ApiProperty({ example: 'Track 1', description: 'Track name' })
    readonly name: string;
    @ApiProperty({ example: 'Artist 1', description: 'Artist name' })
    readonly artist: string;
    @ApiProperty({ example: 'Text 1', description: 'Lyrics' })
    readonly text: string;
    @ApiProperty({ example: 'Picture.jpg', description: 'Track cover' })
    readonly picture: string;
    @ApiProperty({ example: 'Audio.mp3', description: 'Track audio' })
    readonly audio: string;
    @ApiProperty({ example: 'Album 1', description: 'Track album' })
    readonly album?: Album;
};