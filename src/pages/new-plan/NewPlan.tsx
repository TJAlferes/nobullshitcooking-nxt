import type { XYCoord }                                           from 'dnd-core';
import { useSearchParams, useRouter }                             from 'next/navigation';
import { memo, useEffect, useRef, useState }                      from 'react';
import AriaModal                                                  from 'react-aria-modal';
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { v4 as uuidv4 }                                           from 'uuid';

import { ExpandCollapse, LoaderButton } from '../../components';
import {
  useTypedDispatch as useDispatch,
  useTypedSelector as useSelector
} from '../../store';
import type { WorkRecipe } from '../../store/data/types';
import {
  addRecipeToDay,
  removeRecipeFromDay,
  reorderRecipeInDay,
  clickDay,
  clearWork,
  setCreating,
  setEditingId,
  setPlanName,
  setPlanData
} from '../../store/new-plan/actions';
import type { PlanData, Recipe }  from '../../store/new-plan/types';
import { createPlan, updatePlan } from '../../store/user/plan/actions';

const Types = {PLANNER_RECIPE: 'PLANNER_RECIPE'};

export default function NewPlan() {
  const router = useRouter();

  const params  = useSearchParams();
  const plan_id = params.get('plan_id');

  const dispatch = useDispatch();

  const officialRecipes     = useSelector(state => state.data.recipes);
  const my_favorite_recipes = useSelector(state => state.data.my_favorite_recipes);
  const my_saved_recipes    = useSelector(state => state.data.my_saved_recipes);
  const my_private_recipes  = useSelector(state => state.data.my_private_recipes);
  const my_public_recipes   = useSelector(state => state.data.my_public_recipes);
  const my_plans            = useSelector(state => state.data.my_plans);
  const expandedDay         = useSelector(state => state.newPlan.expandedDay);
  const editingId           = useSelector(state => state.newPlan.editingId);
  const plan_name           = useSelector(state => state.newPlan.plan_name);
  const plan_data           = useSelector(state => state.newPlan.plan_data);
  const message             = useSelector(state => state.user.message);

  const [ feedback,    setFeedback ]    = useState("");
  const [ loading,     setLoading ]     = useState(false);
  const [ modalActive, setModalActive ] = useState(false);
  const [ tab,         setTab ]         = useState("official");

  useEffect(() => {
    const getExistingPlanToEdit = () => {
      window.scrollTo(0,0);
      setLoading(true);
      const [ prev ] = myPlans.filter(p => p.id === Number(id));
      // batch these three?
      dispatch(setEditingId(Number(prev.id)));
      dispatch(setPlanName(prev.name));
      dispatch(setPlanData(prev.data));
      setLoading(false);
    };

    if (id) {
      dispatch(clearWork());
      getExistingPlanToEdit();
    } else {
      dispatch(clearWork());
      dispatch(setCreating());
    }
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      if (message !== "") window.scrollTo(0, 0);
      setFeedback(message);
      if (message === "Plan created." || message === "Plan updated.") {
        setTimeout(() => {
          dispatch(clearWork());
          router.push('/dashboard');
        }, 3000);
      }
      setLoading(false);
    }

    return () => {
      isSubscribed = false;
    };
  }, [message]);

  const activateModal =   () => setModalActive(true);
  const deactivateModal = () => setModalActive(false);

  const discardChanges = () => {
    setModalActive(false);
    dispatch(clearWork());
    router.push('/dashboard');
  };

  const getApplicationNode = (): Element | Node => document.getElementById('root') as Element | Node;

  const getPlanData = () => JSON.stringify(planData);  // clean/format? *** keys???

  const changePlanName = (e: SyntheticEvent) => {
    const nextName = (e.target as HTMLInputElement).value.trim();
    if (nextName.length > 20) {
      window.scrollTo(0, 0);
      setFeedback("Please keep your plan name under 20 characters");
      setTimeout(() => setFeedback(""), 3000);
      return;
    }
    dispatch(setPlanName(nextName));
  };

  const clickTab = (e: SyntheticEvent) => setTab((e.target as HTMLButtonElement).name);

  const valid = () => {
    const validName =       planName.trim() !== "";
    const validNameLength = planName.trim().length < 21;

    if (!validName) {
      window.scrollTo(0, 0);
      setFeedback("You forgot to name your plan...");
      setTimeout(() => setFeedback(""), 3000);
      return false;
    }

    if (!validNameLength) {
      window.scrollTo(0, 0);
      setFeedback("Please keep your plan name under 20 characters");
      setTimeout(() => setFeedback(""), 3000);
      return false;
    }

    return validName && validNameLength;
  };

  const handleSubmit = () => {
    if (!valid()) return;
    setLoading(true);
    const planInfo = {name: planName, data: getPlanData()};
    if (editingId) {
      const planUpdateInfo = {id: editingId as number, ...planInfo};
      dispatch(updatePlan(planUpdateInfo));
    }
    else dispatch(createPlan(planInfo));
  }

  const tabToList: ITabToList = {
    "official": officialRecipes,
    "private":  myPrivateRecipes,
    "public":   myPublicRecipes,
    "favorite": myFavoriteRecipes,
    "saved":    mySavedRecipes
  };
  const recipes: IWorkRecipe[] = tabToList[tab];

  return (
    <div className="one-col new-plan">
      <div className="heading">
        <h1>New Plan</h1>
        <p className="feedback">{feedback}</p>
        <div className="name">
          <label>Plan Name:</label><input onChange={changePlanName} type="text" value={planName} />
        </div>
      </div>
      <div className="calendar">
        <MonthlyPlan expandedDay={expandedDay} planData={planData} />
        <div className="recipes-tabs">
          <button className={(tab === "official") ? "--active" : ""} name="official" onClick={e => clickTab(e)}>Official</button>
          <button className={(tab === "private") ? "--active" : ""}  name="private"  onClick={e => clickTab(e)}>My Private</button>
          <button className={(tab === "public") ? "--active" : ""}   name="public"   onClick={e => clickTab(e)}>My Public</button>
          <button className={(tab === "favorite") ? "--active" : ""} name="favorite" onClick={e => clickTab(e)}>My Favorite</button>
          <button className={(tab === "saved") ? "--active" : ""}    name="saved"    onClick={e => clickTab(e)}>My Saved</button>
        </div>
        <MemoizedRecipes expandedDay={expandedDay} recipes={recipes} />
      </div>
      <div><ExpandCollapse><ToolTip /></ExpandCollapse></div>
      <div className="finish">
        <button className="cancel-button" onClick={activateModal}>Cancel</button>
        {modalActive
          ? (
            <AriaModal
              dialogClass="cancel"
              focusDialog={true}
              focusTrapOptions={{returnFocusOnDeactivate: false}}
              getApplicationNode={getApplicationNode}
              onExit={deactivateModal}
              titleText="Cancel?"
              underlayClickExits={false}
            >
              <p>Cancel new plan? Changes will not be saved.</p>
              <button className="cancel-cancel" onClick={deactivateModal}>No, Keep Working</button>
              <button className="cancel-button" onClick={discardChanges}>Yes, Discard Changes</button>
            </AriaModal>
          )
          : false
        }
        <LoaderButton
          className="submit-button"
          id="planner-submit-button"
          isLoading={loading}
          loadingText="Saving Plan..."
          name="submit"
          onClick={handleSubmit}
          text="Save Plan"
        />
      </div>
    </div>
  );
}

