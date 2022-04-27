import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
    @ApiProperty({ example: 'Album 1', description: 'Album name' })
    readonly name: string;
    @ApiProperty({ example: 'Author 1', description: 'Album author' })
    readonly author: string;
    @ApiProperty({ example: 'Picture.jpg', description: 'Album cover' })
    readonly picture: string;
};