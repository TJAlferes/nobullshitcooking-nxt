import Link                           from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect }                  from 'react';

import { useTypedDispatch as useDispatch, useTypedSelector as useSelector } from '../../store';
import { clickDay, load } from '../../store/plannerView/actions';
import type { IRecipe }   from '../../store/plannerView/types';

const url = "https://s3.amazonaws.com/nobsc-user-recipe";

export default function Plan() {
  const router = useRouter();
  const params = useSearchParams();
  const id = Number(params.get('id'));

  const dispatch = useDispatch();
  const myPlans =     useSelector(state => state.data.myPlans);
  const expandedDay = useSelector(state => state.plannerView.expandedDay);
  const planName =    useSelector(state => state.plannerView.planName);
  const planData =    useSelector(state => state.plannerView.planData);

  useEffect(() => {
    const getPlan = () => {
      window.scrollTo(0, 0);
      const [ prev ] = myPlans.filter(p => p.id === Number(id));
      dispatch(load(prev.name, prev.data));
    };

    if (id) getPlan();
    else router.push('/');
  }, []);

  return (
    <div className="one-col plan">
      <div className="heading">
        <h1>Plan</h1>
        <div className="name">
          <label>Plan Name:</label><span>{planName}</span>
        </div>
      </div>
      <div className="calendar">
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
              {Object.keys(planData).map((recipeList, index) => (
                <div className="monthly-plan__body-day" key={index}>
                  <div className="body-day__content">
                    {expandedDay && (index + 1) === expandedDay && <Day day={index + 1} recipes={planData[Number(recipeList)]} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="expanded-day-container">
            {expandedDay && <ExpandedDay day={expandedDay} recipes={planData[expandedDay]} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function Day({ day, recipes }: DayProps) {
  const dispatch = useDispatch();
  const handleClickDay = () => dispatch(clickDay(day));
  return (
    <div className="day" onClick={handleClickDay}>
      <span className="date">{day}</span>
      {recipes.map(recipe => <Recipe recipe={recipe} />)}
    </div>
  );
}

function ExpandedDay({ day, recipes }: DayProps) {
  const dispatch = useDispatch();
  const handleClickDay = () => dispatch(clickDay(day));
  return (
    <div className="expanded-day" onClick={handleClickDay}>
      <span className="date">{day}</span>
      {recipes.map(recipe => <Recipe recipe={recipe} />)}
    </div>
  );
}

function Recipe({ recipe: { id, owner_id, title, recipe_image } }: RecipeProps) {
  return (
    <div className="plan-recipe">
      <div className="image">
        <img src={`${url}/${recipe_image}-tiny`} />
      </div>
      <div className="text">
        <Link href={Number(owner_id) === 1 ? `/recipes/${id}` : `/user-recipes/${id}`}>{title}</Link>
      </div>
    </div>
  );
}

type DayProps = {
  day:     number;
  recipes: IRecipe[];
};

type RecipeProps = {
  recipe: IRecipe;
};
