import axios                   from 'axios';
import { useEffect, useState } from 'react';
import { DndProvider }         from 'react-dnd-multi-backend';  // TO DO: move DOWN, to plan
import { Provider }            from 'react-redux';
import { HTML5toTouch }        from 'rdndmb-html5-to-touch';
import type { AppProps }       from 'next/app';

import '../../styles/styles.css';
import { endpoint }       from '../config/api';
import { setItem }        from '../modules/general/localStorage';
import { Layout }         from '../modules/general/Layout';
import { RouteGuard }     from '../modules/general/RouteGuard';  // TO DO: hand this differently (in Next.js pages???)
import { AuthnameProvider } from '../modules/auth/index';
import { ThemeProvider }  from '../modules/general/theme';
import { wrapper }        from '../redux';  // TO DO: delete if possible

export default function NOBSCApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const [ data, setData ] = useState(false);

  useEffect(() => {
    async function getInitialData() {
      try {
        const response = await axios.get(`${endpoint}/initial-data`);
        setItem("appState", response.data);  // still keep in redux too???
        setData(true);
      } catch (err) {}
    }

    if (!data) {
      getInitialData();
    }
  }, []);

  return (
    <Provider store={store}>
      <AuthnameProvider>
        <DndProvider options={HTML5toTouch}>
          <RouteGuard>
            <ThemeProvider>
              <Layout>
                <Component {...props.pageProps} />
              </Layout>
            </ThemeProvider>
          </RouteGuard>
        </DndProvider>
      </AuthnameProvider>
    </Provider>
  );
}
