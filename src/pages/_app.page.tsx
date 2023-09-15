import { DndProvider }               from 'react-dnd-multi-backend';
import { Provider as ReduxProvider } from 'react-redux';
import { HTML5toTouch }              from 'rdndmb-html5-to-touch';
import type { AppProps }             from 'next/app';

import '../../styles/styles.css';
import { Layout }         from '../modules/general/Layout';
import { RouteGuard }     from '../modules/general/RouteGuard';  // TO DO: hand this differently (in Next.js pages???)
import { ThemeProvider }  from '../modules/general/ThemeProvider';  // TO DO: rename to Theme
import { wrapper }        from '../redux';  // TO DO: delete if possible

export default function NOBSCApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <ReduxProvider store={store}>
      <DndProvider options={HTML5toTouch}>
        <RouteGuard>
          <ThemeProvider>
            <Layout>
              <Component {...props.pageProps} />
            </Layout>
          </ThemeProvider>
        </RouteGuard>
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
