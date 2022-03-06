import { Container } from '@mui/material';
import React from 'react';
import Navbar from '../components/Navbar';
import s from './styles/MainLayout.module.scss';

const MainLayout: React.FC = ({ children }) => {
    return (
        <>
            <Navbar />
            <Container className={s.main_layout}>
                {children}
            </Container>
        </>
    );
};

export default MainLayout;