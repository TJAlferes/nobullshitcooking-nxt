import axios                   from 'axios';

import { endpoint }           from '../../../../../config/api';
import PublicUserRecipeDetail from '../../../../../modules/user/public/recipe/detail';
import type { Recipe }        from '../../../../../modules/shared/types';

export default function PublicUserRecipeDetailPage({ recipe }: {recipe: Recipe}) {
  return <PublicUserRecipeDetail recipe={recipe} />
}

export async function getServerSideProps({ params }: ServerSideProps) {
  const response = await axios.get(
    `${endpoint}/user/public/recipe/${params.username}/${params.title}`
  );  // public user recipe

  return {
    props: {
      recipe: response.data
    }
  };
}

type ServerSideProps = {
  params: {
    username: string;
    title:    string;
  };
};
