import Link from 'next/link';
//import { useRouter } from 'next/router';

//import { useAuth } from '../../../store';
import type { PlanView, RecipeOverview } from '../../../store';
import { NOBSC_USER_ID } from '../../shared/constants';
import { LoaderSpinner } from '../../shared/LoaderSpinner';
import { Ownership } from '../../shared/types';

export default function PlanDetail({ ownership, plan }: Props) {
  if (!plan) return <LoaderSpinner />;  // or return router.push('/404'); ???

  const {
    //plan_id,
    //owner_id,
    plan_name,
    included_recipes
  } = plan;

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
  //let url = "https://s3.amazonaws.com";
  //if (ownership === "private") {
  //  if (auth_id !== owner_id) {
  //    router.push('/404');
  //    return false;
  //  }
  //  url += "/nobsc-private-uploads";
  //} else if (ownership === "public") {
  //  url += "/nobsc-public-uploads";
  //}

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
