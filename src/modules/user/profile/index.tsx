import axios                          from 'axios';
import Link                           from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState }        from 'react';

import { endpoint }      from '../../../config/api';
import { useAuth, useUserData } from '../../../store';
import { LoaderSpinner } from '../../shared/LoaderSpinner';
import type { RecipeOverview } from '../../../store';

export default function Profile() {
  const router   = useRouter();

  const params   = useSearchParams();
  const username = params.get('username');
  if (!username || (username.length < 6) || (username.length > 20)) {
    router.push('/');
    return <LoaderSpinner />;
  }

  const { authname } = useAuth();
  const { my_friendships } = useUserData();

  const [ userAvatar, setUserAvatar ] = useState("nobsc-user-default");
  const [ userFavoriteRecipes, setUserFavoriteRecipes ] = useState<RecipeOverview[]>([]);
  const [ userPublicRecipes,   setUserPublicRecipes ]   = useState<RecipeOverview[]>([]);

  const [ clicked, setClicked ] = useState(false);
  const [ tab,     setTab ]     = useState("public");

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ]  = useState(false);

  useEffect(() => {
    async function getProfile(username: string) {
      const res = await axios.get(`${endpoint}/users/${username}/profile`);
      setUserAvatar(res.data.avatar_url);
      setUserFavoriteRecipes(res.data.favorite_recipes);
      setUserPublicRecipes(res.data.public_recipes);
    }  // TO DO: WHAT HAPPENS IF THE USER IS NOT FOUND?
    getProfile(username);
  }, []);

  const requestFriendship = async () => {
    if (loading) return;
    if (!username) return;
    const friendname = username.trim();
    if (friendname === authname) return;
    setClicked(true);
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${endpoint}/users/${authname}/friendships`,
        {friendname},
        {withCredentials: true}
      );
      setFeedback(data.message);
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }
    //delay(4000);
    setFeedback("");
  };

  const changeTab = (value: string) => setTab(value);

  return !username ? <LoaderSpinner /> : (
    <div className="one-col profile">
      <h1>{username}</h1>

      <p className="feedback">{feedback}</p>

      {userAvatar !== "nobsc-user-default" && (
        <img src={`${url}/nobsc-user-avatars/${userAvatar}`} />
      )}
      
      <div className="friend-request-outer">
        {authname && username !== authname
          ? (my_friendships.find(f => f.username === username)
            ? <span>Friends</span>
            : (!clicked
              ? (
                <button disabled={loading} onClick={requestFriendship}>
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
      
      <div className="tabs">
        <button
          className={tab === "public" ? "--active" : ""}
          onClick={() => changeTab("public")}
        >Public</button>

        <button
          className={tab === "favorite" ? "--active" : ""}
          onClick={() => changeTab("favorite")}
        >Favorite</button>
      </div>

      {tab === "favorite" && (
        userFavoriteRecipes.length
          ? (userFavoriteRecipes.map(r => (
            <div className="item" key={r.recipe_id}>
              <span className="image">
                {r.recipe_image !== "nobsc-recipe-default"
                  ? <img src={`${url}/nobsc-user-recipe/${r.recipe_image}-tiny`} />
                  : <div className="image-default-28-18"></div>
                }
              </span>
              <span className="name">
                <Link href={`/recipe/${r.recipe_id}`}>{r.title}</Link>
              </span>
            </div>
          )))
          : <div className="none">{username} hasn't favorited any recipes yet.</div>
        )
      }

      {tab === "public" && (
        userPublicRecipes.length
          ? (userPublicRecipes.map(r => (
            <div className="item" key={r.recipe_id}>
              <span className="image">
                {r.recipe_image !== "nobsc-recipe-default"
                  ? <img src={`${url}/nobsc-user-recipe/${r.recipe_image}-tiny`} />
                  : <div className="image-default-28-18"></div>
                }
              </span>
              <span className="name">
                <Link href={`/recipe/${r.recipe_id}`}>{r.title}</Link>
              </span>
              </div>
          )))
          : <div className="none">{username} hasn't published any recipes yet.</div>
        )
      }

    </div>
  );
}

const url = "https://s3.amazonaws.com";
