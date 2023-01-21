import { DropTargetMonitor, useDrop } from 'react-dnd';  //DropTarget, DropTargetConnector,

import type { IRecipe } from '../../../store/planner/types';
import Recipe from './Recipe';

const Types = {PLANNER_RECIPE: 'PLANNER_RECIPE'};

//const recipesTarget = {
//  drop({ day }: Props) {
//    return {listId: day};
//  }
//};

//function collect(monitor: DropTargetMonitor, props) {
//  return {canDrop: monitor.canDrop(), connectDropTarget: connect.dropTarget(), isOver: monitor.isOver()};
//}

// id={recipe.id}
function Recipes({ day, expanded, expandedDay, recipes }: Props): JSX.Element {
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

//export default DropTarget(Types.PLANNER_RECIPE, recipesTarget, collect)(Recipes);
export default Recipes;