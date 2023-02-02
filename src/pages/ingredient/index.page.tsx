import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { LoaderSpinner } from '../../components';
import { useTypedSelector as useSelector } from '../../store';
import type { IIngredient } from '../../store/data/types';
import { IngredientView } from './view';

export default function Ingredient(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  const officialIngredients =  useSelector(state => state.data.ingredients);
  const myPrivateIngredients = useSelector(state => state.data.myPrivateIngredients);

  const [ ingredient, setIngredient ] = useState<IIngredient>();

  useEffect(() => {
    if (!id) {
      router.push('/home');
      return;
    }

    const localIngredient = (officialIngredients.find(i => i.id == Number(id)) || myPrivateIngredients.find(i => i.id == Number(id)));

    if (!localIngredient) {
      router.push('/home');
      return;
    }
    
    setIngredient(localIngredient);
  }, []);

  return !ingredient
    ? <LoaderSpinner />
    : <IngredientView ingredient={ingredient} myPrivateIngredients={myPrivateIngredients} />;
}