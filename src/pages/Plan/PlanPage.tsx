import dynamic from 'next/dynamic';
import React from 'react';

//import { LoaderSpinner } from '../../components';
const Plan = dynamic(() => import('./Plan'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

export default function PlanPage({ twoColumnATheme }: Props): JSX.Element {
  return (
    <div className="plan-page">
      <Plan twoColumnATheme={twoColumnATheme} />
    </div>
  );
}

type Props = {
  twoColumnATheme: string;
};