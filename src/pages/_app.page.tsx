import { DndProvider }               from 'react-dnd-multi-backend';
import { Provider as ReduxProvider } from 'react-redux';
import { HTML5toTouch }              from 'rdndmb-html5-to-touch';
import type { AppProps }             from 'next/app';

import '../../styles/styles.css';
import { Layout }         from '../modules/general/Layout';
import { RouteGuard }     from '../modules/general/RouteGuard';
import { ThemeProvider }  from '../modules/general/ThemeProvider';
import { SearchProvider } from '../modules/shared/search/hook';
import { wrapper }        from '../redux';

export default function NOBSCApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <ReduxProvider store={store}>
      <DndProvider options={HTML5toTouch}>
        <SearchProvider>
          <RouteGuard>
            <ThemeProvider>
              <Layout>
                <Component {...props.pageProps} />
              </Layout>
            </ThemeProvider>
          </RouteGuard>
        </SearchProvider>
      </DndProvider>
    </ReduxProvider>
  );
}
/*
function MyApp({ Component, pageProps, data }) {
  return <Component {...pageProps} data={data} />;
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  // Data fetching logic
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();

  // Pass the fetched data to all pages as a prop
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, data };
};

export default MyApp;
*/
