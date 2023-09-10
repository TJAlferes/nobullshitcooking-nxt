import RecipeDetail              from '../../../recipe/detail';
import type { RecipeDetailView } from '../../../recipe/detail';

export default function UserPublicRecipeDetail({ recipe }: Props) {
  return <RecipeDetail ownership='public' recipe={recipe} />;
}

type Props = {
  recipe: RecipeDetailView;
};
