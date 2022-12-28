import { useDispatch } from 'react-redux';

import { plannerViewClickDay } from '../../../store/plannerView/actions';
import { IPlannerViewRecipe } from '../../../store/plannerView/types';
import { Recipe } from './Recipe';

export default function Day({ day, expanded, expandedDay, recipes }: Props): JSX.Element|null {
  const dispatch = useDispatch();

  const handleClickDay = () => dispatch(plannerViewClickDay(day));

  return (expanded || (day === expandedDay)) ? null: (
    <div className="plan__day" onClick={handleClickDay}>
      <span className="plan__date">{day}</span>
      {recipes.map(recipe => <Recipe recipe={recipe} />)}
    </div>
  );
}

type Props = {
  day: number;
  expanded: boolean;
  expandedDay: number | null;
  recipes: IPlannerViewRecipe[];
};