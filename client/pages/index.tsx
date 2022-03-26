import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import s1 from './styles/index.module.scss';
import s2 from './tracks/styles/[id].module.scss';

const index = () => {
    const router = useRouter();

    return (
        <>
            <MainLayout>
                <div className={s1.main_page}>
                    <h1>Welcome!</h1>
                    <h2>The best tracks are collected here!</h2>
                    <Button
                        className={s2.back}
                        variant={'outlined'}
                        onClick={() => router.push('/tracks')}
                    >
                        To the list
                    </Button>
                </div>
            </MainLayout>
        </>
    );
};

export default index;