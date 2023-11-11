import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import AriaModal from 'react-aria-modal';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { endpoint } from '../../../config/api';
import { useAuth, useUserData } from '../../../store';
import { getCroppedImage } from '../../shared/getCroppedImage';
import { uploadImageToAwsS3 } from '../../shared/uploadImageToAwsS3';

export default function Dashboard() {
  const router = useRouter();

  const auth = useAuth();
  const userData = useUserData();

  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('avatar');
  const [subTab, setSubTab] = useState('private');
  const [deleteId, setDeleteId] = useState('');
  const [deleteName, setDeleteName] = useState('');
  const [modalActive, setModalActive] = useState(false);

  const [new_email, setNewEmail] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [new_username, setNewUsername] = useState('');

  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);
  const [small_avatar, setSmallAvatar] = useState<File | null>(null);
  const [tiny_avatar, setTinyAvatar] = useState<File | null>(null);

  const [crop, setCrop] = useState<Crop>({
    unit:   'px',
    x:      25,
    y:      25,
    width:  50,
    height: 50
  });
  const [smallCrop, setSmallCrop] = useState('');
  const [tinyCrop, setTinyCrop] = useState('');

  const imageRef = useRef<HTMLImageElement | null>();

  const updateEmail = async () => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    try {
      const res = await axios.patch(
        `${endpoint}/users/${auth.authname}/update-email`,
        {new_email},
        {withCredentials: true}
      );
      if (res.status === 204) {
        setFeedback("Email updated.")
        auth.setAuthEmail(new_email);
        setTimeout(() => router.push('/dashboard'), 3000);
      } else {
        setFeedback(res.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const updatePassword = async () => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    try {
      const res = await axios.patch(
        `${endpoint}/users/${auth.authname}/update-password`,
        {new_password},
        {withCredentials: true}
      );
      if (res.status === 204) {
        setFeedback("Password updated.")
        setTimeout(() => router.push('/dashboard'), 3000);
      } else {
        setFeedback(res.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const updateUsername = async () => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    try {
      const res = await axios.patch(
        `${endpoint}/users/${auth.authname}/update-username`,
        {new_username},
        {withCredentials: true}
      );
      if (res.status === 204) {
        setFeedback("Username updated.")
        auth.setAuthname(new_username);
        setTimeout(() => router.push('/dashboard'), 3000);
      } else {
        setFeedback(res.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const deleteAccount = async () => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    try {
      const res = await axios.delete(`${endpoint}/users/${auth.authname}`, {withCredentials: true});
      if (res.status === 204) {
        setFeedback('User account deleted.');
        auth.logout();
        router.push('/home');
      } else {
        setFeedback(res.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const getApplicationNode = () => document.getElementById('root') as Element | Node;

  const activateModal = (id: string, name: string) => {
    setDeleteId(id);
    setDeleteName(name);
    setModalActive(true);
  };

  const deactivateModal = () => {
    setDeleteId("");
    setDeleteName("");
    setModalActive(false);
  };

  const cancelAvatar = () => {
    setSmallCrop("");
    setTinyCrop("");
    setAvatar(null)
    setSmallAvatar(null);
    setTinyAvatar(null);
  };

  const unattributePublicPlan = async (plan_id: string) => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    const url = `${endpoint}/users/${auth.authname}/public-plans`
    try {
      const res1 = await axios.delete(`${url}/${plan_id}`, {withCredentials: true});
      if (res1.status === 204) {
        setFeedback("Public plan unattributed.");
        const res2 = await axios.get(url, {withCredentials: true});
        userData.setMyPublicPlans(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);
      } else {
        setFeedback(res1.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const unattributePublicRecipe = async (recipe_id: string) => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    const url = `${endpoint}/users/${auth.authname}/public-recipes`;
    try {
      const res1 = await axios.patch(`${url}/${recipe_id}`, {withCredentials: true});
      if (res1.status === 204) {
        setFeedback("Public recipe unattributed.");
        const res2 = await axios.get(url, {withCredentials: true});
        userData.setMyPublicRecipes(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);
      } else {
        setFeedback(res1.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const deletePrivateEquipment = async (equipment_id: string) => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    const url = `${endpoint}/users/${auth.authname}/private-equipment`;
    try {
      const res1 = await axios.delete(`${url}/${equipment_id}`, {withCredentials: true});
      if (res1.status === 204) {
        setFeedback("Private equipment deleted.");
        const res2 = await axios.get(url, {withCredentials: true});
        userData.setMyPrivateEquipment(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);  // necessary???
      } else {
        setFeedback(res1.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const deletePrivateIngredient = async (ingredient_id: string) => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    const url = `${endpoint}/users/${auth.authname}/private-ingredients`
    try {
      const res1 = await axios.delete(`${url}/${ingredient_id}`, {withCredentials: true});
      if (res1.status === 204) {
        setFeedback("Private ingredient deleted.");
        const res2 = await axios.get(url, {withCredentials: true});
        userData.setMyPrivateIngredients(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);  // necessary???
      } else {
        setFeedback(res1.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const deletePrivatePlan = async (plan_id: string) => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    const url = `${endpoint}/users/${auth.authname}/private-plans`
    try {
      const res1 = await axios.delete(`${url}/${plan_id}`, {withCredentials: true});
      if (res1.status === 204) {
        setFeedback("Private plan deleted.");
        const res2 = await axios.get(url, {withCredentials: true});
        userData.setMyPrivatePlans(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);  // necessary???
      } else {
        setFeedback(res1.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const deletePrivateRecipe = async (recipe_id: string) => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    const url = `${endpoint}/users/${auth.authname}/private-recipes`;
    try {
      const res1 = await axios.delete(`${url}/${recipe_id}`, {withCredentials: true});
      if (res1.status === 204) {
        setFeedback("Private recipe deleted.");
        const res2 = await axios.get(url, {withCredentials: true});
        userData.setMyPrivateRecipes(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);  // necessary???
      } else {
        setFeedback(res1.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (!(target.files && target.files.length > 0)) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => setAvatar(reader.result));
    reader.readAsDataURL(target.files[0] as Blob);
  };

  const makeCrops = async (crop: Crop) => {
    if (!imageRef.current) return;
    const small = await getCroppedImage(280, 280, imageRef.current, crop);
    const tiny = await getCroppedImage(28, 28, imageRef.current, crop);
    if (!small || !tiny) return;
    setSmallCrop(small.preview);
    setTinyCrop(tiny.preview);
    setSmallAvatar(small.final);
    setTinyAvatar(tiny.final);
  };

  const uploadAvatar = async () => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    try {
      let new_avatar = "";
      if (small_avatar && tiny_avatar) {
        const { data } = await axios.post(
          `${endpoint}/signed-url`,
          {subfolder: 'public/avatar/'},
          {withCredentials: true}
        );
        await uploadImageToAwsS3(data.smallSignature, small_avatar);
        await uploadImageToAwsS3(data.tinySignature, tiny_avatar);
        new_avatar = data.filename;
      }
      const res = await axios.patch(
        `${endpoint}/users/${auth.authname}/avatar`,
        {new_avatar},
        {withCredentials: true}
      );
      if (res.status === 204) {
        setFeedback("Avatar updated.");
        auth.setAuthAvatar(new_avatar);
        setTimeout(() => router.push(`/dashboard`), 3000);
      } else {
        setFeedback(res.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const unfavorite = async (recipe_id: string) => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    const url = `${endpoint}/users/${auth.authname}/favorite-recipes`;
    try {
      const res1 = await axios.delete(`${url}/${recipe_id}`, {withCredentials: true});
      if (res1.status === 204) {
        setFeedback("Recipe unfavorited.");
        const res2 = await axios.get(url, {withCredentials: true});
        userData.setMyFavoriteRecipes(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);  // necessary???
      } else {
        setFeedback(res1.data.message);
      }
    } catch(err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const unsave = async (recipe_id: string) => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    const url = `${endpoint}/users/${auth.authname}/saved-recipes`
    try {
      const res1 = await axios.delete(`${url}/${recipe_id}`, {withCredentials: true});
      if (res1.status === 204) {
        setFeedback("Recipe unsaved.");
        const res2 = await axios.get(url, {withCredentials: true});
        userData.setMySavedRecipes(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);  // necessary???
      } else {
        setFeedback(res1.data.message);
      }
    } catch(err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const commonAriaModalProps = {
    dialogClass: 'dashboard-modal',
    focusDialog: true,
    focusTrapOptions: {
      returnFocusOnDeactivate: false
    },
    getApplicationNode,
    onExit: deactivateModal,
    titleText: 'Cancel?',
    underlayClickExits: false,
  };

  return (
    <div className="one-col dashboard">
      <h1>{auth.authname}</h1>

      <p className="feedback">{feedback}</p>

      {!avatar && <Tabs tab={tab} setTab={setTab} />}

      {
        tab === "settings" && (
        <div className='dashboard-settings'>
          <label htmlFor='new-username'>New Username:</label>
          <input
            name='new-username'
            onChange={e => setNewUsername(e.target.value)}
            value={new_username}
            minLength={6}
            maxLength={20}
          />
          <button onClick={updateUsername}>Update Username</button>

          <label htmlFor='new-email'>New Email:</label>
          <input
            name='new-email'
            onChange={e => setNewEmail(e.target.value)}
            value={new_email}
            minLength={5}
            maxLength={60}
          />
          <button onClick={updateEmail}>Update Email</button>

          <label htmlFor='new-password'>New Password:</label>
          <input
            name='new-password'
            onChange={e => setNewPassword(e.target.value)}
            value={new_password}
            minLength={6}
            maxLength={60}
          />
          <button onClick={updatePassword}>Update Password</button>
        </div>
        )
      }

      {tab === "avatar" && (
        <>
          {!avatar && (
            <div className="dashboard-avatar">
              <Link href={`/profile/${auth.authname}`}>View Profile</Link>
      
              <h2>Profile Picture</h2>
      
              <div className="avatar-crops">
                <div className="--full">
                  <span>Full Size: </span>
                  <img src={`${avatarUrl}/${auth.auth_avatar}`} />
                </div>

                <div className="--tiny">
                  <span>Tiny Size: </span>
                  <img src={`${avatarUrl}/${auth.auth_avatar}-tiny`} />
                </div>
              </div>
      
              <label>Change</label>

              <input
                accept="image/*"
                name="set-avatar"
                onChange={onSelectFile}
                type="file"
              />
            </div>
          )}
          
          {avatar && (
            <div className="dashboard-avatar-edit">
              <ReactCrop
                aspect={1}
                className="avatar-edit-tool"
                crop={crop}
                onChange={crop => setCrop(crop)}
                onComplete={crop => makeCrops(crop)}
                style={{minHeight: "300px"}}
              >
                <img onLoad={e => imageRef.current = e.currentTarget} src={avatar as string} />
              </ReactCrop>
      
              <p>Move the crop to your desired position, then click "Complete". These two images will be saved for you:</p>
      
              <div className="avatar-crops">
                <div className="--full">
                  <span>Full Size: </span>
                  <img src={smallCrop} />
                </div>

                <div className="--tiny">
                  <span>Tiny Size: </span>
                  <img src={tinyCrop} />
                </div>
              </div>
      
              <button
                className="--cancel"
                disabled={loading}
                name="cancel-avatar"
                onClick={cancelAvatar}
              >Cancel</button>

              <button
                className="--submit"
                disabled={loading}
                name="submit-avatar"
                onClick={uploadAvatar}
              >Complete</button>
            </div>
          )}
        </>
      )}

      {tab === "plans" && (
        <div className="dashboard-content">
          <h2>Plans</h2>
  
          <Link href="/plan/form`" className="new-entity">
            Create New Plan
          </Link>
  
          {modalActive
            ? (
              <AriaModal {...commonAriaModalProps}>
                <p>{'Delete Private Plan: '}{deleteName}{' ?'}</p>

                <button className="--cancel" onClick={deactivateModal}>
                  Cancel
                </button>

                <button className="--action" onClick={() => deletePrivatePlan(deleteId)}>
                  Yes, Delete Plan
                </button>
              </AriaModal>
            )
            : false
          }
  
          {userData.my_private_plans.length
            ? userData.my_private_plans.map(p => (
              <div className="dashboard-item" key={p.plan_id}>
                <span className="name">
                  <Link href={`/user-plan/${p.plan_id}`}>{p.plan_name}</Link>
                </span>

                <span className="action">
                  <Link href={`/new-plan/${p.plan_id}`}>Edit</Link>
                </span>

                <span
                  className="delete"
                  onClick={() => activateModal(p.plan_id, p.plan_name)}
                >Delete</span>
              </div>
            ))
            : <div className="no-content">You haven't created any plans yet.</div>
          }
        </div>
      )}

      {tab === "recipes" && subTab === "private" && (
        <div className="dashboard-content">
          <h2>Private Recipes</h2>

          <Link href="/new-recipe" className="new-entity">
            Create New Private Recipe
          </Link>

          {modalActive
            ? (
              <AriaModal {...commonAriaModalProps}>
                <p>{'Delete Private Recipe: '}{deleteName}{' ?'}</p>

                <button className="--cancel" onClick={deactivateModal}>
                  Cancel
                </button>

                <button className="--action" onClick={() => deletePrivateRecipe(deleteId)}>
                  Yes, Delete Recipe
                </button>
              </AriaModal>
            )
            : false
          }

          <Subtabs subTab={subTab} setSubTab={setSubTab} />

          {userData.my_private_recipes.length
            ? userData.my_private_recipes.map(r => (
              <div className="dashboard-item" key={r.recipe_id}>
                <span className="tiny">
                  {r.image_filename !== "nobsc-recipe-default"
                    ? <img src={`${recipeUrl}/${r.image_filename}-tiny`} />
                    : <div className="img-28-18"></div>
                  }
                </span>

                <span className="name">
                  <Link href={`/user-recipe/${r.recipe_id}`}>{r.title}</Link>
                </span>

                <span className="action">
                  <Link href={`/new-recipe/${r.recipe_id}`}>Edit</Link>
                </span>

                <span
                  className="delete"
                  onClick={() => activateModal(r.recipe_id, r.title)}
                >Delete</span>
              </div>
            ))
            : <div className="no-content">You haven't created any private recipes yet.</div>
          }
        </div>
      )}

      {tab === "recipes" && subTab === "public" && (
        <div className="dashboard-content">
          <h2>Public Recipes</h2>

          <Link href="/new-recipe" className="new-entity">
            Create New Public Recipe
          </Link>

          {modalActive
            ? (
              <AriaModal {...commonAriaModalProps}>
                <p>{'Unattribute Recipe: '}{deleteName}{' ?'}</p>
                <p>Author will be renamed to "Unknown" and you will no longer control this recipe.</p>

                <button className="--cancel" onClick={deactivateModal}>
                  Cancel
                </button>

                <button className="--action" onClick={() => unattributePublicRecipe(deleteId)}>
                  Yes, Unattribute Recipe
                </button>
              </AriaModal>
            )
            : false
          }

          <Subtabs subTab={subTab} setSubTab={setSubTab} />

          {userData.my_public_recipes.length
            ? userData.my_public_recipes.map(r => (
              <div className="dashboard-item" key={r.recipe_id}>
                <span className="tiny">
                  {r.image_filename !== "nobsc-recipe-default"
                    ? <img src={`${recipeUrl}/${r.image_filename}-tiny`} />
                    : <div className="img-28-18"></div>
                  }
                </span>

                <span className="name">
                  <Link href={`/recipe/${r.recipe_id}`}>{r.title}</Link>
                </span>

                <span className="action">
                  <Link href={`/new-recipe/${r.recipe_id}`}>Edit</Link>
                </span>

                <span
                  className="delete"
                  onClick={() => activateModal(r.recipe_id, r.title)}
                >Unattribute</span>
              </div>
            ))
            : <div className="no-content">You haven't created any public recipes yet.</div>
          }
        </div>
      )}

      {tab === "recipes" && subTab === "favorite" && (
        <div className="dashboard-content">
          <h2 className="--tall">Favorite Recipes</h2>

          <Subtabs subTab={subTab} setSubTab={setSubTab} />

          {userData.my_favorite_recipes.length
            ? userData.my_favorite_recipes.map(r => (
              <div className="dashboard-item" key={r.recipe_id}>
                <span className="tiny">
                  {r.image_filename !== "nobsc-recipe-default"
                    ? <img src={`${recipeUrl}/${r.image_filename}-tiny`} />
                    : <div className="img--28-18"></div>
                  }
                </span>

                <span className="name">
                  <Link href={`/recipe/${r.recipe_id}`}>{r.title}</Link>
                </span>

                <span
                  className="unfavorite"
                  onClick={() => unfavorite(r.recipe_id)}
                >Unfavorite</span>
              </div>
            ))
            : <div className="no-content">You haven't favorited any recipes yet.</div>
          }
        </div>
      )}

      {tab === "recipes" && subTab === "saved" && (
        <div className="dashboard-content">
          <h2 className="--tall">Saved Recipes</h2>

          <Subtabs subTab={subTab} setSubTab={setSubTab} />

          {userData.my_saved_recipes.length
            ? userData.my_saved_recipes.map(r => (
              <div className="dashboard-item" key={r.recipe_id}>
                <span className="tiny">
                  {r.image_filename !== "nobsc-recipe-default"
                    ? <img src={`${recipeUrl}/${r.image_filename}-tiny`} />
                    : <div className="img-28-18"></div>
                  }
                </span>

                <span className="name">
                  <Link href={`/recipe/${r.recipe_id}`}>{r.title}</Link>
                </span>

                <span
                  className="unsave"
                  onClick={() => unsave(r.recipe_id)}
                >Unsave</span>
              </div>
            ))
            : <div className="no-content">You haven't saved any recipes yet.</div>
          }
        </div>
      )}

      {tab === "ingredients" && (
        <div className="dashboard-content">
          <h2>Private Ingredients</h2>

          <Link href="/new-ingredient" className="new-entity">
            Create New Ingredient
          </Link>

          {userData.my_private_ingredients.length
            ? userData.my_private_ingredients.map(i => (
              <div className="dashboard-item" key={i.ingredient_id}>
                <span className="tiny">
                  {i.image_filename !== "nobsc-ingredient-default"
                    ? <img src={`${recipeUrl}/${i.image_filename}-tiny`} />
                    : <div className="img-28-18"></div>
                  }
                </span>

                <span className="name">
                  <Link href={`/user-ingredient/${i.ingredient_id}`}>
                    {i.ingredient_name}
                  </Link>
                </span>

                <span className="action">
                  <Link href={`/user-ingredient/edit/${i.ingredient_id}`}>
                    Edit
                  </Link>
                </span>

                <span
                  className="delete"
                  onClick={() => deletePrivateIngredient(i.ingredient_id)}
                >Delete</span>
              </div>
            ))
            : <div className="dashboard-no-content">You haven't created any private ingredients yet.</div>
          }
        </div>
      )}

      {tab === "equipment" && (
        <div className="dashboard-content">
          <h2>Private Equipment</h2>

          <Link href="/new-equipment" className="new-entity">
            Create New Equipment
          </Link>

          {userData.my_private_equipment.length
            ? userData.my_private_equipment.map(e => (
              <div className="dashboard-item" key={e.equipment_id}>
                <span className="tiny">
                  {e.image_filename !== "nobsc-equipment-default"
                    ? <img src={`${recipeUrl}/${e.image_filename}-tiny`} />
                    : <div className="img-28-18"></div>
                  }
                </span>

                <span className="name">
                  <Link href={`/user-equipment/${e.equipment_id}`}>
                    {e.equipment_name}
                  </Link>
                </span>

                <span className="action">
                  <Link
                    href={{
                      pathname: '/new-equipment',
                      query: {equipment_id: e.equipment_id}
                    }}
                  >Edit</Link>
                </span>

                <span
                  className="delete"
                  onClick={() => deletePrivateEquipment(e.equipment_id)}
                >Delete</span>
              </div>
            ))
            : <div className="no-content">You haven't created any private equipment yet.</div>
          }
        </div>
      )}
    </div>
  );
}

function Tabs({ tab, setTab }: TabsProps) {
  const names = ['settings', 'avatar', 'plans', 'recipes', 'ingredients', 'equipment'];
  return (
    <div className='dashboard-tabs'>
      {names.map(name => (
        <button
          className={tab === name ? '--active' : ''}
          onClick={() => setTab(name)}
        >{capitalizeFirstLetter(name)}</button>
      ))}
    </div>
  );
}

function Subtabs({ subTab, setSubTab }: SubtabsProps) {
  const names = ['private', 'public', 'favorite', 'saved'];
  return (
    <div className='dashboard-subtabs'>
      {names.map(name => (
        <button
          className={subTab === name ? '--active' : ''}
          onClick={() => setSubTab(name)}
        >{capitalizeFirstLetter(name)}</button>
      ))}
    </div>
  );
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const error = 'An error occurred. Please try again.';

const avatarUrl = "https://s3.amazonaws.com/nobsc-user-avatars";

const recipeUrl = "https://s3.amazonaws.com/nobsc-user-recipe";

type TabsProps = {
  tab:    string;
  setTab: Dispatch<SetStateAction<string>>;
};

type SubtabsProps = {
  subTab:    string;
  setSubTab: Dispatch<SetStateAction<string>>;
};
