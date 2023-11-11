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

function slugify(fullname: string) {
  return fullname
    .split(' ')
    .map(word => word.charAt(0).toLowerCase() + word.slice(1))
    .join('-');
}

export async function getStaticPaths() {
  const response = await axios.get(`${endpoint}/ingredient/fullnames`);

  const paths = response.data.map((ingredient: {fullname: string}) => ({
    params: {
      fullname: slugify(ingredient.fullname)
    }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }: StaticProps) {
  const response = await axios.get(`${endpoint}/ingredient/${params.fullname}`);

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
