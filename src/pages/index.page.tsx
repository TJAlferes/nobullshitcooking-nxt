import { Home }        from '../modules/shared/components';
import { staticProps } from '../store';

export default function IndexPage() {
  return <Home />;
}

export const getStaticProps = staticProps();
