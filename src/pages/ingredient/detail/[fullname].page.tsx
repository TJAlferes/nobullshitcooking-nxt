import axios from 'axios';

import { endpoint } from '../../../config/api';
import IngredientDetail from '../../../modules/ingredient/detail';
import type { IngredientView } from '../../../store';

export default function IngredientDetailPage({ ingredient }: Props) {
  return <IngredientDetail ownership="official" ingredient={ingredient} />;
}

export async function getServerSideProps({ params }: ServerSideProps) {
  const res = await axios.get(`${endpoint}/ingredients/${encodeURIComponent(params.fullname)}`);

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
    fullname: string;
  };
};

/*
DOES NOT WORK AT SCALE.
WE GET HTTP RESPONSE CODE 429 ERRORS DUE TO EXCEEDING RATE LIMIT.
FOR NOW, WE JUST USE getServerSideProps INSTEAD.
TO DO: FIX

export async function getStaticPaths() {
  const res = await axios.get(`${endpoint}/ingredients/fullnames`);

  const paths = res.data.map((ingredient: {fullname: string}) => ({
    params: {
      fullname: ingredient.fullname
    }
  }));

  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params }: StaticProps) {
  const res = await axios.get(
    `${endpoint}/ingredients/${encodeURIComponent(params.fullname)}`
  );

  return {
    props: {
      ingredient: res.data
    }
  };
}

type StaticProps = {
  params: {
    fullname: string;
  };
};
*/
