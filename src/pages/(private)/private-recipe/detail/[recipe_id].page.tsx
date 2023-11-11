import axios from 'axios';

import { endpoint } from '../../../../config/api';
import type { RecipeDetailView } from '../../../../modules/recipe/detail';
import UserPrivateRecipeDetail from '../../../../modules/user/private-recipe/detail';

export default function UserPrivateRecipeDetailPage({ recipe }: Props) {
  return <UserPrivateRecipeDetail recipe={recipe} />
}

export async function getServerSideProps({ params }: ServerSideProps) {
  const response = await axios.get(
    `${endpoint}/users/${params.username}/private-recipes/${params.recipe_id}`,
    {withCredentials: true}
  );

  if (response.status === 401) {
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
      recipe: response.data
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
