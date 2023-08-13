import axios from 'axios';

import { LoaderSpinner }                   from '../../components';
import { useTypedSelector as useSelector } from '../../store';
import type { Ingredient }                from '../../store/data/types';
import { endpoint }                        from '../../utils/api';

const url = "https://s3.amazonaws.com/nobsc-";

export default function Ingredient({ ingredient }: {ingredient: Ingredient}) {
  const my_ingredients = useSelector(state => state.data.my_ingredients);

  const { ingredient_id, fullname, image_url, ingredient_type_name, description } = ingredient;

  return !ingredient ? <LoaderSpinner /> : (
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
        <div className="description">
          <b>Ingredient Description:</b>{' '}<div>{description}</div>
        </div>
      </div>
      <div className="two-col-right"></div>
    </div>
  );
}

function slugify(fullname: string) {
  return fullname.split(' ').map(word => word.charAt(0).toLowerCase() + word.slice(1)).join('-');
}

export async function getStaticPaths() {
  const response = await axios.get(`${endpoint}/ingredient/fullnames`);
  const paths = response.data.map((ingredient: {fullname: string}) => ({params: {fullname: slugify(ingredient.fullname)}}));
  return {paths, fallback: false};
}

export async function getStaticProps({ params }: {params: {fullname: string}}) {
  const response = await axios.get(`${endpoint}/ingredient/${params.fullname}`);
  return {props: {ingredient: response.data}};
}
