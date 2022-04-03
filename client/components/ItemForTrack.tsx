import { FC } from 'react';
import styles from './styles/TrackItem.module.scss';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { ITrack } from '../types/track';
import { useActions } from '../hooks/useActions';
import { NextThunkDispatch } from '../store';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { getAudio } from './Player';
import { fetchTracks, removeTrack, removeTrackFromAlbum } from '../store/action-creators/track';
import { Card, Grid, IconButton } from '@mui/material';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { SelectAlbum } from './album/lib';

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}
export const ItemForTrack: FC<TrackItemProps> = ({ track, active = false }) => {
    const router = useRouter();
    const { pauseTrack, playTrack, setActiveTrack } = useActions();
    const dispatch = useDispatch() as NextThunkDispatch;
    const { activeAlbum } = useTypedSelector(state => state.album);
    const { active: activeTrack, pause } = useTypedSelector(
        state => state.player
    );

    const play = (e: any) => {
        e.stopPropagation();
        if (activeTrack?._id === track._id) {
            pauseTrack();
            setActiveTrack(track || null);
            const audio = getAudio();
            audio.src = '';
            return;
        }

        setActiveTrack(track);
        playTrack();
    };

    const deleteTrack = async (e: any) => {
        e.stopPropagation();
        const albumId = track?.album?._id ? track?.album?._id : activeAlbum?._id;
        if (albumId) {
            await dispatch(removeTrackFromAlbum(albumId, track._id));
        }
        await dispatch(removeTrack(track._id));
        await dispatch(fetchTracks());
        if (albumId) {
            router.push(`/albums/${albumId}`, `/albums/${albumId}`, {
                shallow: true,
            });
        }
    };

    return (
        <Card
            className={styles.track}
            onClick={() => router.push(`tracks/${track._id}`)}
        >
            <IconButton onClick={play}>
                {activeTrack?._id === track._id ? <Pause /> : <PlayArrow />}
            </IconButton>
            <img
                width={70}
                height={70}
                src={'http://localhost:5000/' + track.picture}
            />
            <Grid
                container
                direction='column'
                style={{ width: 200, margin: '0 20px' }}
            >
                <div>{track.name}</div>
                <div style={{ fontSize: 12, color: 'gray' }}> {track.artist}</div>
                {track.album?.name && (
                    <div style={{ fontSize: 12, color: 'gray' }}>{track.album?.name}</div>
                )}
            </Grid>
            {active && <div> 02: 42 / 03:32</div>}
            <SelectAlbum track={track} />
            <IconButton onClick={e => deleteTrack(e)} style={{ marginLeft: 'auto' }}>
                <Delete />
            </IconButton>
        </Card>
    );
};