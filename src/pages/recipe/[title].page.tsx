import axios                   from 'axios';
import Link                    from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch }         from 'react-redux';

import { LoaderSpinner }                   from '../../components';
import { useTypedSelector as useSelector } from '../../store';
import { favoriteRecipe }                  from '../../store/user/favorite/actions';
import { saveRecipe }                      from '../../store/user/save/actions';
import { endpoint }                        from '../../utils/api';

export default function Recipe({ recipe }: {recipe: IRecipe}) {
  const dispatch = useDispatch();
  const my_favorite_recipes = useSelector(state => state.data.my_favorite_recipes);
  const my_private_recipes =  useSelector(state => state.data.my_private_recipes);
  const my_public_recipes =   useSelector(state => state.data.my_public_recipes);
  const my_saved_recipes =    useSelector(state => state.data.my_saved_recipes);
  const message =             useSelector(state => state.user.message);
  const userIsAuthenticated = useSelector(state => state.auth.userIsAuthenticated);

  const [ feedback,  setFeedback ] =  useState("");
  const [ loading,   setLoading ] =   useState(false);
  const [ favorited, setFavorited ] = useState(false);
  const [ saved,     setSaved ] =     useState(false);

  //const url = "https://s3.amazonaws.com/nobsc-user-recipe";
  const {
    recipe_id,
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
    if (!userIsAuthenticated) return;
    if (favorited) return;
    setFavorited(true);
    setLoading(true);
    dispatch(favoriteRecipe(recipe.id));
  };

  const save = () => {
    if (!userIsAuthenticated) return;
    if (saved) return;
    setSaved(true);
    setLoading(true);
    dispatch(saveRecipe(recipe.id));
  };

  return !recipe ? <LoaderSpinner /> : (
    <div className="two-col">
      <div className="two-col-left recipe">
        <h1>{title}</h1>
        <p className="feedback">{feedback}</p>
        <div className="save-area">
          {( userIsAuthenticated && !my_private_recipes.find(r => r.recipe_id === recipe_id) && !my_public_recipes.find(r => r.recipe_id === recipe_id) )
            ? (
              <>
                {my_favorite_recipes.find(r => r.recipe_id === recipe_id)
                  ? <span>Favorited</span>
                  : (
                    !favorited
                    ? <button className="--save" disabled={loading} name="favorite-button" onClick={favorite}>Favorite</button>
                    : <span>Favorited</span>
                  )
                }
                {my_saved_recipes.find(r => r.recipe_id === recipe_id)
                  ? <span>Saved</span>
                  : (
                    !saved
                    ? <button className="--save" disabled={loading} name="save-button" onClick={save}>Save</button>
                    : <span>Saved</span>
                  )
                }
              </>
            )
            : false
          }
        </div>
        <div className="image">
          <img src="/images/dev/sushi-280-172.jpg" />
          {/*recipe_image !== "nobsc-recipe-default" ? <img src={`${url}/${recipe_image}`} /> : <div className="img-280-172"></div>*/}
        </div>
        <div className="author"><b>Author:</b>{' '}{author === "Unknown" ? "Unknown" : <Link href={`/profile/${author}`}>{author}</Link>}</div>
        <div className="description"><b>Author's note:</b>{' '}<em>{description}</em></div>
        <div className="cuisine"><b>Cuisine:</b>{' '}<span>{cuisine_name}</span></div>
        <div className="type"><b>Recipe type:</b>{' '}<span>{recipe_type_name}</span></div>
        <h2>Required Methods</h2>
        <div className="methods">
          {required_methods?.map(m => <div className="method" key={m.method_name}>{m.method_name}</div>)}
        </div>
        <h2>Required Equipment</h2>
        <div className="equipment-image">
          <img src="/images/dev/sushi-280-172.jpg" />
          {/*equipment_image !== "nobsc-recipe-equipment-default" ? <img src={`${url}-equipment/${equipment_image}`} /> : <div className="img-280-172"></div>*/}
        </div>
        <div className="equipments">
          {required_equipment?.map(e => <div className="equipment" key={e.equipment_name}>{e.amount}{' '}{e.equipment_name}</div>)}
        </div>
        <h2>Required Ingredients</h2>
        <div className="ingredients-image">
          <img src="/images/dev/sushi-280-172.jpg" />
          {/*ingredients_image !== "nobsc-recipe-ingredients-default" ? <img src={`${url}-ingredients/${ingredients_image}`} /> : <div className="img-280-172"></div>*/}
        </div>
        <div className="ingredients">
          {required_ingredients?.map(i => (
            <div className="ingredient" key={i.ingredient_name}>
              {i.amount}{' '}{i.unit_name}{' '}{i.ingredient_name}
            </div>
          ))}
        </div>
        <h2>Required Subrecipes</h2>
        <div className="subrecipes">
          {required_subrecipes?.map(s => <div className="subrecipe" key={s.subrecipe_title}>{s.amount}{' '}{s.unit_name}{' '}{s.subrecipe_title}</div>)}
        </div>
        <h2>Directions</h2>
        <div className="cooking-image">
          <img src="/images/dev/sushi-280-172.jpg" />
          {/*cooking_image !== "nobsc-recipe-cooking-default" ? <img src={`${url}-cooking/${cooking_image}`} /> : <div className="img-280-172"></div>*/}
        </div>
        <div className="recipe-directions">{directions}</div>
      </div>
      <div className="two-col-right"></div>
    </div>
  );
}

function slugify(title: string) {
  return title.split(' ').map(word => word.charAt(0).toLowerCase() + word.slice(1)).join('-');
}

/*function unslugify(title: string) {
  return title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}*/

export async function getStaticPaths() {
  const response = await axios.get(`${endpoint}/recipe/titles`);
  const paths = response.data.map((recipe: {title: string}) => ({params: {title: slugify(recipe.title)}}));
  return {paths, fallback: false};
}

export async function getStaticProps({ params }: {params: {title: string}}) {
  const response = await axios.get(`${endpoint}/recipe/${params.title}`);
  return {props: {recipe: response.data}};
}

// TO DO: move types to one location

export interface IRecipe {
  recipe_id:                number;
  recipe_type_id:    number;
  cuisine_id:        number;
  author_id:         number;
  owner_id:          number;

  title:             string;
  recipe_type_name:  string;
  cuisine_name:      string;
  author:            string;
  author_avatar:     string;  // ?
  description:       string;
  active_time:       string;
  total_time:        string;
  directions:        string;

  image_url:         string;
  recipe_image:      string;
  equipment_image:   string;
  ingredients_image: string;
  cooking_image:     string;
  //video:             string;

  required_methods:     RequiredMethod[];
  required_equipment:   RequiredEquipment[];
  required_ingredients: RequiredIngredient[];
  required_subrecipes:  RequiredSubrecipe[];
}

type RequiredMethod = {
  method_name: string;
};

type RequiredEquipment = {
  amount?:        number;
  equipment_name: string;
};

type RequiredIngredient = {
  amount?:         number;
  unit_name?:      string;
  ingredient_name: string;
};

type RequiredSubrecipe = {
  amount?:         number;
  unit_name?:      string;
  subrecipe_title: string;
};
