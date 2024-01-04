import axios from 'axios';

import { endpoint } from '../../../../config/api';
import PlanDetail from '../../../../modules/plan/detail';
import type { PlanView } from '../../../../store';

export default function UserPublicPlanDetailPage({ plan }: Props) {
  return <PlanDetail ownership='public' plan={plan} />;
}

export async function getServerSideProps({ params }: ServerSideProps) {
  const res = await axios.get(
    `${endpoint}/users/${encodeURIComponent(params.username)}/public-plans/${encodeURIComponent(params.name)}`
  );

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
    name:     string;
  };
};
