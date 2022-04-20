import React, { useEffect } from 'react';
import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { Button, Grid, IconButton } from '@mui/material';
import s from './styles/Player.module.scss';
import TrackProgress from './TrackProgress';
import RevealIcon from '@mui/icons-material/ArrowDropUp';
import CollapseIcon from '@mui/icons-material/ArrowDropDown';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import TrackVolume from './TrackVolume';
import clsx from 'clsx';
import StopIcon from '@mui/icons-material/Stop';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { NextThunkDispatch } from '../../store';
import { listenTrack } from '../../store/action-creators/track';

let audio: HTMLAudioElement;

const Player = () => {
    const { pause, duration, volume, active, currentTime, collapsed } = useTypedSelector(state => state.player);
    const { tracks } = useTypedSelector(state => state.track);
    const { activeAlbum, albums } = useTypedSelector(state => state.album);
    const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack, setActiveAlbum, setCollapsed } = useActions();
    const dispatch = useDispatch() as NextThunkDispatch;

    useEffect(() => {
        if (!active && tracks?.length) {
            setActiveTrack(tracks[0]);
        } else if (!active && albums?.length) {
            setActiveAlbum(albums[0]);
            if (activeAlbum?.tracks?.length) {
                setActiveTrack(activeAlbum.tracks[0]);
            }
        }
    }, []);

    useEffect(() => {
        if (!audio) {
            audio = new Audio();
        } else {
            setAudio();
        }
    }, [active]);

    useEffect(() => {
        if (pause) {
            audio.pause();
        } else {
            audio.play();
        }
    }, [active, pause]);

    const nextAudio = () => {
        if (active) {
            if (tracks.length) {
                let nextTrackIndex = tracks.indexOf(active) + 1;
                nextTrackIndex = tracks[nextTrackIndex] ? nextTrackIndex : 0;
                setActiveTrack(tracks[nextTrackIndex]);
            } else if (activeAlbum.tracks.length) {
                let nextTrackIndex = activeAlbum.tracks.indexOf(active) + 1;
                nextTrackIndex = activeAlbum.tracks[nextTrackIndex] ? nextTrackIndex : 0;
                setActiveTrack(activeAlbum.tracks[nextTrackIndex]);
            }
        }
    };

    const prevAudio = () => {
        if (active) {
            if (tracks.length) {
                let nextTrackIndex = tracks.indexOf(active) - 1;
                nextTrackIndex = tracks[nextTrackIndex] ? nextTrackIndex : tracks.length - 1;
                setActiveTrack(tracks[nextTrackIndex]);
            } else if (activeAlbum.tracks.length) {
                let nextTrackIndex = activeAlbum.tracks.indexOf(active) - 1;
                nextTrackIndex = activeAlbum.tracks[nextTrackIndex] ? nextTrackIndex : activeAlbum.tracks.length - 1;
                setActiveTrack(activeAlbum.tracks[nextTrackIndex]);
            }
        }
    };

    const setAudio = () => {
        if (active) {
            audio.pause();
            audio.src = `http://localhost:5000/${active.audio}`;
            audio.volume = volume / 100;
            audio.onloadedmetadata = () => {
                setDuration((audio.duration));
            };
            audio.currentTime = currentTime;
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime));
            };
            audio.onended = async () => {
                try {
                    await dispatch(listenTrack(active._id));
                } catch (e: any) {
                    console.log(e.message);
                }
                if ((tracks?.length === 1) || (activeAlbum?.tracks?.length === 1)) {
                    pauseTrack();
                    playTrack();
                }
                nextAudio();
            };
        }
    };

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100;
        setVolume(Number(e.target.value));
    };

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value);
        setCurrentTime(Number(e.target.value));
    };

    const clearCurrentTime = () => {
        pauseTrack();
        audio.currentTime = 0;
        if (!pause) {
            playTrack();
        }
    };

    return (
        <div className={clsx({ [s.player]: true, [s.player_collapsed]: !collapsed })}>
            <Button
                className={s.collapse}
                variant='contained'
                onClick={() => setCollapsed(!collapsed)}
            >
                {collapsed
                    ? <CollapseIcon />
                    : <RevealIcon />
                }
            </Button>
            <IconButton
                disabled={!active && (tracks?.length === 0 || activeAlbum?.tracks?.length === 0)}
                onClick={() => {
                    if (active) {
                        if (tracks?.length === 1 || activeAlbum?.tracks?.length === 1) {
                            clearCurrentTime();
                        }
                        prevAudio();
                    }
                }}
            >
                <SkipPreviousIcon />
            </IconButton>
            <IconButton
                disabled={!active && (tracks?.length === 0 || activeAlbum?.tracks?.length === 0)}
                onClick={() => {
                    if (active) {
                        pauseTrack();
                        audio.currentTime = 0;
                    }
                }}
            >
                <StopIcon />
            </IconButton>
            <IconButton
                disabled={!active && (tracks?.length === 0 || activeAlbum?.tracks?.length === 0)}
                onClick={() => {
                    pause ? playTrack() : pauseTrack()
                }}
            >
                {pause
                    ? <PlayArrow />
                    : <Pause />
                }
            </IconButton>
            <IconButton
                disabled={!active && (tracks?.length === 0 || activeAlbum?.tracks?.length === 0)}
                onClick={() => {
                    if (active) {
                        if (tracks?.length === 1 || activeAlbum?.tracks?.length === 1) {
                            clearCurrentTime();
                        }
                        nextAudio();
                    }
                }}
            >
                <SkipNextIcon />
            </IconButton>
            {!active && (tracks?.length === 0 || activeAlbum?.tracks?.length === 0)
                ? <LibraryMusicIcon className={s.picture} />
                : <img
                    className={s.picture}
                    src={`http://localhost:5000/${active?.picture}`}
                    alt='Track Cover'
                />
            }
            <Grid
                className={s.info}
                container
                direction='column'
            >
                <div className={s.name}>{active?.name || 'Track'}</div>
                <div className={s.artist}>{active?.artist || activeAlbum?.author || 'Artist'}</div>
                <div className={s.album}>{active?.album?.name || activeAlbum?.name || 'Album'}</div>
            </Grid>
            <TrackProgress
                left={currentTime}
                right={duration}
                onChange={changeCurrentTime}
            />
            <VolumeUp className={s.volume} />
            <TrackVolume
                left={volume}
                right={100}
                onChange={changeVolume}
            />
        </div>
    );
};

export default Player;