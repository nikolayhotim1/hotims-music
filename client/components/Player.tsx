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
import axios from 'axios';

let audio: HTMLAudioElement;

const Player = () => {
    const { pause, volume, active, duration, currentTime, collapsed } = useTypedSelector(state => state.player);
    const { tracks } = useTypedSelector(state => state.track);
    const { pauseTrack, setDuration, playTrack, setVolume, setCurrentTime, setActiveTrack, setCollapsed } = useActions();

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
                let nextTrackIndex = tracks.indexOf(active) + 1;
                nextTrackIndex = tracks[nextTrackIndex] ? nextTrackIndex : 0;
                setActiveTrack(tracks[nextTrackIndex]);
                audio.play();
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

    return (
        <div className={s.player}>
            <Button
                className={s.collapse_btn}
                variant='contained'
                onClick={() => setCollapsed(!collapsed)}
            >
                {collapsed
                    ? <RevealIcon />
                    : <CollapseIcon />
                }
            </Button>

            <IconButton
                disabled={tracks.length === 0 || !active}
                onClick={() => pause ? playTrack() : pauseTrack()}
            >
                {pause
                    ? <PlayArrow />
                    : <Pause />
                }
            </IconButton>

            {!active && tracks.length === 0
                ? <LibraryMusicIcon className={s.track_picture} />
                : <img className={s.track_picture} src={`http://localhost:5000/${active?.picture || tracks[0]?.picture}`} alt='Cover' />
            }

            <Grid container direction='column' className={s.track_info}>
                <div>{active?.name || tracks[0]?.name || 'Track name'}</div>
                <div style={{ fontSize: 12, color: 'gray' }}>{active?.artist || tracks[0]?.artist || 'Artist'}</div>
            </Grid>
            <TrackProgress
                left={currentTime}
                right={duration}
                onChange={changeCurrentTime}
            />
            <VolumeUp style={{ marginLeft: 'auto' }} />
            <TrackProgress left={volume} right={100} onChange={changeVolume} />
        </div>
    );
};

export default Player;