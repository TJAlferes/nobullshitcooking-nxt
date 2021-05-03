import Link from 'next/link';

import { IWorkRecipe } from '../../../store/data/types';
import { Subtabs } from '.';

export function SavedRecipes({
  subTabClick,
  unsaveRecipe,
  mySavedRecipes,
  subTab
}: Props): JSX.Element {
  return (
    <div className="dashboard-content">
      <h2 className="dashboard__h2--tall">Saved Recipes</h2>

      <Subtabs subTabClick={subTabClick} subTab={subTab} />

      {mySavedRecipes.length
        ? mySavedRecipes.map(r => (
          <div className="dashboard-item" key={r.id}>
            <span className="dashboard-item-tiny">
              {r.recipe_image !== "nobsc-recipe-default"
                ? <img src={`https://s3.amazonaws.com/nobsc-user-recipe/${r.recipe_image}-tiny`} />
                : <div className="img-28-18"></div>
              }
            </span>

            <span className="dashboard-item-name">
              <Link href={`/recipe/${r.id}`}>
                <a className="dashboard-item__a">{r.title}</a>
              </Link>
            </span>

            <span
              className="dashboard-item-unsave"
              onClick={() => unsaveRecipe(r.id)}
            >
              Unsave
            </span>
          </div>
        ))
        : (
          <div className="dashboard-no-content">
            You haven't saved any recipes yet.
          </div>
        )
      }
    </div>
  );
}

type Props = {
  subTabClick(e: React.SyntheticEvent<EventTarget>): void;
  unsaveRecipe(id: number): void;
  mySavedRecipes: IWorkRecipe[];
  subTab: string;
};