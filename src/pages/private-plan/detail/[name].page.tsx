import axios from 'axios';

import { endpoint } from '../../../config/api';
import UserPrivatePlanDetail from '../../../modules/user/private-plan/detail';
import type { PlanView } from '../../../store';

export default function UserPrivatePlanDetailPage({ plan }: Props) {
  return <UserPrivatePlanDetail plan={plan} />;
}

export async function getServerSideProps({ params }: ServerSideProps) {
  const response = await axios.get(
    `${endpoint}/users/${params.username}/private-plans/${params.plan_id}`,
    {withCredentials: true}
  );
  if (response.status === 401) {
    return {
      props: {},
      redirect: {
        permanent:   false,
        destination: "/login"
      }
    };
  }
  return {
    props: {
      plan: response.data
    }
  };
}

type Props = {
  plan: PlanView;
};

// TO DO: change your routing then

type ServerSideProps = {
  params: {
    username: string;
    plan_id:  string;  // or name AKA plan_name ???
  };
};
