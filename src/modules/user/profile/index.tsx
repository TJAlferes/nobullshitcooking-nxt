import axios                          from 'axios';
import Link                           from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState }        from 'react';

import { endpoint }                        from '../../../config/api';
import { useTypedSelector as useSelector } from '../../../redux';
import { LoaderSpinner }   from '../../../shared/LoaderSpinner';
import type { WorkRecipe } from '../../../shared/data/state';

export default function Profile() {
  const router   = useRouter();

  const params   = useSearchParams();
  const username = params.get('username');

  const authname            = useSelector(state => state.authentication.authname);
  const my_friendships      = useSelector(state => state.userData.my_friendships);
  const userIsAuthenticated = useSelector(state => state.authentication.userIsAuthenticated);
  const message             = useSelector(state => state.system.message);

  const [ clicked,    setClicked ] =    useState(false);
  const [ feedback,   setFeedback ] =   useState("");
  const [ loading,    setLoading ] =    useState(false);
  const [ tab,        setTab ] =        useState("public");
  const [ userAvatar, setUserAvatar ] = useState("nobsc-user-default");
  const [ userFavoriteRecipes, setUserFavoriteRecipes ] = useState<WorkRecipe[]>([]);
  const [ userPublicRecipes,   setUserPublicRecipes ] =   useState<WorkRecipe[]>([]);

  const url = "https://s3.amazonaws.com";

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      if (message !== "") window.scrollTo(0, 0);
      setFeedback(message);
    }
    return () => {
      isSubscribed = false;
    };
  }, [message]);

  // TO DO: getServerSideProps
  useEffect(() => {
    if (!username || (username.length < 6) || (username.length > 20)) {
      router.push('/');
      return;
    }

    // TO DO: WHAT HAPPENS IF THE USER IS NOT FOUND?

    const getUserProfile = async (username: string) => {
      const trimmed = username.trim();  // already done?
      const res = await axios.get(`${endpoint}/user/profile/${trimmed}`);

      if (res.data.avatar !== "nobsc-user-default") setUserAvatar(trimmed);  // change, use avatar from server
      setUserFavoriteRecipes(res.data.favorite_recipes);
      setUserPublicRecipes(res.data.public_recipes);
    };

    getUserProfile(username);
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
        {userIsAuthenticated && username !== authname
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
