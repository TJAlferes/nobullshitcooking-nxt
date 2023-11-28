import axios from 'axios';

import { endpoint } from '../../../../config/api';
import type { RecipeDetailView } from '../../../../modules/recipe/detail';
import UserPublicRecipeDetail from '../../../../modules/user/public-recipe/detail';

export default function UserPublicRecipeDetailPage({ recipe }: Props) {
  return <UserPublicRecipeDetail recipe={recipe} />
}

export async function getServerSideProps({ params }: ServerSideProps) {
  const response = await axios.get(
    `${endpoint}/users/${params.username}/public-recipes/${params.title}`
  );

  return {
    props: {
      recipe: response.data
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
