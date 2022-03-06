import { Button, Card, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React from 'react';
import TrackList from '../../components/TrackList';
import MainLayout from '../../layouts/MainLayout';
import { ITrack } from '../../types/track';
import s from './styles/index.module.scss';

const index = () => {
    const router = useRouter();
    const tracks: ITrack[] = [
        { _id: '620ab695775cd2d8e25b899b', name: 'We are the champions', artist: 'Queen', text: 'We are the champions', listens: 0, audio: 'http://localhost:5000/audio/6d00600f-f3d4-4e7b-86a2-b4887e1695d9.mp3', picture: 'http://localhost:5000/image/df87bdf0-c845-4465-ac18-c0330a70fab4.jpg', comments: [] },
        { _id: '620ac085775cd2d8e25b899f', name: 'Let It Be', artist: 'Beatles', text: 'Let It Be', listens: 0, audio: 'http://localhost:5000/audio/c052071d-86f0-42b7-9254-3cffaf77a0fc.mp3', picture: 'http://localhost:5000/image/3fd34ff7-ebb6-4031-b700-d4da3a919321.jfif', comments: [] },
        { _id: '622491e3075dea0ca657f722', name: 'Stairway To Heaven', artist: 'Led Zeppelin', text: 'Stairway To Heaven', listens: 0, audio: 'http://localhost:5000/audio/4aecc87f-d270-4185-acb4-70429f592859.mp3', picture: 'http://localhost:5000/image/b0f586a2-e244-4d7b-adb3-19bcfde388d0.jpg', comments: [] }
    ];

    return (
        <MainLayout>
            <Grid container justifyContent='center'>
                <Card className={s.tracks}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>Track List</h1>
                            <Button onClick={() => router.push('/tracks/create')}>Load</Button>
                        </Grid>
                    </Box>
                    <TrackList tracks={tracks} />
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default index;