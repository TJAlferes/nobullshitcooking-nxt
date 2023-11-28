import axios from 'axios';

import { endpoint } from '../../../../config/api';
import UserPublicPlanDetail from "../../../../modules/user/public-plan/detail";
import type { PlanView } from "../../../../store";

export default function UserPublicPlanDetailPage({ plan }: Props) {
  return <UserPublicPlanDetail plan={plan} />;
}

export async function getServerSideProps({ params }: ServerSideProps) {
  const response = await axios.get(
    `${endpoint}/users/${params.username}/public-plans/${params.name}`
  );

  return {
    props: {
      plan: response.data
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
