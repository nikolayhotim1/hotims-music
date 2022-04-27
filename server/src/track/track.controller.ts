import { Comment } from './schemas/comment.schema';
import { Track } from 'src/track/schemas/track.schema';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateTrackDto } from './dto/update-track-dto';
import { OperateTrackWithAlbumDto } from './dto/operate-track-with-album.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ObjectId } from 'mongoose';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';
import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Tracks')
@Controller('/tracks')
export class TrackController {
    constructor(private trackService: TrackService) { }

    @ApiOperation({ summary: 'Create new track' })
    @ApiResponse({ status: 200, type: Track })
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 }
    ]))
    create(@UploadedFiles() files: any, @Body() dto: CreateTrackDto) {
        const { picture, audio } = files;
        return this.trackService.create(dto, picture[0], audio[0]);
    }

    @ApiOperation({ summary: 'Update track' })
    @ApiResponse({ status: 200, type: Track })
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

    @ApiOperation({ summary: 'Create new comment to track' })
    @ApiResponse({ status: 200, type: Comment })
    @Post('/comment')
    addComment(@Body() dto: CreateCommentDto) {
        return this.trackService.addComment(dto);
    }

    @ApiOperation({ summary: 'Listen track' })
    @ApiResponse({ status: 200, type: Track })
    @Post('/listen/:id')
    listen(@Param('id') id: ObjectId) {
        return this.trackService.listen(id);
    }

    @ApiOperation({ summary: 'Add track to album' })
    @ApiResponse({ status: 200, type: Track })
    @Post('/add_to_album')
    addTrackToAlbum(@Body() dto: OperateTrackWithAlbumDto) {
        return this.trackService.addTrackToAlbum(dto);
    }

    @ApiOperation({ summary: 'Delete track from album' })
    @ApiResponse({ status: 200, type: Track })
    @Post('/remove_from_album')
    removeTrackFromAlbum(@Body() dto: OperateTrackWithAlbumDto) {
        return this.trackService.removeTrackFromAlbum(dto);
    }

    @ApiOperation({ summary: 'Get all tracks' })
    @ApiResponse({ status: 200, type: [Track] })
    @Get()
    getAll(
        @Query('count') count: number,
        @Query('offset') offset: number
    ) {
        return this.trackService.getAll(count, offset);
    }

    @ApiOperation({ summary: 'Search tracks' })
    @ApiResponse({ status: 200, type: [Track] })
    @Get('/search')
    search(@Query('query') query: string) {
        return this.trackService.search(query);
    }

    @ApiOperation({ summary: 'Get track' })
    @ApiResponse({ status: 200, type: Track })
    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.trackService.getOne(id);
    }

    @ApiOperation({ summary: 'Delete track' })
    @ApiResponse({ status: 200, type: Track })
    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.trackService.delete(id);
    }
};