import { Grid, TextField } from '@mui/material';
import React from 'react'
import { UseInputReturnType } from '../../hooks/useInput'
import s from './styles/GeneralInfo.module.scss';

interface GeneralInfoProps {
    name: UseInputReturnType,
    author: UseInputReturnType
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({ name, author }) => {
    return (
        <Grid
            className={s.album_description}
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
    );
};

export default GeneralInfo;