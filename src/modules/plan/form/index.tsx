import axios from 'axios';
import type { XYCoord } from 'dnd-core';
import update from 'immutability-helper';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import AriaModal from 'react-aria-modal';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';

import { endpoint } from '../../../config/api';
import { useAuth, useUserData } from '../../../store';
import type { RecipeOverview } from '../../../store';
import { ExpandCollapse } from '../../shared/ExpandCollapse';
import { LoaderButton } from '../../shared/LoaderButton';
import type { Ownership } from '../../shared/types';

export default function PlanForm({ ownership }: Props) {
  const router = useRouter();

  const params  = useSearchParams();
  const plan_id = params.get('plan_id');

  const { authname } = useAuth();
  const {
    my_public_plans, setMyPublicPlans,
    my_private_plans, setMyPrivatePlans
  } = useUserData();

  const allowedRecipes = useAllowedContent(ownership);

  const [ plan_name, setPlanName ] = useState("");
  const [ included_recipes, setIncludedRecipes ] = useState<RecipeOverview[][]>([[], [], [], [], [], [], []]);

  const [ feedback,    setFeedback ]    = useState("");
  const [ loading,     setLoading ]     = useState(false);
  const [ modalActive, setModalActive ] = useState(false);
  const [ tab,         setTab ]         = useState("official");

  useEffect(() => {
    let mounted = true;

    function getExistingPlanToEdit() {
      if (!plan_id) {
        router.push(`/dashboard`);
        return;
      }

      setLoading(true);
      window.scrollTo(0, 0);

      let plan = null;
      if (ownership === "public") {
        plan = my_public_plans.find(p => p.plan_id === plan_id);
      } else if (ownership === "private") {
        plan = my_private_plans.find(p => p.plan_id === plan_id);
      }

      if (!plan) {
        router.push(`/dashboard`);
        return;
      }

      setPlanName(plan.plan_name);
      setIncludedRecipes(plan.included_recipes);

      setLoading(false);
    }

    if (mounted) {
      if (!authname) {
        router.push(`/404`);
        return;
      }

      if (plan_id) {
        getExistingPlanToEdit();
      }
    }

    return () => {
      mounted = false;
    };
  }, []);

  const getMyPlans = async () => {
    if (ownership === "public") {
      const res = await axios.get(`${endpoint}/users/${authname}/public-plans`);
      setMyPublicPlans(res.data);
    } else if (ownership === "private") {
      const res = await axios.get(`${endpoint}/users/${authname}/private-plans`, {withCredentials: true});
      setMyPrivatePlans(res.data);
    }
  };

  const activateModal = () => setModalActive(true);

  const deactivateModal = () => setModalActive(false);

  const discardChanges = () => {
    setModalActive(false);
    router.push('/dashboard');
  };

  const getApplicationNode = (): Element | Node =>
    document.getElementById('root') as Element | Node;

  const changePlanName = (e: ChangeEvent<HTMLInputElement>) => setPlanName(e.target.value);

  const clickTab = (e: SyntheticEvent) => setTab((e.target as HTMLButtonElement).name);

  const addRecipeToDay = (day: number, recipe: RecipeOverview) => {
    const new_included_recipes = update(included_recipes, {
      [day - 1]: {
        $push: [recipe]
      },
    });
    setIncludedRecipes(new_included_recipes);
  };
  
  const removeRecipeFromDay = (day: number, index: number) => {
    const new_included_recipes = update(included_recipes, {
      [day - 1]: {
        $splice: [[index, 1]]
      },
    });
    setIncludedRecipes(new_included_recipes);
  };
  
  const reorderRecipeInDay = (day: number, dragIndex: number, hoverIndex: number) => {
    if (!day) return;

    const draggedRecipe = included_recipes[day - 1]![dragIndex]!;

    const new_included_recipes = update(included_recipes, {
      [day - 1]: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, draggedRecipe]]
      }
    });

    setIncludedRecipes(new_included_recipes);
  };

  const submit = async () => {
    setLoading(true);
    window.scrollTo(0, 0);

    if (!isValidPlan({plan_name, setFeedback})) return;

    const plan_upload = {
      plan_name,
      included_recipes: included_recipes.map((recipes, i) => 
        recipes.map((recipe, j) => ({
          recipe_id:     recipe.recipe_id,
          day_number:    i + 1,
          recipe_number: j + 1
        }))
      )
    };
    
    try {
      if (plan_id) {
        const res = await axios.patch(
          `${endpoint}/users/${authname}/${ownership}-plans`,
          {plan_id, ...plan_upload},
          {withCredentials: true}
        );
        if (res.status === 204) {
          setFeedback("Plan updated.");
          await getMyPlans();
          setTimeout(() => router.push('/dashboard'), 3000);
        } else {
          setFeedback(res.data.message);
        }
      } else {
        const res = await axios.post(
          `${endpoint}/users/${authname}/${ownership}-plans`,
          plan_upload,
          {withCredentials: true}
        );
        if (res.status === 201) {
          setFeedback("Plan created.");
          await getMyPlans();
          setTimeout(() => router.push('/dashboard'), 3000);
        } else {
          setFeedback(res.data.message);
        }
      }
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    } finally {
      setTimeout(() => {
        setFeedback("");
        setLoading(false);
      }, 3000);
    }
  };

  const tabToList: TabToList = {
    //"official": officialRecipes,
    "private":  allowedRecipes.my_private_recipes,
    "public":   allowedRecipes.my_public_recipes,
    "favorite": allowedRecipes.my_favorite_recipes,
    "saved":    allowedRecipes.my_saved_recipes
  };
  const recipes: RecipeOverview[] = tabToList[tab];

  return (
    <div className="one-col plan-form">
      <div className="heading">
        {
          ownership === "private"
          && plan_id
          ? <h1>Update Private Plan</h1>
          : <h1>Create Private Plan</h1>
        }
        {
          ownership === "public"
          && plan_id
          ? <h1>Update Public Plan</h1>
          : <h1>Create Public Plan</h1>
        }

        <p className="feedback">{feedback}</p>

        <div className="name">
          <label>Plan Name:</label>
          <input onChange={changePlanName} type="text" value={plan_name} />
        </div>
      </div>

      <div className="calendar">
        <div className="recipes-tabs">
          <button className={tab === "official" ? "--active" : ""} name="official" onClick={e => clickTab(e)}>Official</button>
          <button className={tab === "private" ? "--active" : ""}  name="private"  onClick={e => clickTab(e)}>My Private</button>
          <button className={tab === "public" ? "--active" : ""}   name="public"   onClick={e => clickTab(e)}>My Public</button>
          <button className={tab === "favorite" ? "--active" : ""} name="favorite" onClick={e => clickTab(e)}>My Favorite</button>
          <button className={tab === "saved" ? "--active" : ""}    name="saved"    onClick={e => clickTab(e)}>My Saved</button>
        </div>

        <Recipes
          recipes={recipes}
          removeRecipeFromDay={removeRecipeFromDay}
          reorderRecipeInDay={reorderRecipeInDay}
        />

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
              {Object.keys(included_recipes).map((recipeList, i) => (
                <div className="monthly-plan__body-day" key={i} >
                  <div className="body-day__content">
                    <Day
                      day={i + 1}
                      recipes={included_recipes[Number(recipeList)]}
                      addRecipeToDay={addRecipeToDay}
                      removeRecipeFromDay={removeRecipeFromDay}
                      reorderRecipeInDay={reorderRecipeInDay}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
              <p>Cancel? Changes will not be saved.</p>
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
          loadingText="Submit Plan..."
          name="submit"
          onClick={submit}
          text="Submit Plan"
        />
      </div>
    </div>
  );
}

type Props = {
  ownership: Ownership;
};

function useAllowedContent(ownership: Ownership) {
  const {
    my_private_recipes,
    my_public_recipes,
    my_favorite_recipes,
    my_saved_recipes
  } = useUserData();

  // EXTREMELY IMPORTANT:
  // my_private_recipes and my_saved_recipes are only allowed in private plans
  // This MUST also be checked on the backend server!!!
  return {
    //...recipes,
    my_public_recipes: (ownership === "private" || ownership === "public") ? my_public_recipes : [],
    my_favorite_recipes: (ownership === "private" || ownership === "public") ? my_favorite_recipes : [],
    my_private_recipes: ownership === "private" ? my_private_recipes : [],
    my_saved_recipes: ownership === "private" ? my_saved_recipes : []
  };
}

function isValidPlan({
  plan_name,
  setFeedback
}: {
  plan_name:   string;
  setFeedback: (feedback: string) => void;
}) {
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

interface TabToList {
  [index: string]: any;
  //"official": RecipeOverview[];
  "private":  RecipeOverview[];
  "public":   RecipeOverview[];
  "favorite": RecipeOverview[];
  "saved":    RecipeOverview[];
}

type SyntheticEvent = React.SyntheticEvent<EventTarget>;

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

function Recipes({
  recipes,
  removeRecipeFromDay,
  reorderRecipeInDay
}: {
  recipes: RecipeOverview[] | undefined;
  removeRecipeFromDay: (day: number, index: number) => void;
  reorderRecipeInDay: (day: number, dragIndex: number, hoverIndex: number) => void;
}) {
  const [ , drop ] = useDrop(() => ({
    accept: 'RECIPE',

    collect: (monitor: DropTargetMonitor) => ({
      canDrop: monitor.canDrop(),
      isOver:  monitor.isOver()
    })
  }));

  return (
    <div className="new-plan-recipes" ref={drop}>
      {recipes && recipes.map((recipe, i) => (
        <Recipe
          day={0}
          index={i}
          recipe={recipe}
          removeRecipeFromDay={removeRecipeFromDay}
          reorderRecipeInDay={reorderRecipeInDay}
        />
      ))}
    </div>
  );
}

function Recipe({
  day,
  index,
  recipe,
  removeRecipeFromDay,
  reorderRecipeInDay
}: {
  day: number;
  index: number;
  recipe: RecipeOverview;
  removeRecipeFromDay: (day: number, index: number) => void;
  reorderRecipeInDay: (day: number, dragIndex: number, hoverIndex: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [ , drag ] = useDrag(() => ({
    collect: (monitor: any) => ({isDragging: monitor.isDragging()}),

    end(item: any) {
      //const item: RecipeProps = monitor.getItem();
      if (item.day === 0) return;
      //if (dropResult && (dropResult.day !== item.day)) removeRecipeFromDay(item.day, item.index);
      removeRecipeFromDay(item.day, item.index);
    },

    item: {
      day,
      index,
      recipe,
      type: 'RECIPE'
    },

    type: 'RECIPE'
  }));

  const [ , drop ] = useDrop({
    accept: 'RECIPE',

    hover(item: {index: number}, monitor: DropTargetMonitor<any, any>) {  // TO DO: improve "any, any"
      if (!item) return;  // ?
      if (!ref.current) return;

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

      reorderRecipeInDay(day, dragIndex, hoverIndex);  // reorder/swap/move recipes
      item.index = hoverIndex;  // We mutate the monitor item here. Generally we avoid mutations, but here we mutate to avoid expensive index searches.
    }
  });

  drag(drop(ref));

  const url = "https://s3.amazonaws.com/nobsc-user-recipe";  // fix (and how to account for private/public)

  return (
    <div className="new-plan-recipe" key={recipe.recipe_id} ref={ref}>
      <div className="image"><img src={`${url}/${recipe.recipe_image}-tiny`} /></div>
      <div className="text">{recipe.title}</div>
    </div>
  );
}

function Day({
  day,
  recipes,
  addRecipeToDay,
  removeRecipeFromDay,
  reorderRecipeInDay
}: {
  day: number;
  recipes: RecipeOverview[] | undefined;
  addRecipeToDay: (day: number, recipe: RecipeOverview) => void;
  removeRecipeFromDay: (day: number, index: number) => void;
  reorderRecipeInDay: (day: number, dragIndex: number, hoverIndex: number) => void;
}) {  // TO DO: limit the max number of recipes per day to 7
  const [ { canDrop, isOver }, drop ] = useDrop(() => ({
    accept: 'RECIPE',

    collect: (monitor: DropTargetMonitor) => ({
      canDrop: monitor.canDrop(),
      isOver:  monitor.isOver()
    }),

    drop(item: any, monitor: DropTargetMonitor<any, any>) {
      const draggedRecipe = monitor.getItem();
      if (item.day !== draggedRecipe.day) addRecipeToDay(item.day, draggedRecipe.recipe);
      return {day: item.day};
    }
  }));

  const color = (isOver && canDrop) ? "--green" : "--white";

  return (
    <div className={`day${color}`} ref={drop}>
      <span className="date">{day}</span>
      {recipes && recipes.map((recipe, i) => (
        <Recipe
          day={day}
          index={i}
          recipe={recipe}
          removeRecipeFromDay={removeRecipeFromDay}
          reorderRecipeInDay={reorderRecipeInDay}
        />
      ))}
    </div>
  );
}
