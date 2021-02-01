import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { LoaderSpinner } from '../../components/LoaderSpinner/LoaderSpinner';
import {
  NOBSCBackendAPIEndpointOne
} from '../../config/NOBSCBackendAPIEndpointOne';
import { useTypedSelector as useSelector } from '../../store';
import { userFavoriteRecipe } from '../../store/user/favorite/actions';
import { userSaveRecipe } from '../../store/user/save/actions';
import { RecipeView } from './RecipeView';

const endpoint = NOBSCBackendAPIEndpointOne;

export default function Recipe({ twoColumnBTheme }: Props): JSX.Element {
  const router = useRouter();
  const { pathname } = router;
  const { id } = router.query;

  const dispatch = useDispatch();
  const {
    myFavoriteRecipes,
    myPrivateRecipes,
    myPublicRecipes,
    mySavedRecipes
  } = useSelector(state => state.data);
  const message = useSelector(state => state.user.message);
  const userIsAuthenticated =
    useSelector(state => state.auth.userIsAuthenticated);

  const [ favoriteClicked, setFavoriteClicked ] = useState(false);
  const [ feedback, setFeedback ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ recipe, setRecipe ] = useState<IRecipe>();
  const [ saveClicked, setSaveClicked ] = useState(false);

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

  useEffect(() => {
    if (!id) {
      router.push('/home');
      return;
    }

    const getPrivateRecipe = async (id: number) => {
      const res = await axios.post(
        `${endpoint}/user/recipe/private/one`,
        {id},
        {withCredentials: true}
      );
      if (res.data) setRecipe(res.data);
      //else TO DO (and on all other component fetches) (react query?)
    };

    const getPublicRecipe = async (id: number) => {
      const res = await axios.get(`${endpoint}/recipe/${id}`);
      if (res.data) setRecipe(res.data);
      //else TO DO
    };

    const isPrivateUserRecipe =
      pathname.match(/^(\/user-recipe\/([1-9][0-9]*))$/);
    
    if (isPrivateUserRecipe) getPrivateRecipe(Number(id));
    else getPublicRecipe(Number(id));
  }, []);

  const handleFavoriteClick = () => {
    if (!userIsAuthenticated) return;
    if (favoriteClicked) return;
    setFavoriteClicked(true);
    setLoading(true);
    dispatch(userFavoriteRecipe(Number(id)));
  };

  const handleSaveClick = () => {
    if (!userIsAuthenticated) return;
    if (saveClicked) return;
    setSaveClicked(true);
    setLoading(true);
    dispatch(userSaveRecipe(Number(id)));
  };

  return !recipe
  ? <LoaderSpinner />
  : (
    <RecipeView
      myFavoriteRecipes={myFavoriteRecipes}
      myPrivateRecipes={myPrivateRecipes}
      myPublicRecipes={myPublicRecipes}
      mySavedRecipes={mySavedRecipes}
      favoriteClicked={favoriteClicked}
      feedback={feedback}
      handleFavoriteClick={handleFavoriteClick}
      handleSaveClick={handleSaveClick}
      loading={loading}
      recipe={recipe}
      saveClicked={saveClicked}
      twoColumnBTheme={twoColumnBTheme}
      userIsAuthenticated={userIsAuthenticated}
    />
  );
}

export interface IRecipe {
  id: number;
  recipe_type_id: number;
  cuisine_id: number;
  author_id: number;
  owner_id: number;
  title: string;
  recipe_type_name: string;
  cuisine_name: string;
  author: string;
  author_avatar: string;
  description: string;
  active_time: string;
  total_time: string;
  directions: string;
  recipe_image: string;
  equipment_image: string;
  ingredients_image: string;
  cooking_image: string;
  required_methods: IRequiredMethod[];
  required_equipment: IRequiredEquipment[];
  required_ingredients: IRequiredIngredient[];
  required_subrecipes: IRequiredSubrecipe[];
}

interface IRequiredMethod {
  method_name: string;
}

interface IRequiredEquipment {
  amount: number;
  equipment_name: string;
}

interface IRequiredIngredient {
  amount: number;
  measurement_name: string;
  ingredient_name: string;
}

interface IRequiredSubrecipe {
  amount: number;
  measurement_name: string;
  subrecipe_title: string;
}

type Props = {
  twoColumnBTheme: string;
};