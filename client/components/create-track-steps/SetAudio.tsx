/**
 * See SetPicture component
 */
import { Button } from '@mui/material';
import React from 'react';
import FileUpload from '../FileUpload';

interface SetAudioProps {
    setAudio: React.Dispatch<any>
}

const SetAudio: React.FC<SetAudioProps> = ({ setAudio }) => {
    return (
        <FileUpload
            setFile={setAudio}
            accept='audio/*'
        >
            <Button>Upload audio</Button>
        </FileUpload>
    );
};

export default SetAudio;