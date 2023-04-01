import dynamic from 'next/dynamic';

import { LoaderSpinner } from '../../components';

const Plan = dynamic(() => import('./Plan'), {loading: () => <LoaderSpinner />, ssr: false});

export default function PlanPage() {
  return <Plan />;
}
