import EquipmentDetail        from "../../../../equipment/detail";
import type { EquipmentView } from "../../../../shared/data/state";

export default function UserPrivateEquipmentDetail({ equipment }: Props) {
  return <EquipmentDetail equipment={equipment} ownership="private" />;
}  // does this really need to be in Next.js props? Just use redux?

type Props = {
  equipment: EquipmentView;
};
