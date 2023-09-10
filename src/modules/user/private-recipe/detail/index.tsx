import RecipeDetail              from '../../../recipe/detail';
import type { RecipeDetailView } from '../../../recipe/detail';

export default function UserPrivateRecipeDetail({ recipe }: Props) {
  return <RecipeDetail ownership='private' recipe={recipe} />;
}

type Props = {
  recipe: RecipeDetailView;
};
