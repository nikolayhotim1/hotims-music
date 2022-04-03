import { ObjectId } from 'mongoose';

export class OperateTrackWithAlbumDto {
  readonly albumId: ObjectId;
  readonly trackId: ObjectId;
};