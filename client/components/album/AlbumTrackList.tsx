import { Grid } from '@mui/material';
import React from 'react';
import { IAlbum } from '../../types/albums';
import TrackList from '../track/TrackList';
import AlbumTrackItem from './AlbumTrackItem';

interface AlbumTrackListProps {
    thisAlbum: IAlbum
}

const AlbumTrackList: React.FC<AlbumTrackListProps> = ({ thisAlbum }) => {
    return (
        <Grid
            container
            direction='column'
        >
            <TrackList
                tracks={thisAlbum.tracks}
                Component={AlbumTrackItem}
            />
        </Grid>
    );
};

export default AlbumTrackList;