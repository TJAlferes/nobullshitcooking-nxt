import axios from 'axios';

import { endpoint } from '../../../../../config/api';
import IngredientDetail from '../../../../../modules/ingredient/detail';
import type { IngredientView } from '../../../../../store';

export default function UserPrivateIngredientDetailPage({ ingredient }: Props) {
  return <IngredientDetail ownership='private' ingredient={ingredient} />;
}

export async function getServerSideProps({ params }: ServerSideProps) {
  const res = await axios.get(
    `${endpoint}/users/${params.username}/private-ingredients/${params.ingredient_id}`,
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
      ingredient: res.data
    }
  };
}

type Props = {
  ingredient: IngredientView;
};

type ServerSideProps = {
  params: {
    username:      string;
    ingredient_id: string;
  };
};
