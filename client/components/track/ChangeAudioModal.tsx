import React, { useState } from 'react';
import styles from './styles/ChangeAudioModal.module.scss';
import { useDispatch } from 'react-redux';
import { ITrack } from '../../types/track';
import { NextThunkDispatch } from '../../store';
import { updateTrack } from '../../store/action-creators/track';
import FileUpload from './FileUpload';
import { Button, Grid, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';

interface ChangeAudioProps {
    isModalOpen: boolean;
    closeModal: Function;
    track: ITrack;
}

export const ChangeAudioModal: React.FC<ChangeAudioProps> = ({
    isModalOpen,
    closeModal,
    track,
}) => {
    const [audio, setAudio]: any = useState<File>();
    const [globTrack, setGlobTrack]: any = useState<string>();
    const dispatch = useDispatch() as NextThunkDispatch;

    const updateAudioHandler = async () => {
        if (audio) {
            await dispatch(
                updateTrack(track._id, {
                    audio,
                })
            );
            closeModal(false);
            setGlobTrack(null);
            setAudio(null);
        }
    };

    return (
        <div
            className={`${isModalOpen
                ? styles.modalOverlay + ' ' + styles.showModal
                : styles.modalOverlay
                }`}
        >
            <div className={styles.modalContainer}>
                <div className={styles.modalContent}>
                    <FileUpload
                        setFile={setAudio}
                        setGlobTrack={setGlobTrack}
                        accept='audio/*'
                    >
                        <div className={styles.container}>
                            <h3 className={styles.heading}>Click here to add your audio</h3>

                            <div className={styles.audioHolder}>
                                {globTrack ? (
                                    <audio controls src={globTrack}>
                                        Your browser does not support the
                                        <code>audio</code> element.
                                    </audio>
                                ) : (
                                    <SlowMotionVideoIcon style={{ fontSize: '8rem' }} />
                                )}
                            </div>
                        </div>
                    </FileUpload>
                </div>
                <Grid
                    container
                    direction='row'
                    justifyContent='center'
                    alignItems='center'
                    mb={3}
                >
                    <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        // className={classes.button}
                        style={{ marginRight: '1rem' }}
                        startIcon={<SaveIcon />}
                        onClick={updateAudioHandler}
                    >
                        Save
                    </Button>
                    <Button
                        variant='contained'
                        color='secondary'
                        size='large'
                        // style={{ marginRight: "1rem" }}
                        startIcon={<CancelIcon />}
                        onClick={() => {
                            closeModal(false);
                            setGlobTrack(null);
                            setAudio(null);
                        }}
                    >
                        Cancel
                    </Button>
                </Grid>

                <IconButton
                    color='primary'
                    aria-label='upload picture'
                    component='span'
                    className={styles.closeModalBtn}
                    onClick={() => closeModal(false)}
                >
                    <HighlightOffIcon />
                </IconButton>
            </div>
        </div>
    );
};