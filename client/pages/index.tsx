import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import s from './styles/index.module.scss';
import { useSession } from 'next-auth/react';

const index = () => {
    const router = useRouter();
    const { data: session } = useSession();

    return (
        <>
            <MainLayout>
                <div className={s.home}>
                    <h1>Welcome{session ? `, ${session.user?.name}!` : '!'}</h1>
                    <h2>The best tracks are collected here!</h2>
                    {session
                        ? <>
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
                        </>
                        : <Button
                            className={s.list}
                            variant={'outlined'}
                            onClick={() => router.push('/api/auth/signin')}
                        >
                            Sign In
                        </Button>
                    }
                </div>
            </MainLayout>
        </>
    );
};

export default index;