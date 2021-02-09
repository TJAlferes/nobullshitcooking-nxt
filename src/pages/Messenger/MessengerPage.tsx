import React from 'react';
import { lazy, LazyBoundary } from 'react-imported-component';

const Messenger = lazy(() => import('./Messenger'));
import './messengerPage.css'

export default function MessengerPage(): JSX.Element {
  return (
    <div id="messenger-page">
      <LazyBoundary fallback={<div>Loading...</div>}>
        <Messenger />
      </LazyBoundary>
    </div>
  );
}