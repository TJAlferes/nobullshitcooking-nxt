import Link from 'next/link';

import { IWorkRecipe } from '../../../store/data/types';
import { Subtabs } from '.';

const url = "https://s3.amazonaws.com/nobsc-user-recipe";

export function FavoriteRecipes({ myFavoriteRecipes, subTab, subTabClick, unfavoriteRecipe }: Props): JSX.Element {
  return (
    <div className="dashboard-content">
      <h2 className="--tall">Favorite Recipes</h2>

      <Subtabs subTab={subTab} subTabClick={subTabClick} />

      {myFavoriteRecipes.length
        ? myFavoriteRecipes.map(r => (
          <div className="dashboard-item" key={r.id}>
            <span className="tiny">
              {r.recipe_image !== "nobsc-recipe-default" ? <img src={`${url}/${r.recipe_image}-tiny`} /> : <div className="img--28-18"></div>}
            </span>

            <span className="name"><Link href={`/recipe/${r.id}`}>{r.title}</Link></span>

            <span className="unfavorite" onClick={() => unfavoriteRecipe(r.id)}>Unfavorite</span>
          </div>
        ))
        : <div className="no-content">You haven't favorited any recipes yet.</div>
      }
    </div>
  );
}

type Props = {
  myFavoriteRecipes:                                 IWorkRecipe[];
  subTab:                                            string;
  subTabClick(e: React.SyntheticEvent<EventTarget>): void;
  unfavoriteRecipe(id: number):                      void;
};