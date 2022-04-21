import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { NextThunkDispatch, wrapper } from '../../store';
import { IAlbum } from '../../types/albums';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchAlbums, setActiveAlbum } from '../../store/action-creators/albums';
import { Button, Card, Grid } from '@mui/material';
import MainLayout from '../../layouts/MainLayout';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import s from './styles/[id].module.scss';
import { useOnBlurUpdate } from '../../hooks/useOnBlurUpdate';
import { useOnPictureUpdate } from '../../hooks/useOnPictureUpdate';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AlbumTrackList from '../../components/album/AlbumTrackList';
import FileUpload from '../../components/shared/FileUpload';
import { fetchTracks } from '../../store/action-creators/track';
import { useDispatch } from 'react-redux';

interface AlbumPageProps {
    serverAlbum: IAlbum
}

const AlbumPage: React.FC<AlbumPageProps> = ({ serverAlbum }) => {
    const [thisAlbum, setThisAlbum] = useState<IAlbum>(serverAlbum);
    const { tracks, error } = useTypedSelector(state => state.track);
    const { setActiveAlbum } = useActions();
    const router = useRouter();
    const nameRef: any = useRef<HTMLSpanElement>();
    const artistRef: any = useRef<HTMLSpanElement>();
    const { isEditable, handleClickOnEditIcon, handleOnBlurAlbumUpdate } = useOnBlurUpdate(thisAlbum, setThisAlbum);
    const { setPicture, setGlobTrackPicture, globTrackPicture } = useOnPictureUpdate(thisAlbum);
    const dispatch = useDispatch() as NextThunkDispatch;

    useEffect(() => {
        if (
            thisAlbum.tracks.length === serverAlbum.tracks.length &&
            tracks.length === 0
        )
            return;
        refreshAlbumData();
    }, [tracks]);

    useEffect(() => {
        if (serverAlbum.tracks.length > 0) {
            setActiveAlbum(serverAlbum);
        } else {
            dispatch(fetchTracks());
            dispatch(fetchAlbums());
        }
    }, []);

    useEffect(() => {
        if (globTrackPicture) {
            setPicture();
        }
    }, [globTrackPicture]);

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

    if (error) {
        return (
            <MainLayout>
                <h1>{error}</h1>
            </MainLayout>
        );
    }

    setActiveAlbum(serverAlbum);

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
            <Button
                className={s.list}
                variant={'outlined'}
                onClick={() => router.push('/tracks')}
            >
                To Track List
            </Button>
            <Grid
                container
                className={s.description}
            >
                {globTrackPicture || thisAlbum.picture
                    ? <img
                        className={s.picture}
                        src={globTrackPicture
                            ? globTrackPicture
                            : `http://localhost:5000/${thisAlbum.picture}`
                        }
                        alt='Album cover'
                    />
                    : <LibraryMusicIcon className={s.picture} />
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
                            className={s.edit}
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
                            className={s.edit}
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
                <Button onClick={() => router.push('/tracks/create')}>Load Track</Button>
            </Grid>
            <Grid
                container
                justifyContent='center'
            >
                <Card className={s.albums}>
                    <AlbumTrackList thisAlbum={thisAlbum} />
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default AlbumPage;

export const getServerSideProps = wrapper.getServerSideProps(store =>
    async ({ params }) => {
        const dispatch = store.dispatch as NextThunkDispatch;
        await dispatch(fetchAlbums());
        dispatch(setActiveAlbum(params?.id));
        const response = await axios.get(
            `http://localhost:5000/albums/${params?.id}`
        );
        return {
            props: {
                serverAlbum: response.data
            }
        };
    }
);