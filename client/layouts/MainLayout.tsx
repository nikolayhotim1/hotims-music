import { Container } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import Navbar from '../components/track/Navbar';
import Player from '../components/track/Player';
import s from './styles/MainLayout.module.scss';

interface MainLayoutProps {
    title?: string,
    description?: string,
    keywords?: string
}

const MainLayout: React.FC<MainLayoutProps> = ({
    children, title, description, keywords
}) => {
    return (
        <>
            <Head>
                <title>{title || 'Hotims Music'}</title>
                <meta
                    name='description'
                    content={`The best music platform in the world. Here everyone can leave their track and become famous. ${description}`}
                />
                <meta
                    name='robots'
                    content='index, follow'
                />
                <meta
                    name='keywords'
                    content={keywords || 'Music, tracks, artists'}
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
            </Head>
            <Navbar />
            <Container className={s.main_layout}>
                {children}
            </Container>
            <Player />
        </>
    );
};

export default MainLayout;