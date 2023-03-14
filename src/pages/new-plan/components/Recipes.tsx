//import { memo, useRef }               from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';  //DropTarget, DropTargetConnector,

import type { IRecipe } from '../../../store/planner/types';
import { Recipe }       from './Recipe';

const Types = {PLANNER_RECIPE: 'PLANNER_RECIPE'};

// TO DO: wrap this in memo?
// id={recipe.id}
export function Recipes({ day, expandedDay, recipes }: Props) {
  //const ref = useRef<HTMLDivElement>(null);

  const [ , drop ] = useDrop(() => ({
    accept: Types.PLANNER_RECIPE,

    collect: (monitor: DropTargetMonitor) => ({canDrop: monitor.canDrop(), isOver:  monitor.isOver()}),

    drop: ({ day }: Props) => ({listId: day})
  }));

  //drop(ref);

  return (
    <div className="new-plan-recipes" ref={drop}>
      {recipes && recipes.map((recipe, i) => (
        <Recipe day={day} expandedDay={expandedDay} id={recipe.key} index={i} key={recipe.key} listId={day} recipe={recipe} />
      ))}
    </div>
  );
}

type Props = {
  day:         number;
  expandedDay: number | null;
  recipes:     IRecipe[] | undefined;
};
