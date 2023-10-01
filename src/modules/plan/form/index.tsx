import axios from 'axios';
import type { XYCoord } from 'dnd-core';
import update from 'immutability-helper';
import { useSearchParams, useRouter } from 'next/navigation';
import { memo, useEffect, useRef, useState } from 'react';
import AriaModal from 'react-aria-modal';
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import { endpoint } from '../../../config/api';
import { useAuth, useData, useUserData } from '../../../store';
import type { RecipeOverview } from '../../../store';
import { ExpandCollapse } from '../../shared/ExpandCollapse';
import { LoaderButton } from '../../shared/LoaderButton';
import type { Ownership } from '../../shared/types';
import type { PlanData, PlanRecipe } from '../state';

export default function PlanForm({ ownership }: Props) {
  const router = useRouter();

  const params  = useSearchParams();
  const plan_id = params.get('plan_id');

  const { authname } = useAuth();

  const { allowedRecipes } = useAllowedContent(ownership, plan_id);

  const [ plan_name, setPlanName ] = useState("");
  const [ plan_data, setPlanData ] = useState<PlanData>([[], [], [], [], [], [], []]);

  const [ feedback,    setFeedback ]    = useState("");
  const [ loading,     setLoading ]     = useState(false);
  //const [ is_loading,  setIsLoading ]   = useState(false);
  const [ expandedDay, setExpandedDay ] = useState<number | null>(null);
  const [ modalActive, setModalActive ] = useState(false);
  const [ tab,         setTab ]         = useState("official");

  useEffect(() => {
    const getExistingPlanToEdit = () => {
      window.scrollTo(0, 0);
      setLoading(true);
      const plan = my_private_plans.find(p => p.plan_id === plan_id);
      if (!plan) {
        setLoading(false);
        return;  // TO DO: redirect
      }
      setPlanName(plan.plan_name);
      setPlanData(plan.plan_data);
      setLoading(false);
    };

    if (plan_id) {
      getExistingPlanToEdit();
    }
  }, []);

  const activateModal = () => setModalActive(true);

  const deactivateModal = () => setModalActive(false);

  const discardChanges = () => {
    setModalActive(false);
    router.push('/dashboard');
  };

  const getApplicationNode = (): Element | Node => document.getElementById('root') as Element | Node;

  const getPlanData = () => JSON.stringify(plan_data);  // clean/format? *** keys???

  const changePlanName = (e: SyntheticEvent) => {
    const nextName = (e.target as HTMLInputElement).value.trim();
    if (nextName.length > 20) {
      window.scrollTo(0, 0);
      setFeedback("Please keep your plan name under 20 characters");
      setTimeout(() => setFeedback(""), 3000);
      return;
    }
    setPlanName(nextName);
  };

  const clickTab = (e: SyntheticEvent) => setTab((e.target as HTMLButtonElement).name);

  const clickDay = (day: number) =>
    setExpandedDay(day === expandedDay ? null : day);
  
  const addRecipeToDay = (day: number, recipe: DayRecipe) => {
    const new_plan_data = [...plan_data];  // not sufficient, go deeper? (See recipes rows)
    new_plan_data[day - 1]?.push(recipe);
    setPlanData(new_plan_data)
  };
  
  const removeRecipeFromDay = (day: number, index: number) => {
    const plan_data = [...state.plan_data];
    plan_data[day - 1]?.splice(index, 1);
    return {...state, plan_data};
  };
  
  const reorderRecipeInDay = (dragIndex: number, hoverIndex: number) => {
    if (!expandedDay ) {
      return state;
    }
    const draggedRecipe = plan_data[expandedDay - 1]![dragIndex]!;
    return update(state, {
      plan_data: {
        [expandedDay - 1]: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, draggedRecipe]]
        }
      }
    });
  };

  const handleSubmit = async () => {
    if (!isValidPlan({plan_name, setFeedback})) return;
    setLoading(true);
    const plan_upload = {
      plan_name,
      plan_data: getPlanData()
    };
    if (plan_id) {
      const plan_update_upload = {plan_id, ...plan_upload};
      try {
        const { data } = await axios.patch(
          `${endpoint}/users/${authname}/${ownership}-plans`,
          plan_update_upload,
          {withCredentials: true}
        );
        window.scrollTo(0, 0);
        setFeedback(data.message);
        if (data.message === "Plan updated.") {
          setTimeout(() => router.push('/dashboard'), 3000);
        }
        setFeedback(data.message);
        //await getMyPlans(ownership);
      } catch(err) {
        setFeedback('An error occurred. Please try again.');
      }
      //delay(4000);
      setFeedback("");
    } else {
      try {
        const { data } = await axios.post(
          `${endpoint}/users/${authname}/${ownership}-plans`,
          plan_upload,
          {withCredentials: true}
        );
        window.scrollTo(0, 0);
        setFeedback(data.message);
        if (data.message === "Plan created.") {
          setTimeout(() => router.push('/dashboard'), 3000);
        }
        setFeedback(data.message);
        //await getMyPlans(ownership);
      } catch(err) {
        setFeedback('An error occurred. Please try again.');
      }
      //delay(4000);
      setFeedback("");
    }
  };

  const tabToList: TabToList = {
    "official": officialRecipes,
    "private":  my_private_recipes,  // only if ownership = "private"
    "public":   my_public_recipes,
    "favorite": my_favorite_recipes,
    "saved":    my_saved_recipes
  };
  const recipes: WorkRecipe[] = tabToList[tab];

  return (
    <div className="one-col new-plan">
      <div className="heading">
        <h1>New Plan</h1>

        <p className="feedback">{feedback}</p>

        <div className="name">
          <label>Plan Name:</label>
          <input onChange={changePlanName} type="text" value={plan_name} />
        </div>
      </div>

      <div className="calendar">
        <MonthlyPlan expandedDay={expandedDay} plan_data={plan_data} />

        <div className="recipes-tabs">
          <button className={tab === "official" ? "--active" : ""} name="official" onClick={e => clickTab(e)}>Official</button>
          <button className={tab === "private" ? "--active" : ""}  name="private"  onClick={e => clickTab(e)}>My Private</button>
          <button className={tab === "public" ? "--active" : ""}   name="public"   onClick={e => clickTab(e)}>My Public</button>
          <button className={tab === "favorite" ? "--active" : ""} name="favorite" onClick={e => clickTab(e)}>My Favorite</button>
          <button className={tab === "saved" ? "--active" : ""}    name="saved"    onClick={e => clickTab(e)}>My Saved</button>
        </div>

        <MemoizedRecipes expandedDay={expandedDay} recipes={recipes} />
      </div>

      <div><ExpandCollapse><ToolTip /></ExpandCollapse></div>

      <div className="finish">
        <button className="cancel-button" onClick={activateModal}>Cancel</button>
        
        {
          modalActive
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

type Props = {
  ownership: Ownership;
};

function useAllowedContent(ownership: Ownership, recipe_id: string | null) {
  const {
    my_private_recipes,
    my_public_recipes,
    my_favorite_recipes,
    my_saved_recipes
  } = useUserData();

  //const my_private_plans    = useSelector(state => state.userData.my_private_plans);

  // EXTREMELY IMPORTANT:
  // Note that:
  // my_private_recipes are
  // only allowed in a plan of "private" ownership
  //
  // my_public_recipes, my_favorite_recipes, and my_saved_recipes are
  // only allowed in a plan of "private" or "public" ownership
  //
  // This MUST also be checked on the backend server!!!

  const allowedRecipes = [
    //...recipes,
    ...(
      ownership === "private"
      ? (
        recipe_id
        ? my_private_recipes.filter(r => r.recipe_id != recipe_id)
        : my_private_recipes
      )
      : []
    ),
    ...(
      (ownership === "private" || ownership === "public")
      ? (
        recipe_id
        ? my_public_recipes.filter(r => r.recipe_id != recipe_id)
        : my_public_recipes
      )
      : []
    ),
    ...((ownership === "private" || ownership === "public") ? my_favorite_recipes : []),  // TO DO: make sure they can't be the author AND that recipe is not private
    ...((ownership === "private" || ownership === "public") ? my_saved_recipes    : []),  // TO DO: make sure they can't be the author AND that recipe is not private
  ];

  return {allowedRecipes};
}

function isValidPlan({
  plan_name,
  setFeedback
}: IsValidPlanUploadParams) {
  function feedback(message: string) {
    window.scrollTo(0, 0);
    setFeedback(message);
    setTimeout(() => setFeedback(""), 3000);
    return false;
  }

  const validPlanName = plan_name.trim() !== "";
  if (!validPlanName) return feedback("Enter plan name.");

  return true;
}

type IsValidPlanUploadParams = {
  plan_name:   string;
  setFeedback: (feedback: string) => void;
};

interface TabToList {
  [index: string]: any;
  "official": WorkRecipe[];
  "private":  WorkRecipe[];  // TODO: only if ownership = "private"
  "public":   WorkRecipe[];
  "favorite": WorkRecipe[];
  "saved":    WorkRecipe[];
}

type SyntheticEvent = React.SyntheticEvent<EventTarget>;

const MonthlyPlan = memo(function MonthlyPlan({ expandedDay, plan_data }: MonthlyPlanProps) {
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
          {Object.keys(plan_data).map((recipeList, i) => (
            <div className="monthly-plan__body-day" key={i} >
              <div className="body-day__content">
                <Day
                  day={i + 1}
                  expandedDay={expandedDay}
                  recipes={plan_data[Number(recipeList)]}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="expanded-day-container">
        {expandedDay && (
          <ExpandedDay
            day={expandedDay}
            expandedDay={expandedDay}
            recipes={plan_data[expandedDay]}
          />
        )}
      </div>
    </div>
  );
});

const MemoizedRecipes = memo(function MemoizedRecipes({ expandedDay, recipes }: MemoizedRecipesProps) {
  // Even though recipe.recipe_id and recipe.owner_id are not used when creating/editing a plan (PlanForm),
  // they are set at this stage because they are used when viewing a plan (PlanDetail)
  return (
    <Recipes
      day={0}
      expandedDay={expandedDay}
      recipes={recipes.map(recipe => ({...recipe, key: uuidv4()}))}
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
  //const ref = useRef<HTMLDivElement>(null);

  const [ { canDrop, isOver }, drop ] = useDrop(() => ({
    accept: Types.PLANNER_RECIPE,

    collect: (monitor: DropTargetMonitor) => ({
      canDrop: monitor.canDrop(),
      isOver:  monitor.isOver()
    }),

    drop({ day }: DayProps, monitor: DropTargetMonitor<any, any>) {
      const draggedRecipe = monitor.getItem();

      if (day !== draggedRecipe.day) {
        dispatch(addRecipeToDay(day, draggedRecipe.recipe));
      }

      return {listId: day};  // What is this? Perhaps the Recipe component doesn't need explicit listId prop
    }
  }));

  const color = (isOver && canDrop) ? "--green" : "--white";

  const handleClickDay = () => dispatch(clickDay(day));

  //drop(ref);

  if (day === expandedDay) {
    return null;
  }

  return (
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
  //const ref = useRef<HTMLDivElement>(null);

  const [ { canDrop, isOver }, drop ] = useDrop(() => ({
    accept: Types.PLANNER_RECIPE,

    collect: (monitor: DropTargetMonitor) => ({
      canDrop: monitor.canDrop(),
      isOver:  monitor.isOver()
    }),

    drop({ day, expandedDay }: DayProps, monitor: DropTargetMonitor<any, any>) {
      const draggedRecipe = monitor.getItem();

      if (expandedDay !== draggedRecipe.day) {
        dispatch(addRecipeToDay(day, draggedRecipe.recipe));
      }

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
    accept: Types.PLANNER_RECIPE,

    collect: (monitor: DropTargetMonitor) => ({
      canDrop: monitor.canDrop(),
      isOver:  monitor.isOver()
    }),

    drop: ({ day }: DayProps) => ({listId: day})
  }));

  //drop(ref);

  return (
    <div className="new-plan-recipes" ref={drop}>
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

function Recipe({ day, expandedDay, id, index, key, listId, recipe }: RecipeProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [ , drag ] = useDrag({
    collect: (monitor: any) => ({isDragging: monitor.isDragging()}),

    end(dropResult: any, monitor: DragSourceMonitor) {
      const item: RecipeProps = monitor.getItem();

      if (item.day === 0) return;

      if (dropResult && (dropResult.listId !== item.day)) {
        dispatch(removeRecipeFromDay(item.day, item.index));
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

    hover(item: DragItem, monitor: DropTargetMonitor<any, any>) {  // TO DO: improve "any, any"
      if (!item) return;  // ?
      if (!ref.current) return;
      if (day !== expandedDay) return;

      const sourceDay = monitor.getItem().day;  //item.day;
      if (sourceDay !== expandedDay) return;

      const dragIndex  = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;  // Don't replace items with themselves

      // The rectangular dimensions of the Recipe item being hovered over
      const rectangle       = ref.current?.getBoundingClientRect();
      const mouseLocation   = monitor.getClientOffset();
      const verticalCenter  = (rectangle.bottom - rectangle.top) / 2;
      const distanceFromTop = (mouseLocation as XYCoord).y - rectangle.top;

      const draggingDown = dragIndex < hoverIndex;
      const draggingUp   = dragIndex > hoverIndex;
      const aboveCenter  = distanceFromTop < verticalCenter;
      const belowCenter  = distanceFromTop > verticalCenter;
      // Only move when the mouse has crossed the vertical center
      if (draggingDown && aboveCenter) return;
      if (draggingUp && belowCenter) return;

      dispatch(reorderRecipeInDay(dragIndex, hoverIndex));  // reorder/swap/move recipes
      item.index = hoverIndex;  // We mutate the monitor item here. Generally we avoid mutations, but here we mutate to avoid expensive index searches.
    }
  });

  drag(drop(ref));

  const url = "https://s3.amazonaws.com/nobsc-user-recipe";  // fix (and how to account for private/public)

  return (
    <div className="new-plan-recipe" key={key} ref={ref}>
      <div className="image"><img src={`${url}/${recipe.recipe_image}-tiny`} /></div>
      <div className="text">{recipe.title}</div>
    </div>
  );
};

type MonthlyPlanProps = {
  expandedDay: number | null;
  plan_data:   PlanData;
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

const Types = {PLANNER_RECIPE: 'PLANNER_RECIPE'};

//end: (item: any, monitor: DragSourceMonitor) => {
//  if (item.day === 0) return;
//  if (item.day !== item.listId) dispatch(removeRecipeFromDay(item.day, item.index));
//},

export type RecipeOverview = {
  recipe_id: string;
  owner_id:  string;
  title:     string;
  image_url: string;
};

export type DayRecipe = RecipeOverview & {
  key: string;
};

export type PlanData = DayRecipe[][];
