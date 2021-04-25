import React from 'react';

export default function NotFound404({ oneColumnATheme }: Props): JSX.Element {
  return (
    <div className={`not-found one-column-a ${oneColumnATheme}`}>
      <h1 className="not-found__h1">404 - Page Not Found</h1>
    </div>
  );
}

type Props = {
  oneColumnATheme: string;
};