import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { LoaderSpinner } from '../../components';
import { NOBSCAPI as endpoint } from '../../config/NOBSCAPI';
import { useTypedSelector as useSelector } from '../../store';
import { userFavoriteRecipe } from '../../store/user/favorite/actions';
import { userSaveRecipe } from '../../store/user/save/actions';
import { RecipeView } from './view';

export default function Recipe(): JSX.Element {
  const router = useRouter();
  const { pathname } = router;
  const { id } = router.query;

  const dispatch = useDispatch();
  const { myFavoriteRecipes, myPrivateRecipes, myPublicRecipes, mySavedRecipes } = useSelector(state => state.data);  // don't destructure useSelector?
  const message = useSelector(state => state.user.message);
  const theme = useSelector(state => state.theme.theme);
  const userIsAuthenticated = useSelector(state => state.auth.userIsAuthenticated);

  const [ favorited, setFavorited ] = useState(false);
  const [ feedback,  setFeedback ] =  useState("");
  const [ loading,   setLoading ] =   useState(false);
  const [ recipe,    setRecipe ] =    useState<IRecipe>();
  const [ saved,     setSaved ] =     useState(false);

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
      const res = await axios.post(`${endpoint}/user/recipe/private/one`, {id}, {withCredentials: true});
      if (res.data) setRecipe(res.data);
      //else TO DO (and on all other component fetches) (react query?)
    };

    const getPublicRecipe = async (id: number) => {
      const res = await axios.get(`${endpoint}/recipe/${id}`);
      if (res.data) setRecipe(res.data);
      //else TO DO
    };

    const isPrivateUserRecipe = pathname.match(/^(\/user-recipe\/([1-9][0-9]*))$/);
    
    if (isPrivateUserRecipe) getPrivateRecipe(Number(id));
    else getPublicRecipe(Number(id));
  }, []);

  const favorite = () => {
    if (!userIsAuthenticated) return;
    if (favorited) return;
    setFavorited(true);
    setLoading(true);
    dispatch(userFavoriteRecipe(Number(id)));
  };

  const save = () => {
    if (!userIsAuthenticated) return;
    if (saved) return;
    setSaved(true);
    setLoading(true);
    dispatch(userSaveRecipe(Number(id)));
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
        theme={theme}
        userIsAuthenticated={userIsAuthenticated}
      />
    );
}

export interface IRecipe {
  id:                   number;
  recipe_type_id:       number;
  cuisine_id:           number;
  author_id:            number;
  owner_id:             number;
  title:                string;
  recipe_type_name:     string;
  cuisine_name:         string;
  author:               string;
  author_avatar:        string;
  description:          string;
  active_time:          string;
  total_time:           string;
  directions:           string;
  recipe_image:         string;
  equipment_image:      string;
  ingredients_image:    string;
  cooking_image:        string;
  methods:     IRequiredMethod[];
  equipment:   IRequiredEquipment[];
  ingredients: IRequiredIngredient[];
  subrecipes:  IRequiredSubrecipe[];
}

interface IRequiredMethod {
  method_name: string;
}

interface IRequiredEquipment {
  amount:         number;
  equipment_name: string;
}

interface IRequiredIngredient {
  amount:           number;
  measurement_name: string;
  ingredient_name:  string;
}

interface IRequiredSubrecipe {
  amount:           number;
  measurement_name: string;
  subrecipe_title:  string;
}