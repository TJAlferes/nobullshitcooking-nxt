import type { IIngredient } from '../../store/data/types';

const url = "https://s3.amazonaws.com/nobsc-";

export function IngredientView({ ingredient: { id, fullname, image, ingredient_type_name, description }, myPrivateIngredients, theme }: Props): JSX.Element {
  return (
    <div className={`ingredient two-col-b ${theme}`} data-test="ingredient">
      <div className="two-col-b-left">
        <h1>{fullname}</h1>

        <div className="image">
          {myPrivateIngredients.find(ing => ing.id === id)
            ? <img src={`${url}user-ingredients/${image}`} />
            : <img src={`${url}images-01/ingredients/${image}.jpg`} />}
        </div>

        <div className="type">
          <b>Ingredient Type:</b>{' '}<span>{ingredient_type_name}</span>
        </div>

        <div className="description">
          <b>Ingredient Description:</b>{' '}<div>{description}</div>
        </div>
      </div>

      <div className="two-col-b-right"></div>
    </div>
  );
}

type Props = {
  ingredient:           IIngredient;
  myPrivateIngredients: IIngredient[];
  theme:                string;
}