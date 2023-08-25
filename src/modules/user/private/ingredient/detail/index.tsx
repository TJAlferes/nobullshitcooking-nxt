import { useTypedSelector as useSelector } from '../../../../../redux';
import { LoaderSpinner }                   from '../../../../shared/LoaderSpinner';
import type { Ingredient }                 from '../../data/state';

const url = "https://s3.amazonaws.com/nobsc-";

export default function UserPrivateIngredientDetail({ ingredient }: {ingredient: Ingredient}) {
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
          <b>Equipment Notes:</b>{' '}<div>{notes}</div>
        </div>
      </div>

      <div className="two-col-right"></div>
    </div>
  );
}
