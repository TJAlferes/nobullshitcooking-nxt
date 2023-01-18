import { DropTarget, DropTargetConnector, DropTargetMonitor } from 'react-dnd';

import type { IRecipe } from '../../../store/planner/types';
import Recipe from './Recipe';

const Types = {PLANNER_RECIPE: 'PLANNER_RECIPE'};

const recipesTarget = {
  drop({ day }: Props) {
    return {listId: day};
  }
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
  return {canDrop: monitor.canDrop(), connectDropTarget: connect.dropTarget(), isOver: monitor.isOver()};
}

// id={recipe.id}
function Recipes({ day, expanded, expandedDay, recipes }: Props): JSX.Element {
  return (
    <div className="new-plan-recipes">
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

export default DropTarget(Types.PLANNER_RECIPE, recipesTarget, collect)(Recipes);