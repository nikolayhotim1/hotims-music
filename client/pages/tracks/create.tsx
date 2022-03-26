import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import MainLayout from '../../layouts/MainLayout';
import StepWrapper from '../../components/StepWrapper';
import { useInput } from '../../hooks/useInput';
import { useRouter } from 'next/router';
import axios from 'axios';
import { GeneralInfo, SetAudio, SetPicture } from '../../components/create-track-steps';

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
                .catch(e => console.log(e))
                .finally(() => router.push('/tracks'))
        }
    };

    const back = () => {
        setActiveStep(prev => prev - 1);
    };

    return (
        <MainLayout>
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
                    <GeneralInfo
                        name={name}
                        artist={artist}
                        text={text}
                    />
                }
                {activeStep === 1 &&
                    <SetPicture
                        picture={picture}
                        setPicture={setPicture}
                    />
                }
                {activeStep === 2 &&
                    <SetAudio
                        audio={audio}
                        setAudio={setAudio}
                    />
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