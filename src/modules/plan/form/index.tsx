import axios from 'axios';
import type { XYCoord } from 'dnd-core';
import update from 'immutability-helper';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import AriaModal from 'react-aria-modal';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';

import { endpoint } from '../../../config/api';
import { useAuth, useUserData, useData } from '../../../store';
import type { RecipeOverview } from '../../../store';
import { NOBSC_USER_ID } from '../../shared/constants';
import { capitalizeFirstLetter } from '../../shared/capitalizeFirstLetter';
import { ExpandCollapse } from '../../shared/ExpandCollapse';
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
      if (ownership === "public") {
        plan = my_public_plans.find(p => p.plan_id === plan_id);
      } else if (ownership === "private") {
        plan = my_private_plans.find(p => p.plan_id === plan_id);
      }
      if (!plan) return router.push(`/dashboard`);
      setPlanName(plan.plan_name);
      setIncludedRecipes(plan.included_recipes);
      setLoading(false);
    }

    if (mounted) {
      if (!authname) return router.push(`/404`);
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
    "official":    allowedRecipes.official_recipes,
    "public":      allowedRecipes.my_public_recipes,
    "my-public":   allowedRecipes.my_public_recipes,
    "my-private":  allowedRecipes.my_private_recipes,
    "my-favorite": allowedRecipes.my_favorite_recipes,
    "my-saved":    allowedRecipes.my_saved_recipes
  };
  const recipes: RecipeOverview[] = tabToList[tab];

  return (
    <div className="one-col plan-form">
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
    getData();
  }, []);

  // EXTREMELY IMPORTANT:
  // my_private_recipes and my_saved_recipes are only allowed in private plans
  // This MUST also be checked on the backend server!!!
  return {
    official_recipes,
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
    <div className="recipes" ref={drop}>
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

  const {
    recipe_id,
    author_id,
    owner_id,
    title,
    image_filename
  } = recipe;

  let url = "https://s3.amazonaws.com/nobsc/image/";

  if (author_id !== NOBSC_USER_ID) {
    url += "user/";

    if (author_id === owner_id) {
      url += "private/";
    } else {
      url += "public/";
    }
  }

  return (
    <div className="new-plan-recipe" key={recipe_id} ref={ref}>
      <div className="image">
        <img src={`${url}recipe/${author_id}/${image_filename}-tiny`} />
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
