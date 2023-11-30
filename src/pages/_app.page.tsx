import axios from 'axios';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd-multi-backend';  // TO DO: move DOWN, to plan
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import type { AppProps } from 'next/app';

import '../../styles/styles.css';
import { endpoint } from '../config/api';
import { setItem } from '../modules/general/localStorage';
import { Layout } from '../modules/general/Layout';
import { RouteGuard } from '../modules/general/RouteGuard';  // TO DO: hand this differently (in Next.js pages???)
import { StoreProvider } from '../store';

export default function NOBSCApp({ Component, pageProps }: AppProps) {
  //const [ data, setData ] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function getInitialData() {
      try {
        const res = await axios.get(`${endpoint}/initial-data`);
        if (res.status === 200) {
          for (const [ key, value ] of Object.entries(res.data)) {
            setItem(key, value);
          }
          //setData(true);
        }
        console.log('GET INITIAL DATA RAN');
      } catch (err) {}
    }

    if (mounted) getInitialData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <StoreProvider>
      <DndProvider options={HTML5toTouch}>
        <RouteGuard>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RouteGuard>
      </DndProvider>
    </StoreProvider>
  );
}
