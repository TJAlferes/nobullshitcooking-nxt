import axios                           from 'axios';
import Link                            from 'next/link';
import { useEffect, useRef, useState } from 'react';
import AriaModal                       from 'react-aria-modal';
import ReactCrop, { Crop, PixelCrop }  from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { endpoint }                        from '../../../config/api';
import { getCroppedImage }                 from '../../shared/getCroppedImage';
import { deletePublicPlan }                from '../../public/plan/state';
import { disownPublicRecipe }              from '../../public/recipe/state';
import { deletePrivateEquipment }          from '../equipment/state';
import { deletePrivateIngredient }         from '../ingredient/state';
import { deletePrivatePlan }               from '../plan/state';
import { deletePrivateRecipe }             from '../recipe/state';
import { useAuthname } from '../../auth';

export default function Dashboard() {
  const authname = useAuthname();

  const my_favorite_recipes = useSelector(state => state.userData.my_favorite_recipes);
  //const my_friends
  const my_plans            = useSelector(state => state.userData.my_plans);
  const my_equipment        = useSelector(state => state.userData.my_equipment);
  const my_ingredients      = useSelector(state => state.userData.my_ingredients);
  const my_private_recipes  = useSelector(state => state.userData.my_private_recipes);
  const my_public_recipes   = useSelector(state => state.userData.my_public_recipes);
  const my_saved_recipes    = useSelector(state => state.userData.my_saved_recipes);

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ]  = useState(false);

  const [ tab,         setTab ]         = useState("avatar");
  const [ subTab,      setSubTab ]      = useState("private");
  const [ deleteId,    setDeleteId ]    = useState<number | undefined>();
  const [ deleteName,  setDeleteName ]  = useState("");
  const [ modalActive, setModalActive ] = useState(false);

  const [ new_email,    setNewEmail ]    = useState("");
  const [ new_password, setNewPassword ] = useState("");
  const [ new_username, setNewUsername ] = useState("");
  const [ avatar,     setAvatar ]     = useState<string | ArrayBuffer | null>(null);
  const [ fullAvatar, setFullAvatar ] = useState<File | null>(null);
  const [ tinyAvatar, setTinyAvatar ] = useState<File | null>(null);

  const [ crop, setCrop ] = useState<Crop>(initialCrop);
  const [ fullCrop, setFullCrop ] = useState("");
  const [ tinyCrop, setTinyCrop ] = useState("");

  const imageRef = useRef<HTMLImageElement | null>();

  const avatarUrl = "https://s3.amazonaws.com/nobsc-user-avatars";
  const recipeUrl = "https://s3.amazonaws.com/nobsc-user-recipe";

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      if (message !== "") window.scrollTo(0, 0);

      deactivateModal();
      setFeedback(message);
      setLoading(false);
    }

    return () => {
      isSubscribed = false;
    };
  }, [message]);

  const subTabClick = (e: React.SyntheticEvent<EventTarget>) =>
    setSubTab((e.target as HTMLInputElement).name);

  const tabClick = (e: React.SyntheticEvent<EventTarget>) =>
    setTab((e.target as HTMLInputElement).name);

  const updateEmail = async () => {
    setLoading(true);
    try {
      const { data } = await axios.patch(
        `${endpoint}/users/${authname}/update-email`,
        {new_email},
        {withCredentials: true}
      );
  
      setFeedback(data.message);
  
      if (data.message === 'Email updated.') {
        router.push('/dashboard');
      }
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }
  
    //delay(4000);
    setFeedback("")
  };

  const updatePassword = async () => {
    setLoading(true);
    try {
      const { data } = await axios.patch(
        `${endpoint}/users/${authname}/update-password`,
        {new_password},
        {withCredentials: true}
      );
  
      setFeedback(data.message);
  
      if (data.message === 'Password updated.') {
        router.push('/dashboard');
      }
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }
  
    //delay(4000);
    setFeedback("")
  };

  const updateUsername = async () => {
    setLoading(true);

    try {
      const { data } = await axios.patch(
        `${endpoint}/users/${authname}/update-username`,
        {new_username},
        {withCredentials: true}
      );

      setFeedback(data.message);

      if (data.message === 'Email updated.') {
        router.push('/dashboard');
      }
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }

    //delay(4000);
    setFeedback("")
  };

  const deleteAccount = async () => {
    setLoading(true);

    try {
      const { status } = await axios.delete(
        `${endpoint}/user/delete`,
        {withCredentials: true}
      );
  
      setFeedback(data.message);
  
      if (status === 204) {
        setFeedback('User account deleted.');
        // log them out here (clear localStorage and sessionStorage)
        router.push('/home');
      }
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }

    //delay(4000);
    setFeedback("")
  };

  const getApplicationNode = (): Element | Node =>
    document.getElementById('root') as Element | Node;

  const activateModal = (id: number, name: string) => {
    setDeleteId(id);
    setDeleteName(name);
    setModalActive(true);
  };

  const deactivateModal = () => {
    setDeleteId(undefined);
    setDeleteName("");
    setModalActive(false);
  };

  const cancelAvatar = () => {
    setFullCrop("");
    setTinyCrop("");
    setAvatar(null)
    setFullAvatar(null);
    setTinyAvatar(null);
  };

  const deleteChatGroup = async (chatgroup_name: string) => {
    try {
      const response = await axios.delete(
        `${endpoint}/users/${authname}/chatgroups/${chatgroup_name}`,
        {withCredentials: true}
      );
      setFeedback(response.data.message);
    } catch (err) {
      setFeedback('An error occurred. Please try again.');
    }
    //delay(4000);
    setFeedback("");
  };

  const deletePlan = async (plan_id: string) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `${endpoint}/users/${user_id}/private-plans/${plan_id}`,
        {withCredentials: true}
      );
      setFeedback(data.message);
      //yield call(getMyEquipmentWorker);
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }
    //delay(4000);
    setFeedback("");
  };

  const deleteEquipment = async (equipment_id: string) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `${endpoint}/users/${user_id}/private-equipment/${equipment_id}`,
        {withCredentials: true}
      );
      setFeedback(data.message);
      //dispatch(getMyEquipment("private"));
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }
    //delay(4000);
    setFeedback("");
  };

  const deleteIngredient = async (ingredient_id: string) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `${endpoint}/users/${user_id}/private-ingredients/${ingredient_id}`,
        {withCredentials: true}
      );
      setFeedback(data.message);

      //dispatch(getMyIngredients("private"));
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }
    //delay(4000);
    setFeedback("");
  };

  const deletePrivateRecipe = async (recipe_id: string) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `${endpoint}/users/${user_id}/private-recipe/${recipe_id}`,
        {withCredentials: true}
      );
      setFeedback(data.message);
      //dispatch(getMyRecipes("private"));
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }
    //delay(4000);
    setFeedback("");
  };

  const disownPublicRecipe = async (recipe_id: string) => {
    setLoading(true);
    try {
      const { data } = await axios.patch(
        `${endpoint}/users/${user_id}/public-recipe/${recipe_id}`,
        {withCredentials: true}
      );
      setFeedback(data.message);
      //dispatch(getMyRecipes("private"));
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }
    //delay(4000);
    setFeedback("");
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
    const full = await getCroppedImage(250, 250, imageRef.current, crop);
    const tiny = await getCroppedImage(25,  25,  imageRef.current, crop);
    if (!full || !tiny) return;
    setFullCrop(full.preview);
    setTinyCrop(tiny.preview);
    setFullAvatar(full.final);
    setTinyAvatar(tiny.final);
  };

  const onImageLoaded = (e: SyntheticImageEvent) =>
    imageRef.current = e.currentTarget;

  const onCropChange = (crop: PixelCrop) => setCrop(crop);

  const onCropComplete = (crop: Crop) => makeCrops(crop);

  const uploadAvatar = async () => {
    setLoading(true);
    try {
      if (avatar.small && avatar.tiny) {
        const { data: { filename, fullSignature, tinySignature } } = await axios.post(
          `${endpoint}/user/signed-url`,
          {subfolder: 'public/avatar/'},
          {withCredentials: true}
        );
  
        await uploadImageToAWSS3(fullSignature, full_avatar);
        await uploadImageToAWSS3(tinySignature, tiny_avatar);
  
        avatar.image_filename = filename;
      }
  
      const { data } = yield call(
        [axios, axios.post],
        `${endpoint}/user/auth/set-avatar`,
        {avatar: avatarUrl},
        {withCredentials: true}
      );
  
      setFeedback(data.message);
  
      if (data.message === 'Avatar set.') {
        //elay(2000);
        //systemMessageClear();
        location.reload();  // ?  // refresh/update respective list
      }
    } catch (err) {
      yield put(systemMessage('An error occurred. Please try again.'));
    }
  
    yield delay(4000);
    yield put(systemMessageClear());
  };

  const unfavorite = async (recipe_id: string) => {
    setLoading(true);

    try {
      const { data } = await axios.delete(
        `${endpoint}/users/${auth_id}/favorite-recipes/${recipe_id}`,
        {withCredentials: true}
      );
      setFeedback(data.message);
      //dispatch(getMyFavoriteRecipes());
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }

    //delay(4000);
    setFeedback("");
  };

  const unsave = async (recipe_id: string) => {
    setLoading(true);

    try {
      const { data } = await axios.delete(
        `${endpoint}/users/${auth_id}/saved-recipes/${recipe_id}`,
        {withCredentials: true}
      );
      setFeedback(data.message);
      //dispatch(getMyFavoriteRecipes());
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }

    //delay(4000);
    setFeedback("");
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
                  <img src={`${avatarUrl}/${authname}`} />
                </div>

                <div className="--tiny">
                  <span>Tiny Size: </span>
                  <img src={`${avatarUrl}/${authname}-tiny`} />
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
                  <img src={fullCrop} />
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
                <p>{'Delete Plan: '}{deleteName}{' ?'}</p>

                <button className="--cancel" onClick={deactivateModal}>
                  No
                </button>

                <button className="--action" onClick={deletePlan}>
                  Yes, Delete Plan
                </button>
              </AriaModal>
            )
            : false
          }
  
          {my_plans.length
            ? my_plans.map(p => (
              <div className="dashboard-item" key={p.plan_id}>
                <span className="name">
                  <Link href={`/user-plan/${p.plan_id}`}>{p.plan_name}</Link>
                </span>

                {!creatingPlan && (
                  <span className="action">
                    <Link href={`/new-plan/${p.plan_id}`}>Edit</Link>
                  </span>
                )}

                {!creatingPlan && (
                  <span
                    className="delete"
                    onClick={() => activateModal(p.plan_id, p.plan_name)}
                  >Delete</span>
                )}
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
                <p>{'Delete Recipe: '}{deleteName}{' ?'}</p>

                <button className="--cancel" onClick={deactivateModal}>
                  No
                </button>

                <button className="--action" onClick={deleteRecipe}>
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
                  {r.recipe_image !== "nobsc-recipe-default"
                    ? <img src={`${recipeUrl}/${r.recipe_image}-tiny`} />
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
                <p>{'Disown Recipe: '}{deleteName}{' ?'}</p>

                <button className="--cancel" onClick={deactivateModal}>
                  No
                </button>

                <button className="--action" onClick={disownRecipe}>
                  Yes, Disown Recipe
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
                  {r.recipe_image !== "nobsc-recipe-default"
                    ? <img src={`${recipeUrl}/${r.recipe_image}-tiny`} />
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
                >Disown</span>
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
                  {r.recipe_image !== "nobsc-recipe-default"
                    ? <img src={`${recipeUrl}/${r.recipe_image}-tiny`} />
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
                  {r.recipe_image !== "nobsc-recipe-default"
                    ? <img src={`${recipeUrl}/${r.recipe_image}-tiny`} />
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

          {my_ingredients.length
            ? my_ingredients.map(i => (
              <div className="dashboard-item" key={i.ingredient_id}>
                <span className="tiny">
                  {i.image_url !== "nobsc-ingredient-default"
                    ? <img src={`${recipeUrl}/${i.image_url}-tiny`} />
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

          {my_equipment.length
            ? my_equipment.map(e => (
              <div className="dashboard-item" key={e.equipment_id}>
                <span className="tiny">
                  {e.image_url !== "nobsc-equipment-default"
                    ? <img src={`${recipeUrl}/${e.image_url}-tiny`} />
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

function uploadImageToAWSS3(signature: any, image: any) {
  axios.put(signature, image, {headers: {'Content-Type': 'image/jpeg'}});
}

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
