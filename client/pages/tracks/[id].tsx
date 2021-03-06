import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useInput } from '../../hooks/useInput';
import MainLayout from '../../layouts/MainLayout';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchTracks, updateTrack } from '../../store/action-creators/track';
import { TFieldRef } from '../../types/jointTypes';
import { IComment, ITrack } from '../../types/track';
import s from './styles/[id].module.scss';
import EditIcon from '@mui/icons-material/Edit';
import { fetchAlbums } from '../../store/action-creators/albums';
import SelectAlbum from '../../components/album/SelectAlbum';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import FileUpload from '../../components/shared/FileUpload';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useSession } from 'next-auth/react';

interface TrackPageProps {
    serverTrack: ITrack
}

const TrackPage: React.FC<TrackPageProps> = ({ serverTrack }) => {
    const [track, setTrack] = useState<ITrack>(serverTrack);
    const router = useRouter();
    const username = useInput('');
    const text = useInput('');
    const [isEditable, setIsEditable] = useState(false);
    const [currentField, setCurrentField]: any = useState<TFieldRef>();
    const [picture, setPicture] = useState<File>();
    const [audio, setAudio] = useState<File>();
    const dispatch = useDispatch() as NextThunkDispatch;
    const [globTrackPicture, setGlobTrackPicture] = useState();
    const [globTrack, setGlobTrack] = useState();
    const nameRef: any = useRef<HTMLSpanElement>();
    const artistRef: any = useRef<HTMLSpanElement>();
    const textRef: any = useRef<HTMLSpanElement>();
    const { error } = useTypedSelector(state => state.track);
    const { data: session } = useSession();

    useEffect(() => {
        if (track) {
            axios.get(`http://localhost:5000/tracks/${track._id}`);
        }
    }, [track]);

    useEffect(() => {
        if (isEditable) {
            currentField.current.focus();
        }
    }, [isEditable]);

    useEffect(() => {
        if (picture) {
            handlePictureUpdate();
        }
    }, [picture]);

    useEffect(() => {
        if (audio) {
            updateAudioHandler();
        }
    }, [audio]);

    const handleOnBlurTrackUpdate = async (
        fieldRef: TFieldRef,
        field: string
    ) => {
        const fieldContent = fieldRef.current.textContent;
        if (track.field === fieldContent) {
            setIsEditable(false);
            return;
        }

        await dispatch(
            updateTrack(track._id, {
                [field]: fieldRef.current.textContent
            })
        );
        setIsEditable(false);
        setCurrentField();
        setTrack({ ...track, [field]: fieldRef.current.textContent?.trim() });
    };

    const handleClickOnEditIcon = (fieldRef: TFieldRef) => {
        setCurrentField(fieldRef);
        setIsEditable(true);
    };

    const handlePictureUpdate = async () => {
        await dispatch(
            updateTrack(track._id, {
                picture
            })
        );
    };

    const updateAudioHandler = async () => {
        await dispatch(
            updateTrack(track._id, {
                audio
            })
        );
    };

    const addComment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/tracks/comment', {
                username: session?.user?.name || 'Anonymous',
                text: text.value,
                trackId: track._id
            });
            setTrack({ ...track, comments: [...track.comments, response.data] });
        } catch (e) {
            console.log(e);
        }
    };

    if (error) {
        return (
            <MainLayout>
                <h1>{error}</h1>
            </MainLayout>
        );
    }

    return (
        <MainLayout
            title={`Hotims Music - ${track.name}, ${track.artist}`}
            keywords={`Music, tracks, artists, ${track.name}, ${track.artist}`}
        >
            <Grid container>
                <Button
                    className={s.list}
                    variant={'outlined'}
                    onClick={() => router.push('/tracks')}
                >
                    To Track List
                </Button>
                {track.album ?
                    <Button
                        className={s.list}
                        variant={'outlined'}
                        onClick={() => router.push(`/albums/${track.album?._id}`)}
                    >
                        To The Album
                    </Button>
                    : ''
                }
                <SelectAlbum track={track} />
            </Grid>

            <Grid
                container
                className={s.description}
            >
                {globTrackPicture || track.picture
                    ? <img
                        className={s.picture}
                        src={globTrackPicture
                            ? globTrackPicture
                            : `http://localhost:5000/${track.picture}`
                        }
                        alt='Track cover'
                    />
                    : <LibraryMusicIcon className={s.picture} />
                }
                <div>
                    <h1>
                        Track:{' '}
                        <span
                            ref={nameRef}
                            onBlur={() => handleOnBlurTrackUpdate(nameRef, 'name')}
                            contentEditable={isEditable}
                        >
                            {track.name}
                        </span>
                        <EditIcon
                            onClick={() => handleClickOnEditIcon(nameRef)}
                            className={s.edit}
                        />
                    </h1>
                    <h2>
                        Artist:{' '}
                        <span
                            ref={artistRef}
                            onBlur={() => handleOnBlurTrackUpdate(artistRef, 'artist')}
                            contentEditable={isEditable}
                        >
                            {track.artist}
                        </span>
                        <EditIcon
                            onClick={() => handleClickOnEditIcon(artistRef)}
                            className={s.edit}
                        />
                    </h2>
                    {track.album?.name && (
                        <h3>Album: {track.album.name}</h3>
                    )}
                    <h3>Listens: {track.listens}</h3>
                </div>
            </Grid>
            {globTrack || track.audio
                ? <audio
                    controls
                    src={globTrack
                        ? globTrack
                        : `http://localhost:5000/${track.audio}`
                    }
                />
                : <h2><em>No audio</em></h2>
            }
            <Grid container>
                <FileUpload
                    setFile={setPicture}
                    setGlobImage={setGlobTrackPicture}
                    accept='image/*'
                >
                    {globTrackPicture || track.picture
                        ? <Button>Change cover</Button>
                        : <Button>Upload cover</Button>
                    }
                </FileUpload>
                <FileUpload
                    setFile={setAudio}
                    setGlobTrack={setGlobTrack}
                    accept='audio/*'
                >
                    {globTrack || track.audio
                        ? <Button>Change audio</Button>
                        : <Button>Upload audio</Button>
                    }
                </FileUpload>
            </Grid>
            <h2>Lyrics<EditIcon
                onClick={() => handleClickOnEditIcon(textRef)}
                className={s.edit}
            /></h2>
            <pre
                className={s.lyrics}
                ref={textRef}
                contentEditable={isEditable}
                onBlur={() => handleOnBlurTrackUpdate(textRef, 'text')}
            >
                {track.text}
            </pre>
            <h2>Comments</h2>
            <Grid
                container
                className={s.comment}
            >
                <TextField
                    {...text}
                    label='Comment'
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button onClick={addComment}>Send</Button>
            </Grid>
            <div>
                {track.comments.map((comment: IComment) =>
                    <div key={comment._id}>
                        <h4>{comment.username}</h4>
                        <p>{comment.text}</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps = wrapper.getServerSideProps(store =>
    async ({ params }) => {
        const dispatch = store.dispatch as NextThunkDispatch;
        const response = await axios.get(`http://localhost:5000/tracks/${params?.id}`);
        await dispatch(fetchAlbums());
        await dispatch(fetchTracks());
        return {
            props: {
                serverTrack: response.data
            }
        };
    }
);