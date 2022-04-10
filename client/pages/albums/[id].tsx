import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { NextThunkDispatch, wrapper } from '../../store';
import { IAlbum } from '../../types/albums';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchAlbums } from '../../store/action-creators/albums';
import { Button, Grid } from '@mui/material';
import MainLayout from '../../layouts/MainLayout';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import s from './styles/[id].module.scss';
import { fetchTracks } from '../../store/action-creators/track';
import { AlbumTrackList } from '../../components/album/AlbumTrackList';
import { useOnBlurUpdate } from '../../hooks/useOnBlurUpdate';
import { useOnPictureUpdate } from '../../hooks/useOnPictureUpdate';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import FileUpload from '../../components/track/FileUpload';

interface AlbumPageProps {
    serverAlbum: IAlbum
}

const AlbumPage: React.FC<AlbumPageProps> = ({ serverAlbum }) => {
    const [thisAlbum, setThisAlbum] = useState<IAlbum>(serverAlbum);
    const { tracks } = useTypedSelector(state => state.track);
    const { setActiveAlbum } = useActions();
    const router = useRouter();
    const nameRef: any = useRef<HTMLSpanElement>();
    const artistRef: any = useRef<HTMLSpanElement>();
    const { isEditable, handleClickOnEditIcon, handleOnBlurAlbumUpdate } = useOnBlurUpdate(thisAlbum, setThisAlbum);
    const { setPicture, setGlobTrackPicture, globTrackPicture } = useOnPictureUpdate(thisAlbum);

    setActiveAlbum(serverAlbum);

    useEffect(() => {
        if (
            thisAlbum.tracks.length === serverAlbum.tracks.length &&
            tracks.length === 0
        )
            return;
        refreshAlbumData();
    }, [tracks]);

    useEffect(() => {
        if (serverAlbum) {
            setActiveAlbum(serverAlbum);
        }
    }, []);

    const findTracksBelongedToThisAlbum = () => {
        const belongedTracks = tracks.filter(track => {
            return track.album?._id === thisAlbum._id;
        });
        return belongedTracks;
    };

    const refreshAlbumData = () => {
        const belongedTracks = findTracksBelongedToThisAlbum();
        setThisAlbum({ ...thisAlbum, tracks: belongedTracks });
    };

    return (
        <MainLayout
            title={`Hotims Music - ${thisAlbum.name}, ${thisAlbum.author}`}
            keywords={`Music, tracks, artists, ${thisAlbum.name}, ${thisAlbum.author}`}
        >
            <Button
                className={s.list}
                variant={'outlined'}
                onClick={() => router.push('/albums')}
            >
                To Album List
            </Button>
            <Grid
                container
                className={s.album_description}
            >
                {globTrackPicture || thisAlbum.picture
                    ? <img
                        className={s.album_picture}
                        src={globTrackPicture
                            ? globTrackPicture
                            : `http://localhost:5000/${thisAlbum.picture}`
                        }
                        alt='Album cover'
                    />
                    : <LibraryMusicIcon className={s.album_picture} />
                }
                <div>
                    <h1>
                        Album:{' '}
                        <span
                            ref={nameRef}
                            onBlur={() => handleOnBlurAlbumUpdate(nameRef, 'name')}
                            contentEditable={isEditable}
                        >
                            {thisAlbum.name}
                        </span>
                        <EditIcon
                            onClick={() => handleClickOnEditIcon(nameRef)}
                            className={s.editIcon}
                        />
                    </h1>
                    <h2>
                        Author:{' '}
                        <span
                            ref={artistRef}
                            onBlur={() => handleOnBlurAlbumUpdate(artistRef, 'author')}
                            contentEditable={isEditable}
                        >
                            {thisAlbum.author}
                        </span>
                        <EditIcon
                            onClick={() => handleClickOnEditIcon(artistRef)}
                            className={s.editIcon}
                        />
                    </h2>
                    <h3>Tracks: {thisAlbum.tracks.length}</h3>
                </div>
            </Grid>
            <Grid container>
                <FileUpload
                    setFile={setPicture}
                    setGlobImage={setGlobTrackPicture}
                    accept='image/*'
                >
                    {globTrackPicture || thisAlbum.picture
                        ? <Button>Change cover</Button>
                        : <Button>Upload cover</Button>
                    }
                </FileUpload>
            </Grid>
            <AlbumTrackList thisAlbum={thisAlbum} />
        </MainLayout>
    );
};

export default AlbumPage;

export const getServerSideProps = wrapper.getServerSideProps(store =>
    async ({ params }) => {
        const dispatch = store.dispatch as NextThunkDispatch;
        await dispatch(fetchAlbums());
        await dispatch(fetchTracks());
        const responseAlbum = await axios.get(
            `http://localhost:5000/albums/${params?.id}`
        );
        return {
            props: {
                serverAlbum: responseAlbum.data,
            },
        };
    }
);