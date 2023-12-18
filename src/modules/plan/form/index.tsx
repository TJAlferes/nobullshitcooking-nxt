import axios from 'axios';
import type { XYCoord } from 'dnd-core';
import update from 'immutability-helper';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { memo, useEffect, useRef, useState } from 'react';
import AriaModal from 'react-aria-modal';
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { v4 as uuidv4 } from 'uuid';

import { endpoint } from '../../../config/api';
import { useAuth, useUserData, useData } from '../../../store';
import type { PlanView, RecipeOverview, IncludedRecipes } from '../../../store';
import { NOBSC_USER_ID } from '../../shared/constants';
import { capitalizeFirstLetter } from '../../shared/capitalizeFirstLetter';
import { ExpandCollapse } from '../../shared/ExpandCollapse';
import type { Ownership } from '../../shared/types';

export default function PlanForm({ ownership }: Props) {
  const renders = useRef(0);
  renders.current++;

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
  const [ current_recipes, setCurrentRecipes ] = useState<CurrentRecipes>({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: []
  });

  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [tab, setTab] = useState("official");

  useEffect(() => {
    let mounted = true;

    function getExistingPlanToEdit() {
      setLoading(true);
      window.scrollTo(0, 0);
      let plan = null;
      // (fetched from the backend when they logged in)
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

      const curr_recipes: CurrentRecipes = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: []
      };
      for (const [ key, value ] of Object.entries(plan.included_recipes)) {
        curr_recipes[parseInt(key)] = value.map(recipe => ({...recipe, key: uuidv4()}));
      }
      setCurrentRecipes(curr_recipes);
      setLoading(false);
    }

    if (mounted) {
      if (!authname) {
        router.push(`/404`);
        return;
      }
      if (plan_id) getExistingPlanToEdit();
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

  const discardChanges = () => {
    setModalActive(false);
    router.push('/dashboard');
  };

  const addRecipeToDay = (day: number, recipe: DraggableRecipe) => {
    if (!day) return;
    setCurrentRecipes(prev => update(prev, {
      [day]: {
        $push: [recipe]
      }
    }));
  };
  
  const removeRecipeFromDay = (day: number, index: number) => {
    if (!day) return;
    setCurrentRecipes(prev => update(prev, {
      [day]: {
        $splice: [[index, 1]]
      }
    }));
  };
  
  const reorderRecipeInDay = (day: number, dragIndex: number, hoverIndex: number) => {
    if (!day) return;
    setCurrentRecipes(prev => update(prev, {
      [day]: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, prev[day]![dragIndex]!]]
      }
    }));
  };

  const invalid = (message: string) => {
    setFeedback(message);
    setLoading(false);
  };

  const submit = async () => {
    window.scrollTo(0, 0);
    setFeedback('');
    setLoading(true);
    if (plan_name.trim() === '') return invalid('Plan Name required.');

    const plan_upload = {
      plan_name,
      included_recipes: () => Object.entries(current_recipes).map(([key, value]) => 
        value.map((recipe, index) => ({
          recipe_id:     recipe.recipe_id,
          day_number:    key,
          recipe_number: index + 1
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
    "official":    allowedRecipes.official_recipes,
    "public":      allowedRecipes.my_public_recipes,
    "my-public":   allowedRecipes.my_public_recipes,
    "my-private":  allowedRecipes.my_private_recipes,
    "my-favorite": allowedRecipes.my_favorite_recipes,
    "my-saved":    allowedRecipes.my_saved_recipes
  };
  const recipes: RecipeOverview[] = tabToList[tab];

  return (
    <DndProvider options={HTML5toTouch}>
      <div className="one-col plan-form">
        <div style={{fontSize: "2rem", color: "red"}}>{renders.current}</div>
        <div>{JSON.stringify(current_recipes[1], undefined, 2)}</div>

        <h1>{plan_id ? 'Update' : 'Create'} {capitalizeFirstLetter(ownership)} Plan</h1>

        <p className="feedback">{feedback}</p>

        <div className="cols">
          <div className="tabs">
            <div className={`tab ${tab === "official" ? "--active" : ""}`} onClick={() => setTab('official')}>Official</div>
            <div className={`tab ${tab === "public" ? "--active" : ""}`} onClick={() => setTab('public')}>Public</div>
            <div className={`tab ${tab === "my-public" ? "--active" : ""}`} onClick={() => setTab('my-public')}>My Public</div>
            <div className={`tab ${tab === "my-private" ? "--active" : ""}`} onClick={() => setTab('my-private')}>My Private</div>
            <div className={`tab ${tab === "my-favorite" ? "--active" : ""}`} onClick={() => setTab('my-favorite')}>My Favorite</div>
            <div className={`tab ${tab === "my-saved" ? "--active" : ""}`} onClick={() => setTab('my-saved')}>My Saved</div>
          </div>

          <Recipes
            recipes={recipes.map(recipe => ({...recipe, key: uuidv4()}))}
            removeRecipeFromDay={removeRecipeFromDay}
            reorderRecipeInDay={reorderRecipeInDay}
          />

          <div className="calendar">
            <div className="weekdays">
              <span>Sunday</span>
              <span>Monday</span>
              <span>Tuesday</span>
              <span>Wednesday</span>
              <span>Thursday</span>
              <span>Friday</span>
              <span>Saturday</span>
            </div>
            {/*<div className="monthly-plan"></div>*/}
            <div className="weekly-plan">
              {Object.entries(current_recipes).map(([key, value]) => (
                <Day
                  key={parseInt(key)}
                  day={parseInt(key)}
                  recipes={value}
                  addRecipeToDay={addRecipeToDay}
                  removeRecipeFromDay={removeRecipeFromDay}
                  reorderRecipeInDay={reorderRecipeInDay}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="name">
          <h3>Plan Name</h3>
          <input onChange={e => setPlanName(e.target.value)} name="plan_name" type="text" value={plan_name} />
        </div>

        <div><ExpandCollapse><ToolTip /></ExpandCollapse></div>

        <div className="finish">
          <button className="cancel-button" onClick={() => setModalActive(true)}>Cancel</button>
        
          {
            modalActive
            ? (
              <AriaModal
                dialogClass="cancel"
                focusDialog={true}
                focusTrapOptions={{returnFocusOnDeactivate: false}}
                getApplicationNode={() => document.getElementById('root') as Element | Node}
                onExit={() => setModalActive(false)}
                titleText="Cancel?"
                underlayClickExits={false}
              >
                <p>Cancel? Changes will not be saved.</p>
                <button className="cancel-cancel" onClick={() => setModalActive(false)}>No, Keep Working</button>
                <button className="cancel-button" onClick={discardChanges}>Yes, Discard Changes</button>
              </AriaModal>
            )
            : false
          }

          <button
            className='submit-button'
            disabled={loading}
            onClick={submit}
          >{loading ? 'Creating...' : 'Create'}</button>
        </div>
      </div>
    </DndProvider>
  );
}

type Props = {
  ownership: Ownership;
};

function useAllowedContent(ownership: Ownership) {
  const { official_recipes, setOfficialRecipes } = useData();

  const {
    my_private_recipes,
    my_public_recipes,
    my_favorite_recipes,
    my_saved_recipes
  } = useUserData();

  useEffect(() => {
    async function getData() {
      const res = await axios.get(`${endpoint}/recipes`);
      if (res.status === 200) {
        const official_recipes: RecipeOverview[] = res.data;
        setOfficialRecipes(official_recipes);
      }
    }
    if (official_recipes.length === 0) getData();
  }, []);

  // EXTREMELY IMPORTANT:
  // my_private_recipes and my_saved_recipes are only allowed in private plans
  // This MUST also be checked on the backend server!!!
  return {
    official_recipes,
    //public_recipes,
    my_public_recipes: (ownership === "private" || ownership === "public") ? my_public_recipes : [],
    my_favorite_recipes: (ownership === "private" || ownership === "public") ? my_favorite_recipes : [],
    my_private_recipes: ownership === "private" ? my_private_recipes : [],
    my_saved_recipes: ownership === "private" ? my_saved_recipes : []
  };
}

interface TabToList {
  [index: string]: any;
  "official":    RecipeOverview[];
  "public":      RecipeOverview[];
  "my-public":   RecipeOverview[];
  "my-private":  RecipeOverview[];
  "my-favorite": RecipeOverview[];
  "my-saved":    RecipeOverview[];
}

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
  recipes: DraggableRecipe[];
  removeRecipeFromDay: (day: number, index: number) => void;
  reorderRecipeInDay: (day: number, dragIndex: number, hoverIndex: number) => void;
}) {
  const renders = useRef(0);
  renders.current++;

  const [ , drop ] = useDrop(() => ({
    accept: 'RECIPE',

    collect: (monitor: DropTargetMonitor) => ({
      canDrop: monitor.canDrop(),
      isOver:  monitor.isOver(),
    })
  }));

  return (
    <div className="recipes" ref={drop}>
      <div style={{fontSize: "2rem", color: "red"}}>{renders.current}</div>

      {recipes && recipes.map((recipe, i) => (
        <Recipe
          key={recipe.key}
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
  recipe: DraggableRecipe;
  removeRecipeFromDay: (day: number, index: number) => void;
  reorderRecipeInDay: (day: number, dragIndex: number, hoverIndex: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [ , drag ] = useDrag(() => ({
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
      dropResult: monitor.getDropResult()
    }),

    end(item, monitor: DragSourceMonitor<DragItem, {day: number}>) {
      if (item.day === 0) return;
      if (!monitor.didDrop()) return;
      const dropResult = monitor.getDropResult();
      if (dropResult && item.day !== dropResult.day) {
        removeRecipeFromDay(item.day, item.index);
      }
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

    hover(item: DragItem, monitor: DropTargetMonitor<DragItem>) {  // TO DO: improve "any, any"
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

      if (!monitor.isOver()) return;

      reorderRecipeInDay(day, dragIndex, hoverIndex);
      item.index = hoverIndex;  // We mutate the monitor item here. Generally we avoid mutations, but here we mutate to avoid expensive index searches.
    }
  });

  drag(drop(ref));

  const {
    key,
    recipe_id,
    author_id,
    owner_id,
    title,
    image_filename
  } = recipe;

  let officialUrl = 'https://s3.amazonaws.com/nobsc-official-uploads/recipe';
  let publicUrl = 'https://s3.amazonaws.com/nobsc-public-uploads/recipe';
  let privateUrl = 'https://s3.amazonaws.com/nobsc-private-uploads/recipe';
  let url = '';

  if (author_id === NOBSC_USER_ID) {
    url = officialUrl;
  } else {
    if (author_id === owner_id) {
      url = `${privateUrl}/${author_id}`;
    } else {
      url = `${publicUrl}/${author_id}`;
    }
  }

  return (
    <div className="recipe" key={key} ref={ref}>
      <div className="image">
        <img src={`${url}/${image_filename}-tiny.jpg`} />
      </div>

      <div className="text">{key}</div>
    </div>
  );
}

const Day = memo(function DayComponent({
  day,
  recipes,
  addRecipeToDay,
  removeRecipeFromDay,
  reorderRecipeInDay
}: {
  day: number;
  recipes: DraggableRecipe[];
  addRecipeToDay: (day: number, recipe: DraggableRecipe) => void;
  removeRecipeFromDay: (day: number, index: number) => void;
  reorderRecipeInDay: (day: number, dragIndex: number, hoverIndex: number) => void;
}) {  // TO DO: limit the max number of recipes per day to 7
  const renders = useRef(0);
  renders.current++;

  const [ { canDrop, isOver }, drop ] = useDrop(() => ({
    accept: 'RECIPE',

    collect: (monitor: DropTargetMonitor) => ({
      canDrop: monitor.canDrop(),
      isOver:  monitor.isOver()
    }),

    drop(item: DragItem) {
      if (day !== item.day) addRecipeToDay(day, item.recipe);
      return {day};
    }
  }));

  const color = (isOver && canDrop) ? "--green" : "--white";

  return (
    <div className={`day ${color}`} ref={drop}>
      <div style={{fontSize: "2rem", color: "red"}}>{renders.current}</div>

      {recipes && recipes.map((recipe, i) => (
        <Recipe
          key={recipe.key}
          day={day}
          index={i}
          recipe={recipe}
          removeRecipeFromDay={removeRecipeFromDay}
          reorderRecipeInDay={reorderRecipeInDay}
        />
      ))}
    </div>
  );
});

type CurrentRecipes = {
  [index: number]: DraggableRecipe[];
  1: DraggableRecipe[];
  2: DraggableRecipe[];
  3: DraggableRecipe[];
  4: DraggableRecipe[];
  5: DraggableRecipe[];
  6: DraggableRecipe[];
  7: DraggableRecipe[];
};

type DraggableRecipe = RecipeOverview & {
  key: string;
};

type DragItem = {
  type: string;
  index: number;
  day: number;
  recipe: DraggableRecipe;
};
