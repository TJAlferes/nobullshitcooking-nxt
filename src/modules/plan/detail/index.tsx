import axios from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { endpoint } from '../../../config/api';
import { useAuth, useUserData } from '../../../store';
import type { PlanView, RecipeOverview } from '../../../store';
import { NOBSC_USER_ID } from '../../shared/constants';
import { LoaderSpinner } from '../../shared/LoaderSpinner';
import { Ownership } from '../../shared/types';

export default function PlanDetail({ ownership, plan }: Props) {
  const router  = useRouter();

  const params  = useSearchParams();
  const username = params.get('username');
  const plan_id = params.get('plan_id');

  const { authname } = useAuth();
  const { my_public_plans, my_private_plans } = useUserData();  // TO DO: put this into useAllowedContent


  const [ loading, setLoading ] = useState(false);

  const {
    plan_id,
    plan_name,
    included_recipes
  } = plan;

  /*useEffect(() => {
    let mounted = true;
    async function getExistingPlanToView() {
      setLoading(true);
      window.scrollTo(0, 0);
      let plan = null;
      if (ownership === "public") {
        if (authname) {
          plan = my_public_plans.find(p => p.plan_id === plan_id);
        } else {
          const res = await axios.get(`${endpoint}/users/${username}/public-plans/${plan_id}`);
          plan = res.data;
        }
      } else if (ownership === "private") {
        if (!authname) return router.push(`/404`);
        plan = my_private_plans.find(p => p.plan_id === plan_id);
      }
      if (!plan) return router.push('/');
      setPlanName(plan.plan_name);
      setIncludedRecipes(plan.included_recipes);
      setLoading(false);
    }
    if (mounted) {
      if (!username || !plan_id) return router.push('/404');
      if (plan_id) getExistingPlanToView();
    }
    return () => {
      mounted = false;
    };
  }, []);*/

  if (loading) return <LoaderSpinner></LoaderSpinner>;

  return (
    <div className="one-col plan-detail">
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
              {included_recipes.map((recipeList, i) => (
                <div className="monthly-plan__body-day" key={i}>
                  <div className="body-day__content">
                    <div className="day">
                      {recipeList.map(recipe => <Recipe recipe={recipe} />)}
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
  plan:      PlanView;
};

function Recipe({
  recipe: {
    recipe_id,
    author_id,
    author,
    owner_id,
    title,
    image_filename
  }
}: {
  recipe: RecipeOverview;
}) {
  let url = "https://s3.amazonaws.com/nobsc/image/";
  let path = "";

  if (author_id !== NOBSC_USER_ID) {
    url += "user/";
    path += `${author}/`;

    if (author_id === owner_id) {
      url += "private/";
      path += "private-";
    } else {
      url += "public/";
      path += "public-";
    }
  }

  return (
    <div className="plan-recipe">
      <div className="image">
        <img src={`${url}recipe/${author_id}/${image_filename}-tiny`} />
      </div>

      <div className="text">
        <Link href={`/${path}recipes/${recipe_id}`}>{title}</Link>
      </div>
    </div>
  );
}

// slugify title and use that instead of recipe_id ???
