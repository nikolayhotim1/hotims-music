import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { Card, Grid, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useActions } from '../hooks/useActions';
import { ITrack } from '../types/track';
import s from './styles/TrackItem.module.scss';

interface TrackItemProps {
    track: ITrack,
    active?: boolean
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
    const router = useRouter();
    const { playTrack, setActiveTrack } = useActions();

    const play = (e: any) => {
        e.stopPropagation();
        setActiveTrack(track);
        playTrack();
    };

    return (
        <Card className={s.track} onClick={() => router.push(`/tracks/${track._id}`)} >
            <IconButton onClick={play}>
                {!active
                    ? <PlayArrow />
                    : <Pause />
                }
            </IconButton>
            <img src={`http://localhost:5000/${track.picture}`} alt='Track cover' />
            <Grid className={s.track_info} container direction='column' >
                <div className={s.track_name}>{track.name}</div>
                <div className={s.track_artist}>{track.artist}</div>
            </Grid>
            {active && <div>00:00 / 03:30</div>}
            <IconButton onClick={e => e.stopPropagation()} className={s.delete_track}>
                <Delete />
            </IconButton>
        </Card>
    );
};

export default TrackItem;