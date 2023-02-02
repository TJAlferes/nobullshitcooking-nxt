import dynamic from 'next/dynamic';

//import { LoaderSpinner } from '../../components';
import { initialUserProps } from '../../store';
const Chat = dynamic(() => import('./Chat'), {
  loading: () => <div>Loading...</div>,
  ssr: true
});

export default function ChatPage(): JSX.Element {
  return <Chat />;
}

export const getInitialProps = initialUserProps();  // getServerSideProps ?