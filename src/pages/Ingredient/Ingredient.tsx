import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { LoaderSpinner } from '../../components/LoaderSpinner/LoaderSpinner';
import { useTypedSelector as useSelector } from '../../store';
import { IIngredient } from '../../store/data/types';
import { IngredientView } from './IngredientView';

export function Ingredient({ twoColumnBTheme }: Props): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  const officialIngredients =
    useSelector(state => state.data.officialIngredients);
  const myPrivateIngredients =
    useSelector(state => state.data.myPrivateIngredients);

  const [ ingredient, setIngredient ] = useState<IIngredient | null>(null);

  useEffect(() => {
    if (!id) {
      router.push('/home');
      return;
    }

    const localIngredient = (
      officialIngredients.find(i => i.id == Number(id)) ||
      myPrivateIngredients.find(i => i.id == Number(id))
    );

    if (!localIngredient) {
      router.push('/home');
      return;
    }
    
    setIngredient(localIngredient);
  }, []);

  return !ingredient
  ? <LoaderSpinner />
  : (
    <IngredientView
      myPrivateIngredients={myPrivateIngredients}
      ingredient={ingredient}
      twoColumnBTheme={twoColumnBTheme}
    />
  );
}

type Props = {
  twoColumnBTheme: string;
};

export default Ingredient;