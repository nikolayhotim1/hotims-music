import React from 'react';
import s from './styles/AlbumItem.module.scss';
import { Card, Grid, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import { IAlbum } from '../../../types/albums';
import { Delete } from '@mui/icons-material';
import { ScreenMessage } from '../../screen-message';
import { useDeleteAlbum } from '../../../hooks/useDeleteAlbum';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

interface AlbumItemProps {
    album: IAlbum;
}

export const AlbumItem: React.FC<AlbumItemProps> = ({ album }) => {
    const router = useRouter();
    const { deleteAlbum } = useDeleteAlbum(album);
    const { activeAlbum, removeResponse } = useTypedSelector(state => state.album);

    return (
        <Card
            className={s.album}
            onClick={() => router.push(`albums/${album._id}`)}
        >
            {removeResponse?.error && activeAlbum?._id === album._id && (
                <ScreenMessage type='ERROR' message={removeResponse.error} />
            )}
            <img
                src={`http://localhost:5000/${album.picture}`}
                alt='Album cover'
            />
            <Grid
                className={s.album_info}
                container
                direction='column'
            >
                <div className={s.album_name}>{album.name}</div>
                <div className={s.album_author}>{album.author}</div>
                <div className={s.album_tracks}>Tracks: {album.tracks.length}</div>
            </Grid>
            <IconButton
                onClick={e => { deleteAlbum(e) }}
                className={s.delete_album}
            >
                <Delete />
            </IconButton>
        </Card>
    );
};