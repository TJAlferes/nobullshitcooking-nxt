import Link from 'next/link';

import type { IRecipe } from '../../../store/plannerView/types';

const url = "https://s3.amazonaws.com/nobsc-user-recipe";

export function Recipe({ recipe: { id, owner_id, title, recipe_image } }: Props) {
  return (
    <div className="plan-recipe">
      <div className="image">
        <img src={`${url}/${recipe_image}-tiny`} />
      </div>
      <div className="text">
        <Link href={Number(owner_id) === 1 ? `/recipes/${id}` : `/user-recipes/${id}`}>{title}</Link>
      </div>
    </div>
  );
}

type Props = {
  recipe: IRecipe;
};
