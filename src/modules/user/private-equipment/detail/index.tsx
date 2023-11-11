import EquipmentDetail from "../../../equipment/detail";
import type { EquipmentView } from "../../../../store";

export default function UserPrivateEquipmentDetail({ equipment }: Props) {
  return <EquipmentDetail ownership="private" equipment={equipment} />;
}

type Props = {
  equipment: EquipmentView;
};
