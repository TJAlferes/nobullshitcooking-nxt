//import { useRef } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';  //DropTarget, DropTargetConnector,

import type { IRecipe } from '../../../store/planner/types';
import { Recipe } from './Recipe';

const Types = {PLANNER_RECIPE: 'PLANNER_RECIPE'};

// id={recipe.id}
export function Recipes({ day, expanded, expandedDay, recipes }: Props): JSX.Element {
  //const ref = useRef<HTMLDivElement>(null);

  const [ , drop ] = useDrop(() => ({
    accept: Types.PLANNER_RECIPE,
    collect: (monitor: DropTargetMonitor) => ({
      //connectDropTarget: connect.dropTarget(),
      canDrop: monitor.canDrop(),
      isOver:  monitor.isOver()
    }),
    drop: ({ day }: Props) => ({
      listId: day
    })
  }));

  //drop(ref);

  return (
    <div className="new-plan-recipes" ref={drop}>
      {recipes.map((recipe, i) => (
        <Recipe day={day} expanded={expanded} expandedDay={expandedDay} id={recipe.key} index={i} key={recipe.key} listId={day} recipe={recipe} />
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
