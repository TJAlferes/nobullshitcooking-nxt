import PlanDetail from "../../../plan/detail";
import type { PlanView } from "../../../../store";

export default function UserPrivatePlanDetail({ plan }: Props) {
  return <PlanDetail ownership="private" plan={plan} />;
}

type Props = {
  plan: PlanView;
};
