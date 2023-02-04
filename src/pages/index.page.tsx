import { Home }    from '../components';
import { initialProps } from '../store';

export default function IndexPage() {
  return <Home />;
}

IndexPage.getInitialProps = initialProps();