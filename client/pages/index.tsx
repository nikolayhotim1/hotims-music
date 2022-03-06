import React from 'react';
import MainLayout from '../layouts/MainLayout';
import s from './styles/index.module.scss';

const index = () => {
    return (
        <>
            <MainLayout>
                <div className={s.main_page}>
                    <h1>Welcome!</h1>
                    <h2>The best tracks are collected here!</h2>
                </div>
            </MainLayout>
        </>
    );
};

export default index;