// import { Button, Grid, TextField } from '@mui/material';
// import axios from 'axios';
// import { GetServerSideProps } from 'next';
// import { useRouter } from 'next/router';
// import React, { useState } from 'react';
// import { useInput } from '../../hooks/useInput';
// import MainLayout from '../../layouts/MainLayout';
// import { IComment, ITrack } from '../../types/track';
// import s from './styles/[id].module.scss';

// const TrackPage = ({ serverTrack }: any) => {
//     const [track, setTrack] = useState<ITrack>(serverTrack);
//     const router = useRouter();
//     const username = useInput('');
//     const text = useInput('');

//     const addComment = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/tracks/comment', {
//                 username: username.value,
//                 text: text.value,
//                 trackId: track._id
//             });
//             setTrack({ ...track, comments: [...track.comments, response.data] });
//         } catch (e) {
//             console.log(e);
//         }
//     };

//     return (
//         <MainLayout
//             title={`Hotims Music - ${track.name}, ${track.artist}`}
//             keywords={`Music, tracks, artists, ${track.name}, ${track.artist}`}
//         >
//             <Button
//                 className={s.back}
//                 variant={'outlined'}
//                 onClick={() => router.push('/tracks')}
//             >
//                 To the list
//             </Button>
//             <Grid
//                 container
//                 className={s.track_description}
//             >
//                 <img
//                     src={`http://localhost:5000/${track.picture}`}
//                     alt='Track cover'
//                 />
//                 <div>
//                     <h1>{track.name}</h1>
//                     <h2>{track.artist}</h2>
//                     <h3>Listens: {track.listens}</h3>
//                 </div>
//             </Grid>
//             <h2>Lyrics</h2>
//             <p>{track.text}</p>
//             <h2>Comments</h2>
//             <Grid
//                 container
//                 className={s.add_comment}
//             >
//                 <TextField
//                     {...username}
//                     label='Your name'
//                     fullWidth
//                 />
//                 <TextField
//                     {...text}
//                     label='Comment'
//                     fullWidth
//                     multiline
//                     rows={4}
//                 />
//                 <Button onClick={addComment}>Send</Button>
//             </Grid>
//             <div>
//                 {track.comments.map((comment: IComment) =>
//                     <div key={comment._id}>
//                         <h4>{comment.username}</h4>
//                         <p>{comment.text}</p>
//                     </div>
//                 )}
//             </div>
//         </MainLayout>
//     );
// };

// export default TrackPage;

// export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
//     const response = await axios.get(`http://localhost:5000/tracks/${params.id}`);
//     return {
//         props: {
//             serverTrack: response.data
//         }
//     };
// };

import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NextThunkDispatch, wrapper } from '../../store';
import { ITrack } from '../../types/track';
import { useInput } from '../../hooks/useInput';
import { TFieldRef } from '../../types/jointTypes';
import { updateTrack } from '../../store/action-creators/track';
import MainLayout from '../../layouts/MainLayout';
import FileUpload from '../../components/FileUpload';
import styles from './styles/TrackPage.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { SelectAlbum } from '../../components/album/lib';
import { ChangeAudioModal } from '../../components';
import { fetchAlbums } from '../../store/action-creators/albums';



