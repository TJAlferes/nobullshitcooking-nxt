import { useDispatch } from 'react-redux';

import { clickDay } from '../../../store/plannerView/actions';
import type { IRecipe } from '../../../store/plannerView/types';
import { Recipe } from './Recipe';

export default function ExpandedDay({ day, expanded, recipes }: Props): JSX.Element | null {
  const dispatch = useDispatch();

  const handleClickDay = () => dispatch(clickDay(day));

  return expanded
  ? (
    <div className="expanded-day" onClick={handleClickDay}>
      <span className="date">{day}</span>
      {recipes.map(recipe => <Recipe recipe={recipe} />)}
    </div>
  )
  : null;
}

type Props = {
  day:      number;
  expanded: boolean;
  recipes:  IRecipe[];
};