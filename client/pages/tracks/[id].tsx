import { Button, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { ITrack } from '../../types/track';
import s from './styles/[id].module.scss';

const TrackPage = () => {
    const track: ITrack = { _id: '620ab695775cd2d8e25b899b', name: 'We are the champions', artist: 'Queen', text: 'We are the champions', listens: 0, audio: 'http://localhost:5000/audio/6d00600f-f3d4-4e7b-86a2-b4887e1695d9.mp3', picture: 'http://localhost:5000/image/df87bdf0-c845-4465-ac18-c0330a70fab4.jpg', comments: [] };
    const router = useRouter();

    return (
        <MainLayout>
            <Button
                className={s.back}
                variant={'outlined'}
                onClick={() => router.push('/tracks')}
            >
                To the list
            </Button>
            <Grid container className={s.track_description}>
                <img src={track.picture} alt='Track cover' />
                <div>
                    <h1>{track.name}</h1>
                    <h2>{track.artist}</h2>
                    <h3>Listens: {track.listens}</h3>
                </div>
            </Grid>
            <h2>Lyrics</h2>
            <p>{track.text}</p>
            <h2>Comments</h2>
            <Grid container>
                <TextField
                    label='Your name'
                    fullWidth
                />
                <TextField
                    label='Comment'
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button>Send</Button>
            </Grid>
            <div>
                {track.comments.map(comment =>
                    <div>
                        <h4>{comment.username}</h4>
                        <p>{comment.text}</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default TrackPage;