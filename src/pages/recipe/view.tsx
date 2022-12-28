import Link from 'next/link';

import { IWorkRecipe } from '../../store/data/types';
import { IRecipe } from './index.page';

const url = "https://s3.amazonaws.com/nobsc-user-recipe";

export function RecipeView({
  favorite,
  favorited,
  feedback,
  loading,
  myFavoriteRecipes,
  myPrivateRecipes,
  myPublicRecipes,
  mySavedRecipes,
  recipe,
  save,
  saved,
  theme,
  userIsAuthenticated
}: Props): JSX.Element {
  const {
    id, author, title, description, cuisine_name, recipe_type_name, directions,
    required_equipment, required_ingredients, required_subrecipes, required_methods,
    recipe_image, equipment_image, ingredients_image, cooking_image
  } = recipe;

  const recipeBy = () => {
    if (author === "Unknown") return "Unknown";
    return <Link href={`/profile/${author}`}><a className="recipe-author">{author}</a></Link>;
  };

  return (
    <div className={`recipe two-col-b ${theme}`}>
      <div className="two-col-b-left">
        <h1 className="recipe-title">{title}</h1>

        <p className="feedback">{feedback}</p>

        <div className="recipe-save-outer">
          {(userIsAuthenticated && !myPrivateRecipes.find(r => r.id == id) && !myPublicRecipes.find(r => r.id == id))
            ? (
              <>
                {myFavoriteRecipes.find(r => r.id == id)
                  ? <span className="recipe-saved">Favorited</span>
                  : (
                    !favorited
                    ? <button className="recipe__button--save" disabled={loading} name="favorite-button" onClick={favorite}>Favorite</button>
                    : <span className="recipe-saved">Favorited</span>
                  )}

                {mySavedRecipes.find(r => r.id == id)
                  ? <span className="recipe-saved">Saved</span>
                  : (
                    !saved
                    ? <button className="recipe__button--save" disabled={loading} name="save-button" onClick={save}>Save</button>
                    : <span className="recipe-saved">Saved</span>
                  )}
              </>
            )
            : false}
        </div>

        <div className="recipe-image">
          {recipe_image !== "nobsc-recipe-default" ? <img src={`${url}/${recipe_image}`} /> : <div className="img-280-172"></div>}
        </div>

        <div className="recipe-author-outer"><b>Author:</b>{' '}{recipeBy()}</div>

        <div className="recipe-description-outer"><b>Author's note:</b>{' '}<em className="recipe-description">{description}</em></div>

        <div className="recipe-cuisine-outer"><b>Cuisine:</b>{' '}<span className="recipe-cuisine">{cuisine_name}</span></div>

        <div className="recipe-type-outer"><b>Recipe type:</b>{' '}<span className="recipe-type">{recipe_type_name}</span></div>

        <h2 className="recipe__h2">Required Methods</h2>
        <div className="recipe-required-methods">
          {required_methods && required_methods.map(m => <div className="recipe-required-method" key={m.method_name}>{m.method_name}</div>)}
        </div>

        <h2 className="recipe__h2">Required Equipment</h2>
        <div className="recipe-equipment-image">
          {equipment_image !== "nobsc-recipe-equipment-default" ? <img src={`${url}-equipment/${equipment_image}`} /> : <div className="img-280-172"></div>}
        </div>
        <div className="recipe-required-equipments">
          {required_equipment && required_equipment.map(e => <div className="recipe-required-equipment" key={e.equipment_name}>{e.amount}{' '}{e.equipment_name}</div>)}
        </div>

        <h2 className="recipe__h2">Required Ingredients</h2>
        <div className="recipe-ingredients-image">
          {ingredients_image !== "nobsc-recipe-ingredients-default" ? <img src={`${url}-ingredients/${ingredients_image}`} /> : <div className="img-280-172"></div>}
        </div>
        <div className="recipe-required-ingredients">
          {required_ingredients && required_ingredients.map(i => (
            <div className="recipe-required-ingredient" key={i.ingredient_name}>
              {i.amount}{' '}{i.measurement_name}{' '}{i.ingredient_name}
            </div>
          ))}
        </div>

        <h2 className="recipe__h2">Required Subrecipes</h2>
        <div className="recipe-required-subrecipes">
          {required_subrecipes
            ? required_subrecipes.map(s => <div className="recipe-required-subrecipe" key={s.subrecipe_title}>{s.amount}{' '}{s.measurement_name}{' '}{s.subrecipe_title}</div>)
            : "none"}
        </div>

        <h2 className="recipe__h2">Directions</h2>
        <div className="recipe-cooking-image">
          {cooking_image !== "nobsc-recipe-cooking-default" ? <img src={`${url}-cooking/${cooking_image}`} /> : <div className="img-280-172"></div>}
        </div>
        <div className="recipe-directions">{directions}</div>
      </div>

      <div className="two-col-b-right"></div>
    </div>
  );
}

type Props = {
  favorite(): void;
  favorited: boolean;
  feedback: string;
  loading: boolean;
  myFavoriteRecipes: IWorkRecipe[];
  myPrivateRecipes: IWorkRecipe[];
  myPublicRecipes: IWorkRecipe[];
  mySavedRecipes: IWorkRecipe[];
  recipe: IRecipe;
  save(): void;
  saved: boolean;
  theme: string;
  userIsAuthenticated: boolean;
};