import axios                          from 'axios';
import Link                           from 'next/link';
import { useRouter }                  from 'next/navigation';
import { useRef, useState }           from 'react';
import AriaModal                      from 'react-aria-modal';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { endpoint }             from '../../../config/api';
import { useAuth, useUserData } from '../../../store';
import { getCroppedImage }      from '../../shared/getCroppedImage';

export default function Dashboard() {
  const router = useRouter();

  const {
    auth_email, setAuthEmail,
    authname, setAuthname,
    auth_avatar, setAuthAvatar,
    logout
  } = useAuth();
  const {
    my_public_plans,        setMyPublicPlans,
    my_public_recipes,      setMyPublicRecipes,
    my_favorite_recipes,    setMyFavoriteRecipes,
    my_private_equipment,   setMyPrivateEquipment,
    my_private_ingredients, setMyPrivateIngredients,
    my_private_plans,       setMyPrivatePlans,
    my_private_recipes,     setMyPrivateRecipes,
    my_saved_recipes,       setMySavedRecipes,
    //my_chatgroups,          setMyChatgroups
  } = useUserData();

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ]  = useState(false);

  const [ tab,         setTab ]         = useState("avatar");
  const [ subTab,      setSubTab ]      = useState("private");
  const [ deleteId,    setDeleteId ]    = useState("");
  const [ deleteName,  setDeleteName ]  = useState("");
  const [ modalActive, setModalActive ] = useState(false);

  const [ new_email,    setNewEmail ]    = useState("");
  const [ new_password, setNewPassword ] = useState("");
  const [ new_username, setNewUsername ] = useState("");

  const [ avatar,     setAvatar ]        = useState<string | ArrayBuffer | null>(null);
  const [ small_avatar, setSmallAvatar ] = useState<File | null>(null);
  const [ tiny_avatar, setTinyAvatar ]   = useState<File | null>(null);

  const [ crop, setCrop ]           = useState<Crop>(initialCrop);
  const [ smallCrop, setSmallCrop ] = useState("");
  const [ tinyCrop, setTinyCrop ]   = useState("");

  const imageRef = useRef<HTMLImageElement | null>();

  const subTabClick = (e: React.SyntheticEvent<EventTarget>) => setSubTab((e.target as HTMLInputElement).name);
  const tabClick    = (e: React.SyntheticEvent<EventTarget>) => setTab((e.target as HTMLInputElement).name);

  const updateEmail = async () => {
    setLoading(true);
    window.scrollTo(0, 0);
    try {
      const res = await axios.patch(
        `${endpoint}/users/${authname}/update-email`,
        {new_email},
        {withCredentials: true}
      );
      if (res.status === 204) {
        setFeedback("Email updated.")
        setAuthEmail(new_email);
        setTimeout(() => router.push('/dashboard'), 3000);
      } else {
        setFeedback(res.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setTimeout(() => {
      setLoading(false);
      setFeedback("");
    }, 3000);
  };

  const updatePassword = async () => {
    setLoading(true);
    window.scrollTo(0, 0);
    try {
      const res = await axios.patch(
        `${endpoint}/users/${authname}/update-password`,
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
    setTimeout(() => {
      setLoading(false);
      setFeedback("");
    }, 3000);
  };

  const updateUsername = async () => {
    setLoading(true);
    window.scrollTo(0, 0);
    try {
      const res = await axios.patch(
        `${endpoint}/users/${authname}/update-username`,
        {new_username},
        {withCredentials: true}
      );
      if (res.status === 204) {
        setFeedback("Username updated.")
        setAuthname(new_username);
        setTimeout(() => router.push('/dashboard'), 3000);
      } else {
        setFeedback(res.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setTimeout(() => {
      setLoading(false);
      setFeedback("");
    }, 3000);
  };

  const deleteAccount = async () => {
    setLoading(true);
    window.scrollTo(0, 0);
    try {
      const res = await axios.delete(`${endpoint}/users/${authname}`, {withCredentials: true});
      if (res.status === 204) {
        setFeedback('User account deleted.');
        logout();
        router.push('/home');
      } else {
        setFeedback(res.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setTimeout(() => {
      setLoading(false);
      setFeedback("");
    }, 3000);
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

  /*const deleteChatGroup = async (chatgroup_id: string) => {
    setLoading(true);
    window.scrollTo(0, 0);
    const url = `${endpoint}/users/${authname}/chatgroups`;
    try {
      const res1 = await axios.delete(`${url}/${chatgroup_id}`, {withCredentials: true});
      setFeedback(res1.data.message);
      const res2 = await axios.get(url, {withCredentials: true});
      setMyChatgroups(res2.data);
    } catch (err) {
      setFeedback(error);
    }
    setTimeout(() => {
      setLoading(false);
      setFeedback("");
    }, 3000);
  };*/

  const unattributePublicPlan = async (plan_id: string) => {
    setLoading(true);
    window.scrollTo(0, 0);
    const url = `${endpoint}/users/${authname}/public-plans`
    try {
      const res1 = await axios.delete(`${url}/${plan_id}`, {withCredentials: true});
      if (res1.status === 204) {
        setFeedback("Public plan unattributed.");
        const res2 = await axios.get(url, {withCredentials: true});
        setMyPublicPlans(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);
      } else {
        setFeedback(res1.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setTimeout(() => {
      setLoading(false);
      setFeedback("");
    }, 3000);
  };

  const unattributePublicRecipe = async (recipe_id: string) => {
    setLoading(true);
    window.scrollTo(0, 0);
    const url = `${endpoint}/users/${authname}/public-recipes`;
    try {
      const res1 = await axios.patch(`${url}/${recipe_id}`, {withCredentials: true});
      if (res1.status === 204) {
        setFeedback("Public recipe unattributed.");
        const res2 = await axios.get(url, {withCredentials: true});
        setMyPublicRecipes(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);
      } else {
        setFeedback(res1.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setTimeout(() => {
      setLoading(false);
      setFeedback("");
    }, 3000);
  };

  const deletePrivateEquipment = async (equipment_id: string) => {
    setLoading(true);
    window.scrollTo(0, 0);
    const url = `${endpoint}/users/${authname}/private-equipment`;
    try {
      const res1 = await axios.delete(`${url}/${equipment_id}`, {withCredentials: true});
      if (res1.status === 204) {
        setFeedback("Private equipment deleted.");
        const res2 = await axios.get(url, {withCredentials: true});
        setMyPrivateEquipment(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);  // necessary???
      } else {
        setFeedback(res1.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setTimeout(() => {
      setLoading(false);
      setFeedback("");
    }, 3000);
  };

  const deletePrivateIngredient = async (ingredient_id: string) => {
    setLoading(true);
    window.scrollTo(0, 0);
    const url = `${endpoint}/users/${authname}/private-ingredients`
    try {
      const res1 = await axios.delete(`${url}/${ingredient_id}`, {withCredentials: true});
      if (res1.status === 204) {
        setFeedback("Private ingredient deleted.");
        const res2 = await axios.get(url, {withCredentials: true});
        setMyPrivateIngredients(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);  // necessary???
      } else {
        setFeedback(res1.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setTimeout(() => {
      setLoading(false);
      setFeedback("");
    }, 3000);
  };

  const deletePrivatePlan = async (plan_id: string) => {
    setLoading(true);
    window.scrollTo(0, 0);
    const url = `${endpoint}/users/${authname}/private-plans`
    try {
      const res1 = await axios.delete(`${url}/${plan_id}`, {withCredentials: true});
      if (res1.status === 204) {
        setFeedback("Private plan deleted.");
        const res2 = await axios.get(url, {withCredentials: true});
        setMyPrivatePlans(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);  // necessary???
      } else {
        setFeedback(res1.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setTimeout(() => {
      setLoading(false);
      setFeedback("");
    }, 3000);
  };

  const deletePrivateRecipe = async (recipe_id: string) => {
    setLoading(true);
    window.scrollTo(0, 0);
    const url = `${endpoint}/users/${authname}/private-recipes`;
    try {
      const res1 = await axios.delete(`${url}/${recipe_id}`, {withCredentials: true});
      if (res1.status === 204) {
        setFeedback("Private recipe deleted.");
        const res2 = await axios.get(url, {withCredentials: true});
        setMyPrivateRecipes(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);  // necessary???
      } else {
        setFeedback(res1.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setTimeout(() => {
      setLoading(false);
      setFeedback("");
    }, 3000);
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
    const small = await getCroppedImage(250, 250, imageRef.current, crop);
    const tiny = await getCroppedImage(25,  25,  imageRef.current, crop);
    if (!small || !tiny) return;
    setSmallCrop(small.preview);
    setTinyCrop(tiny.preview);
    setSmallAvatar(small.final);
    setTinyAvatar(tiny.final);
  };

  const onImageLoaded = (e: SyntheticImageEvent) => imageRef.current = e.currentTarget;

  const onCropChange = (crop: PixelCrop) => setCrop(crop);

  const onCropComplete = (crop: Crop) => makeCrops(crop);

  const uploadAvatar = async () => {
    setLoading(true);
    window.scrollTo(0, 0);
    try {
      let new_avatar = "";
      if (small_avatar && tiny_avatar) {
        const { data } = await axios.post(
          `${endpoint}/signed-url`,
          {subfolder: 'public/avatar/'},
          {withCredentials: true}
        );
        await uploadImageToAWSS3(data.smallSignature, small_avatar);
        await uploadImageToAWSS3(data.tinySignature, tiny_avatar);
        new_avatar = data.filename;
      }
      const res = await axios.patch(
        `${endpoint}/users/${authname}/avatar`,
        {new_avatar},
        {withCredentials: true}
      );
      if (res.status === 204) {
        setFeedback("Avatar updated.");
        setAuthAvatar(new_avatar);
        setTimeout(() => router.push(`/dashboard`), 3000);
      } else {
        setFeedback(res.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setTimeout(() => {
      setLoading(false);
      setFeedback("");
    }, 3000);
  };

  const unfavorite = async (recipe_id: string) => {
    setLoading(true);
    window.scrollTo(0, 0);
    const url = `${endpoint}/users/${authname}/favorite-recipes`;
    try {
      const res1 = await axios.delete(`${url}/${recipe_id}`, {withCredentials: true});
      if (res1.status === 204) {
        setFeedback("Recipe unfavorited.");
        const res2 = await axios.get(url, {withCredentials: true});
        setMyFavoriteRecipes(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);  // necessary???
      } else {
        setFeedback(res1.data.message);
      }
    } catch(err) {
      setFeedback(error);
    }
    setTimeout(() => {
      setLoading(false);
      setFeedback("");
    }, 3000);
  };

  const unsave = async (recipe_id: string) => {
    setLoading(true);
    window.scrollTo(0, 0);
    const url = `${endpoint}/users/${authname}/saved-recipes`
    try {
      const res1 = await axios.delete(`${url}/${recipe_id}`, {withCredentials: true});
      if (res1.status === 204) {
        setFeedback("Recipe unsaved.");
        const res2 = await axios.get(url, {withCredentials: true});
        setMySavedRecipes(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);  // necessary???
      } else {
        setFeedback(res1.data.message);
      }
    } catch(err) {
      setFeedback(error);
    }
    setTimeout(() => {
      setLoading(false);
      setFeedback("");
    }, 3000);
  };

  return (
    <div className="one-col dashboard">
      <h1>{authname}</h1>

      <p className="feedback">{feedback}</p>

      {!avatar && <Tabs tab={tab} tabClick={tabClick} />}

      {
        tab === "settings" && (<></>)
      }

      {(tab === "avatar") && (
        <>
          {!avatar && (
            <div className="dashboard-avatar">
              <Link href={`/profile/${authname}`}>View Profile</Link>
      
              <h2>Profile Picture</h2>
      
              <div className="avatar-crops">
                <div className="--full">
                  <span>Full Size: </span>
                  <img src={`${avatarUrl}/${auth_avatar}`} />
                </div>

                <div className="--tiny">
                  <span>Tiny Size: </span>
                  <img src={`${avatarUrl}/${auth_avatar}-tiny`} />
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
                onChange={onCropChange}
                onComplete={onCropComplete}
                style={{minHeight: "300px"}}
              >
                <img onLoad={onImageLoaded} src={avatar as string} />
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
              <AriaModal
                dialogClass="dashboard-modal"
                focusDialog={true}
                focusTrapOptions={{returnFocusOnDeactivate: false}}
                getApplicationNode={getApplicationNode}
                onExit={deactivateModal}
                titleText="Cancel?"
                underlayClickExits={false}
              >
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
  
          {my_private_plans.length
            ? my_private_plans.map(p => (
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

      {(tab === "recipes" && subTab === "private") && (
        <div className="dashboard-content">
          <h2>Private Recipes</h2>

          <Link href="/new-recipe" className="new-entity">
            Create New Private Recipe
          </Link>

          {modalActive
            ? (
              <AriaModal
                dialogClass="dashboard-modal"
                focusDialog={true}
                focusTrapOptions={{returnFocusOnDeactivate: false}}
                getApplicationNode={getApplicationNode}
                onExit={deactivateModal}
                titleText="Cancel?"
                underlayClickExits={false}
              >
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

          <Subtabs subTab={subTab} subTabClick={subTabClick} />

          {my_private_recipes.length
            ? my_private_recipes.map(r => (
              <div className="dashboard-item" key={r.recipe_id}>
                <span className="tiny">
                  {r.recipe_image.image_filename !== "nobsc-recipe-default"
                    ? <img src={`${recipeUrl}/${r.recipe_image.image_filename}-tiny`} />
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

      {(tab === "recipes" && subTab === "public") && (
        <div className="dashboard-content">
          <h2>Public Recipes</h2>

          <Link href="/new-recipe" className="new-entity">
            Create New Public Recipe
          </Link>

          {modalActive
            ? (
              <AriaModal
                dialogClass="dashboard-modal"
                focusDialog={true}
                focusTrapOptions={{returnFocusOnDeactivate: false}}
                getApplicationNode={getApplicationNode}
                onExit={deactivateModal}
                titleText="Cancel?"
                underlayClickExits={false}
              >
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

          <Subtabs subTab={subTab} subTabClick={subTabClick} />

          {my_public_recipes.length
            ? my_public_recipes.map(r => (
              <div className="dashboard-item" key={r.recipe_id}>
                <span className="tiny">
                  {r.recipe_image.image_filename !== "nobsc-recipe-default"
                    ? <img src={`${recipeUrl}/${r.recipe_image.image_filename}-tiny`} />
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

      {(tab === "recipes" && subTab === "favorite") && (
        <div className="dashboard-content">
          <h2 className="--tall">Favorite Recipes</h2>

          <Subtabs subTab={subTab} subTabClick={subTabClick} />

          {my_favorite_recipes.length
            ? my_favorite_recipes.map(r => (
              <div className="dashboard-item" key={r.recipe_id}>
                <span className="tiny">
                  {r.recipe_image.image_filename !== "nobsc-recipe-default"
                    ? <img src={`${recipeUrl}/${r.recipe_image.image_filename}-tiny`} />
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

      {(tab === "recipes" && subTab === "saved") && (
        <div className="dashboard-content">
          <h2 className="--tall">Saved Recipes</h2>

          <Subtabs subTab={subTab} subTabClick={subTabClick} />

          {my_saved_recipes.length
            ? my_saved_recipes.map(r => (
              <div className="dashboard-item" key={r.recipe_id}>
                <span className="tiny">
                  {r.recipe_image.image_filename !== "nobsc-recipe-default"
                    ? <img src={`${recipeUrl}/${r.recipe_image.image_filename}-tiny`} />
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

          {my_private_ingredients.length
            ? my_private_ingredients.map(i => (
              <div className="dashboard-item" key={i.ingredient_id}>
                <span className="tiny">
                  {i.image.image_filename !== "nobsc-ingredient-default"
                    ? <img src={`${recipeUrl}/${i.image.image_filename}-tiny`} />
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

          {my_private_equipment.length
            ? my_private_equipment.map(e => (
              <div className="dashboard-item" key={e.equipment_id}>
                <span className="tiny">
                  {e.image.image_filename !== "nobsc-equipment-default"
                    ? <img src={`${recipeUrl}/${e.image.image_filename}-tiny`} />
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

function Tabs({ tab, tabClick }: TabsProps) {
  return (
    <div className="dashboard-tabs">
      <button
        className={tab === "avatar" ? "--active" : ""}
        name={"avatar"}
        onClick={e => tabClick(e)}
      >{"Avatar"}</button>

      <button
        className={tab === "plans" ? "--active" : ""}
        name={"plans"}
        onClick={e => tabClick(e)}
      >{"Plans"}</button>

      <button
        className={tab === "recipes" ? "--active" : ""}
        name={"recipes"}
        onClick={e => tabClick(e)}
      >{"Recipes"}</button>

      <button
        className={tab === "ingredients" ? "--active" : ""}
        name={"ingredients"}
        onClick={e => tabClick(e)}
      >{"Ingredients"}</button>

      <button
        className={tab === "equipment" ? "--active" : ""}
        name={"equipment"}
        onClick={e => tabClick(e)}
      >{"Equipment"}</button>
    </div>
  );
}

function Subtabs({ subTab, subTabClick }: SubtabsProps) {
  return (
    <div className="dashboard-subtabs">
      <button
        className={subTab === "private" ? "--active" : ""}
        name={"private"}
        onClick={e => subTabClick(e)}
      >{"Private"}</button>

      <button
        className={subTab === "public" ? "--active" : ""}
        name={"public"}
        onClick={e => subTabClick(e)}
      >{"Public"}</button>

      <button
        className={subTab === "favorite" ? "--active" : ""}
        name={"favorite"}
        onClick={e => subTabClick(e)}
      >{"Favorite"}</button>

      <button
        className={subTab === "saved" ? "--active" : ""}
        name={"saved"}
        onClick={e => subTabClick(e)}
      >{"Saved"}</button>
    </div>
  );
}

async function uploadImageToAWSS3(signature: any, image: any) {
  await axios.put(signature, image, {headers: {'Content-Type': 'image/jpeg'}});
}

const error = 'An error occurred. Please try again.';

const avatarUrl = "https://s3.amazonaws.com/nobsc-user-avatars";

const recipeUrl = "https://s3.amazonaws.com/nobsc-user-recipe";

const initialCrop: Crop = {
  unit:   'px',
  x:      25,
  y:      25,
  width:  50,
  height: 50
};

type TabsProps = {
  tab:      string;
  tabClick: (e: React.SyntheticEvent<EventTarget>) => void;
};

type SubtabsProps = {
  subTab:      string;
  subTabClick: (e: React.SyntheticEvent<EventTarget>) => void;
};

type SyntheticImageEvent = React.SyntheticEvent<HTMLImageElement>;
