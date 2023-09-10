import IngredientDetail        from '../../../ingredient/detail';
import type { IngredientView } from "../../../shared/data/state";

export default function UserPrivateIngredientDetail({ ingredient }: Props) {
  return <IngredientDetail ownership="private" ingredient={ingredient}/>;
}

type Props = {
  ingredient: IngredientView;
};
