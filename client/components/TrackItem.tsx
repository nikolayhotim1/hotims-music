import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { Card, Grid, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ITrack } from '../types/track';
import s from './styles/TrackItem.module.scss';
import formatTrackTime from '../utils/formatTime';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchTracks } from '../store/action-creators/track';
import { NextThunkDispatch } from '../store';
import { SelectAlbum } from './album/lib';

interface TrackItemProps {
    track: ITrack,
    active?: boolean
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
    const router = useRouter();
    const dispatch = useDispatch() as NextThunkDispatch;
    const { playTrack, pauseTrack, setActiveTrack } = useActions();
    const { active: activeTrack, duration, currentTime, pause } = useTypedSelector(state => state.player);
    const { activeAlbum } = useTypedSelector(state => state.album);

    const play = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        if (!active) {
            setActiveTrack(track);
            playTrack();
        } else {
            pause ? playTrack() : pauseTrack();
        }
    };

    const deleteTrack = async (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        try {
            await axios.delete(`http://localhost:5000/tracks/${track._id}`)
                .then(function (response) {
                    console.log(`Track with id ${response.data} deleted`)
                })
                .then(async function () {
                    await dispatch(fetchTracks());
                })
        } catch (e: any) {
            console.log(e.message);
        }
    };

    return (
        <Card
            className={s.track}
            onClick={() => router.push(`/tracks/${track._id}`)}
        >
            <IconButton onClick={play}>
                {active && (pause
                    ? <PlayArrow />
                    : <Pause />)
                    ||
                    <PlayArrow />
                }
            </IconButton>
            <img
                src={`http://localhost:5000/${track.picture}`}
                alt='Track cover'
            />
            <Grid
                className={s.track_info}
                container
                direction='column'
            >
                <div className={s.track_name}>{track.name}</div>
                <div className={s.track_artist}>{track.artist}</div>
                {track.album?.name && (
                    <div className={s.track_album}>{track.album.name}</div>
                )}
                <div className={s.track_listens}>Listens: {track.listens}</div>
            </Grid>
            <SelectAlbum track={track} />
            {active
                ? <div>{formatTrackTime(currentTime)} / {formatTrackTime(duration)}</div>
                : <div>{formatTrackTime(track.duration)}</div>
            }
            <IconButton
                onClick={deleteTrack}
                className={s.delete_track}
            >
                <Delete />
            </IconButton>
        </Card>
    );
};

export default TrackItem;