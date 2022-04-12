import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('/albums')
export class AlbumController {
    constructor(private albumService: AlbumService) { }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
    create(@UploadedFiles() files: any, @Body() dto: CreateAlbumDto) {
        const { picture } = files;
        return this.albumService.create(dto, picture[0]);
    }

    @Post('/update/:id')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
    update(
        @Param('id') id: ObjectId,
        @UploadedFiles() files: any,
        @Body() dto: CreateAlbumDto,
    ) {
        let { picture } = files || {};
        picture = !picture ? [] : picture;
        return this.albumService.updateAlbum(id, dto, picture[0]);
    }

    @Get()
    getAll(@Query('count') count: number, @Query('offset') offset: number) {
        return this.albumService.getAll(count, offset);
    }

    @Get('/search')
    search(@Query('query') query: string) {
        return this.albumService.search(query);
    }

    @Get(':id/tracks')
    fetchAlbumTracks(@Param('id') id: ObjectId) {
        return this.albumService.fetchAlbumTracks(id);
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.albumService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.albumService.delete(id);
    }
};