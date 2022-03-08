import React from 'react';
import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import s from './styles/Player.module.scss';
import { ITrack } from '../types/track';
import TrackProgress from './TrackProgress';

const Player = () => {
    const track: ITrack = { _id: '620ab695775cd2d8e25b899b', name: 'We are the champions', artist: 'Queen', text: 'We are the champions', listens: 0, audio: 'http://localhost:5000/audio/6d00600f-f3d4-4e7b-86a2-b4887e1695d9.mp3', picture: 'http://localhost:5000/image/df87bdf0-c845-4465-ac18-c0330a70fab4.jpg', comments: [] };
    const active = false;

    return (
        <div className={s.player}>
            <IconButton onClick={e => e.stopPropagation()}>
                {!active
                    ? <PlayArrow />
                    : <Pause />
                }
            </IconButton>
            <Grid
                className={s.track_info}
                container
                direction='column'
            >
                <div className={s.track_name}>{track.name}</div>
                <div className={s.track_artist}>{track.artist}</div>
            </Grid>
            <TrackProgress left={0} right={100} onChange={() => { }} />
            <VolumeUp className={s.volume_up} />
            <TrackProgress left={0} right={100} onChange={() => { }} />
        </div>
    );
};

export default Player;