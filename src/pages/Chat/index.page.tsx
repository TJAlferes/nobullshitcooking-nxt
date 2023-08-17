import dynamic from 'next/dynamic';

import { LoaderSpinner } from '../../modules/shared/components';

const Chat = dynamic(
  () => import('../../modules/chat'),
  {
    loading: () => <LoaderSpinner />,
    ssr:     true
  }
);

export default function ChatPage() {
  return <Chat />;
}
