import React, { useState } from 'react';
import FileUpload from '../FileUpload';
import s from './styles/SetPictureStep.module.scss';
import { Button } from '@mui/material';
import imageHolder from '../../assets/imageHolder.png';

interface SetPictureProps {
    picture: File,
    setPicture: React.Dispatch<any>,
    setGlobImage: React.Dispatch<any>
}

const SetPicture: React.FC<SetPictureProps> = ({ picture, setPicture, setGlobImage }) => {
    // const [globImage] = useState();

    return (
        <FileUpload
            setFile={setPicture}
            setGlobImage={setGlobImage}
            accept='image/*'
        >
            {picture && <img
                className={s.cover}
                src={URL.createObjectURL(picture)}
                alt='Track cover'
            />}
            {/* {picture ? globImage : imageHolder} */}
            <Button>Upload cover</Button>
        </FileUpload>
    );
};

export default SetPicture;