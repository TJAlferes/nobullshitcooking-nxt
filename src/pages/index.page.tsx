import { Home }        from "../modules/general/home";
import { staticProps } from '../redux';

export default function IndexPage() {
  return <Home />;
}

export const getStaticProps = staticProps();
