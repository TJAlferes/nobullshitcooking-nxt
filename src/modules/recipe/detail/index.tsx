import Link                    from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch }         from 'react-redux';

import { useTypedSelector as useSelector } from '../../../redux';
import { LoaderSpinner }  from '../../shared/LoaderSpinner';
import { saveRecipe }     from '../../user/private/saved-recipe/state';
import { favoriteRecipe } from '../../user/public/favorited-recipe/state';

export default function RecipeDetail({ recipe, ownership }: Props) {
  if (!recipe) {
    return <LoaderSpinner />;
  }
  
  const {
    recipe_id,
    author_id,
    author,
    title,
    description,
    cuisine_name,
    recipe_type_name,
    directions,
    required_equipment,
    required_ingredients,
    required_subrecipes,
    required_methods,
    recipe_image,
    equipment_image,
    ingredients_image,
    cooking_image
  } = recipe;

  const url = `https://s3.amazonaws.com/nobsc/user/${ownership}/recipe`;

  // TO DO: move logic out of return
  return (
    <div className="two-col">
      <div className="two-col-left recipe">
        <h1>{title}</h1>

        <SaveArea recipe_id={recipe_id} author_id={author_id} ownership={ownership} />

        <div className="image">
          {
            recipe_image.image_filename !== "default"
            ? <img src={`${url}/${author_id}/${recipe_image.image_filename}`} />
            : <div className="img-560-346"></div>
          }
        </div>

        <div className="author">
          <b>Author:</b>
          {' '}
          {
            author === "Unknown"
            ? "Unknown"
            : <Link href={`/profile/${author}`}>{author}</Link>
          }
        </div>

        {/* active_time total_time */}

        <div className="description">
          <b>Author's note:</b>{' '}<em>{description}</em>
        </div>

        <div className="cuisine">
          <b>Cuisine:</b>{' '}<span>{cuisine_name}</span>
        </div>

        <div className="type">
          <b>Recipe type:</b>{' '}<span>{recipe_type_name}</span>
        </div>

        <h2>Required Methods</h2>
        <div className="methods">
          {required_methods?.map(m => (
            <div className="method" key={m.method_name}>{m.method_name}</div>
          ))}
        </div>

        <h2>Required Equipment</h2>
        <div className="equipment-image">
          {
            equipment_image.image_filename !== "default"
            ? <img src={`${url}-equipment/${author_id}/${equipment_image.image_filename}`} />
            : <div className="img-560-346"></div>
          }
        </div>
        <div className="equipments">
          {required_equipment?.map(e => (
            <div className="equipment" key={e.equipment_name}>
              {e.amount}{' '}{e.equipment_name}
            </div>
          ))}
        </div>

        <h2>Required Ingredients</h2>
        <div className="ingredients-image">
          {
            ingredients_image.image_filename !== "default"
            ? <img src={`${url}-ingredients/${author_id}/${ingredients_image.image_filename}`} />
            : <div className="img-560-346"></div>
          }
        </div>
        <div className="ingredients">
          {required_ingredients?.map(i => (
            <div className="ingredient" key={i.ingredient_fullname}>
              {i.amount}{' '}{i.unit_name}{' '}{i.ingredient_fullname}
            </div>
          ))}
        </div>

        <h2>Required Subrecipes</h2>
        <div className="subrecipes">
          {required_subrecipes?.map(s => (
            <div className="subrecipe" key={s.subrecipe_title}>
              {s.amount}{' '}{s.unit_name}{' '}{s.subrecipe_title}
            </div>
          ))}
        </div>

        <h2>Directions</h2>
        <div className="cooking-image">
          {
            cooking_image.image_filename !== "default"
            ? <img src={`${url}-cooking/${author_id}/${cooking_image.image_filename}`} />
            : <div className="img-560-346"></div>
          }
        </div>
        <div className="recipe-directions">{directions}</div>
      </div>

      <div className="two-col-right"></div>
    </div>
  );
}

type Props = {
  recipe:    RecipeDetailView;
  ownership: Ownership;
};

type Ownership = "offical" | "private" | "public";

export type RecipeDetailView = {
  recipe_id:            string;
  author_id:            string;
  author:               string;
  author_avatar:        ImageView;
  recipe_type_name:     string;
  cuisine_name:         string;
  title:                string;
  description:          string;
  active_time:          string;
  total_time:           string;
  directions:           string;
  recipe_image:         ImageWithCaptionView;
  equipment_image:      ImageWithCaptionView;
  ingredients_image:    ImageWithCaptionView;
  cooking_image:        ImageWithCaptionView;
  required_methods:     RequiredMethodView[];
  required_equipment:   RequiredEquipmentView[];
  required_ingredients: RequiredIngredientView[];
  required_subrecipes:  RequiredSubrecipeView[];
};

type ImageView = {
  image_filename: string;
};

type ImageWithCaptionView = ImageView & {
  caption: string;
};

type RequiredMethodView = {
  method_name: string;
};

type RequiredEquipmentView = {
  amount:              number | null;
  equipment_name:      string;
};

type RequiredIngredientView = {
  amount:              number | null;
  unit_name:           string | null;
  ingredient_fullname: string;
};

type RequiredSubrecipeView = {
  amount:              number | null;
  unit_name:           string | null;
  subrecipe_title:     string;
};

function SaveArea({ recipe_id, author_id, ownership }: SaveAreaProps) {
  if (ownership === "private") return false;  // null? fragment?

  const dispatch = useDispatch();
  const my_favorite_recipes = useSelector(state => state.userData.my_favorite_recipes);
  const my_saved_recipes    = useSelector(state => state.userData.my_saved_recipes);
  const message             = useSelector(state => state.system.message);
  const authname            = useSelector(state => state.authentication.authname);

  const [ feedback,  setFeedback ]  = useState("");
  const [ loading,   setLoading ]   = useState(false);

  const [ favorited, setFavorited ] = useState(false);
  const [ saved,     setSaved ]     = useState(false);

  if (!authname) return false;  // null? fragment?
  if (authname === author_id) return false;  // cannot favorite/save your own recipe

  // move to 'useFeedback' ?
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      if (message !== "") window.scrollTo(0, 0);
      setFeedback(message);
      setLoading(false);
    }
    return () => {
      isSubscribed = false;
    };
  }, [message]);

  const favorite = () => {
    if (favorited) return;
    setFavorited(true);
    setLoading(true);
    dispatch(favoriteRecipe(recipe_id));
  };

  const save = () => {
    if (saved) return;
    setSaved(true);
    setLoading(true);
    dispatch(saveRecipe(recipe_id));
  };

  return (
    <>
      <p className="feedback">{feedback}</p>

      <div className="save-area">
        {
          my_favorite_recipes.find(r => r.recipe_id === recipe_id)
          ? <span>Favorited</span>
          : (
            !favorited
            ? (
              <button
                className="--save"
                disabled={loading}
                name="favorite-button"
                onClick={favorite}
              >Favorite</button>
            )
            : <span>Favorited</span>
          )
        }
        {
          my_saved_recipes.find(r => r.recipe_id === recipe_id)
          ? <span>Saved</span>
          : (
            !saved
            ? (
              <button
                className="--save"
                disabled={loading}
                name="save-button"
                onClick={save}
              >Save</button>
            )
            : <span>Saved</span>
          )
        }
      </div>
    </>
  );
}

type SaveAreaProps = {
  ownership: Ownership;
  recipe_id: string;
  author_id: string;
};
