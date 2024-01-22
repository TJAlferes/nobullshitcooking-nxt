import axios from 'axios';

import { endpoint } from '../../../config/api';
import RecipeDetail from '../../../modules/recipe/detail';
import type { RecipeDetailView } from '../../../modules/recipe/detail';

export default function RecipeDetailPage({ recipe }: Props) {
  return <RecipeDetail ownership="official" recipe={recipe} />;
}

export async function getServerSideProps({ params }: ServerSideProps) {
  const res = await axios.get(`${endpoint}/recipes/${encodeURIComponent(params.title)}`);

  return {
    props: {
      recipe: res.data
    }
  };
}

type Props = {
  recipe: RecipeDetailView;
};

type ServerSideProps = {
  params: {
    title: string;
  };
};

/*
DOES NOT WORK AT SCALE.
WE GET HTTP RESPONSE CODE 429 ERRORS DUE TO EXCEEDING RATE LIMIT.
FOR NOW, WE JUST USE getServerSideProps INSTEAD.
TO DO: FIX

export async function getStaticPaths() {
  const res = await axios.get(`${endpoint}/recipes/titles`);

  const paths = res.data.map((recipe: {title: string}) => ({
    params: {
      title: recipe.title
    }
  }));

  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params }: StaticProps) {
  const res = await axios.get(
    `${endpoint}/recipes/${encodeURIComponent(params.title)}`
  );

  return {
    props: {
      recipe: res.data
    }
  };
}

type StaticProps = {
  params: {
    title: string;
  };
};
*/
