import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { ITrack } from '../types/track';
import TrackItem from './TrackItem';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface TrackListProps {
    tracks: ITrack[]
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
    const { active } = useTypedSelector(state => state.player);

    return (
        <Grid container direction='column'>
            <Box p={2}>
                {tracks.map(track =>
                    <TrackItem
                        key={track._id}
                        track={track}
                        active={active?._id === track._id}
                    />
                )}
            </Box>
        </Grid>
    );
};

export default TrackList;