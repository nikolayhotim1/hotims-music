import { Container } from '@mui/material';
import React from 'react';
import Navbar from '../components/Navbar';
import Player from '../components/Player';
import s from './styles/MainLayout.module.scss';

const MainLayout: React.FC = ({ children }) => {
    return (
        <>
            <Navbar />
            <Container className={s.main_layout}>
                {children}
            </Container>
            <Player />
        </>
    );
};

export default MainLayout;