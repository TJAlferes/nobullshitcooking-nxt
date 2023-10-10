import Link                           from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState }        from 'react';

import { useUserData } from '../../../store';
import type { RecipeOverview } from '../../../store';
import { Ownership } from '../../shared/types';
import type { DayRecipe, PlanData } from '../form';
import { NOBSC_USER_ID } from '../../shared/constants';

export default function PlanDetail({ ownership }: Props) {
  const router  = useRouter();

  const params  = useSearchParams();
  const plan_id = params.get('plan_id');

  const { my_public_plans, my_private_plans } = useUserData();  // TO DO: put this into useAllowedContent

  const [ plan_name, setPlanName ] = useState("");
  const [ plan_data, setPlanData ] = useState<PlanData>([[], [], [], [], [], [], []]);

  // why does this need to be in a useEffect?
  useEffect(() => {
    function getPlan() {
      window.scrollTo(0, 0);
      const plan = my_plans.find(p => p.plan_id === plan_id);
      if (!plan) {
        router.push('/');
        return;
      }
      setPlanName(plan.plan_name);
      setPlanData(plan.plan_data);
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
          <label>Plan Name:</label><span>{plan_name}</span>
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
              {Object.keys(plan_data).map((recipeList, i) => (
                <div className="monthly-plan__body-day" key={i}>
                  <div className="body-day__content">
                    <div className="day">
                      {plan_data[Number(recipeList)]?.map(recipe => <Recipe recipe={recipe} />)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  ownership: Ownership;
};

function Recipe({
  recipe: {
    recipe_id,
    owner_id,
    title,
    recipe_image
  }
}: {
  recipe: DayRecipe;
}) {
  return (
    <div className="plan-recipe">
      <div className="image">
        <img src={`https://s3.amazonaws.com/nobsc-user-recipe/${recipe_image.image_filename}-tiny`} />
      </div>

      <div className="text">
        <Link
          href={
            owner_id === NOBSC_USER_ID
            ? `/recipes/${recipe_id}`
            : `/user-recipes/${recipe_id}`
          }
        >{title}</Link>
      </div>
    </div>
  );
}
