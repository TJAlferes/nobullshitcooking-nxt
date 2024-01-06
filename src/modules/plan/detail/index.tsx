import Link from 'next/link';
//import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

//import { useAuth } from '../../../store';
import type { PlanView, RecipeOverview } from '../../../store';
import { NOBSC_USER_ID } from '../../shared/constants';
import { Ownership } from '../../shared/types';
import type { CurrentRecipes, DraggableRecipe } from '../form';

export default function PlanDetail({ ownership, plan }: Props) {
  const {
    plan_id,
    author_id,
    author,
    //avatar ???
    owner_id,
    plan_name,
    included_recipes
  } = plan;

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

  return (
    <div className="one-col plan-detail">
      <h1>{plan_name}</h1>

      <div className="author">
        <span>Author:</span>
        {' '}
        {author === "Unknown"
          ? "Unknown"
          : <Link href={`/${encodeURIComponent(author)}/profile`}>{author}</Link>}
      </div>

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
              {Object.entries(curr_recipes).map(([key, value]) => (
                <Day recipes={value} key={parseInt(key)} />
              ))}
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
  recipe
}: {
  recipe: DraggableRecipe;
}) {
  const {
    key,
    recipe_id,
    author_id,
    author,
    owner_id,
    title,
    image_filename
  } = recipe;  // TO DO: BUG: sometimes recipe is undefined

  let officialUrl = 'https://s3.amazonaws.com/nobsc-official-uploads/recipe';
  let publicUrl = `https://s3.amazonaws.com/nobsc-public-uploads/recipe/${author_id}`;
  let privateUrl = `https://s3.amazonaws.com/nobsc-private-uploads/recipe/${author_id}`;
  let url = '';

  let officialPath = `/recipe/detail/${title}`;
  let publicPath = `/${author}/recipe/detail/${title}`;
  let privatePath = `/${author}/private/recipe/detail/${recipe_id}`;
  let path = '';

  if (author_id === NOBSC_USER_ID && owner_id === NOBSC_USER_ID) {
    url = officialUrl;
    path = officialPath;
  } else if (author_id !== NOBSC_USER_ID && owner_id === NOBSC_USER_ID) {
    url = publicUrl;
    path = publicPath;
  } else {
    url = privateUrl;
    path = privatePath;
  }

  return (
    <div className="recipe" key={key}>
      <div className="image">
        <img src={`${url}/${image_filename}-tiny.jpg`} />
      </div>

      <div className="text">
        <Link href={path}>{title}</Link>
      </div>
    </div>
  );
}

function Day({
  recipes
}: {
  recipes: DraggableRecipe[];
}) {
  return (
    <div className='day'>
      {recipes && recipes.map(recipe => (
        <Recipe key={recipe.key} recipe={recipe} />
      ))}
    </div>
  );
}
