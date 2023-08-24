import axios from 'axios';

import { endpoint }      from '../../../../../config/api';
import UserPrivateRecipeDetail from '../../../../../modules/user/private/recipe/detail';
import type { Recipe }   from '../../../../../modules/user/private/recipe/detail';  // move to modules/shared/types ???

export default function UserPrivateRecipeDetailPage({ recipe }: {recipe: Recipe}) {
  return <UserPrivateRecipeDetail recipe={recipe} />
}

export async function getServerSideProps({ params }: ServerSideProps) {
  const response = await axios.post(
    `${endpoint}/user/private/recipe/one`,
    {username: params.username, title: params.title},
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

type ServerSideProps = {
  params: {
    username: string;
    title:    string;
  };
};
