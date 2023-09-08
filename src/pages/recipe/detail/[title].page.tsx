import axios from 'axios';

import { endpoint }              from '../../../config/api';
import type { RecipeDetailView } from '../../../modules/recipe/detail';
import RecipeDetail              from '../../../modules/recipe/detail';

export default function RecipeDetailPage({ recipe }: Props) {
  return <RecipeDetail ownership="official" recipe={recipe} />;
}

function slugify(title: string) {
  return title
    .split(' ')
    .map(word => word.charAt(0).toLowerCase() + word.slice(1))
    .join('-');
}

/*function unslugify(title: string) {
  return title
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}*/

export async function getStaticPaths() {
  const response = await axios.get(`${endpoint}/recipe/titles`);

  const paths = response.data.map((recipe: {title: string}) => ({
    params: {
      title: slugify(recipe.title)
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
