import React from 'react';
import s from './styles/AlbumItem.module.scss';
import { Card, Grid, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import { Delete } from '@mui/icons-material';
import { IAlbum } from '../../types/albums';
import { useDeleteAlbum } from '../../hooks/useDeleteAlbum';

interface AlbumItemProps {
    album: IAlbum
}

const AlbumItem: React.FC<AlbumItemProps> = ({ album }) => {
    const router = useRouter();
    const { deleteAlbum } = useDeleteAlbum(album);

    return (
        <Card
            className={s.album}
            onClick={() => router.push(`albums/${album._id}`)}
        >
            <img
                src={`http://localhost:5000/${album.picture}`}
                alt='Album cover'
            />
            <Grid
                className={s.info}
                container
                direction='column'
            >
                <div className={s.name}>{album.name}</div>
                <div className={s.author}>{album.author}</div>
                <div className={s.tracks}>Tracks: {album.tracks.length}</div>
            </Grid>
            <IconButton
                onClick={e => { deleteAlbum(e) }}
                className={s.delete}
            >
                <Delete />
            </IconButton>
        </Card>
    );
};

export default AlbumItem;