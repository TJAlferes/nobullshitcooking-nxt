import Link from 'next/link';
import React from 'react';

import { IPlannerViewRecipe } from '../../../store/plannerView/types';

export function Recipe({ recipe }: Props): JSX.Element {
  return (
    <div className="plan__recipe">
      <div className="plan__recipe-image">
        <img src={`https://s3.amazonaws.com/nobsc-user-recipe/${recipe.recipe_image}-tiny`} />
      </div>
      
      <div className="plan__recipe-text">
        <Link
          href={
            Number(recipe.owner_id) === 1
            ? `/recipes/${recipe.id}`
            : `/user-recipes/${recipe.id}`
          }
        >
          <a>{recipe.title}</a>
        </Link>
      </div>
    </div>
  );
}

type Props = {
  recipe: IPlannerViewRecipe;
};