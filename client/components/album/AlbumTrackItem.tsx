import { FC } from 'react';
import s from './styles/AlbumTrackItem.module.scss';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { fetchTracks, removeTrackFromAlbum } from '../../store/action-creators/track';
import { NextThunkDispatch } from '../../store';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { useActions } from '../../hooks/useActions';
import { ITrack } from '../../types/track';
import { Card, Grid, IconButton } from '@mui/material';
import formatTrackTime from '../../utils/formatTime';
import SelectAlbum from './SelectAlbum';

interface TrackItemProps {
    track: ITrack,
    active?: boolean,
    itemIndex: number
}

const AlbumTrackItem: FC<TrackItemProps> = ({ track, itemIndex, active = false }) => {
    const router = useRouter();
    const dispatch = useDispatch() as NextThunkDispatch;
    const { pauseTrack, playTrack, setActiveTrack } = useActions();
    const { duration, currentTime, pause } = useTypedSelector(state => state.player);
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

    const deleteTrackFromAlbum = async (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        try {
            const albumId = track?.album?._id ? track.album._id : activeAlbum?._id;
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
            <span className={s.index}>
                {itemIndex < 10 ? '0' + (itemIndex + 1) : itemIndex + 1}
            </span>
            <img
                src={`http://localhost:5000/${track.picture}`}
                alt='Track cover'
            />
            <Grid
                className={s.info}
                container
                direction='column'
            >
                <div className={s.name}>{track.name}</div>
                <div className={s.artist}>{track.artist}</div>
                {track.album?.name && (
                    <div className={s.album}>{track.album.name}</div>
                )}
                <div className={s.listens}>Listens: {track.listens}</div>
            </Grid>
            <SelectAlbum track={track} />
            {active
                ? <div>{formatTrackTime(currentTime)} / {formatTrackTime(duration)}</div>
                : <div>{formatTrackTime(track.duration)}</div>
            }
            <IconButton
                onClick={(e: any) => deleteTrackFromAlbum(e)}
                className={s.delete}
            >
                <Delete />
            </IconButton>
        </Card>
    );
};

export default AlbumTrackItem;