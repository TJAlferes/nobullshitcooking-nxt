import Link from 'next/link';

import { IIngredient } from '../../../store/data/types';

export function Ingredients({
  deletePrivateIngredient,
  myPrivateIngredients
}: Props): JSX.Element {
  return (
    <div className="dashboard-content">
      <h2 className="dashboard-content__heading">Private Ingredients</h2>

      <Link href="/user-ingredients/submit">
        <a className="new-entity">Create New Ingredient</a>
      </Link>

      {myPrivateIngredients.length
        ? myPrivateIngredients.map(i => (
          <div className="dashboard-content__item" key={i.id}>
            <span className="dashboard-content__item-tiny">
              {i.image !== "nobsc-ingredient-default"
                ? <img src={`https://s3.amazonaws.com/nobsc-user-ingredients/${i.image}-tiny`} />
                : <div className="image-default-28-18"></div>
              }
            </span>

            <span className="dashboard-content__item-name">
              <Link href={`/user-ingredient/${i.id}`}><a>{i.name}</a></Link>
            </span>

            <span className="dashboard-content__item-action">
              <Link href={`/user-ingredient/edit/${i.id}`}><a>Edit</a></Link>
            </span>

            <span
              className="dashboard-content__item-delete"
              onClick={() => deletePrivateIngredient(i.id)}
            >
              Delete
            </span>
          </div>
        ))
        : (
          <div className="dashboard-content__none">
            You haven't created any private ingredients yet.
          </div>
        )
      }
    </div>
  );
}

type Props = {
  deletePrivateIngredient(id: number): void;
  myPrivateIngredients: IIngredient[];
};