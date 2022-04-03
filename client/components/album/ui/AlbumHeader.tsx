import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

interface AlbumHeaderProps { }

export const AlbumHeader: React.FC<AlbumHeaderProps> = ({ }) => {
    const router = useRouter();
    return (
        <Button
            variant={'outlined'}
            style={{ fontSize: 24 }}
            onClick={() => router.push('/albums')}
        >
            Back to album list
        </Button>
    );
};