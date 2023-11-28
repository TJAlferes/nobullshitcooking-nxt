/*import dynamic from 'next/dynamic';

import { LoaderSpinner } from '../../modules/shared/LoaderSpinner';

const Chat = dynamic(
  () => import('../../modules/chat'),
  {
    loading: () => <LoaderSpinner />,
    ssr:     true
  }
);*/

export default function ChatPage() {
  return <div>chat page</div>;
}
