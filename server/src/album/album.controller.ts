import { Album } from './schemas/album.schema';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@ApiTags('Albums')
@Controller('/albums')
export class AlbumController {
    constructor(private albumService: AlbumService) { }

    @Post()
    @ApiOperation({ summary: 'Create new album' })
    @ApiResponse({ status: 200, type: Album })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
    create(@UploadedFiles() files: any, @Body() dto: CreateAlbumDto) {
        const { picture } = files;
        return this.albumService.create(dto, picture[0]);
    }

    @ApiOperation({ summary: 'Update album' })
    @ApiResponse({ status: 200, type: Album })
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

    @ApiOperation({ summary: 'Get all albums' })
    @ApiResponse({ status: 200, type: [Album] })
    @Get()
    getAll(@Query('count') count: number, @Query('offset') offset: number) {
        return this.albumService.getAll(count, offset);
    }

    @ApiOperation({ summary: 'Search albums' })
    @ApiResponse({ status: 200, type: [Album] })
    @Get('/search')
    search(@Query('query') query: string) {
        return this.albumService.search(query);
    }

    @ApiOperation({ summary: 'Fetch album tracks' })
    @ApiResponse({ status: 200, type: Album })
    @Get(':id')
    fetchAlbumTracks(@Param('id') id: ObjectId) {
        return this.albumService.fetchAlbumTracks(id);
    }

    @ApiOperation({ summary: 'Set active album' })
    @ApiResponse({ status: 200, type: Album })
    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.albumService.getOne(id);
    }

    @ApiOperation({ summary: 'Get album' })
    @ApiResponse({ status: 200, type: Album })
    @Get(':id')
    setActiveAlbum(@Param('id') id: ObjectId) {
        return this.albumService.getOne(id);
    }

    @ApiOperation({ summary: 'Delete album' })
    @ApiResponse({ status: 200, type: Album })
    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.albumService.delete(id);
    }
};