import { Box, Grid } from '@mui/material';
import { FC } from 'react';
import { IAlbum } from '../../../types/albums';
import { AlbumItem } from './AlbumItem';

interface AlbumListProps {
    albums: IAlbum[]
}

export const AlbumList: FC<AlbumListProps> = ({ albums }) => {
    return (
        <Grid
            container
            direction='column'
        >
            <Box p={3}>
                {albums.map((album) => (
                    <AlbumItem
                        key={album._id}
                        album={album}
                    />
                ))}
            </Box>
        </Grid>
    );
};