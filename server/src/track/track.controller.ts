import { UpdateTrackDto } from './dto/update-track-dto';
import { OperateTrackWithAlbumDto } from './dto/operate-track-with-album.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ObjectId } from 'mongoose';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';
import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/tracks')
export class TrackController {
    constructor(private trackService: TrackService) { }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 }
    ]))
    create(@UploadedFiles() files: any, @Body() dto: CreateTrackDto) {
        const { picture, audio } = files;
        return this.trackService.create(dto, picture[0], audio[0]);
    }

    @Get()
    getAll(
        @Query('count') count: number,
        @Query('offset') offset: number
    ) {
        return this.trackService.getAll(count, offset);
    }

    @Get('/search')
    search(@Query('query') query: string) {
        return this.trackService.search(query);
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.trackService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.trackService.delete(id);
    }

    @Post('/comment')
    addComment(@Body() dto: CreateCommentDto) {
        return this.trackService.addComment(dto);
    }

    @Post('/listen/:id')
    listen(@Param('id') id: ObjectId) {
        return this.trackService.listen(id);
    }

    @Post('/add_to_album')
    addTrackToAlbum(@Body() dto: OperateTrackWithAlbumDto) {
        return this.trackService.addTrackToAlbum(dto);
    }

    @Post('/remove_from_album')
    removeTrackFromAlbum(@Body() dto: OperateTrackWithAlbumDto) {
        return this.trackService.removeTrackFromAlbum(dto);
    }

    @Post('/update/:id')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'picture', maxCount: 1 },
            { name: 'audio', maxCount: 1 }
        ]),
    )
    updateTrack(
        @Param('id') id: ObjectId,
        @Body() dto: UpdateTrackDto,
        @UploadedFiles() files: any
    ) {
        let { picture, audio } = files || {};
        picture = !picture ? [] : picture;
        audio = !audio ? [] : audio;
        return this.trackService.updateTrack(id, dto, picture[0], audio[0]);
    }
};