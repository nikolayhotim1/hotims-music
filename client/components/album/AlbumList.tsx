import { Grid } from '@mui/material';
import { FC } from 'react';
import { IAlbum } from '../../types/albums';
import AlbumItem from './AlbumItem';

interface AlbumListProps {
    albums: IAlbum[]
}

export const AlbumList: FC<AlbumListProps> = ({ albums }) => {
    return (
        <Grid
            container
            direction='column'
        >
            <Grid
                p={2}
                container
            >
                {albums.length
                    ? albums.map((album) =>
                        <AlbumItem
                            key={album._id}
                            album={album}
                        />
                    )
                    : <Grid
                        container
                        justifyContent='center'
                    >
                        <h2><em>No albums yet</em></h2>
                    </Grid>
                }
            </Grid>
        </Grid>
    );
};