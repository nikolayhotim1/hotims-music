import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album, AlbumDocument } from './schemas/album.schema';

type TDeleteResponse = {
  message?: string;
  error?: string;
};

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateAlbumDto, picture): Promise<Album> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const album = await this.albumModel.create({
      ...dto,
      picture: picturePath,
    });
    return album;
  }

  async updateAlbum(
    id: ObjectId,
    dto: CreateAlbumDto,
    picture?,
  ): Promise<Album> {
    const media = this.getMediaData(picture);
    const dataForUpdate = {
      ...dto,
      ...media,
    };
    this.deleteOldMediaData(id, media);

    const album = await this.albumModel.findOneAndUpdate(
      { _id: id },
      dataForUpdate,
      { new: true, useFindAndModify: false },
    );
    return album;
  }

  async getAll(count = 10, offset = 0): Promise<Album[]> {
    const albums = await this.albumModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));
    return albums;
  }

  async getOne(id: ObjectId): Promise<Album> {
    const album = await this.albumModel.findById(id).populate('tracks');
    return album;
  }

  async delete(id: ObjectId): Promise<TDeleteResponse> {
    try {
      const album = await this.albumModel.findById(id);
      if (album?.tracks?.length > 0) {
        throw new Error('Cannot remove album, because it has tracks in it');
      }
      album.deleteOne();
      this.fileService.removeFile(album.picture);
      return { message: 'Album has been successfully removed.' };
    } catch (e) {
      return { error: e.message };
    }
  }

  async search(query: string): Promise<Album[]> {
    const albums = await this.albumModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return albums;
  }

  private getMediaData(picture) {
    const returnData: { picture?: string } = {};

    if (picture) {
      picture = this.fileService.createFile(FileType.IMAGE, picture);
      returnData.picture = picture;
    }
    return returnData;
  }

  private async deleteOldMediaData(id, media) {
    const album = await this.albumModel.findById(id);
    if (media.picture) {
      await this.fileService.removeFile(album?.picture);
    }
  }
}
