import axios from 'axios';

import { endpoint } from '../../../../../config/api';
import RecipeDetail from '../../../../../modules/recipe/detail';
import type { RecipeDetailView } from '../../../../../modules/recipe/detail';

export default function UserPrivateRecipeDetailPage({ recipe }: Props) {
  return <RecipeDetail ownership='private' recipe={recipe} />
}

export async function getServerSideProps({ params }: ServerSideProps) {
  const res = await axios.get(
    `${endpoint}/users/${encodeURIComponent(params.username)}/private-recipes/${params.recipe_id}`,
    {withCredentials: true}
  );

  if (res.status === 401) {
    return {
      props: {},
      redirect: {
        permanent:   false,
        destination: "/login"
      }
    };
  }

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
    username:  string;
    recipe_id: string;
  };
};
