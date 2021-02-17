import { AppProps } from 'next/dist/next-server/lib/router/router';

import '../styles/globals.css';
import '../styles/font-styles.css';
import React from 'react';
import { TinaCMS, TinaProvider } from 'tinacms';
import { MyMediaStore } from '../cms/media-store';

function MyApp({ Component, pageProps, router }: AppProps) {
  const cms = new TinaCMS({
    enabled: !!pageProps.preview,
    toolbar: false,
    sidebar: true,
    media: new MyMediaStore(),
  });
  return (
    <TinaProvider cms={cms}>
      <Component key={router.pathname} {...pageProps} />
    </TinaProvider>
  );
}

export default MyApp;
