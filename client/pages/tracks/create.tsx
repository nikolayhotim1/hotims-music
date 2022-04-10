import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import MainLayout from '../../layouts/MainLayout';
import { useInput } from '../../hooks/useInput';
import { useRouter } from 'next/router';
import axios from 'axios';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchAlbums } from '../../store/action-creators/albums';
import SelectAlbum, { selectedAlbumForCreateTrack } from '../../components/album/SelectAlbum';
import { ITrack } from '../../types/track';
import { addTrackToAlbum, fetchTracks } from '../../store/action-creators/track';
import { useDispatch } from 'react-redux';
import StepWrapper from '../../components/track/StepWrapper';
import FileUpload from '../../components/track/FileUpload';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import s from './styles/create.module.scss';

const create = (track: ITrack) => {
    const [activeStep, setActiveStep] = useState(0);
    const [picture, setPicture]: any = useState();
    const [audio, setAudio]: any = useState();
    const [globImage, setGlobImage] = useState();
    const [globTrack, setGlobTrack] = useState();
    const [isCompleted, setIsCompleted] = useState(false);
    const name = useInput('');
    const artist = useInput('');
    const text = useInput('');
    const router = useRouter();
    const dispatch = useDispatch() as NextThunkDispatch;

    const next = async () => {
        if (activeStep < 2) {
            setActiveStep(prev => prev + 1);
        } else {
            const formData = new FormData()
            formData.append('name', name.value);
            formData.append('text', text.value);
            formData.append('artist', artist.value);
            formData.append('picture', picture);
            formData.append('audio', audio);
            if (selectedAlbumForCreateTrack) {
                formData.append('album', selectedAlbumForCreateTrack);
            }
            const response = await axios.post<ITrack>(
                'http://localhost:5000/tracks',
                formData
            ).finally(() => setIsCompleted(true));
            const createdTrack = response.data;
            if (selectedAlbumForCreateTrack) {
                await dispatch(
                    addTrackToAlbum(selectedAlbumForCreateTrack, createdTrack._id)
                );
            }
            router.push('/tracks');
        }
    };

    const back = () => {
        setActiveStep(prev => prev - 1);
    };

    return (
        <MainLayout>
            <StepWrapper
                activeStep={activeStep}
                steps={['Track info', 'Upload cover', 'Upload audio']}
            >
                {activeStep === 0 &&
                    <Grid
                        className={s.description}
                        container
                        direction='column'
                        justifyContent='center'
                    >
                        <TextField
                            {...name}
                            label={'Track'}
                        />
                        <TextField
                            {...artist}
                            label={'Artist'}
                        />
                        <TextField
                            {...text}
                            label={'Lyrics'}
                            multiline
                            rows={4}
                        />
                        <SelectAlbum track={track} />
                    </Grid>
                }
                {activeStep === 1 &&
                    <FileUpload
                        setFile={setPicture}
                        setGlobImage={setGlobImage}
                        accept='image/*'
                    >
                        {picture
                            ? <img
                                className={s.picture}
                                src={globImage}
                                alt='Track cover'
                            />
                            : <LibraryMusicIcon className={s.picture} />
                        }
                        {globImage
                            ? <Button>Change cover</Button>
                            : <Button>Upload cover</Button>
                        }
                    </FileUpload>
                }
                {activeStep === 2 &&
                    <FileUpload
                        setFile={setAudio}
                        setGlobTrack={setGlobTrack}
                        accept='audio/*'
                    >
                        {audio
                            ? <audio
                                className={s.track}
                                controls
                                src={globTrack}
                            />
                            : <h2 className={s.track} ><em>No audio</em></h2>
                        }

                        {globTrack
                            ? <Button>Change audio</Button>
                            : <Button>Upload audio</Button>
                        }
                    </FileUpload>
                }
            </StepWrapper>
            <Grid
                container
                justifyContent='space-between'
            >
                <Button
                    disabled={activeStep === 0}
                    onClick={back}
                >
                    Back
                </Button>
                <Button
                    disabled={isCompleted}
                    onClick={next}>
                    Next
                </Button>
            </Grid>
        </MainLayout>
    );
};

export default create;

export const getServerSideProps = wrapper.getServerSideProps(store =>
    async () => {
        const dispatch = store.dispatch as NextThunkDispatch;
        const response = await axios.get('http://localhost:5000/tracks');
        await dispatch(fetchAlbums());
        await dispatch(fetchTracks());
        return {
            props: {
                serverTrack: response.data
            }
        };
    }
);