import axios from 'axios';
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';

import '../../styles/styles.css';
import { endpoint } from '../config/api';
import { setItem } from '../modules/general/localStorage';
import { Layout } from '../modules/general/Layout';
import { RouteGuard } from '../modules/general/RouteGuard';  // TO DO: hand this differently (in Next.js pages???)
import { StoreProvider } from '../store';
import { LoaderSpinner } from '../modules/shared/LoaderSpinner';

export default function NOBSCApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function getInitialData() {
      try {
        const res = await axios.get(`${endpoint}/initial-data`);
        
        if (res.status === 200) {
          for (const [ key, value ] of Object.entries(res.data)) {
            setItem(key, value);
          }
        }
      } catch (err) {
        //
      }

      setLoading(false);
    }

    if (mounted) getInitialData();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <LoaderSpinner />;

  return (
    <StoreProvider>
      <RouteGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </StoreProvider>
  );
}
