import dynamic from 'next/dynamic';

import { LoaderSpinner } from '../../components';

const Chat = dynamic(() => import('./Chat'), {loading: () => <LoaderSpinner />, ssr: true});

export default function ChatPage() {
  return <Chat />;
}
