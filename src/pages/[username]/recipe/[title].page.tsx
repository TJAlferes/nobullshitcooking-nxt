import axios                   from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch }         from 'react-redux';

import { LoaderSpinner }                   from '../../../components';
import { useTypedSelector as useSelector } from '../../../store';
import { favoriteRecipe }                  from '../../../store/user/favorite/actions';
import { saveRecipe }                      from '../../../store/user/save/actions';
import { endpoint }                        from '../../../utils/api';
import type { IRecipe }                    from '../../../types';
import { RecipeView }                      from './view';

export default function UserRecipe({ recipe }: {recipe: IRecipe}) {
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

export async function getServerSideProps({ params }: {params: {title: string}}) {
  const response = await axios.get(`${endpoint}/user/recipe/${params.title}`);  // public
  //const response = await axios.post(`${endpoint}/user/recipe/private/one`, {title: params.title}, {withCredentials: true});  // private
  return {props: {recipe: response.data}};
}
