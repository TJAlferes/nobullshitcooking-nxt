import Link from 'next/link';

import { IFriendship, IWorkRecipe } from '../../store/data/types';

export function ProfileView({
  authname,
  clicked,
  myFriendships,
  feedback,
  handleFriendRequestClick,
  handleTabChange,
  userIsAuthenticated,
  loading,
  oneColumnATheme,
  tab,
  userAvatar,
  username,
  userPublicRecipes,
  userFavoriteRecipes,
}: Props): JSX.Element {
  return (
    <div className="profile-view">
      <div>
        <span><Link href="/home"><a>Home</a></Link><i>{`&gt;`}</i></span>

        <span>{username}</span>
      </div>

      <div className={`profile one-column-a ${oneColumnATheme}`}>
        <h1>{username}</h1>

        <p className="profile__feedback">{feedback}</p>

        {userAvatar !== "nobsc-user-default" &&
          <img src={`https://s3.amazonaws.com/nobsc-user-avatars/${userAvatar}`} />
        }
        
        <div className="friend-request-outer">
          {
            userIsAuthenticated && username !== authname
            ? (
              myFriendships.find(f => f.username === username)
              ? <span>Friends</span>
              : (
                !clicked ? (
                  <button disabled={loading} onClick={handleFriendRequestClick}>
                    Send Friend Request
                  </button>
                )
                : <span>Friend Request Sent</span>
              )
            )
            : false
          }
        </div>

        <h2>Recipes</h2>
        
        <div className="profile__tabs">
          <button
            className={
              (tab === "public") ? "profile__tab--active" : "profile__tab"
            }
            onClick={() => handleTabChange("public")}
          >
            Public
          </button>
          <button
            className={
              (tab === "public") ? "profile__tab--active" : "profile__tab"
            }
            onClick={() => handleTabChange("favorite")}
          >
            Favorite
          </button>
        </div>

        <div className="profile__items">
          {
            tab === "favorite" && (
              userFavoriteRecipes.length
              ? (
                userFavoriteRecipes.map(r => (
                  <div className="profile__item" key={r.id}>
                    <span className="profile__item-tiny">
                      {
                        r.recipe_image !== "nobsc-recipe-default"
                        ? <img src={`https://s3.amazonaws.com/nobsc-user-recipe/${r.recipe_image}-tiny`} />
                        : <div className="image-default-28-18"></div>
                      }
                    </span>
                    <span className="profile__item-name">
                      <Link href={`/recipes/${r.id}`}><a>{r.title}</a></Link>
                    </span>
                  </div>
                ))
              )
              : (
                <div className="profile__none">
                  {username} hasn't favorited any recipes yet.
                </div>
              )
            )
          }
          {
            tab === "public" && (
              userPublicRecipes.length
              ? (
                  userPublicRecipes.map(r => (
                  <div className="profile__item" key={r.id}>
                    <span className="profile__item-tiny">
                      {
                        r.recipe_image !== "nobsc-recipe-default"
                        ? <img src={`https://s3.amazonaws.com/nobsc-user-recipe/${r.recipe_image}-tiny`} />
                        : <div className="image-default-28-18"></div>
                      }
                    </span>
                    <span className="profile__item-name">
                      <Link href={`/recipes/${r.id}`}><a>{r.title}</a></Link>
                    </span>
                  </div>
                ))
              )
              : (
                <div className="profile__none">
                  {username} hasn't published any recipes yet.
                </div>
              )
            )
          }
        </div>
      </div>

    </div>
  );
}

type Props = {
  authname: string;
  clicked: boolean;
  myFriendships: IFriendship[];
  feedback: string;
  handleFriendRequestClick(): void;
  handleTabChange(value: string): void;
  userIsAuthenticated: boolean;
  loading: boolean;
  oneColumnATheme: string;
  tab: string;
  userAvatar: string;
  username: string;
  userPublicRecipes: IWorkRecipe[];
  userFavoriteRecipes: IWorkRecipe[];
};