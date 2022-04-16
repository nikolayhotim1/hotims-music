import { Box, Button, Card, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NextThunkDispatch, wrapper } from '../../store';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import MainLayout from '../../layouts/MainLayout';
import { fetchAlbums, searchAlbums } from '../../store/action-creators/albums';
import s from './styles/index.module.scss';
import { fetchTracks } from '../../store/action-creators/track';
import AlbumList from '../../components/album/AlbumList';

const index = () => {
    const router = useRouter();
    const { albums, error } = useTypedSelector(state => state.album);
    const [query, setQuery] = useState<string>('');
    const dispatch = useDispatch() as NextThunkDispatch;
    const [timer, setTimer] = useState<any>();

    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        if (timer) {
            clearTimeout(timer);
        }
        setTimer(setTimeout(async () => {
            await dispatch(searchAlbums(e.target.value));
        }, 500));
    };

    if (error) {
        return (
            <MainLayout>
                <h1>{error}</h1>
            </MainLayout>
        );
    }

    return (
        <MainLayout title={'Hotims Music - Album List'}>
            <Grid
                container
                justifyContent='center'
            >
                <Card className={s.albums}>
                    <Box p={3}>
                        <Grid
                            container
                            justifyContent='space-between'
                        >
                            <h1>Album List</h1>
                            <Button onClick={() => router.push('/albums/create')}>Create Album</Button>
                        </Grid>
                    </Box>
                    <TextField
                        className={s.search}
                        label={'Search Albums'}
                        fullWidth
                        value={query}
                        onChange={search}
                    />
                    <AlbumList albums={albums} />
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default index;

export const getServerSideProps = wrapper.getServerSideProps(store =>
    async () => {
        const dispatch = store.dispatch as NextThunkDispatch;
        await dispatch(fetchAlbums());
        await dispatch(fetchTracks());
        return { props: {} };
    }
);