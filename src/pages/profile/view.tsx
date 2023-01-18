import Link from 'next/link';

import type { IFriendship, IWorkRecipe } from '../../store/data/types';

const url = "https://s3.amazonaws.com";

export function ProfileView({
  authname,
  clicked,
  myFriendships,
  feedback,
  requestFriendship,
  changeTab,
  userIsAuthenticated,
  loading,
  theme,
  tab,
  userAvatar,
  username,
  userPublicRecipes,
  userFavoriteRecipes,
}: Props): JSX.Element {
  return (
    <div className={`profile one-column-a ${theme}`}>
      <h1>{username}</h1>

      <p className="feedback">{feedback}</p>

      {userAvatar !== "nobsc-user-default" && <img src={`${url}/nobsc-user-avatars/${userAvatar}`} />}
      
      <div className="friend-request-outer">
        {userIsAuthenticated && username !== authname
          ? (myFriendships.find(f => f.username === username)
            ? <span>Friends</span>
            : (!clicked
              ? <button disabled={loading} onClick={requestFriendship}>Send Friend Request</button>
              : <span>Friend Request Sent</span>
            )
          )
          : false
        }
      </div>

      <h2>Recipes</h2>
      
      <div className="tabs">
        <button className={(tab === "public") ? "--active" : undefined} onClick={() => changeTab("public")}>Public</button>
        <button className={(tab === "public") ? "--active" : undefined} onClick={() => changeTab("favorite")}>Favorite</button>
      </div>

      {tab === "favorite" && (
        userFavoriteRecipes.length
          ? (userFavoriteRecipes.map(r => (
            <div className="item" key={r.id}>
              <span className="image">
                {r.recipe_image !== "nobsc-recipe-default"
                  ? <img src={`${url}/nobsc-user-recipe/${r.recipe_image}-tiny`} />
                  : <div className="image-default-28-18"></div>
                }
              </span>
              <span className="name">
                <Link href={`/recipes/${r.id}`}>{r.title}</Link>
              </span>
            </div>
          )))
          : <div className="none">{username} hasn't favorited any recipes yet.</div>
        )
      }

      {tab === "public" && (
        userPublicRecipes.length
          ? (userPublicRecipes.map(r => (
            <div className="item" key={r.id}>
              <span className="image">
                {r.recipe_image !== "nobsc-recipe-default"
                  ? <img src={`${url}/nobsc-user-recipe/${r.recipe_image}-tiny`} />
                  : <div className="image-default-28-18"></div>
                }
              </span>
              <span className="name">
                <Link href={`/recipes/${r.id}`}>{r.title}</Link>
              </span>
              </div>
          )))
          : <div className="none">{username} hasn't published any recipes yet.</div>
        )
      }

    </div>
  );
}

type Props = {
  authname:                 string;
  clicked:                  boolean;
  myFriendships:            IFriendship[];
  feedback:                 string;
  requestFriendship():      void;
  changeTab(value: string): void;
  userIsAuthenticated:      boolean;
  loading:                  boolean;
  theme:                    string;
  tab:                      string;
  userAvatar:               string;
  username:                 string;
  userPublicRecipes:        IWorkRecipe[];
  userFavoriteRecipes:      IWorkRecipe[];
};