import { Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { IAlbum } from '../../types/albums';
import TrackList from '../track/TrackList';
import AlbumTrackItem from './AlbumTrackItem';

interface AlbumTrackListProps {
    thisAlbum: IAlbum
}

export const AlbumTrackList: React.FC<AlbumTrackListProps> = ({ thisAlbum }) => {
    const router = useRouter();
    return (
        <Grid
            container
            direction='column'
        >
            <Grid
                container
                justifyContent='space-between'
            >
                <h1>Album Track List</h1>
                <Button onClick={() => router.push('/tracks/create')}>Load Track</Button>
            </Grid>
            <TrackList
                tracks={thisAlbum.tracks}
                Component={AlbumTrackItem}
            />
        </Grid>
    );
};