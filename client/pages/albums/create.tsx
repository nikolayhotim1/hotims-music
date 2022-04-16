import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import MainLayout from '../../layouts/MainLayout';
import { useInput } from '../../hooks/useInput';
import { useRouter } from 'next/router';
import axios from 'axios';
import AlbumIcon from '@mui/icons-material/Album';
import s from './styles/create.module.scss';
import StepWrapper from '../../components/shared/StepWrapper';
import FileUpload from '../../components/shared/FileUpload';

const create = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [picture, setPicture]: any = useState();
    const [globImage, setGlobImage] = useState();
    const name = useInput('');
    const author = useInput('');
    const router = useRouter();

    const next = () => {
        if (activeStep < 1) {
            setActiveStep(prev => prev + 1);
        } else {
            const formData = new FormData()
            formData.append('name', name.value);
            formData.append('author', author.value);
            formData.append('picture', picture);
            axios.post('http://localhost:5000/albums', formData)
                .catch(e => console.log(e))
                .finally(() => router.push('/albums'))
        }
    };

    const back = () => {
        setActiveStep(prev => prev - 1);
    };

    return (
        <MainLayout>
            <StepWrapper
                activeStep={activeStep}
                steps={['Album info', 'Upload cover']}
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
                            label={'Album'}
                        />
                        <TextField
                            {...author}
                            label={'Author'}
                        />
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
                                alt='Album cover'
                            />
                            : <AlbumIcon className={s.picture} />
                        }
                        {globImage
                            ? <Button>Change cover</Button>
                            : <Button>Upload cover</Button>
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
                <Button onClick={next}>
                    Next
                </Button>
            </Grid>
        </MainLayout>
    );
};

export default create;