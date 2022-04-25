import { Button, Card, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import s from './styles/index.module.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchTracks, searchTracks } from '../../store/action-creators/track';
import { useDispatch } from 'react-redux';
import { fetchAlbums } from '../../store/action-creators/albums';
import TrackList from '../../components/track/TrackList';
import TrackItem from '../../components/track/TrackItem';
import { getSession, signIn } from 'next-auth/react';

const index = () => {
    const router = useRouter();
    const { tracks, error } = useTypedSelector(state => state.track);
    const [query, setQuery] = useState<string>('');
    const dispatch = useDispatch() as NextThunkDispatch;
    const [timer, setTimer] = useState<any>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const securePage = async () => {
            const session = await getSession();
            if (!session) {
                signIn();
            } else {
                setLoading(false);
            }
        };
        securePage();
    }, []);

    if (loading) {
        return (
            <MainLayout>
                <h1>Loading...</h1>
            </MainLayout>
        );
    } else if (error) {
        return (
            <MainLayout>
                <h1>{error}</h1>
            </MainLayout>
        );
    }

    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        if (timer) {
            clearTimeout(timer);
        }
        setTimer(setTimeout(async () => {
            await dispatch(searchTracks(e.target.value));
        }, 500));
    };

    return (
        <MainLayout title={'Hotims Music - Track List'}>
            <Grid
                container
                justifyContent='center'
            >
                <Card className={s.tracks}>
                    <Box p={3}>
                        <Grid
                            container
                            justifyContent='space-between'
                        >
                            <h1>Track List</h1>
                            <Button onClick={() => router.push('/tracks/create')}>Load Track</Button>
                        </Grid>
                    </Box>
                    <TextField
                        className={s.search}
                        label={'Search Tracks'}
                        fullWidth
                        value={query}
                        onChange={search}
                    />
                    <TrackList tracks={tracks} Component={TrackItem} />
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default index;

export const getServerSideProps = wrapper.getServerSideProps(store =>
    async () => {
        const dispatch = store.dispatch as NextThunkDispatch;
        await dispatch(fetchTracks());
        await dispatch(fetchAlbums());
        return { props: {} };
    }
);