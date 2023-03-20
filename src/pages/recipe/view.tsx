import Link from 'next/link';

import type { IWorkRecipe } from '../../store/data/types';
import type { IRecipe } from './index.page';

const url = "https://s3.amazonaws.com/nobsc-user-recipe";

function recipeBy(author: string) {
  if (author === "Unknown") return "Unknown";
  return <Link href={`/profile/${author}`}>{author}</Link>;
};

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
  userIsAuthenticated
}: Props) {
  const {
    id,
    author,
    title,
    description,
    cuisine_name,
    recipe_type_name,
    directions,
    equipment,
    ingredients,
    subrecipes,
    methods,
    recipe_image,
    equipment_image,
    ingredients_image,
    cooking_image
  } = recipe;

  return (
    <div className="recipe two-col">
      <div className="two-col-left">
        <h1>{title}</h1>

        <p className="feedback">{feedback}</p>

        <div className="save-area">
          {(userIsAuthenticated && !myPrivateRecipes.find(r => r.id == id) && !myPublicRecipes.find(r => r.id == id))
            ? (
              <>
                {myFavoriteRecipes.find(r => r.id == id)
                  ? <span>Favorited</span>
                  : (
                    !favorited
                    ? <button className="--save" disabled={loading} name="favorite-button" onClick={favorite}>Favorite</button>
                    : <span>Favorited</span>
                  )}

                {mySavedRecipes.find(r => r.id == id)
                  ? <span>Saved</span>
                  : (
                    !saved
                    ? <button className="--save" disabled={loading} name="save-button" onClick={save}>Save</button>
                    : <span>Saved</span>
                  )}
              </>
            )
            : false}
        </div>

        <div className="image">
          {recipe_image !== "nobsc-recipe-default" ? <img src={`${url}/${recipe_image}`} /> : <div className="img-280-172"></div>}
        </div>

        <div className="author"><b>Author:</b>{' '}{recipeBy(author)}</div>

        <div className="description"><b>Author's note:</b>{' '}<em>{description}</em></div>

        <div className="cuisine"><b>Cuisine:</b>{' '}<span>{cuisine_name}</span></div>

        <div className="type"><b>Recipe type:</b>{' '}<span>{recipe_type_name}</span></div>

        <h2>Required Methods</h2>
        <div className="methods">
          {methods && methods.map(m => <div className="method" key={m.method_name}>{m.method_name}</div>)}
        </div>

        <h2>Required Equipment</h2>
        <div className="equipment-image">
          {equipment_image !== "nobsc-recipe-equipment-default" ? <img src={`${url}-equipment/${equipment_image}`} /> : <div className="img-280-172"></div>}
        </div>
        <div className="equipments">
          {equipment && equipment.map(e => <div className="equipment" key={e.equipment_name}>{e.amount}{' '}{e.equipment_name}</div>)}
        </div>

        <h2>Required Ingredients</h2>
        <div className="ingredients-image">
          {ingredients_image !== "nobsc-recipe-ingredients-default" ? <img src={`${url}-ingredients/${ingredients_image}`} /> : <div className="img-280-172"></div>}
        </div>
        <div className="ingredients">
          {ingredients && ingredients.map(i => (
            <div className="ingredient" key={i.ingredient_name}>
              {i.amount}{' '}{i.measurement_name}{' '}{i.ingredient_name}
            </div>
          ))}
        </div>

        <h2>Required Subrecipes</h2>
        <div className="subrecipes">
          {subrecipes
            ? subrecipes.map(s => <div className="subrecipe" key={s.subrecipe_title}>{s.amount}{' '}{s.measurement_name}{' '}{s.subrecipe_title}</div>)
            : "none"}
        </div>

        <h2>Directions</h2>
        <div className="cooking-image">
          {cooking_image !== "nobsc-recipe-cooking-default" ? <img src={`${url}-cooking/${cooking_image}`} /> : <div className="img-280-172"></div>}
        </div>
        <div className="recipe-directions">{directions}</div>
      </div>

      <div className="two-col-right"></div>
    </div>
  );
}

type Props = {
  favorite():          void;
  favorited:           boolean;
  feedback:            string;
  loading:             boolean;
  myFavoriteRecipes:   IWorkRecipe[];
  myPrivateRecipes:    IWorkRecipe[];
  myPublicRecipes:     IWorkRecipe[];
  mySavedRecipes:      IWorkRecipe[];
  recipe:              IRecipe;
  save():              void;
  saved:               boolean;
  userIsAuthenticated: boolean;
};
