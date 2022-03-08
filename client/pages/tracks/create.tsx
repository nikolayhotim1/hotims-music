import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import s from './styles/create.module.scss';
import MainLayout from '../../layouts/MainLayout';
import StepWrapper from '../../components/StepWrapper';
import FileUpload from '../../components/FileUpload';

const create = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [pictture, setPicture] = useState(null);
    const [audio, setAudio] = useState(null);

    const next = () => {
        if (activeStep < 2) {
            setActiveStep(prev => prev + 1);
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
                            label='Track name'
                        />
                        <TextField
                            label='Artist'
                        />
                        <TextField
                            label='Text'
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