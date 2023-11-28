import dynamic from 'next/dynamic';

import { LoaderSpinner } from '../../../modules/shared/LoaderSpinner';

const UserPublicPlanForm = dynamic(
  () => import('../../../modules/user/public-plan/form'),
  {
    loading: () => <LoaderSpinner />,
    ssr: false
  }
);

export default function UserPublicPlanFormPage() {
  return <UserPublicPlanForm />;
}