const TrackPage = ({ serverTrack }: any) => {
    const dispatch = useDispatch() as NextThunkDispatch;
    const [track, setTrack]: any = useState<ITrack>(serverTrack);
    const router = useRouter();
    const username = useInput('');
    const text = useInput('');
    const nameRef = useRef<HTMLSpanElement>(null);
    const artistRef = useRef<HTMLSpanElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const [isEditable, setIsEditable] = useState(false);
    const [currentField, setCurrentField] = useState<TFieldRef>(null);
    const [picture, setPicture]: any = useState<File>();
    const [globTrackPicture, setGlobTrackPicture] = useState(null);
    const [isModalOpen, setModal] = useState(false);

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

    useEffect(() => { }, []);

    const addComment = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/tracks/comment',
                {
                    username: username.value,
                    text: text.value,
                    trackId: track._id,
                }
            );
            setTrack({ ...track, comments: [...track.comments, response.data] });
        } catch (e) {
            console.log(e);
        }
    };

    const handleOnBlurTrackUpdate = async (
        fieldRef: TFieldRef,
        field: string
    ) => {
        const fieldContent = fieldRef.current.textContent;
        if (track[field] === fieldContent) {
            setIsEditable(false);
            return;
        }

        await dispatch(
            updateTrack(track._id, {
                [field]: fieldRef.current.textContent
            })
        );
        setIsEditable(false);
        setCurrentField(null);
        setTrack({ ...track, [field]: fieldRef.current.textContent.trim() });
    };

    const handleClickOnEditIcon = (fieldRef: TFieldRef) => {
        setCurrentField(fieldRef);
        setIsEditable(true);
    };

    const handlePictureUpdate = async () => {
        await dispatch(
            updateTrack(track._id, {
                picture,
            })
        );
    };

    return (
        <MainLayout
            title={`Music App | ${track.artist} - ${track.name}`}
            keywords={`music, artists, ${track.name}, ${track.artist}`}
        >
            {/* TrackHeader */}
            <Grid style={{ backgroundColor: 'lightblue' }} container xs={12}>
                <Button
                    variant={'outlined'}
                    style={{ fontSize: 12, marginRight: '1rem' }}
                    onClick={() => router.push('/tracks')}
                >
                    back to track list
                </Button>

                {track.album && (
                    <Button
                        variant={'outlined'}
                        style={{ fontSize: 12 }}
                        onClick={() => router.push(`/albums/${track.album?._id}`)}
                    >
                        go to album
                    </Button>
                )}
            </Grid>

            {/* TrackPictureBody */}
            <Grid mt={2} container>
                <Grid
                    item
                    container
                    direction='column' /*style={{ margin: "20px 0" }}*/
                    mt={2}
                    mr={2}
                    xs={3}
                >
                    {/* Picture */}
                    <FileUpload
                        setFile={setPicture}
                        setGlobImage={setGlobTrackPicture}
                        accept='image/*'
                    >
                        <div className={styles.mainCoverContainer}>
                            <div className={styles.iconContainer}>
                                <PhotoLibraryIcon className={styles.insertPhotoIcon} />
                            </div>
                            <img
                                src={
                                    globTrackPicture
                                        ? globTrackPicture
                                        : 'http://localhost:5000/' + track.picture
                                }
                                alt='track picture'
                                className={styles.trackImage}
                            />
                        </div>
                    </FileUpload>

                    {/* Picture Menu */}
                    <Button
                        variant={'outlined'}
                        style={{ fontSize: 15 }}
                        onClick={() => router.push(`http://localhost:5000/${track.audio}`)}
                    >
                        download track
                    </Button>
                    <Button
                        variant={'outlined'}
                        style={{ fontSize: 15 }}
                        onClick={() => setModal(true)}
                    >
                        change audio
                    </Button>
                </Grid>

                {/* TrackDescription */}
                <Grid item xs={7}>
                    <div style={{ margin: 30 }}>
                        <h2>
                            Name:{' '}
                            <span
                                className={`${styles.spanField}${isEditable ? ' ' + styles.isEditable : ''
                                    }`}
                                ref={nameRef}
                                onBlur={() => handleOnBlurTrackUpdate(nameRef, 'name')}
                                contentEditable={isEditable}
                            >
                                {track.name}
                            </span>{' '}
                            <EditIcon
                                onClick={() => handleClickOnEditIcon(nameRef)}
                                className={styles.editIcon}
                            />
                        </h2>

                        <h2>
                            Artist:{' '}
                            <span
                                ref={artistRef}
                                contentEditable={isEditable}
                                onBlur={() => handleOnBlurTrackUpdate(artistRef, 'artist')}
                                className={`${styles.spanField}${isEditable ? ' ' + styles.isEditable : ''
                                    }`}
                            >
                                {track.artist}
                            </span>{' '}
                            <EditIcon
                                onClick={() => handleClickOnEditIcon(artistRef)}
                                className={styles.editIcon}
                            />
                        </h2>
                        <div style={{ display: 'flex' }}>
                            <h2 style={{ width: 'fit-content' }}>Album:</h2>
                            <SelectAlbum track={track} />
                        </div>
                        <h2>Listen: {track.listens}</h2>
                    </div>
                </Grid>
            </Grid>
            <h2>
                Lyrics:{' '}
                <EditIcon
                    onClick={() => handleClickOnEditIcon(textRef)}
                    className={styles.editIcon}
                />{' '}
            </h2>
            <p>
                <pre>
                    <span
                        ref={textRef}
                        contentEditable={isEditable}
                        onBlur={() => handleOnBlurTrackUpdate(textRef, 'text')}
                        className={`${styles.spanField}${isEditable ? ' ' + styles.isEditable : ''
                            } ${styles.lyrics}`}
                    >
                        {track.text}
                    </span>
                </pre>
            </p>

            {/* Comments */}
            <h2>Comments:</h2>
            <Grid container>
                <TextField {...username} label='Your name' fullWidth />
                <TextField
                    {...text}
                    label='Your comment'
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button onClick={addComment}>Add comment</Button>
            </Grid>
            <div>
                {track.comments.map((comment: { _id: React.Key | null | undefined; username: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; text: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
                    <div key={comment._id}>
                        <div>Author: {comment.username}</div>
                        <div>Comment: {comment.text}</div>
                    </div>
                ))}
            </div>
            <ChangeAudioModal
                track={track}
                isModalOpen={isModalOpen}
                closeModal={setModal}
            />
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps = wrapper.getServerSideProps(store =>
    async ({ params }: any) => {
        const dispatch = store.dispatch as NextThunkDispatch;
        const response = await axios.get(`http://localhost:5000/tracks/${params.id}`);
        await dispatch(fetchAlbums());
        return {
            props: {
                serverTrack: response.data
            }
        };
    }
);


// export const getServerSideProps: GetServerSideProps = async ({ store, params }: any) => {
//     const dispatch = store.dispatch as NextThunkDispatch;
//     const response = await axios.get(`http://localhost:5000/tracks/${params.id}`);
//     await dispatch(fetchAlbums());
//     return {
//         props: {
//             serverTrack: response.data
//         }
//     };
// };
// export const getServerSideProps = wrapper.getServerSideProps(
//     async ({ store, params }) => {
//         const dispatch = store.dispatch as NextThunkDispatch;
//         const response = await axios.get(
//             'http://localhost:5000/tracks/' + params.id
//         );
//         await dispatch(await fetchAlbums());

//         return {
//             props: {
//                 serverTrack: response.data,
//             },
//         };
//     }
// );