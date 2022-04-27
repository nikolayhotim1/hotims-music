import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateCommentDto {
    @ApiProperty({ example: 'User 1', description: 'Comment author 1' })
    readonly username: string;
    @ApiProperty({ example: 'Text 1', description: 'Comment text 1' })
    readonly text: string;
    @ApiProperty({ example: '123456789', description: 'Comment track id' })
    readonly trackId: ObjectId;
};