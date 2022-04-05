import { FC } from 'react';
import s from './styles/TrackItem.module.scss';
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
import formatTrackTime from '../../utils/formatTime';
import axios from 'axios';
import { getAudio } from '../Player';

interface TrackItemProps {
    track: ITrack,
    active?: boolean,
    itemIndex: number
}

export const ItemForAlbum: FC<TrackItemProps> = ({ track, itemIndex, active = false }) => {
    const router = useRouter();
    const dispatch = useDispatch() as NextThunkDispatch;
    const { pauseTrack, playTrack, setActiveTrack } = useActions();
    const { active: activeTrack, duration, currentTime, pause } = useTypedSelector(state => state.player);
    const { activeAlbum } = useTypedSelector(state => state.album);

    const play = (e: { stopPropagation: () => void; }) => {
        // e.stopPropagation();
        // if (activeTrack?._id === track._id) {
        //     pauseTrack();
        //     setActiveTrack(track);
        //     const audio = getAudio();
        //     audio.src = '';
        //     return;
        // }
        // setActiveTrack(track);
        // playTrack();
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
            const albumId = track?.album?._id ? track?.album?._id : activeAlbum?._id;
            if (albumId) {
                await dispatch(removeTrackFromAlbum(albumId, track._id));
            }
            await dispatch(fetchTracks());
        } catch (e: any) {
            console.log(e.message);
        }
        // e.stopPropagation();
        // try {
        //     await axios.delete(`http://localhost:5000/tracks/${track._id}`)
        //         .then(function (response) {
        //             console.log(`Track with id ${response.data} deleted`)
        //         })
        //         .then(async function () {
        //             await dispatch(fetchTracks());
        //         })
        // } catch (e: any) {
        //     console.log(e.message);
        // }
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
            <span className={s.track_index}>
                {itemIndex < 10 ? '0' + (itemIndex + 1) : itemIndex + 1}
            </span>
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
                    <div className={s.track_album}>{track.album?.name}</div>
                )}
            </Grid>
            <SelectAlbum track={track} />
            {active
                ? <div>{formatTrackTime(currentTime)} / {formatTrackTime(duration)}</div>
                : <div>{formatTrackTime(track.duration)}</div>
            }
            <IconButton
                onClick={(e: any) => deleteTrackFromAlbum(e)}
                className={s.delete_track}
            >
                <Delete />
            </IconButton>
        </Card>

        // <Card
        //     className={s.track}
        //     onClick={() => router.push(`/tracks/${track._id}`)}
        // >
        //     <IconButton onClick={play}>
        //         {activeTrack?._id === track._id ? <Pause /> : <PlayArrow />}
        //     </IconButton>
        //     <p
        //         style={{
        //             margin: '0 0.5em',
        //             color: '#6d6d6d',
        //         }}
        //     >
        //         {itemIndex < 10 ? '0' + (itemIndex + 1) : itemIndex + 1}
        //     </p>
        //     <img
        //         width={30}
        //         height={30}
        //         src={'http://localhost:5000/' + track.picture}
        //     />
        //     <Grid
        //         container
        //         direction='column'
        //         style={{ width: 200, margin: '0 20px' }}
        //     >
        //         <div>{track.name}</div>
        //         <div style={{ fontSize: 12, color: 'gray' }}> {track.artist}</div>
        //         {track.album?.name && (
        //             <div style={{ fontSize: 12, color: 'gray' }}>{track.album?.name}</div>
        //         )}
        //     </Grid>
        //     <SelectAlbum track={track} />
        //     <IconButton
        //         onClick={(e: any) => deleteTrackFromAlbum(e)}
        //         style={{ marginLeft: 'auto' }}
        //     >
        //         <Delete />
        //     </IconButton>
        // </Card>
    );
};