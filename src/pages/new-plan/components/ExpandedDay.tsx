import { DropTargetMonitor, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { addRecipeToDay, clickDay } from '../../../store/planner/actions';
import type { IRecipe } from '../../../store/planner/types';
import Recipe from './Recipe';

const Types = {PLANNER_RECIPE: 'PLANNER_RECIPE'};

export function ExpandedDay({ day, expanded, expandedDay, recipes }: Props): JSX.Element | null {
  const dispatch = useDispatch();

  const [ { canDrop, isOver }, drop ] = useDrop(() => ({
    accept: Types.PLANNER_RECIPE,
    
    collect: (monitor: DropTargetMonitor) => ({canDrop: monitor.canDrop(), isOver: monitor.isOver()}),
    
    drop({ day, expandedDay }: Props, monitor: DropTargetMonitor<any, any>) {
      const draggedRecipe = monitor.getItem();

      if (expandedDay !== draggedRecipe.day)
        dispatch(addRecipeToDay(day, draggedRecipe.recipe));

      return {listId: day};  // WTF is this?
    }
  }));
  
  const color = (isOver && canDrop) ? "--green" : "--white";

  const handleClickDay = () => dispatch(clickDay(day));

  return !expanded ? null : (
    <div className={`expanded-day${color}`} onClick={handleClickDay} ref={drop}>
      <span className="date">{day}</span>
      {recipes.map((recipe, i) => (
        <Recipe day={day} expanded={expanded} expandedDay={expandedDay} id={recipe.key} index={i} key={recipe.key} listId={day} recipe={recipe} />
      ))}
    </div>
  );
};

type Props = {
  day:         number;
  expanded:    boolean;
  expandedDay: number | null;
  recipes:     IRecipe[];
};

export default ExpandedDay;