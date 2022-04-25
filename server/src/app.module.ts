import { ConfigModule } from '@nestjs/config';
import { FileModule } from './file/file.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
        MongooseModule.forRoot(process.env.DB_URL),
        AlbumModule,
        TrackModule,
        FileModule,
        UserModule
    ]
})
export class AppModule { };