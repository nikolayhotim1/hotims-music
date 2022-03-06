import React from 'react';
import Navbar from '../components/Navbar';
import s from './styles/index.module.scss';

const index = () => {
    return (
        <>
            <Navbar />
            <div className={s.main_page}>
                <h1>Welcome!</h1>
                <h2>The best tracks are collected here!</h2>
            </div>
        </>
    );
};

export default index;