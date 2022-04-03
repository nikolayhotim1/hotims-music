import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import s from './styles/index.module.scss';

const index = () => {
    const router = useRouter();

    return (
        <>
            <MainLayout>
                <div className={s.main_page}>
                    <h1>Welcome!</h1>
                    <h2>The best tracks are collected here!</h2>
                    <Button
                        className={s.list}
                        variant={'outlined'}
                        onClick={() => router.push('/tracks')}
                    >
                        Track List
                    </Button>
                    <Button
                        className={s.list}
                        variant={'outlined'}
                        onClick={() => router.push('/albums')}
                    >
                        Album List
                    </Button>
                </div>
            </MainLayout>
        </>
    );
};

export default index;