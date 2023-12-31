import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useApi, useAuth, useUserData } from '../../../store';
import { LoaderSpinner } from '../../shared/LoaderSpinner';
import type { RecipeOverview } from '../../../store';

export default function Profile({ profile }: Props) {
  const router = useRouter();

  const username = router.asPath.split('/').at(1);
  if (!profile || !username || (username.length < 6) || (username.length > 20)) {
    router.push('/');
    return <LoaderSpinner />;
  }

  const { api } = useApi();
  const { authname } = useAuth();
  const { my_friendships } = useUserData();

  const [clicked, setClicked] = useState(false);
  const [tab, setTab] = useState('favorite');

  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const requestFriendship = async () => {
    if (loading) return;
    if (username === authname) {
      return setFeedback('Invalid');
    }
    setClicked(true);
    setFeedback('');
    window.scrollTo(0, 0);
    setLoading(true);
    try {
      const res = await api.post(
        `/users/${authname}/friendships`,
        {friendname: username}
      );
      setFeedback(res.data.message);
    } catch (err) {
      setClicked(false);
      setFeedback('An error occurred. Please try again.');
    }
    setTimeout(() => {
      setFeedback('');
      setLoading(false);
    }, 4000);
  };

  const { avatar, favorite_recipes, public_recipes } = profile;

  const officialUrl = 'https://s3.amazonaws.com/nobsc-official-uploads';
  const publicUrl = 'https://s3.amazonaws.com/nobsc-public-uploads';
  const avatarUrl = avatar === 'default'
    ? `${officialUrl}/avatar/default`
    : `${publicUrl}/avatar/user_id/${avatar}`;

  return (
    <div className="one-col profile">
      <h1>{username}</h1>

      <p className="feedback">{feedback}</p>

      <img className="avatar" src={`${avatarUrl}.jpg`} />
      
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
          className={tab === "favorite" ? "--active" : ""}
          onClick={() => setTab("favorite")}
        >Favorite</button>
        <button
          className={tab === "public" ? "--active" : ""}
          onClick={() => setTab("public")}
        >Public</button>
      </div>

      {tab === "favorite" && (
        favorite_recipes && favorite_recipes.length > 0
          ? (favorite_recipes.map(r => (
            <div className="item" key={r.recipe_id}>
              <span className="image">
                {r.image_filename !== "default"
                  ? <img src={`${publicUrl}/recipe/${r.image_filename}-tiny.jpg`} />
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
        public_recipes && public_recipes.length > 0
          ? (public_recipes.map(r => (
            <div className="item" key={r.recipe_id}>
              <span className="image">
                {r.image_filename !== "default"
                  ? <img src={`${publicUrl}/recipe/${r.image_filename}-tiny.jpg`} />
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

type Props = {
  profile: ProfileView;
};

export type ProfileView = {
  avatar:           string;
  favorite_recipes: RecipeOverview[];
  public_recipes:   RecipeOverview[];
};
