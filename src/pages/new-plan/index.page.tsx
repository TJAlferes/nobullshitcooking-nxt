import dynamic from 'next/dynamic';

import { LoaderSpinner } from '../../components';

const NewPlan = dynamic(() => import('./NewPlan'), {loading: () => <LoaderSpinner />, ssr: false});

export default function NewPlanPage() {
  return <NewPlan />;
}
