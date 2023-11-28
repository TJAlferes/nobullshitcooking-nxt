import axios from 'axios';

import { endpoint } from '../../../config/api';
import IngredientDetail from '../../../modules/ingredient/detail';
import type { IngredientView } from '../../../store';

export default function IngredientDetailPage({ ingredient }: Props) {
  return <IngredientDetail ownership="official" ingredient={ingredient} />;
}

type Props = {
  ingredient: IngredientView;
};

export async function getStaticPaths() {
  const response = await axios.get(`${endpoint}/ingredients/fullnames`);

  const paths = response.data.map((ingredient: {fullname: string}) => ({
    params: {
      fullname: encodeURIComponent(ingredient.fullname)
    }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }: StaticProps) {
  const response = await axios.get(`${endpoint}/ingredients/${params.fullname}`);

  return {
    props: {
      ingredient: response.data
    }
  };
}

type StaticProps = {
  params: {
    fullname: string;
  };
};
