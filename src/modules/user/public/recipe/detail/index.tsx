import axios                   from 'axios';
import Link                    from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch }         from 'react-redux';

import { LoaderSpinner }                   from '../../../components';
import { useTypedSelector as useSelector } from '../../../store';
import { favoriteRecipe }                  from '../../../store/user/favorite/actions';
import { saveRecipe }                      from '../../../store/user/save/actions';
import { endpoint }                        from '../../../utils/api';
import type { Recipe }                     from '../../../types';

export default function UserPublicRecipeDetail({ recipe }: {recipe: Recipe}) {
  const dispatch = useDispatch();

  const my_favorite_recipes = useSelector(state => state.data.my_favorite_recipes);
  const my_private_recipes  = useSelector(state => state.data.my_private_recipes);
  const my_public_recipes   = useSelector(state => state.data.my_public_recipes);
  const my_saved_recipes    = useSelector(state => state.data.my_saved_recipes);
  const message             = useSelector(state => state.user.message);
  const userIsAuthenticated = useSelector(state => state.auth.userIsAuthenticated);

  const [ feedback,  setFeedback ]  = useState("");
  const [ loading,   setLoading ]   = useState(false);
  const [ favorited, setFavorited ] = useState(false);
  const [ saved,     setSaved ]     = useState(false);

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
    //recipe_image,
    //equipment_image,
    //ingredients_image,
    //cooking_image
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
    dispatch(favoriteRecipe(recipe_id));
  };

  const save = () => {
    if (!userIsAuthenticated) return;
    if (saved) return;
    setSaved(true);
    setLoading(true);
    dispatch(saveRecipe(recipe_id));
  };

  if (!recipe) return <LoaderSpinner />;

  // TO DO: move logic out of return
  return (
    <div className="two-col">
      <div className="two-col-left recipe">
        <h1>{title}</h1>

        <p className="feedback">{feedback}</p>

        <div className="save-area">
          {
            (
              userIsAuthenticated
              && !my_private_recipes.find(r => r.recipe_id === recipe_id)
              && !my_public_recipes.find(r => r.recipe_id === recipe_id)
            )
            ? (
              <>
                {
                  my_favorite_recipes.find(r => r.recipe_id == recipe_id)
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
                  my_saved_recipes.find(r => r.recipe_id == recipe_id)
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
              </>
            )
            : false
          }
        </div>

        <div className="image">
          <img src="/images/dev/sushi-280-172.jpg" />
          {/*recipe_image !== "nobsc-recipe-default" ? <img src={`${url}/${recipe_image}`} /> : <div className="img-280-172"></div>*/}
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
          <img src="/images/dev/sushi-280-172.jpg" />
          {/*equipment_image !== "nobsc-recipe-equipment-default" ? <img src={`${url}-equipment/${equipment_image}`} /> : <div className="img-280-172"></div>*/}
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
          {required_subrecipes?.map(s => (
            <div className="subrecipe" key={s.subrecipe_title}>
              {s.amount}{' '}{s.unit_name}{' '}{s.subrecipe_title}
            </div>
          ))}
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

export async function getServerSideProps({ params }: ServerSideProps) {
  const response = await axios.get(
    `${endpoint}/user/recipe/public/${params.username}/${params.title}`  // change to user/public/recipe ???
  );  // public user recipe

  return {
    props: {
      recipe: response.data
    }
  };
}

type ServerSideProps = {
  params: {
    username: string;
    title:    string;
  };
};