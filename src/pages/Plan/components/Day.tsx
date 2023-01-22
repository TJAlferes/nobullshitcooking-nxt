import { useDispatch } from 'react-redux';

import { clickDay } from '../../../store/plannerView/actions';
import type { IRecipe } from '../../../store/plannerView/types';
import { Recipe } from './Recipe';

export function Day({ day, recipes }: Props): JSX.Element|null {
  const dispatch = useDispatch();

  const handleClickDay = () => dispatch(clickDay(day));

  return (
    <div className="day" onClick={handleClickDay}>
      <span className="date">{day}</span>
      {recipes.map(recipe => <Recipe recipe={recipe} />)}
    </div>
  );
}

type Props = {
  day:     number;
  recipes: IRecipe[];
};