import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { ITrack } from '../types/track';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { NextThunkDispatch, wrapper } from '../store';
import { fetchAlbums } from '../store/action-creators/albums';
import axios from 'axios';

interface TrackListProps {
    tracks: ITrack[],
    Component: React.FC<any>
}

export const TrackList: React.FC<TrackListProps> = ({ tracks, Component }) => {
    const { active } = useTypedSelector(state => state.player);

    const catchAlbums = () => {
        wrapper.getServerSideProps(store =>
            async ({ params }) => {
                const dispatch = store.dispatch as NextThunkDispatch;
                await dispatch(fetchAlbums());
                const responseAlbum = await axios.get(
                    `http://localhost:5000/albums/${params?.id}`
                );
                return {
                    props: {
                        serverAlbum: responseAlbum.data
                    }
                };
            }
        );
    };

    useEffect(() => {
        catchAlbums();
    }, []);

    return (
        <Grid
            container
            direction='column'
        >
            <Box p={2}>
                {tracks.map((track, index) =>
                    <Component
                        key={track._id}
                        track={track}
                        active={active?._id === track._id}
                        itemIndex={index}
                    />
                )}
            </Box>
        </Grid>
    );
};

export default TrackList;