import { XYCoord } from 'dnd-core';
import { FC, useRef } from 'react';
import {
  DragSourceMonitor,
  DropTargetMonitor,
  useDrag,
  useDrop
} from 'react-dnd';
import { useDispatch } from 'react-redux';

import {
  plannerRemoveRecipeFromDay,
  plannerReorderRecipeInDay
} from '../../../store/planner/actions';
import { IPlannerRecipe } from '../../../store/planner/types';

const Types = {PLANNER_RECIPE: 'PLANNER_RECIPE'};

const Recipe: FC<Props> = ({
  day,
  //expanded,
  expandedDay,
  id,
  index,
  key,
  listId,
  recipe
}: Props) => {
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const [ , drag ] = useDrag({
    collect: (monitor: any) => ({isDragging: monitor.isDragging()}),
    end: (dropResult: any, monitor: DragSourceMonitor) => {
      const item: Props = monitor.getItem();
      if (item.day === 0) return;
      if (dropResult && (dropResult.listId !== item.day)) {
        dispatch(plannerRemoveRecipeFromDay(item.day, item.index));
      }
    },
    item: {
      day,
      id,
      index,
      key: recipe.key,
      listId,
      recipe,
      type: Types.PLANNER_RECIPE
    },
    type: Types.PLANNER_RECIPE
  });

  const [ , drop ] = useDrop({
    accept: Types.PLANNER_RECIPE,
    // TO DO: improve "any, any"
    hover: (item: IDragItem, monitor: DropTargetMonitor<any, any>) => {
      if (!item) return;  // ?
      if (!ref.current) return;
      if (day !== expandedDay) return;

      const sourceDay = monitor.getItem().day;  //item.day;

      if (sourceDay !== expandedDay) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) return;

      // The rectangular dimensions of the Recipe item being hovered over
      const rectangle = ref.current?.getBoundingClientRect();
      const mouseLocation = monitor.getClientOffset();

      const verticalCenter = (rectangle.bottom - rectangle.top) / 2;
      const distanceFromTop = (mouseLocation as XYCoord).y - rectangle.top;

      const draggingDown = dragIndex < hoverIndex;
      const draggingUp = dragIndex > hoverIndex;
      const aboveCenter = distanceFromTop < verticalCenter;
      const belowCenter = distanceFromTop > verticalCenter;

      // Only move when the mouse has crossed the vertical center
      if (draggingDown && aboveCenter) return;
      if (draggingUp && belowCenter) return;

      // move
      dispatch(plannerReorderRecipeInDay(dragIndex, hoverIndex));

      // Note: We're mutating the monitor item here. Generally it's better to
      // avoid mutations, but here we mutate to avoid expensive index searches
      // for the sake of performance.
      item.index = hoverIndex;
    }
  });

  drag(drop(ref));

  return (
    <div className="plan__recipe" key={key} ref={ref}>
      <div className="plan__recipe-image">
        <img src={`https://s3.amazonaws.com/nobsc-user-recipe/${recipe.recipe_image}-tiny`} />
      </div>
      <div className="plan__recipe-text">{recipe.title}</div>
    </div>
  );
};

interface IDragItem {
  id: string;
  index: number;
  type: string;
}

type Props = {
  day: number;
  expanded: boolean;
  expandedDay: number | null;
  id: string;
  index: number;
  key: string;
  listId: number;
  recipe: IPlannerRecipe;
};

export default Recipe;