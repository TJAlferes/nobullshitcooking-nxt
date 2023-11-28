import axios from 'axios';

import { endpoint } from '../../../config/api';
import RecipeDetail from '../../../modules/recipe/detail';
import type { RecipeDetailView } from '../../../modules/recipe/detail';

export default function RecipeDetailPage({ recipe }: Props) {
  return <RecipeDetail ownership="official" recipe={recipe} />;
}

export async function getStaticPaths() {
  const response = await axios.get(`${endpoint}/recipes/titles`);

  const paths = response.data.map((recipe: {title: string}) => ({
    params: {
      title: encodeURIComponent(recipe.title)
    }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }: StaticProps) {
  const response = await axios.get(`${endpoint}/recipe/${params.title}`);

  return {
    props: {
      recipe: response.data
    }
  };
}

type Props = {
  recipe: RecipeDetailView;
};

type StaticProps = {
  params: {
    title: string;
  };
};
