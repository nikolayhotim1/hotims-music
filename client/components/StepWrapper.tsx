import { Card, Container, Grid, Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';
import s from './styles/StepWrapper.module.scss';

interface StepWrapperProps {
    activeStep: number
}

const steps = ['Track info', 'Upload cover', 'Upload audio'];

const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
    return (
        <Container>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) =>
                    <Step
                        key={index}
                        completed={activeStep > index}
                    >
                        <StepLabel>{step}</StepLabel>
                    </Step>
                )}
            </Stepper>
            <Grid
                className={s.load_track}
                container
                justifyContent='center'
            >
                <Card>{children}</Card>
            </Grid>
        </Container>
    );
};

export default StepWrapper;