const MonthlyPlan = memo(function MonthlyPlan({ expandedDay, planData }: MonthlyPlanProps) {
  return (
    <div className="plan__monthly-plan">
      <div className="monthly-plan">
        <div className="header">
          <span>Sunday</span>
          <span>Monday</span>
          <span>Tuesday</span>
          <span>Wednesday</span>
          <span>Thursday</span>
          <span>Friday</span>
          <span>Saturday</span>
        </div>
        <div className="body">
          {Object.keys(planData).map((recipeList, i) => (
            <div className="monthly-plan__body-day" key={i} >
              <div className="body-day__content">
                <Day day={i + 1} expandedDay={expandedDay} recipes={planData[Number(recipeList)]} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="expanded-day-container">
        {expandedDay && <ExpandedDay day={expandedDay} expandedDay={expandedDay} recipes={planData[expandedDay]} />}
      </div>
    </div>
  );
});

const MemoizedRecipes = memo(function MemoizedRecipes({ expandedDay, recipes }: MemoizedRecipesProps) {
  // Even though recipe.id and recipe.owner_id are not used when creating/editing a plan (NewPlan-),
  // they are set at this stage because they are used when viewing a plan (Plan-)
  return (
    <Recipes
      day={0}
      expandedDay={expandedDay}
      recipes={recipes.map(({ id, title, recipe_image, owner_id }) => ({key: uuidv4(), id, title, recipe_image, owner_id}))}
    />
  );
});

function ToolTip() {
  return (
    <div>
      <p>- To add a recipe to your plan, drag it from the recipe list and drop it on a day</p>
      <p>- To use the same recipe more than once, simply drag from the recipe list again</p>
      <p>- To remove a recipe from your plan, drag and drop it back into the recipe list</p>
      <br />
      <p>Tip: Remember that you can make multiple plans.</p>
      <br />
      <p>- To move a recipe to a different day, drag it from its current day and drop it on your desired day</p>
      <p>- Click on a day to expand it</p>
      <p>- While a day is expanded, you may reorder its recipes by dragging them up or down</p>
      <br />
      <p>Tip: You don't have to cook every day, especially when just starting out. It's best to make a plan you can follow through on.</p>
      <br />
    </div>
  );
}

// TO DO: limit the max number of recipes per day -- wrap this in memo ? -- check your ref usage
function Day({ day, expandedDay, recipes }: DayProps) {
  const dispatch = useDispatch();
  //const ref = useRef<HTMLDivElement>(null);

  const [ { canDrop, isOver }, drop ] = useDrop(() => ({
    accept:  Types.PLANNER_RECIPE,
    collect: (monitor: DropTargetMonitor) => ({canDrop: monitor.canDrop(), isOver: monitor.isOver()}),
    drop({ day }: DayProps, monitor: DropTargetMonitor<any, any>) {
      const draggedRecipe = monitor.getItem();
      if (day !== draggedRecipe.day) dispatch(addRecipeToDay(day, draggedRecipe.recipe));
      return {listId: day};  // What is this? Perhaps the Recipe component doesn't need explicit listId prop
    }
  }));

  const color = (isOver && canDrop) ? "--green" : "--white";

  const handleClickDay = () => dispatch(clickDay(day));

  //drop(ref);

  return (day === expandedDay) ? null : (
    <div className={`day${color}`} onClick={handleClickDay} ref={drop}>
      <span className="date">{day}</span>
      {recipes && recipes.map((recipe, i) => (
        <Recipe
          day={day}
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

// TO DO: wrap this in memo?
function ExpandedDay({ day, expandedDay, recipes }: DayProps) {
  const dispatch = useDispatch();
  //const ref = useRef<HTMLDivElement>(null);

  const [ { canDrop, isOver }, drop ] = useDrop(() => ({
    accept:  Types.PLANNER_RECIPE,
    collect: (monitor: DropTargetMonitor) => ({canDrop: monitor.canDrop(), isOver: monitor.isOver()}),
    drop({ day, expandedDay }: DayProps, monitor: DropTargetMonitor<any, any>) {
      const draggedRecipe = monitor.getItem();
      if (expandedDay !== draggedRecipe.day) dispatch(addRecipeToDay(day, draggedRecipe.recipe));
      return {listId: day};  // What is this? Perhaps the Recipe component doesn't need explicit listId prop
    }
  }));
  
  const color = (isOver && canDrop) ? "--green" : "--white";

  const handleClickDay = () => dispatch(clickDay(day));

  //drop(ref);

  return (
    <div className={`expanded-day${color}`} onClick={handleClickDay} ref={drop}>
      <span className="date">{day}</span>
      {recipes && recipes.map((recipe, i) => (
        <Recipe day={day} expandedDay={expandedDay} id={recipe.key} index={i} key={recipe.key} listId={day} recipe={recipe} />
      ))}
    </div>
  );
}

// TO DO: wrap this in memo ? -- id={recipe.id}
function Recipes({ day, expandedDay, recipes }: DayProps) {
  //const ref = useRef<HTMLDivElement>(null);

  const [ , drop ] = useDrop(() => ({
    accept:  Types.PLANNER_RECIPE,
    collect: (monitor: DropTargetMonitor) => ({canDrop: monitor.canDrop(), isOver:  monitor.isOver()}),
    drop:    ({ day }: DayProps) => ({listId: day})
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

function Recipe({ day, expandedDay, id, index, key, listId, recipe }: RecipeProps) {
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const url = "https://s3.amazonaws.com/nobsc-user-recipe";

  const [ , drag ] = useDrag({
    collect: (monitor: any) => ({isDragging: monitor.isDragging()}),
    end(dropResult: any, monitor: DragSourceMonitor) {
      const item: RecipeProps = monitor.getItem();
      if (item.day === 0) return;
      if (dropResult && (dropResult.listId !== item.day)) dispatch(removeRecipeFromDay(item.day, item.index));
    },
    item: {day, id, index, key: recipe.key, listId, recipe, type: Types.PLANNER_RECIPE},
    type: Types.PLANNER_RECIPE
  });

  const [ , drop ] = useDrop({
    accept: Types.PLANNER_RECIPE,
    hover(item: DragItem, monitor: DropTargetMonitor<any, any>) {  // TO DO: improve "any, any"
      if (!item) return;  // ?
      if (!ref.current) return;
      if (day !== expandedDay) return;

      const sourceDay = monitor.getItem().day;  //item.day;
      if (sourceDay !== expandedDay) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;  // Don't replace items with themselves

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

      dispatch(reorderRecipeInDay(dragIndex, hoverIndex));  // reorder/swap/move recipes
      item.index = hoverIndex;  // We mutate the monitor item here. Generally we avoid mutations, but here we mutate to avoid expensive index searches.
    }
  });

  drag(drop(ref));

  return (
    <div className="new-plan-recipe" key={key} ref={ref}>
      <div className="image"><img src={`${url}/${recipe.recipe_image}-tiny`} /></div>
      <div className="text">{recipe.title}</div>
    </div>
  );
};

interface ITabToList {
  [index: string]: any;
  "official": WorkRecipe[];
  "private":  WorkRecipe[];
  "public":   WorkRecipe[];
  "favorite": WorkRecipe[];
  "saved":    WorkRecipe[];
}

type SyntheticEvent = React.SyntheticEvent<EventTarget>;

type MonthlyPlanProps = {
  expandedDay: number | null;
  plan_data:    PlanData;
};

type MemoizedRecipesProps = {
  expandedDay: number | null;
  recipes:     WorkRecipe[];
};

type DayProps = {
  day:         number;
  expandedDay: number | null;
  recipes:     Recipe[] | undefined;
};

type RecipeProps = {
  day:         number;
  expandedDay: number | null;
  id:          string;
  index:       number;
  key:         string;
  listId:      number;
  recipe:      Recipe;
};

type DragItem = {
  id:    string;
  index: number;
  type:  string;
};

//end: (item: any, monitor: DragSourceMonitor) => {
    //  if (item.day === 0) return;
    //  if (item.day !== item.listId) dispatch(removeRecipeFromDay(item.day, item.index));
    //},
