import dynamic from 'next/dynamic';

import { LoaderSpinner } from '../../../modules/shared/components';

const PlanDetail = dynamic(
  () => import('../../../modules/plan/detail'),
  {
    loading: () => <LoaderSpinner />,
    ssr:     false
  }
);

export default function PlanDetailPage() {
  return <PlanDetail />;
}
