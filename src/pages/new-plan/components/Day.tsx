import { DropTarget, DropTargetConnector, DropTargetMonitor, useDrop } from 'react-dnd';
import { connect, ConnectedProps } from 'react-redux';

import type { IRecipe } from '../../../store/planner/types';
import { clickDay, addRecipeToDay } from '../../../store/planner/actions';
import Recipe from './Recipe';

const Types = {PLANNER_RECIPE: 'PLANNER_RECIPE'};

const dayTarget = {
  // TO DO: improve "any, any"
  drop({ day, addRecipeToDay }: Props, monitor: DropTargetMonitor<any, any>) {
    const draggedRecipe = monitor.getItem();
    if (day !== draggedRecipe.day) addRecipeToDay(day, draggedRecipe.recipe);
    return {listId: day};  // WTF is this?
  }
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
  return {canDrop: monitor.canDrop(), connectDropTarget: connect.dropTarget(), isOver: monitor.isOver()};
}

export function Day({ canDrop, day, expanded, expandedDay, isOver, recipes, clickDay }: Props): JSX.Element | null {
  const color = (isOver && canDrop) ? "--green" : "--white";

  const handleClickDay = () => clickDay(day);

  return (expanded || (day === expandedDay)) ? null : (
    <div className={`day${color}`} onClick={handleClickDay}>
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

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  canDrop:     boolean;
  day:         number;
  expanded:    boolean;
  expandedDay: number | null;
  isOver:      boolean;
  recipes:     IRecipe[];
};

const mapDispatchToProps = {
  addRecipeToDay: (day: number, recipe: IRecipe) => addRecipeToDay(day, recipe),
  clickDay:       (day: number)                  => clickDay(day)
};

const connector = connect(null, mapDispatchToProps);

export default connector(DropTarget(Types.PLANNER_RECIPE, dayTarget, collect)(Day));