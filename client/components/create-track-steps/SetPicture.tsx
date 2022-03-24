/**
 * Set picture and set audio files are different components because of possibility of
 * changing SetPicture view in future.
 * Also implementing them as a single component violates the SRP principle
 */

import React from 'react';
import FileUpload from '../FileUpload';
import styles from './styles/SetPictureStep.module.scss';
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
                className={styles['cover-image']}
                src={URL.createObjectURL(picture)}
            />}
            <Button>Upload cover</Button>
        </FileUpload>
    );
};

export default SetPicture;