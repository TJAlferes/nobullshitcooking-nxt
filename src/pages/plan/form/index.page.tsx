import dynamic from 'next/dynamic';

import { LoaderSpinner } from '../../../modules/shared/components';

const PlanForm = dynamic(
  () => import('../../../modules/plan/form'),
  {
    loading: () => <LoaderSpinner />,
    ssr: false
  }
);

export default function PlanFormPage() {
  return <PlanForm />;
}
