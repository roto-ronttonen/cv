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
      {cms.enabled && (
        <button
          className="border border-white rounded p-2 fixed bottom-0 right-0 mb-2 mr-2 text-white"
          onClick={() => {
            window.location.href = '/api/end-preview';
          }}
        >
          Stop edit
        </button>
      )}
    </TinaProvider>
  );
}

export default MyApp;
