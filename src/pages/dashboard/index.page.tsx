import Link                            from 'next/link';
import { useEffect, useRef, useState } from 'react';
import AriaModal                       from 'react-aria-modal';
import ReactCrop, { Crop, PixelCrop }  from 'react-image-crop';
import { useDispatch }                 from 'react-redux';
import 'react-image-crop/dist/ReactCrop.css';

import { useTypedSelector as useSelector }         from '../../store';
import { submitAvatar }                            from '../../store/user/avatar/actions';
import { unfavoriteRecipe }                        from '../../store/user/favorite/actions';
import { deleteEquipment }                         from '../../store/user/equipment/actions';
import { deleteIngredient }                        from '../../store/user/ingredient/actions';
import { deletePlan }                              from '../../store/user/plan/actions';
import { deletePrivateRecipe, disownPublicRecipe } from '../../store/user/recipe/actions';
import { unsaveRecipe }                            from '../../store/user/save/actions';
import { getCroppedImage }                         from '../../utils/getCroppedImage';

export default function Dashboard() {
  const dispatch = useDispatch();
  const myFavoriteRecipes = useSelector(state => state.data.myFavoriteRecipes);
  const myPlans =           useSelector(state => state.data.myPlans);
  const myEquipment =       useSelector(state => state.data.myEquipment);
  const myIngredients =     useSelector(state => state.data.myIngredients);
  const myPrivateRecipes =  useSelector(state => state.data.myPrivateRecipes);
  const myPublicRecipes =   useSelector(state => state.data.myPublicRecipes);
  const mySavedRecipes =    useSelector(state => state.data.mySavedRecipes);
  const authname =          useSelector(state => state.auth.authname);
  const creatingPlan =      useSelector(state => state.planner.creating);
  const editingId =         useSelector(state => state.planner.editingId);
  const message =           useSelector(state => state.user.message);

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ] =  useState(false);

  const [ tab,         setTab ] =         useState("avatar");
  const [ subTab,      setSubTab ] =      useState("private");
  const [ deleteId,    setDeleteId ] =    useState<number | undefined>();
  const [ deleteName,  setDeleteName ] =  useState("");
  const [ modalActive, setModalActive ] = useState(false);

  const [ avatar,     setAvatar ] =     useState<string | ArrayBuffer | null>(null);
  const [ fullAvatar, setFullAvatar ] = useState<File | null>(null);
  const [ tinyAvatar, setTinyAvatar ] = useState<File | null>(null);

  const [ crop,     setCrop ] =     useState<Crop>({unit: 'px', x: 25, y: 25, width: 50, height: 50});
  const [ fullCrop, setFullCrop ] = useState("");
  const [ tinyCrop, setTinyCrop ] = useState("");

  const imageRef = useRef<HTMLImageElement | null>();

  const url = "https://s3.amazonaws.com/nobsc-user-avatars";
  const url = "https://s3.amazonaws.com/nobsc-user-recipe";

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

  const subTabClick = (e: React.SyntheticEvent<EventTarget>) => setSubTab((e.target as HTMLInputElement).name);
  const tabClick =    (e: React.SyntheticEvent<EventTarget>) => setTab((e.target as HTMLInputElement).name);

  const getApplicationNode = (): Element | Node => document.getElementById('root') as Element | Node;

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

  const deleteUserPlan = () => {
    if (!deleteId) return;
    setLoading(true);
    dispatch(deletePlan(deleteId));
  };

  const deletePrivateEquipment = (id: number) => {
    setLoading(true);
    dispatch(deleteEquipment(id));
  };

  const deletePrivateIngredient = (id: number) => {
    setLoading(true);
    dispatch(deleteIngredient(id));
  };

  const deleteRecipe = () => {
    if (!deleteId) return;
    setLoading(true);
    dispatch(deletePrivateRecipe(deleteId));
  };

  const disownRecipe = () => {
    if (!deleteId) return;
    setLoading(true);
    dispatch(disownPublicRecipe(deleteId));
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

  const onImageLoaded =  (e: SyntheticImageEvent) => imageRef.current = e.currentTarget;
  const onCropChange =   (crop: PixelCrop) => setCrop(crop);
  const onCropComplete = (crop: Crop) => makeCrops(crop);

  const uploadAvatar = () => {
    setLoading(true);
    dispatch(submitAvatar(fullAvatar, tinyAvatar));
  };

  const unfavorite = (id: number) => {
    setLoading(true);
    dispatch(unfavoriteRecipe(id));
  };

  const unsave = (id: number) => {
    setLoading(true);
    dispatch(unsaveRecipe(id));
  };

  return (
    <div className="one-col dashboard">
      <h1>{authname}</h1>

      <p className="feedback">{feedback}</p>

      {!avatar && <Tabs tab={tab} tabClick={tabClick} />}

      {(tab === "avatar") && (
        <>
          {!avatar && (
            <div className="dashboard-avatar">
              <Link href={`/profile/${authname}`}>View Profile</Link>
      
              <h2>Profile Picture</h2>
      
              <div className="avatar-crops">
                <div className="--full"><span>Full Size: </span><img src={`${url}/${authname}`} /></div>
                <div className="--tiny"><span>Tiny Size: </span><img src={`${url}/${authname}-tiny`} /></div>
              </div>
      
              <label>Change</label>
              <input accept="image/*" name="set-avatar" onChange={onSelectFile} type="file" />
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
                <div className="--full"><span>Full Size: </span><img src={fullCrop} /></div>
                <div className="--tiny"><span>Tiny Size: </span><img src={tinyCrop} /></div>
              </div>
      
              <button className="--cancel" disabled={loading} name="cancel-avatar" onClick={cancelAvatar}>Cancel</button>
              <button className="--submit" disabled={loading} name="submit-avatar" onClick={uploadAvatar}>Complete</button>
            </div>
          )}
        </>
      )}

      {tab === "plans" && (
        <div className="dashboard-content">
          <h2>Plans</h2>
  
          {(!creatingPlan && !editingId) && <Link href="/new-plan"                className="new-entity">Create New Plan</Link>}
          {( creatingPlan && !editingId) && <Link href="/new-plan"                className="new-entity">Finish Creating Plan</Link>}
          {(!creatingPlan &&  editingId) && <Link href={`/new-plan/${editingId}`} className="new-entity">Finish Updating Plan</Link>}
  
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
                <button className="--cancel" onClick={deactivateModal}>No</button>
                <button className="--action" onClick={deleteUserPlan}>Yes, Delete Plan</button>
              </AriaModal>
            )
            : false
          }
  
          {myPlans.length
            ? myPlans.map(p => (
              <div className="dashboard-item" key={p.id}>
                <span className="name"><Link href={`/user-plan/${p.id}`}>{p.name}</Link></span>
                {(!creatingPlan && !editingId) && <span className="action"><Link href={`/new-plan/${p.id}`}>Edit</Link></span>}
                {(!creatingPlan && !editingId) && <span className="delete" onClick={() => activateModal(p.id, p.name)}>Delete</span>}
              </div>
            ))
            : <div className="no-content">You haven't created any plans yet.</div>
          }
        </div>
      )}

      {(tab === "recipes" && subTab === "private") && (
        <div className="dashboard-content">
          <h2>Private Recipes</h2>
          <Link href="/new-recipe" className="new-entity">Create New Private Recipe</Link>
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
                <button className="--cancel" onClick={deactivateModal}>No</button>
                <button className="--action" onClick={deleteRecipe}>Yes, Delete Recipe</button>
              </AriaModal>
            )
            : false
          }
          <Subtabs subTab={subTab} subTabClick={subTabClick} />
          {myPrivateRecipes.length
            ? myPrivateRecipes.map(r => (
              <div className="dashboard-item" key={r.id}>
                <span className="tiny">
                  {r.recipe_image !== "nobsc-recipe-default" ? <img src={`${url}/${r.recipe_image}-tiny`} /> : <div className="img-28-18"></div>}
                </span>
                <span className="name"><Link href={`/user-recipe/${r.id}`}>{r.title}</Link></span>
                <span className="action"><Link href={`/new-recipe/${r.id}`}>Edit</Link></span>
                <span className="delete" onClick={() => activateModal(r.id, r.title)}>Delete</span>
              </div>
            ))
            : <div className="no-content">You haven't created any private recipes yet.</div>
          }
        </div>
      )}

      {(tab === "recipes" && subTab === "public") && (
        <div className="dashboard-content">
          <h2>Public Recipes</h2>
          <Link href="/new-recipe" className="new-entity">Create New Public Recipe</Link>
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
                <button className="--cancel" onClick={deactivateModal}>No</button>
                <button className="--action" onClick={disownRecipe}>Yes, Disown Recipe</button>
              </AriaModal>
            )
            : false
          }
          <Subtabs subTab={subTab} subTabClick={subTabClick} />
          {myPublicRecipes.length
            ? myPublicRecipes.map(r => (
              <div className="dashboard-item" key={r.id}>
                <span className="tiny">
                  {r.recipe_image !== "nobsc-recipe-default" ? <img src={`${url}/${r.recipe_image}-tiny`} /> : <div className="img-28-18"></div>}
                </span>
                <span className="name"><Link href={`/recipe/${r.id}`}>{r.title}</Link></span>
                <span className="action"><Link href={`/new-recipe/${r.id}`}>Edit</Link></span>
                <span className="delete" onClick={() => activateModal(r.id, r.title)}>Disown</span>
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
          {myFavoriteRecipes.length
            ? myFavoriteRecipes.map(r => (
              <div className="dashboard-item" key={r.id}>
                <span className="tiny">
                  {r.recipe_image !== "nobsc-recipe-default" ? <img src={`${url}/${r.recipe_image}-tiny`} /> : <div className="img--28-18"></div>}
                </span>
                <span className="name"><Link href={`/recipe/${r.id}`}>{r.title}</Link></span>
                <span className="unfavorite" onClick={() => unfavorite(r.id)}>Unfavorite</span>
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
          {mySavedRecipes.length
            ? mySavedRecipes.map(r => (
              <div className="dashboard-item" key={r.id}>
                <span className="tiny">
                  {r.recipe_image !== "nobsc-recipe-default" ? <img src={`${url}/${r.recipe_image}-tiny`} /> : <div className="img-28-18"></div>}
                </span>
                <span className="name"><Link href={`/recipe/${r.id}`}>{r.title}</Link></span>
                <span className="unsave" onClick={() => unsave(r.id)}>Unsave</span>
              </div>
            ))
            : <div className="no-content">You haven't saved any recipes yet.</div>
          }
        </div>
      )}

      {tab === "ingredients" && (
        <div className="dashboard-content">
          <h2>Private Ingredients</h2>
          <Link href="/new-ingredient" className="new-entity">Create New Ingredient</Link>
          {myIngredients.length
            ? myIngredients.map(i => (
              <div className="dashboard-item" key={i.id}>
                <span className="tiny">{i.image !== "nobsc-ingredient-default" ? <img src={`${url}/${i.image}-tiny`} /> : <div className="img-28-18"></div>}</span>
                <span className="name"><Link href={`/user-ingredient/${i.id}`}>{i.name}</Link></span>
                <span className="action"><Link href={`/user-ingredient/edit/${i.id}`}>Edit</Link></span>
                <span className="delete" onClick={() => deletePrivateIngredient(i.id)}>Delete</span>
              </div>
            ))
            : <div className="dashboard-no-content">You haven't created any private ingredients yet.</div>
          }
        </div>
      )}

      {tab === "equipment" && (
        <div className="dashboard-content">
          <h2>Private Equipment</h2>
          <Link href="/new-equipment" className="new-entity">Create New Equipment</Link>
          {myEquipment.length
            ? myEquipment.map(e => (
              <div className="dashboard-item" key={e.id}>
                <span className="tiny">{e.image !== "nobsc-equipment-default" ? <img src={`${url}/${e.image}-tiny`} /> : <div className="img-28-18"></div>}</span>
                <span className="name"><Link href={`/user-equipment/${e.id}`}>{e.name}</Link></span>
                <span className="action"><Link href={{pathname: '/new-equipment', query: {id: e.id}}}>Edit</Link></span>
                <span className="delete" onClick={() => deletePrivateEquipment(e.id)}>Delete</span>
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
      <button className={tab === "avatar" ? "--active" : ""}      name={"avatar"}      onClick={e => tabClick(e)}>{"Avatar"}</button>
      <button className={tab === "plans" ? "--active" : ""}       name={"plans"}       onClick={e => tabClick(e)}>{"Plans"}</button>
      <button className={tab === "recipes" ? "--active" : ""}     name={"recipes"}     onClick={e => tabClick(e)}>{"Recipes"}</button>
      <button className={tab === "ingredients" ? "--active" : ""} name={"ingredients"} onClick={e => tabClick(e)}>{"Ingredients"}</button>
      <button className={tab === "equipment" ? "--active" : ""}   name={"equipment"}   onClick={e => tabClick(e)}>{"Equipment"}</button>
    </div>
  );
}

function Subtabs({ subTab, subTabClick }: SubtabsProps) {
  return (
    <div className="dashboard-subtabs">
      <button className={subTab === "private" ? "--active" : ""}  name={"private"}  onClick={e => subTabClick(e)}>{"Private"}</button>
      <button className={subTab === "public" ? "--active" : ""}   name={"public"}   onClick={e => subTabClick(e)}>{"Public"}</button>
      <button className={subTab === "favorite" ? "--active" : ""} name={"favorite"} onClick={e => subTabClick(e)}>{"Favorite"}</button>
      <button className={subTab === "saved" ? "--active" : ""}    name={"saved"}    onClick={e => subTabClick(e)}>{"Saved"}</button>
    </div>
  );
}

type TabsProps = {
  tab:      string;
  tabClick: (e: React.SyntheticEvent<EventTarget>) => void;
};

type SubtabsProps = {
  subTab:      string;
  subTabClick: (e: React.SyntheticEvent<EventTarget>) => void;
};

type SyntheticImageEvent = React.SyntheticEvent<HTMLImageElement>;
