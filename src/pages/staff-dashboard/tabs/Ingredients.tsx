import Link from 'next/link';

import { IIngredient } from '../../../store/data/types';

export function Ingredients({ handleDeleteIngredient, ingredients }: Props): JSX.Element {
  return (
    <div className="dashboard-content">
      <h2>Ingredients</h2>

      <Link className="new-entity" href="/ingredient/submit">Create New Ingredient</Link>

      {ingredients.map(i => (
        <div className="dashboard-item" key={i.id}>
          <span className="name"><Link href={`/ingredient/${i.id}`}>{i.name}</Link></span>

          <span className="action"><Link href={`/ingredient/edit/${i.id}`}>Edit</Link></span>

          <span className="delete" onClick={() => handleDeleteIngredient(i.id)}>Delete</span>
        </div>
      ))}
    </div>
  );
}

type Props = {
  handleDeleteIngredient(id: number): void;
  ingredients:                        IIngredient[];
};