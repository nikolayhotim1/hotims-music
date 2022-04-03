import React from 'react';
import styles from './AlbumItem.module.scss';
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
    const { activeAlbum, removeResponse } = useTypedSelector(
        state => state.album
    );

    return (
        <Card
            className={styles.album}
            onClick={() => router.push(`albums/${album._id}`)}
        >
            {removeResponse?.error && activeAlbum?._id === album._id && (
                <ScreenMessage type='ERROR' message={removeResponse.error} />
            )}
            <img
                width={150}
                height={150}
                src={'http://localhost:5000/' + album.picture}
            />
            <Grid
                container
                direction='column'
                style={{ width: 200, margin: '0 20px' }}
            >
                <div className={styles.album__name}>{album.name}</div>
                <div className={styles.album__author}>{album.author}</div>
                <div className={styles.album__tracks}>
                    Tracks: {album.tracks.length}
                </div>
            </Grid>
            <IconButton
                onClick={e => {
                    deleteAlbum(e);
                }}
                style={{ marginLeft: 'auto' }}
            >
                <Delete />
            </IconButton>
        </Card>
    );
};