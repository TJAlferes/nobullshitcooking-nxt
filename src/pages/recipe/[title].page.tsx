import axios                   from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch }         from 'react-redux';

import { LoaderSpinner }                   from '../../components';
import { useTypedSelector as useSelector } from '../../store';
import { favoriteRecipe }                  from '../../store/user/favorite/actions';
import { saveRecipe }                      from '../../store/user/save/actions';
import { endpoint }                        from '../../utils/api';
import { RecipeView }                      from './view';

export default function Recipe({ recipe }: {recipe: IRecipe}) {
  const dispatch = useDispatch();
  const myFavoriteRecipes =   useSelector(state => state.data.myFavoriteRecipes);
  const myPrivateRecipes =    useSelector(state => state.data.myPrivateRecipes);
  const myPublicRecipes =     useSelector(state => state.data.myPublicRecipes);
  const mySavedRecipes =      useSelector(state => state.data.mySavedRecipes);
  const message =             useSelector(state => state.user.message);
  const userIsAuthenticated = useSelector(state => state.auth.userIsAuthenticated);

  const [ feedback,  setFeedback ] =  useState("");
  const [ loading,   setLoading ] =   useState(false);
  const [ favorited, setFavorited ] = useState(false);
  const [ saved,     setSaved ] =     useState(false);

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

  return !recipe
    ? <LoaderSpinner />
    : (
      <RecipeView
        favorite={favorite}
        favorited={favorited}
        feedback={feedback}
        loading={loading}
        myFavoriteRecipes={myFavoriteRecipes}
        myPrivateRecipes={myPrivateRecipes}
        myPublicRecipes={myPublicRecipes}
        mySavedRecipes={mySavedRecipes}
        recipe={recipe}
        save={save}
        saved={saved}
        userIsAuthenticated={userIsAuthenticated}
      />
    );
}

export async function getStaticPaths() {
  const response = await axios.get(`${endpoint}/recipe/titles`);
  const paths = response.data.map((recipe: {title: string}) => ({params: {title: recipe.title}}));
  return {paths, fallback: false};
}

export async function getStaticProps({ params }: {params: {title: string}}) {
  const response = await axios.get(`${endpoint}/recipe/${params.title}`);
  return {props: {recipe: response.data}};
}

export interface IRecipe {
  id:                number;
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

  recipe_image:      string;
  equipment_image:   string;
  ingredients_image: string;
  cooking_image:     string;
  //video:             string;

  methods:           RequiredMethod[];
  equipment:         RequiredEquipment[];
  ingredients:       RequiredIngredient[];
  subrecipes:        RequiredSubrecipe[];
}

type RequiredMethod = {
  method_name: string;
};

type RequiredEquipment = {
  amount:         number;
  equipment_name: string;
};

type RequiredIngredient = {
  amount:           number;
  measurement_name: string;
  ingredient_name:  string;
};

type RequiredSubrecipe = {
  amount:           number;
  measurement_name: string;
  subrecipe_title:  string;
};

/*
move to separate dynamic route
const privateRecipe = pathname.match(/^(\/user-recipe\/([1-9][0-9]*))$/);

  const response = privateRecipe
    ? await axios.post(`${endpoint}/user/recipe/private/one`, {id}, {withCredentials: true})
    : await axios.get(`${endpoint}/recipe/${id}`);
*/
