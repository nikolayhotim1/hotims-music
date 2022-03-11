import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useInput } from '../../hooks/useInput';
import MainLayout from '../../layouts/MainLayout';
import { IComment, ITrack } from '../../types/track';
import s from './styles/[id].module.scss';

const TrackPage = ({ serverTrack }: any) => {
    const [track, setTrack] = useState<ITrack>(serverTrack);
    const router = useRouter();
    const username = useInput('');
    const text = useInput('');

    const addComment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/tracks/comment', {
                username: username.value,
                text: text.value,
                trackId: track._id
            });
            setTrack({ ...track, comments: [...track.comments, response.data] });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <MainLayout
            title={`Hotims Music - ${track.name}, ${track.artist}`}
            keywords={`Music, tracks, artists, ${track.name}, ${track.artist}`}
        >
            <Button
                className={s.back}
                variant={'outlined'}
                onClick={() => router.push('/tracks')}
            >
                To the list
            </Button>
            <Grid container className={s.track_description}>
                <img src={`http://localhost:5000/${track.picture}`} alt='Track cover' />
                <div>
                    <h1>{track.name}</h1>
                    <h2>{track.artist}</h2>
                    <h3>Listens: {track.listens}</h3>
                </div>
            </Grid>
            <h2>Lyrics</h2>
            <p>{track.text}</p>
            <h2>Comments</h2>
            <Grid container className={s.add_comment}>
                <TextField
                    {...username}
                    label='Your name'
                    fullWidth
                />
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

export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
    const response = await axios.get(`http://localhost:5000/tracks/${params.id}`);
    return {
        props: {
            serverTrack: response.data
        }
    };
};