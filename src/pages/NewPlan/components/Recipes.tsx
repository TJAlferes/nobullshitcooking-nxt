import React from 'react';
import { DropTarget, DropTargetConnector, DropTargetMonitor } from 'react-dnd';

import { IPlannerRecipe } from '../../../store/planner/types';
import Recipe from './Recipe';

const Types = {PLANNER_RECIPE: 'PLANNER_RECIPE'};

const plannerRecipesTarget = {
  drop(props: Props) {
    return {listId: props.day};
  }
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
  return {
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const Recipes = ({
  day,
  expanded,
  expandedDay,
  recipes
}: Props): JSX.Element => (
  <div className="planner__recipes" /*ref={connectDropTarget}*/>
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

type Props = {
  day: number;
  expanded: boolean;
  expandedDay: number | null;
  recipes: IPlannerRecipe[];
};

export default DropTarget(
  Types.PLANNER_RECIPE,
  plannerRecipesTarget,
  collect
)(Recipes);