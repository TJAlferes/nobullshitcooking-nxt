import axios from 'axios';

import { endpoint } from '../../../../../config/api';
import PlanDetail from '../../../../../modules/plan/detail';
import type { PlanView } from '../../../../../store';

export default function UserPrivatePlanDetailPage({ plan }: Props) {
  return <PlanDetail ownership='private' plan={plan} />;
}

export async function getServerSideProps({ params }: ServerSideProps) {
  const res = await axios.get(
    `${endpoint}/users/${encodeURIComponent(params.username)}/private-plans/${params.plan_id}`,
    {withCredentials: true}
  );

  if (res.status === 401) {
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
      plan: res.data
    }
  };
}

type Props = {
  plan: PlanView;
};

type ServerSideProps = {
  params: {
    username: string;
    plan_id:  string;
  };
};
