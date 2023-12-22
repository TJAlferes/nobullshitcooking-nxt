import axios from 'axios';

import { endpoint } from '../../../../config/api';
import RecipeDetail from '../../../../modules/recipe/detail';
import type { RecipeDetailView } from '../../../../modules/recipe/detail';

export default function UserPublicRecipeDetailPage({ recipe }: Props) {
  return <RecipeDetail ownership='public' recipe={recipe} />
}

export async function getServerSideProps({ params }: ServerSideProps) {
  const res = await axios.get(
    `${endpoint}/users/${params.username}/public-recipes/${params.title}`
  );

  return {
    props: {
      recipe: res.data
    }
  };
}

type Props = {
  recipe: RecipeDetailView;
};

type ServerSideProps = {
  params: {
    username: string;
    title:    string;
  };
};
