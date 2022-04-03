import { FC } from 'react';
import styles from './styles/TrackItem.module.scss';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { fetchTracks, removeTrackFromAlbum } from '../../store/action-creators/track';
import { SelectAlbum } from './lib/SelectAlbum';
import { NextThunkDispatch } from '../../store';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { useActions } from '../../hooks/useActions';
import { ITrack } from '../../types/track';
import { Card, Grid, IconButton } from '@mui/material';
import { getAudio } from '../Player';

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
    itemIndex: number;
}

export const ItemForAlbum: FC<TrackItemProps> = ({
    track,
    itemIndex,
}) => {
    const router = useRouter();
    const { pauseTrack, playTrack, setActiveTrack } = useActions();
    const dispatch = useDispatch() as NextThunkDispatch;
    const { activeAlbum } = useTypedSelector(state => state.album);
    const { active: activeTrack } = useTypedSelector(state => state.player);

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

    const deleteTrackFromAlbum = async (e: any) => {
        e.stopPropagation();
        try {
            const albumId = track?.album?._id ? track?.album?._id : activeAlbum?._id;
            if (albumId) {
                await dispatch(removeTrackFromAlbum(albumId, track._id));
            }
            await dispatch(fetchTracks());
        } catch (e: any) {
            console.log(e.message);
        }
    };

    return (
        <Card
            className={styles.track}
            onClick={() => router.push(`/tracks/${track._id}`)}
        >
            <IconButton onClick={play}>
                {activeTrack?._id === track._id ? <Pause /> : <PlayArrow />}
            </IconButton>
            <p
                style={{
                    margin: '0 0.5em',
                    color: '#6d6d6d',
                }}
            >
                {itemIndex < 10 ? '0' + (itemIndex + 1) : itemIndex + 1}
            </p>
            <img
                width={30}
                height={30}
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
            <SelectAlbum track={track} />
            <IconButton
                onClick={(e: any) => deleteTrackFromAlbum(e)}
                style={{ marginLeft: 'auto' }}
            >
                <Delete />
            </IconButton>
        </Card>
    );
};