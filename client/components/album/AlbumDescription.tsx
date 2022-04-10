import React, { useRef } from 'react';
import styles from './styles/AlbumPage.module.scss';
import { IAlbum } from '../../types/albums';
import EditIcon from '@mui/icons-material/Edit';
import { fetchAlbums } from '../../store/action-creators/albums';
import axios from 'axios';
import { NextThunkDispatch, wrapper } from '../../store';
import { useOnBlurUpdate } from '../../hooks/useOnBlurUpdate';

interface AlbumDescriptionProps {
    thisAlbum: IAlbum,
    setThisAlbum: Function
}

export const AlbumDescription: React.FC<AlbumDescriptionProps> = ({
    thisAlbum,
    setThisAlbum,
}) => {
    const nameRef: any = useRef<HTMLSpanElement>();
    const artistRef: any = useRef<HTMLSpanElement>();
    const { isEditable, handleClickOnEditIcon, handleOnBlurAlbumUpdate } = useOnBlurUpdate(thisAlbum, setThisAlbum);

    return (
        <div style={{ margin: 30 }}>
            <h2>
                Name:{' '}
                <span
                    className={`${styles.spanField}${isEditable ? ' ' + styles.isEditable : ''}`}
                    ref={nameRef}
                    onBlur={() => handleOnBlurAlbumUpdate(nameRef, 'name')}
                    contentEditable={isEditable}
                >
                    {thisAlbum.name}
                </span>{' '}
                <EditIcon
                    onClick={() => handleClickOnEditIcon(nameRef)}
                    className={styles.editIcon}
                />
            </h2>
            <h2>
                Artist:{' '}
                <span
                    ref={artistRef}
                    contentEditable={isEditable}
                    onBlur={() => handleOnBlurAlbumUpdate(artistRef, 'author')}
                    className={`${styles.spanField}${isEditable ? ' ' + styles.isEditable : ''}`}
                >
                    {thisAlbum.author}
                </span>{' '}
                <EditIcon
                    onClick={() => handleClickOnEditIcon(artistRef)}
                    className={styles.editIcon}
                />
            </h2>
            <h2>Tracks: {thisAlbum.tracks.length}</h2>
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store =>
    async ({ params }) => {
        const dispatch = store.dispatch as NextThunkDispatch;
        await dispatch(fetchAlbums());
        const responseAlbum = await axios.get(
            'http://localhost:5000/albums/' + params?.id
        );
        return {
            props: {
                serverAlbum: responseAlbum.data,
            },
        };
    }
);