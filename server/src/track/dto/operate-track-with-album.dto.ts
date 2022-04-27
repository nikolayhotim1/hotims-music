import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class OperateTrackWithAlbumDto {
  @ApiProperty({ example: '123456789', description: 'Album id' })
  readonly albumId: ObjectId;
  @ApiProperty({ example: '987654321', description: 'Track id' })
  readonly trackId: ObjectId;
};