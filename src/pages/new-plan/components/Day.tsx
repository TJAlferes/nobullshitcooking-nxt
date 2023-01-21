import { DropTargetMonitor, useDrop } from 'react-dnd';  // DropTarget, DropTargetConnector, 
import { useDispatch } from 'react-redux';  //connect, ConnectedProps

//import { useRef } from 'react';
import { clickDay, addRecipeToDay } from '../../../store/planner/actions';
import type { IRecipe } from '../../../store/planner/types';
import { Recipe } from './Recipe';

const Types = {PLANNER_RECIPE: 'PLANNER_RECIPE'};

// TO DO: check your ref usage
// TO DO: limit the max number of recipes per day
export function Day({ day, expanded, expandedDay, recipes }: Props): JSX.Element | null {
  const dispatch = useDispatch();

  //const ref = useRef<HTMLDivElement>(null);

  const [ { canDrop, isOver }, drop ] = useDrop(() => ({
    accept: Types.PLANNER_RECIPE,
    
    collect: (monitor: DropTargetMonitor) => ({canDrop: monitor.canDrop(), isOver: monitor.isOver()}),
    
    drop: ({ day }: Props, monitor: DropTargetMonitor<any, any>) => {  // TO DO: improve "any, any"
      const draggedRecipe = monitor.getItem();

      if (day !== draggedRecipe.day)
        dispatch(addRecipeToDay(day, draggedRecipe.recipe));

      return {listId: day};  // WTF is this?
    }
  }));

  const color = (isOver && canDrop) ? "--green" : "--white";

  const handleClickDay = () => dispatch(clickDay(day));

  //drop(ref);

  return (expanded || (day === expandedDay)) ? null : (
    <div className={`day${color}`} onClick={handleClickDay} ref={drop}>
      <span className="date">{day}</span>
      {recipes.map((recipe, i) => (
        <Recipe
          day={day}
          expanded={expanded}
          expandedDay={expandedDay}
          id={recipe.key}
          index={i}
          key={recipe.key}
          listId={day}
          recipe={recipe}
        />
      ))}
    </div>
  );
}

type Props = {
  day:         number;
  expanded:    boolean;
  expandedDay: number | null;
  recipes:     IRecipe[];
};
