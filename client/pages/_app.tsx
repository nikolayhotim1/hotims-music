import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { wrapper } from '../store';
import { SessionProvider } from 'next-auth/react';

const WrappedApp: FC<AppProps> = ({ Component, pageProps: { session, ...pageProps } }) => (
    <SessionProvider session={session}>
        <Component {...pageProps} />
    </SessionProvider>
);

export default wrapper.withRedux(WrappedApp);