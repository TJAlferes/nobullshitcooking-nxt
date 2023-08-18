import dynamic from 'next/dynamic';

import { LoaderSpinner } from '../../../modules/shared/components';

const Plan = dynamic(
  () => import('../../../modules/plan/detail'),
  {
    loading: () => <LoaderSpinner />,
    ssr:     false
  }
);

export default function PlanPage() {
  return <Plan />;
}