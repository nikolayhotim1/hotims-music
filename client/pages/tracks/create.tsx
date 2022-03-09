import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import s from './styles/create.module.scss';
import MainLayout from '../../layouts/MainLayout';
import StepWrapper from '../../components/StepWrapper';
import FileUpload from '../../components/FileUpload';
import { useInput } from '../../hooks/useInput';
import { useRouter } from 'next/router';
import axios from 'axios';

const create = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [picture, setPicture]: any = useState(null);
    const [audio, setAudio]: any = useState(null);
    const name = useInput('');
    const artist = useInput('');
    const text = useInput('');
    const router = useRouter();

    const next = () => {
        if (activeStep < 2) {
            setActiveStep(prev => prev + 1);
        } else {
            const formData = new FormData()
            formData.append('name', name.value);
            formData.append('text', text.value);
            formData.append('artist', artist.value);
            formData.append('picture', picture);
            formData.append('audio', audio);
            axios.post('http://localhost:5000/tracks', formData)
                .then(resp => router.push('/tracks'))
                .catch(e => console.log(e));
        }
    };

    const back = () => {
        setActiveStep(prev => prev - 1);
    };

    return (
        <MainLayout>
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
                    <Grid
                        className={s.track_description}
                        container
                        direction='column'
                        justifyContent='center'
                    >
                        <TextField
                            {...name}
                            label='Track name'
                        />
                        <TextField
                            {...artist}
                            label='Artist'
                        />
                        <TextField
                            {...text}
                            label='Lyrics'
                            multiline
                            rows={3}
                        />
                    </Grid>
                }
                {activeStep === 1 &&
                    <FileUpload
                        setFile={setPicture}
                        accept='image/*'
                    >
                        <Button>Upload cover</Button>
                    </FileUpload>
                }
                {activeStep === 2 &&
                    <FileUpload
                        setFile={setAudio}
                        accept='audio/*'
                    >
                        <Button>Upload audio</Button>
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
                <Button onClick={next}>
                    Next
                </Button>
            </Grid>
        </MainLayout>
    );
};

export default create;