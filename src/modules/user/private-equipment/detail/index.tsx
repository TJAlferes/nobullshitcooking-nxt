import EquipmentDetail from "../../../equipment/detail";
import type { EquipmentView } from "../../../../store";

export default function UserPrivateEquipmentDetail({ equipment }: Props) {
  return <EquipmentDetail ownership="private" equipment={equipment} />;
}  // does this really need to be in Next.js props? Just use redux?

type Props = {
  equipment: EquipmentView;
};
