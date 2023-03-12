import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LoaderSpinner } from '../../components';
import { useTypedSelector as useSelector } from '../../store';
import type { IIngredient } from '../../store/data/types';
import { IngredientView } from './view';

export default function Ingredient() {
  const router = useRouter();
  const params = useSearchParams();
  const id =     Number(params.get('id'));

  const officialIngredients =  useSelector(state => state.data.ingredients);
  const myIngredients =        useSelector(state => state.data.myIngredients);

  const [ ingredient, setIngredient ] = useState<IIngredient>();

  useEffect(() => {
    if (!id) {
      router.push('/');
      return;
    }

    const localIngredient = (officialIngredients.find(i => i.id == Number(id)) || myIngredients.find(i => i.id == Number(id)));

    if (!localIngredient) {
      router.push('/');
      return;
    }
    
    setIngredient(localIngredient);
  }, []);

  return !ingredient ? <LoaderSpinner /> : <IngredientView ingredient={ingredient} myIngredients={myIngredients} />;
}
