import dynamic from 'next/dynamic';

import { LoaderSpinner } from '../../../../../modules/shared/LoaderSpinner';

const PlanForm = dynamic(
  () => import('../../../../../modules/plan/form'),
  {
    loading: () => <LoaderSpinner />,
    ssr: false
  }
);

export default function UserPublicPlanFormPage() {
  return <PlanForm ownership='public' />;
}
