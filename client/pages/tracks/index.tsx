import { Button, Card, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import TrackList from '../../components/TrackList';
import MainLayout from '../../layouts/MainLayout';
import s from './styles/index.module.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchTracks, searchTracks } from '../../store/action-creators/track';
import { useDispatch } from 'react-redux';
import TrackItem from '../../components/TrackItem';
import { fetchAlbums } from '../../store/action-creators/albums';

const index = () => {
    const router = useRouter();
    const { tracks, error } = useTypedSelector(state => state.track);
    const [query, setQuery] = useState<string>('');
    const dispatch = useDispatch() as NextThunkDispatch;
    const [timer, setTimer] = useState<any>(null);

    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        if (timer) {
            clearTimeout(timer);
        }
        setTimer(setTimeout(async () => {
            await dispatch(searchTracks(e.target.value));
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

// import MainLayout from "../../shared/layouts/main-layout/MainLayout";
// import { Box, Button, Card, Grid, TextField } from '@mui/material';
// import { useRouter } from 'next/router';
// import React, { useCallback, useRef, useState } from 'react';
// import { ITrack } from '../../types/track';
// iamport { TrackList } from "../../components/Track";
// import { useTypedSelector } from '../../shared/hooks/useTypedSelector';
// import { useActions } from '../../shared/hooks/useActions';
// import { NextThunkDispatch, wrapper } from '../../store';
// import { useDispatch } from 'react-redux';
// import { useTypedSelector } from '../../hooks/useTypedSelector';
// import { useFetchTracks } from '../../components/hooks';
// import { fetchTracks, searchTracks } from '../../store/action-creators/track';
// import error from 'next/error';
// import { fetchAlbums } from '../../store/action-creators/albums';
// import MainLayout from '../../layouts/MainLayout';
// import { ItemForTrack, TrackList } from '../../components';
// import axios from 'axios';

// const Index = () => {
//     const router = useRouter();
//     const { tracks, error } = useTypedSelector(state => state.track);
//     const [fetchedTracks, setFetchedTracks] = useState<ITrack[]>(tracks || []);
//     const [query, setQuery] = useState<string>('');
//     const dispatch = useDispatch() as NextThunkDispatch;
//     const [timer, setTimer] = useState<any>(null);

//     const [trackCount, setTrackCount] = useState(10);
//     const observer = useRef(null);

//     const {
//         loading,
//         error: fetchedTrackError,
//         tracks: dynamicallyFetchedTracks,
//     } = useFetchTracks(trackCount);

    // const lastTrackElementRef = useCallback(
    //     node => {
    //         if (loading) return;
    //         if (observer.current) observer.current.disconnect();
    //         observer.current = new IntersectionObserver(entries => {
    //             if (entries[0].isIntersecting) {
    //                 setTrackCount(prevTrackCount => prevTrackCount + 10);
    //             }
    //         });
    //         if (node) observer.current.observe(node);
    //     },
    //     [loading]
    // );

//     const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         setQuery(e.target.value);
//         if (timer) {
//             clearTimeout(timer);
//         }
//         setTimer(setTimeout(async () => {
//             await dispatch(searchTracks(e.target.value));
//         }, 500));
//     };

//     if (error) {
//         return (
//             <MainLayout>
//                 <h1>{error}</h1>
//             </MainLayout>
//         );
//     }
//     return (
//         <MainLayout title={'Track List | Music App'}>
//             <Grid container justifyContent='center'>
//                 <Card style={{ width: '900px' }}>
//                     <Box style={{ padding: '1.8rem' }}>
//                         <Grid container justifyContent='space-between'>
//                             <h1>Track List</h1>
//                             <Button onClick={() => router.push('/tracks/create')}>
//                                 Load New Track
//                             </Button>
//                         </Grid>
//                     </Box>
//                     <TextField
//                         label={'Track search'}
//                         fullWidth
//                         value={query}
//                         onChange={search}
//                     />
//                     <TrackList tracks={tracks} Component={ItemForTrack} />

//                     <Grid container justifyContent='center'></Grid>
//                 </Card>
//             </Grid>
//         </MainLayout>
//     );
// };

// export default Index;

// export const getServerSideProps = wrapper.getServerSideProps(store =>
//     async () => {
//         const dispatch = store.dispatch as NextThunkDispatch;
//         await dispatch(fetchTracks());
//         await dispatch(fetchAlbums());
        // const responseAlbum = await axios.get(
        //     'http://localhost:5000/albums/' + params?.id
        // );
        // return {
        //     props: {
        //         serverAlbum: responseAlbum.data,
        //     }
        // };
//     }
// );