import { useDispatch } from 'react-redux';

import { clickDay } from '../../../store/plannerView/actions';
import { IRecipe } from '../../../store/plannerView/types';
import { Recipe } from './Recipe';

export default function Day({ day, expanded, expandedDay, recipes }: Props): JSX.Element|null {
  const dispatch = useDispatch();

  const handleClickDay = () => dispatch(clickDay(day));

  return (expanded || (day === expandedDay)) ? null: (
    <div className="day" onClick={handleClickDay}>
      <span className="date">{day}</span>
      {recipes.map(recipe => <Recipe recipe={recipe} />)}
    </div>
  );
}

type Props = {
  day:         number;
  expanded:    boolean;
  expandedDay: number | null;
  recipes:     IRecipe[];
};