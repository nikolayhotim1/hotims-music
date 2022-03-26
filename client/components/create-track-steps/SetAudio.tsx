import { Button } from '@mui/material';
import React from 'react';
import FileUpload from '../FileUpload';
import s from './styles/SetAudioStep.module.scss';

interface SetAudioProps {
    audio: File,
    setAudio: React.Dispatch<any>
}

const SetAudio: React.FC<SetAudioProps> = ({ audio, setAudio }) => {
    return (
        <FileUpload
            setFile={setAudio}
            accept='audio/*'
        >
            {audio && <audio
                className={s.track}
                controls
                src={URL.createObjectURL(audio)}
            />}
            <Button>Upload audio</Button>
        </FileUpload>
    );
};

export default SetAudio;