import type { XYCoord } from 'dnd-core';
import update from 'immutability-helper';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import AriaModal from 'react-aria-modal';
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { v4 as uuidv4 } from 'uuid';

import { useApi, useAuth, useUserData, useData } from '../../../store';
import type { RecipeOverview } from '../../../store';
import { NOBSC_USER_ID } from '../../shared/constants';
import { capitalizeFirstLetter } from '../../shared/capitalizeFirstLetter';
import { ExpandCollapse } from '../../shared/ExpandCollapse';
import type { Ownership } from '../../shared/types';

export default function PlanForm({ ownership }: Props) {
  //const renders = useRef(0);
  //renders.current++;

  const router = useRouter();

  const params  = useSearchParams();
  const plan_id = params.get('plan_id');  // but public uses plan_name ???

  const { api } = useApi();
  const { authname } = useAuth();
  const {
    my_public_plans, setMyPublicPlans,
    my_private_plans, setMyPrivatePlans
  } = useUserData();

  const allowedRecipes = useAllowedContent(ownership);

  const [ plan_name, setPlanName ] = useState('');
  const [ current_recipes, setCurrentRecipes ] =
    useState<CurrentRecipes>({1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: []});

  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [tab, setTab] = useState('official');

  useEffect(() => {
    let mounted = true;

    function getExistingPlanToEdit() {
      setLoading(true);
      window.scrollTo(0, 0);

      let plan = null;
      if (ownership === 'public') {
        plan = my_public_plans.find(p => p.plan_id === plan_id);
      } else if (ownership === 'private') {
        plan = my_private_plans.find(p => p.plan_id === plan_id);
      }

      if (!plan) {
        router.push(`/dashboard`);
        return;
      }

      setPlanName(plan.plan_name);

      const curr_recipes: CurrentRecipes = {1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: []};

      for (const [ key, value ] of Object.entries(plan.included_recipes)) {
        curr_recipes[parseInt(key)] = value.map(recipe => {
          const k = uuidv4();

          return {
            key: k,
            stableKey: k,
            ...recipe
          };
        });
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
    if (ownership === 'public') {
      const res = await api.get(`/users/${authname}/public-plans`);
      setMyPublicPlans(res.data);
    } else if (ownership === 'private') {
      const res = await api.get(`/users/${authname}/private-plans`);
      setMyPrivatePlans(res.data);
    }
  };

  const discardChanges = () => {
    setModalActive(false);
    router.push('/dashboard');
  };

  const addRecipeToDay = (day: number, recipe: DraggableRecipe) => {
    setCurrentRecipes(prev => ({
      ...prev,
      [day]: [...prev[day]!, recipe]
    }));
  };

  const removeRecipeFromDay = (day: number, stableKey: string) => {
    setCurrentRecipes(prev => {
      const updated = prev[day]!.filter(r => r.stableKey !== stableKey);
      return {
        ...prev,
        [day]: updated
      };
    });
  };
  
  const reorderRecipeInDay = (day: number, dragIndex: number, hoverIndex: number) => {
    const recipe = current_recipes[day]![dragIndex]!;
    setCurrentRecipes(prev => update(prev, {
      [day]: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, recipe]
        ]
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
      included_recipes: Object.entries(current_recipes).flatMap(([key, value]) => 
        value.map((recipe, index) => ({
          recipe_id:     recipe.recipe_id,
          day_number:    Number(key),
          recipe_number: index + 1
        }))
      ) as IncludedRecipe[]
    };

    try {
      if (plan_id) {
        const res = await api.patch(
          `/users/${authname}/${ownership}-plans`,
          {plan_id, ...plan_upload}
        );

        if (res.status === 204) {
          setFeedback("Plan updated.");
          await getMyPlans();
          setTimeout(() => router.push('/dashboard'), 3000);
        } else {
          setFeedback(res.data.message);
        }
      } else {
        const res = await api.post(
          `/users/${authname}/${ownership}-plans`,
          plan_upload
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
        {/*<div style={{fontSize: "2rem", color: "red"}}>{renders.current}</div>*/}

        <h1>{plan_id ? 'Update' : 'Create'} {capitalizeFirstLetter(ownership)} Plan</h1>

        <p className="feedback">{feedback}</p>

        <div className="cols">
          <div className="tabs">
            <div className={`tab ${tab === 'official' ? '--active' : ''}`} onClick={() => setTab('official')}>Official</div>
            <div className={`tab ${tab === 'public' ? '--active' : ''}`} onClick={() => setTab('public')}>Public</div>
            <div className={`tab ${tab === 'my-public' ? '--active' : ''}`} onClick={() => setTab('my-public')}>My Public</div>
            {ownership === 'private' ? (<div className={`tab ${tab === 'my-private' ? '--active' : ''}`} onClick={() => setTab('my-private')}>My Private</div>) : false}
            <div className={`tab ${tab === 'my-favorite' ? '--active' : ''}`} onClick={() => setTab('my-favorite')}>My Favorite</div>
            {ownership === 'private' ? (<div className={`tab ${tab === 'my-saved' ? '--active' : ''}`} onClick={() => setTab('my-saved')}>My Saved</div>) : false}
          </div>

          <Recipes
            recipes={recipes.map(recipe => {
              const k = uuidv4();
              return {...recipe, key: k, stableKey: k};
            })}
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
          <label htmlFor='plan_name'>Plan Name</label>
          <input
            onChange={e => setPlanName(e.target.value)}
            name="plan_name"
            type="text"
            value={plan_name}
          />
        </div>

        <div><ExpandCollapse><ToolTip /></ExpandCollapse></div>

        <div className="finish">
          <button
            className='submit-button'
            disabled={loading}
            onClick={submit}
          >{loading ? 'Creating...' : 'Create'}</button>

          <button className="cancel-button" onClick={() => setModalActive(true)}>
            Cancel
          </button>
        
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
                <button className="cancel-cancel" onClick={() => setModalActive(false)}>
                  No, Keep Working
                </button>
                <button className="cancel-button" onClick={discardChanges}>
                  Yes, Discard Changes
                </button>
              </AriaModal>
            )
            : false
          }
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
  const { api } = useApi();
  const {
    my_private_recipes,
    my_public_recipes,
    my_favorite_recipes,
    my_saved_recipes
  } = useUserData();

  useEffect(() => {
    async function getData() {
      const res = await api.get(`/recipes`, false);
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
  removeRecipeFromDay: (day: number, stableKey: string) => void;
  reorderRecipeInDay: (day: number, dragIndex: number, hoverIndex: number) => void;
}) {
  //const renders = useRef(0);
  //renders.current++;

  const [ , drop ] = useDrop(() => ({
    accept: 'RECIPE',

    collect: (monitor: DropTargetMonitor<DragItem>) => ({
      canDrop: monitor.canDrop(),
      isOver:  monitor.isOver(),
    })
  }));

  return (
    <div className="recipes" ref={drop}>
      {/*<div style={{fontSize: "2rem", color: "red"}}>{renders.current}</div>*/}

      {recipes && recipes.map((recipe, i) => (
        <Recipe
          key={recipe.key}
          stableKey={recipe.key}
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
  stableKey,
  day,
  index,
  recipe,
  removeRecipeFromDay,
  reorderRecipeInDay
}: {
  stableKey: string;
  day: number;
  index: number;
  recipe: DraggableRecipe;
  removeRecipeFromDay: (day: number, stableKey: string) => void;
  reorderRecipeInDay: (day: number, dragIndex: number, hoverIndex: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [ , drag ] = useDrag(() => ({
    collect: (monitor: DragSourceMonitor<DragItem>) => ({
      isDragging: monitor.isDragging(),
      dropResult: monitor.getDropResult(),
      //index: monitor.getItem().index
    }),

    end(item, monitor: DragSourceMonitor<DragItem, {day: number; index: number}>) {
      if (item.day === 0) return;
      if (!monitor.didDrop()) return;
      const dropResult = monitor.getDropResult();
      if (dropResult && item.day !== dropResult.day) {
        removeRecipeFromDay(item.day, stableKey);
      }
    },

    item: () => ({
      day,
      index,
      recipe
    }),

    type: 'RECIPE'
  }));

  const [ , drop ] = useDrop({
    accept: 'RECIPE',

    hover(item: DragItem, monitor: DropTargetMonitor<DragItem>) {
      //if (!item) return;  // ?
      if (!ref.current) return;
      if (item.day === 0) return;
      if (item.day !== day) return;

      const dragIndex  = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;  // Don't replace items with themselves

      // The rectangular dimensions of the Recipe item being hovered over
      const rectangle       = ref.current.getBoundingClientRect();
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
  } = recipe;  // TO DO: BUG: sometimes recipe is undefined

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

      <div className="text">{title}</div>
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
  recipes: DraggableRecipe[];
  addRecipeToDay: (day: number, recipe: DraggableRecipe) => void;
  removeRecipeFromDay: (day: number, stableKey: string) => void;
  reorderRecipeInDay: (day: number, dragIndex: number, hoverIndex: number) => void;
}) {  // TO DO: limit the max number of recipes per day to 7
  //const renders = useRef(0);
  //renders.current++;

  const [ { canDrop, isOver }, drop ] = useDrop(() => ({
    accept: 'RECIPE',

    collect: (monitor: DropTargetMonitor<DragItem>) => ({
      canDrop: monitor.canDrop(),
      isOver:  monitor.isOver()
    }),

    drop(item: DragItem, monitor: DropTargetMonitor<DragItem>) {
      if (day !== item.day) addRecipeToDay(day, item.recipe);
      return {day, index: item.index};
    }
  }));

  const color = (isOver && canDrop) ? "--green" : "--white";

  return (
    <div className={`day ${color}`} ref={drop}>
      {/*<div style={{fontSize: "2rem", color: "red"}}>{renders.current}</div>*/}

      {recipes && recipes.map(recipe => (
        <Recipe
          key={recipe.key}
          stableKey={recipe.key}
          day={day}
          index={recipes.findIndex((r) => r.stableKey === recipe.stableKey)}
          recipe={recipe}
          removeRecipeFromDay={removeRecipeFromDay}
          reorderRecipeInDay={reorderRecipeInDay}
        />
      ))}
    </div>
  );
}

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
  stableKey: string;
};

type DragItem = {
  day: number;
  index: number;
  recipe: DraggableRecipe;
};

type IncludedRecipe = {
  recipe_id:     string;
  day_number:    number;
  recipe_number: number;
};
