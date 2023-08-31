import axios                   from 'axios';

import { endpoint }           from '../../../../../config/api';
import type { Recipe }        from '../../../../../modules/shared/types';
import PublicUserRecipeDetail from '../../../../../modules/user/public/recipe/detail';

export default function PublicUserRecipeDetailPage({ recipe }: Props) {
  return <PublicUserRecipeDetail recipe={recipe} />
}

export async function getServerSideProps({ params }: ServerSideProps) {
  const response = await axios.get(
    `${endpoint}/user/public/recipe/${params.username}/${params.title}`
  );

  return {
    props: {
      recipe: response.data
    }
  };
}

type Props = {
  recipe: Recipe;
};

type ServerSideProps = {
  params: {
    username: string;
    title:    string;
  };
};
