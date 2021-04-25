import dynamic from 'next/dynamic';
import React from 'react';

//import { LoaderSpinner } from '../../components';
const NewPlan = dynamic(() => import('./NewPlan'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

export default function NewPlanPage({ editing }: Props): JSX.Element {
  return <div className="new-plan-page"><NewPlan editing={editing} /></div>;
}

type Props = {
  editing: boolean;
};