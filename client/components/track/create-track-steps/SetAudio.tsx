import { Button } from '@mui/material';
import React, { useState } from 'react';
import FileUpload from '../FileUpload';
import s from './styles/SetAudioStep.module.scss';

interface SetAudioProps {
    audio: File,
    setAudio: React.Dispatch<any>,
    setGlobTrack: React.Dispatch<any>
}

const SetAudio: React.FC<SetAudioProps> = ({ audio, setAudio, setGlobTrack }) => {
    const [globTrack] = useState();

    return (
        <FileUpload
            setFile={setAudio}
            setGlobTrack={setGlobTrack}
            accept='audio/*'
        >
            {audio && <audio
                className={s.track}
                controls
                src={URL.createObjectURL(audio)}
            />}
            {/* {audio ? globTrack : audioHolder} */}
            <Button>Upload audio</Button>
        </FileUpload>
    );
};

export default SetAudio;