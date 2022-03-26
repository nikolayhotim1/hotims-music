import React from 'react';
import FileUpload from '../FileUpload';
import s from './styles/SetPictureStep.module.scss';
import { Button } from '@mui/material';

interface SetPictureProps {
    picture: File,
    setPicture: React.Dispatch<any>
}

const SetPicture: React.FC<SetPictureProps> = ({ picture, setPicture }) => {
    return (
        <FileUpload
            setFile={setPicture}
            accept='image/*'
        >
            {picture && <img
                className={s.cover}
                src={URL.createObjectURL(picture)}
            />}
            <Button>Upload cover</Button>
        </FileUpload>
    );
};

export default SetPicture;