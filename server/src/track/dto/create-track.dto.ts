import { Album } from './../../album/schemas/album.schema';

export class CreateTrackDto {
    readonly name: string;
    readonly artist: string;
    readonly text: string;
    readonly picture: string;
    readonly audio: string;
    readonly duration: number;
    readonly album?: Album;
};