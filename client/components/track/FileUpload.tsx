import React, { useRef } from 'react';
import s from './styles/FileUpload.module.scss';

interface FileUploadProps {
    setFile: Function,
    setGlobImage?: Function,
    setGlobTrack?: Function,
    accept: string
}

const FileUpload: React.FC<FileUploadProps> = ({ setFile, setGlobImage, setGlobTrack, accept, children }) => {
    const ref: any = useRef<HTMLInputElement>();

    const onChange = (e: any) => {
        setFile(e.target.files[0]);
        const readyStates = {
            EMPTY: 0,
            LOADING: 1,
            DONE: 2
        };
        const setGlobFile: any = setGlobImage || setGlobTrack;
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === readyStates.DONE) {
                setGlobFile(reader.result);
            }
        };
        try {
            reader.readAsDataURL(e.target.files[0]);
        } catch (e) {
            console.log('Please, choose a file');
        }
    };

    return (
        <div
            className={s.upload}
            onClick={() => ref.current.click()}
        >
            <input
                type='file'
                accept={accept}
                ref={ref}
                onChange={onChange}
            />
            {children}
        </div>
    );
};

export default FileUpload;