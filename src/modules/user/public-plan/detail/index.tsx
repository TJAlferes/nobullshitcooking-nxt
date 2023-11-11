import PlanDetail from "../../../plan/detail";
import type { PlanView } from "../../../../store";

export default function UserPublicPlanDetail({ plan }: Props) {
  return <PlanDetail ownership="public" plan={plan} />;
}

type Props = {
  plan: PlanView;
};
