import dynamic from 'next/dynamic';
import React from 'react';

//import { LoaderSpinner } from '../../components';
const Chat = dynamic(() => import('./Chat'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

export default function ChatPage(): JSX.Element {
  return <div id="chat-page"><Chat /></div>;
}