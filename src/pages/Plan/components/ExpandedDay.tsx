import { useDispatch } from 'react-redux';

import { plannerViewClickDay } from '../../../store/plannerView/actions';
import { IPlannerViewRecipe } from '../../../store/plannerView/types';
import { Recipe } from './Recipe';

export default function ExpandedDay({ day, expanded, recipes }: Props): JSX.Element | null {
  const dispatch = useDispatch();

  const handleClickDay = () => dispatch(plannerViewClickDay(day));

  return expanded
  ? (
    <div className="plan__expanded-day" onClick={handleClickDay}>
      <span className="plan__date">{day}</span>
      {recipes.map(recipe => <Recipe recipe={recipe} />)}
    </div>
  )
  : null;
}

type Props = {
  day: number;
  expanded: boolean;
  recipes: IPlannerViewRecipe[];
};