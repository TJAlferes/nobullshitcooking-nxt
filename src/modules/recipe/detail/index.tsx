import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useApi, useAuth, useUserData, getMyFavoriteRecipes, getMySavedRecipes } from '../../../store';
import type { Ownership } from '../../shared/types';

export default function RecipeDetail({ ownership, recipe }: Props) {
  const router = useRouter();

  const { api } = useApi();
  const { auth_id, authname } = useAuth();
  const { my_favorite_recipes, my_saved_recipes } = useUserData();

  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const [favorited, setFavorited] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const {
    recipe_id,
    author_id,
    owner_id,
    author,
    author_avatar,
    title,
    description,
    cuisine_name,
    recipe_type_name,
    active_time,
    total_time,
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

  const favorite = async () => {
    if (favorited) return;
    setLoading(true);
    window.scrollTo(0, 0);
    try {
      const res = await api.post(`/users/${authname}/favorite-recipes/${recipe_id}`);
      if (res.status === 201) {
        setFavorited(true);
        setFeedback('Recipe favorited.');
        await getMyFavoriteRecipes();
      } else {
        setFeedback(res.data.message);
      }
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    } finally {
      setTimeout(() => {
        setLoading(false);
        setFeedback('');
      }, 4000);
    }
  };

  const save = async () => {
    if (saved) return;
    setLoading(true);
    window.scrollTo(0, 0);
    try {
      const res = await api.post(`/users/${authname}/saved-recipes/${recipe_id}`);
      if (res.status === 201) {
        setSaved(true);
        setFeedback('Recipe saved.');
        await getMySavedRecipes();
      } else {
        setFeedback(res.data.message);
      }
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    } finally {
      setTimeout(() => {
        setLoading(false);
        setFeedback('');
      }, 4000);
    }
  };

  const url1 = `https://s3.amazonaws.com/nobsc-${ownership}-uploads/recipe`;
  let url2 = '/';
  if (ownership === 'private') {
    if (auth_id !== owner_id) {
      router.push('/404');
      return false;
    }
    url2 = `/${auth_id}`;
  } else if (ownership === 'public') {
    url2 = `/${author_id}`;
  }

  return (
    <div className="one-col recipe-detail">
      <h1>{title}</h1>

      <p className="feedback">{feedback}</p>

      <div className="image">
        {recipe_image.image_filename !== "default"
          ? <img src={`${url1}${url2}/${recipe_image.image_filename}-medium.jpg`} />
          : <div className="img-280-280"></div>}
      </div>

      <div className="pair author">
        <span className="bold">Author:</span>
        <img
          src={author_avatar.image_filename === 'default'
            ? `https://s3.amazonaws.com/nobsc-official-uploads/avatar/default-tiny.jpg`
            : `https://s3.amazonaws.com/nobsc-public-uploads/avatar/${author_id}/${author_avatar.image_filename}-tiny.jpg`
          }
        />
        <span>
          {author === 'Unknown' ? 'Unknown' : <Link href={`/${author}/profile`}>{author}</Link>}
        </span>
      </div>
      <div className="pair authors-note">
        <span className="bold">Description:</span>
        <span className="description">"{description}"</span>
      </div>
      <div className="pair times">
        <span className="bold">Active Time:</span>
        <span className="time">{active_time.slice(0, -3)}</span>
      </div>
      <div className="pair times">
        <span className="bold">Total Time:</span>
        <span className="time">{total_time.slice(0, -3)}</span>
      </div>
      <div className="pair cuisine">
        <span className="bold">Cuisine:</span>
        <span className="cuisine-name">{cuisine_name}</span>
      </div>
      <div className="pair recipe-type">
        <span className="bold">Recipe Type:</span>
        <span className="recipe-type-name">{recipe_type_name}</span>
      </div>
      <div className="pair required-methods">
        <span className="bold">Required Methods:</span>
        <div className="methods">
          {required_methods?.map(m => (
            <div className="method" key={m.method_name}>{m.method_name}</div>
          ))}
        </div>
      </div>

      {( !authname || (authname === author) || (ownership === 'private') ) ? false : (
        <div className="save-area">
          {my_favorite_recipes.find(r => r.recipe_id === recipe_id)
            ? <span>Favorited</span>
            : (
              !favorited
              ? (
                <button
                  className="submit-button"
                  disabled={loading}
                  name="favorite-button"
                  onClick={favorite}
                >Favorite</button>
              )
              : <span>Favorited</span>
            )
          }
  
          {my_saved_recipes.find(r => r.recipe_id === recipe_id)
            ? <span>Saved</span>
            : (
              !saved
              ? (
                <button
                  className="submit-button"
                  disabled={loading}
                  name="save-button"
                  onClick={save}
                >Save</button>
              )
              : <span>Saved</span>
            )
          }
        </div>
      )}

      <div className='required'>
        <h2>Required Equipment</h2>
        <div className="equipments">
          {required_equipment?.map(e => (
            <div className="equipment" key={e.equipment_name}>
              {e.amount}{' '}{e.equipment_name}
            </div>
          ))}
        </div>
        <div className="equipment-image">
          {equipment_image.image_filename !== "default"
            ? <img src={`${url1}-equipment${url2}/${equipment_image.image_filename}-medium.jpg`} />
            : <div className="img-560-346"></div>}
        </div>
      </div>

      <div className='required'>
        <h2>Required Ingredients</h2>
        <div className="ingredients">
          {required_ingredients?.map(i => (
            <div className="ingredient" key={i.ingredient_fullname}>
              {i.amount}{' '}{i.unit_name}{' '}{i.ingredient_fullname}
            </div>
          ))}
        </div>
        <div className="ingredients-image">
          {ingredients_image.image_filename !== "default"
            ? <img src={`${url1}-ingredients${url2}/${ingredients_image.image_filename}-medium.jpg`} />
            : <div className="img-560-346"></div>}
        </div>
      </div>

      {!required_subrecipes ? false : (
        <div className='required'>
          <h2>Required Subrecipes</h2>
          <div className="subrecipes">
            {required_subrecipes?.map(s => (
              <div className="subrecipe" key={s.subrecipe_title}>
                {s.amount}{' '}{s.unit_name}{' '}{s.subrecipe_title}
              </div>
            ))}
          </div>
        </div>
      )}

      <h2>Directions</h2>
      <div className="recipe-directions">{directions}</div>
      <div className="cooking-image">
        {cooking_image.image_filename !== "default"
          ? <img src={`${url1}-cooking${url2}/${cooking_image.image_filename}-medium.jpg`} />
          : <div className="img-560-346"></div>}
      </div>
    </div>
  );
}

type Props = {
  recipe:    RecipeDetailView;
  ownership: Ownership;
};

export type RecipeDetailView = {
  recipe_id:            string;
  owner_id:             string;
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
  image_id: string;
  caption:  string;
};

type RequiredMethodView = {
  method_name: string;
};

type RequiredEquipmentView = {
  amount:         number | null;
  equipment_name: string;
};

type RequiredIngredientView = {
  amount:              number | null;
  unit_name:           string | null;
  ingredient_fullname: string;
};

type RequiredSubrecipeView = {
  amount:          number | null;
  unit_name:       string | null;
  subrecipe_title: string;
};
