import React, { useEffect } from 'react';
import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { Button, Grid, IconButton } from '@mui/material';
import s from './styles/Player.module.scss';
import TrackProgress from './TrackProgress';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import RevealIcon from '@mui/icons-material/ArrowDropUp';
import CollapseIcon from '@mui/icons-material/ArrowDropDown';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import axios from 'axios';
import TrackVolume from './TrackVolume';
import clsx from 'clsx';
import StopIcon from '@mui/icons-material/Stop';

let audio: HTMLAudioElement;

const Player = () => {
    const { pause, volume, active, duration, currentTime, collapsed } = useTypedSelector(state => state.player);
    const { tracks } = useTypedSelector(state => state.track);
    const { pauseTrack, setDuration, playTrack, setVolume, setCurrentTime, setActiveTrack, setCollapsed } = useActions();

    useEffect(() => {
        if (!active && tracks.length) {
            setActiveTrack(tracks[0]);
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
            let nextTrackIndex = tracks.indexOf(active) + 1;
            nextTrackIndex = tracks[nextTrackIndex] ? nextTrackIndex : 0;
            setActiveTrack(tracks[nextTrackIndex]);
        }
    };

    const prevAudio = () => {
        if (active) {
            let nextTrackIndex = tracks.indexOf(active) - 1;
            nextTrackIndex = tracks[nextTrackIndex] ? nextTrackIndex : tracks.length - 1;
            setActiveTrack(tracks[nextTrackIndex]);
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
                setCurrentTime((audio.currentTime));
            };
            audio.onended = async () => {
                try {
                    await axios.post(`http://localhost:5000/tracks/listen/${active._id}`)
                        .then(function () {
                            console.log(`Track with id ${active._id} has been listened`);
                        })
                } catch (e) {
                    console.log(e);
                }
                if (tracks.length === 1) {
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
                className={s.collapse_btn}
                variant='contained'
                onClick={() => setCollapsed(!collapsed)}
            >
                {collapsed
                    ? <CollapseIcon />
                    : <RevealIcon />
                }
            </Button>
            <IconButton
                disabled={tracks.length === 0}
                onClick={() => {
                    if (active) {
                        if (tracks.length === 1) {
                            clearCurrentTime();
                        }
                        prevAudio();
                    }
                }}
            >
                <SkipPreviousIcon />
            </IconButton>
            <IconButton
                disabled={tracks.length === 0}
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
                disabled={tracks.length === 0}
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
                disabled={tracks.length === 0}
                onClick={() => {
                    if (active) {
                        if (tracks.length === 1) {
                            clearCurrentTime();
                        }
                        nextAudio();
                    }
                }}
            >
                <SkipNextIcon />
            </IconButton>
            {!active && tracks.length === 0
                ? <LibraryMusicIcon className={s.track_picture} />
                : <img
                    className={s.track_picture}
                    src={`http://localhost:5000/${active?.picture}`}
                    alt='Cover'
                />
            }
            <Grid
                className={s.track_info}
                container
                direction='column'
            >
                <div className={s.track_name}>{active?.name || 'Track'}</div>
                <div className={s.track_artist}>{active?.artist || 'Artist'}</div>
            </Grid>
            <TrackProgress
                left={currentTime}
                right={duration}
                onChange={changeCurrentTime}
            />
            <VolumeUp className={s.volume_up} />
            <TrackVolume
                left={volume}
                right={100}
                onChange={changeVolume}
            />
        </div>
    );
};

export default Player;