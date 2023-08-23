import axios from 'axios';

import { endpoint }                        from '../../../config/api';
import { useTypedSelector as useSelector } from '../../../redux';
import { LoaderSpinner }                   from '../../shared/LoaderSpinner';
import type { Ingredient }                 from '../../shared/data/state';

const url = "https://s3.amazonaws.com/nobsc-";

export default function IngredientDetail({ ingredient }: {ingredient: Ingredient}) {
  const my_ingredients = useSelector(state => state.userData.my_ingredients);

  const {
    ingredient_id,
    fullname,
    image_url,
    ingredient_type_name,
    notes
  } = ingredient;

  if (!ingredient) {
    return <LoaderSpinner />;
  }

  return (
    <div className="two-col ingredient">
      <div className="two-col-left">
        <h1>{fullname}</h1>

        <div className="image">
          {my_ingredients.find(i => i.ingredient_id === ingredient_id)
            ? <img src={`${url}user-ingredients/${image_url}`} />
            : <img src={`${url}images-01/ingredients/${image_url}.jpg`} />}
        </div>

        <div className="type">
          <b>Ingredient Type:</b>{' '}<span>{ingredient_type_name}</span>
        </div>

        <div className="notes">
          <b>Ingredient Notes:</b>{' '}<div>{notes}</div>
        </div>
      </div>

      <div className="two-col-right"></div>
    </div>
  );
}

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

  return {paths, fallback: false};
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
