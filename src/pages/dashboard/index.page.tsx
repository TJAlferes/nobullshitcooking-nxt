import { useEffect, useRef, useState } from 'react';
import type { Crop, PixelCrop }        from 'react-image-crop';
import { useDispatch }                 from 'react-redux';

import { useTypedSelector as useSelector }         from '../../store';
import { submitAvatar }                            from '../../store/user/avatar/actions';
import { unfavoriteRecipe }                        from '../../store/user/favorite/actions';
import { deleteEquipment }                         from '../../store/user/equipment/actions';
import { deleteIngredient }                        from '../../store/user/ingredient/actions';
import { deletePlan }                              from '../../store/user/plan/actions';
import { deletePrivateRecipe, disownPublicRecipe } from '../../store/user/recipe/actions';
import { unsaveRecipe }                            from '../../store/user/save/actions';
import { getCroppedImage }                         from '../../utils/getCroppedImage';
import { DashboardView }                           from './view';

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

  const activateModal = (id: number, name: string) => {
    setDeleteId(id);
    setDeleteName(name);
    setModalActive(true);
  };

  const cancelAvatar = () => {
    setFullCrop("");
    setTinyCrop("");
    setAvatar(null)
    setFullAvatar(null);
    setTinyAvatar(null);
  };

  const deactivateModal = () => {
    setDeleteId(undefined);
    setDeleteName("");
    setModalActive(false);
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

  const getApplicationNode = (): Element | Node => document.getElementById('root') as Element | Node;

  const makeCrops = async (crop: Crop) => {
    if (!imageRef || !imageRef.current) return;
    if (!crop.width) return;
    const full = await getCroppedImage(250, 250, imageRef.current, crop);
    const tiny = await getCroppedImage(25,  25,  imageRef.current, crop);
    if (!full || !tiny) return;
    setFullCrop(full.preview);
    setTinyCrop(tiny.preview);
    setFullAvatar(full.final);
    setTinyAvatar(tiny.final);
  };

  const onCropChange = (crop: PixelCrop) => setCrop(crop);

  const onCropComplete = (crop: Crop) => makeCrops(crop);
  
  const onImageLoaded = (e: React.SyntheticEvent<HTMLImageElement>) => imageRef.current = e.currentTarget;

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (!(target.files && target.files.length > 0)) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => setAvatar(reader.result));
    reader.readAsDataURL(target.files[0] as Blob);
  };

  const uploadAvatar = () => {
    setLoading(true);
    dispatch(submitAvatar(fullAvatar, tinyAvatar));
  };

  const subTabClick = (e: React.SyntheticEvent<EventTarget>) => setSubTab((e.target as HTMLInputElement).name);
  const tabClick =    (e: React.SyntheticEvent<EventTarget>) => setTab((e.target as HTMLInputElement).name);

  const unfavorite = (id: number) => {
    setLoading(true);
    dispatch(unfavoriteRecipe(id));
  };

  const unsave = (id: number) => {
    setLoading(true);
    dispatch(unsaveRecipe(id));
  };

  return (
    <DashboardView
      activateModal={activateModal}
      authname={authname}
      avatar={avatar}
      cancelAvatar={cancelAvatar}
      creatingPlan={creatingPlan}
      crop={crop}
      deactivateModal={deactivateModal}
      deleteName={deleteName}
      deletePlan={deleteUserPlan}
      deleteEquipment={deletePrivateEquipment}
      deleteIngredient={deletePrivateIngredient}
      deleteRecipe={deleteRecipe}
      disownRecipe={disownRecipe}
      editingId={editingId}
      feedback={feedback}
      fullCrop={fullCrop}
      getApplicationNode={getApplicationNode}
      loading={loading}
      modalActive={modalActive}
      myFavoriteRecipes={myFavoriteRecipes}
      myPlans={myPlans}
      myEquipment={myEquipment}
      myIngredients={myIngredients}
      myPrivateRecipes={myPrivateRecipes}
      myPublicRecipes={myPublicRecipes}
      mySavedRecipes={mySavedRecipes}
      onCropChange={onCropChange}
      onCropComplete={onCropComplete}
      onImageLoaded={onImageLoaded}
      onSelectFile={onSelectFile}
      submitAvatar={uploadAvatar}
      subTab={subTab}
      subTabClick={subTabClick}
      tab={tab}
      tabClick={tabClick}
      tinyCrop={tinyCrop}
      unfavorite={unfavorite}
      unsave={unsave}
    />
  );
}
