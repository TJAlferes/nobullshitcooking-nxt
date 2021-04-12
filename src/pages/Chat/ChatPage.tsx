import React from 'react';
import { lazy, LazyBoundary } from 'react-imported-component';

const Chat = lazy(() => import('./Chat'));
import './chatPage.css'

export default function MessengerPage(): JSX.Element {
  return (
    <div id="messenger-page">
      <LazyBoundary fallback={<div>Loading...</div>}>
        <Chat />
      </LazyBoundary>
    </div>
  );
}