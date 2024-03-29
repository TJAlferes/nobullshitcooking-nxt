import { useRouter } from 'next/navigation';

import { useAuth } from '../../../store';
import type { IngredientView } from '../../../store';
import { LoaderSpinner } from '../../shared/LoaderSpinner';
import type { Ownership } from '../../shared/types';

export default function IngredientDetail({ ownership, ingredient }: Props) {
  const router = useRouter();

  const { auth_id } = useAuth();

  if (!ingredient) return <LoaderSpinner />;  // or return router.push('/404'); ???

  const {
    owner_id,
    fullname,
    image_filename,
    caption,
    ingredient_type_name,
    notes
  } = ingredient;

  let url = `https://s3.amazonaws.com/nobsc-${ownership}-uploads/ingredient`;
  if (ownership === 'private') {
    if (auth_id !== owner_id) {
      router.push('/404');
      return false;
    }
    url += `/${auth_id}`;
  }

  return (
    <div className="one-col ingredient-detail">
      <h1>{fullname}</h1>

      <div className="image">
        <img src={`${url}/${image_filename}.jpg`} />
        <span>{caption}</span>
      </div>

      <div className="type">
        <b>Ingredient Type:</b>{' '}<span>{ingredient_type_name}</span>
      </div>
      
      <div className="notes">
        <b>Ingredient Notes:</b>{' '}<div>{notes}</div>
      </div>
    </div>
  );
}

type Props = {
  ownership:  Ownership;
  ingredient: IngredientView;
};
