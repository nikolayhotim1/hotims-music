import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { Card, Grid, IconButton } from '@mui/material';
import React from 'react';
import { ITrack } from '../types/track';
import s from './styles/TrackItem.module.scss';

interface TrackItemProps {
    track: ITrack,
    active?: boolean
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
    return (
        <Card className={s.track}>
            <IconButton>
                {!active
                    ? <PlayArrow />
                    : <Pause />
                }
            </IconButton>
            <img src={track.picture} alt='Track cover' />
            <Grid className={s.track_info} container direction='column' >
                <div className={s.track_name}>{track.name}</div>
                <div className={s.track_artist}>{track.artist}</div>
            </Grid>
            {active && <div>00:00 / 03:30</div>}
            <IconButton className={s.delete_track}>
                <Delete />
            </IconButton>
        </Card>
    );
};

export default TrackItem;