import { Grid, TextField } from '@mui/material';
import React from 'react'
import { UseInputReturnType } from '../../hooks/useInput'
import s from './styles/GeneralInfo.module.scss';

interface GeneralInfoProps {
    name: UseInputReturnType,
    artist: UseInputReturnType,
    text: UseInputReturnType
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({ name, artist, text }) => {
    return (
        <Grid
            className={s.track_description}
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
        </Grid>
    );
};

export default GeneralInfo;