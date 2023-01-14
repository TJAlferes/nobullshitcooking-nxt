import Link from 'next/link';

import { IIngredient } from '../../../store/data/types';

const url = "https://s3.amazonaws.com/nobsc-user-ingredients";

export function Ingredients({ deletePrivateIngredient, myPrivateIngredients }: Props): JSX.Element {
  return (
    <div className="dashboard-content">
      <h2>Private Ingredients</h2>

      <Link href="/user-ingredients/submit" className="new-entity">Create New Ingredient</Link>

      {myPrivateIngredients.length
        ? myPrivateIngredients.map(i => (
          <div className="dashboard-item" key={i.id}>
            <span className="tiny">{i.image !== "nobsc-ingredient-default" ? <img src={`${url}/${i.image}-tiny`} /> : <div className="img-28-18"></div>}</span>

            <span className="name"><Link href={`/user-ingredient/${i.id}`}>{i.name}</Link></span>

            <span className="action"><Link href={`/user-ingredient/edit/${i.id}`}>Edit</Link></span>

            <span className="delete" onClick={() => deletePrivateIngredient(i.id)}>Delete</span>
          </div>
        ))
        : <div className="dashboard-no-content">You haven't created any private ingredients yet.</div>
      }
    </div>
  );
}

type Props = {
  deletePrivateIngredient(id: number): void;
  myPrivateIngredients:                IIngredient[];
};