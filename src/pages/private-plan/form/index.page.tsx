import dynamic from 'next/dynamic';

import { LoaderSpinner } from '../../../modules/shared/LoaderSpinner';

const UserPrivatePlanForm = dynamic(
  () => import('../../../modules/user/private-plan/form'),
  {
    loading: () => <LoaderSpinner />,
    ssr: false
  }
);

export default function UserPrivatePlanFormPage() {
  return <UserPrivatePlanForm />;
}
