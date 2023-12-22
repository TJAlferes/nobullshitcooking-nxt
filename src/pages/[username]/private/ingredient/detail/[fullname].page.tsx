import axios from 'axios';

import { endpoint } from '../../../config/api';
import UserPrivateIngredientDetail from '../../../modules/user/private-ingredient/detail';
import type { IngredientView } from '../../../store';

export default function UserPrivateIngredientDetailPage({ ingredient }: Props) {
  return <UserPrivateIngredientDetail ingredient={ingredient} />;
}

export async function getServerSideProps({ params }: ServerSideProps) {
  const response = await axios.get(
    `${endpoint}/users/${params.username}/private-ingredients/${params.ingredient_id}`,
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
      ingredient: response.data
    }
  };
}

type Props = {
  ingredient: IngredientView;
};

// TO DO: change your routing then

type ServerSideProps = {
  params: {
    username:      string;
    ingredient_id: string;  // fullname AKA (how to handle this? how to handle alt_names?)
  };
};
