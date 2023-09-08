import Link                           from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect }                  from 'react';

import {
  useTypedDispatch as useDispatch,
  useTypedSelector as useSelector
} from '../../../redux';
import { Ownership } from '../../shared/types';

export default function PlanDetail({ ownership }: Props) {
  const router  = useRouter();

  const params  = useSearchParams();
  const plan_id = params.get('plan_id');

  const dispatch = useDispatch();

  const my_plans    = useSelector(state => state.userData.my_plans);
  const expandedDay = useSelector(state => state.planDetail.expandedDay);
  const planName    = useSelector(state => state.planDetail.plan_name);
  const planData    = useSelector(state => state.planDetail.plan_data);

  useEffect(() => {
    function getPlan() {
      window.scrollTo(0, 0);

      const plan = my_plans.find(p => p.plan_id === plan_id);

      if (!plan) {
        router.push('/');
        return;
      }

      dispatch(load(plan.plan_name, plan.plan_data));
    };

    if (plan_id) {
      getPlan();
    } else {
      router.push('/');
    }
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
                    {(expandedDay && (index + 1) === expandedDay) && (
                      <Day
                        day={index + 1}
                        recipes={planData[Number(recipeList)]}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="expanded-day-container">
            {expandedDay && (
              <ExpandedDay day={expandedDay} recipes={planData[expandedDay]} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  ownership: Ownership;
};

const url = "https://s3.amazonaws.com/nobsc-user-recipe";

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

// TO DO: fix
function Recipe({
  recipe: {
    recipe_id,
    owner_id,
    title,
    recipe_image
  }
}: RecipeProps) {
  return (
    <div className="plan-recipe">
      <div className="image">
        <img src={`${url}/${recipe_image}-tiny`} />
      </div>

      <div className="text">
        <Link
          href={
            Number(owner_id) === 1
            ? `/recipes/${recipe_id}`
            : `/user-recipes/${recipe_id}`
          }
        >{title}</Link>
      </div>
    </div>
  );
}

type DayProps = {
  day:     number;
  recipes: Recipe[];
};

type RecipeProps = {
  recipe: Recipe;
};
