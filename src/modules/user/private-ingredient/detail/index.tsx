import IngredientDetail from '../../../ingredient/detail';
import type { IngredientView } from '../../../../store';

export default function UserPrivateIngredientDetail({ ingredient }: Props) {
  return <IngredientDetail ownership="private" ingredient={ingredient}/>;
}

type Props = {
  ingredient: IngredientView;
};
