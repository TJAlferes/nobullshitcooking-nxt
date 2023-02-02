import { useEffect, useRef, useState } from 'react';
import type { Crop, PixelCrop } from 'react-image-crop';
import { useDispatch } from 'react-redux';

import { initialUserProps, useTypedSelector as useSelector } from '../../store';
import { updateLocalAvatar } from '../../store/auth/actions';
import { submitAvatar            as userSubmitAvatar } from '../../store/user/avatar/actions';
import { unfavoriteRecipe        as userUnfavoriteRecipe } from '../../store/user/favorite/actions';
import { deletePrivateEquipment  as userDeletePrivateEquipment } from '../../store/user/equipment/actions';
import { deletePrivateIngredient as userDeletePrivateIngredient } from '../../store/user/ingredient/actions';
import { deletePlan              as userDeletePlan } from '../../store/user/plan/actions';
import { deletePrivateRecipe     as userDeletePrivateRecipe,
         disownPublicRecipe      as userDisownPublicRecipe } from '../../store/user/recipe/actions';
import { unsaveRecipe            as userUnsaveRecipe } from '../../store/user/save/actions';
import { getCroppedImage } from '../../utils/getCroppedImage';
import { DashboardView } from './view';

export default function Dashboard(): JSX.Element {
  const dispatch = useDispatch();

  const myFavoriteRecipes =    useSelector(state => state.data.myFavoriteRecipes);
  const myPlans =              useSelector(state => state.data.myPlans);
  const myPrivateEquipment =   useSelector(state => state.data.myPrivateEquipment);
  const myPrivateIngredients = useSelector(state => state.data.myPrivateIngredients);
  const myPrivateRecipes =     useSelector(state => state.data.myPrivateRecipes);
  const myPublicRecipes =      useSelector(state => state.data.myPublicRecipes);
  const mySavedRecipes =       useSelector(state => state.data.mySavedRecipes);
  const authname =             useSelector(state => state.auth.authname);
  const creatingPlan =         useSelector(state => state.planner.creating);
  const editingId =            useSelector(state => state.planner.editingId);
  const message =              useSelector(state => state.user.message);

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

  const [ crop,     setCrop ] =     useState<Crop>({
    unit: 'px', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50
  });
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

  const deletePlan = () => {
    if (!deleteId) return;
    setLoading(true);
    dispatch(userDeletePlan(deleteId));
  };

  const deletePrivateEquipment = (id: number) => {
    setLoading(true);
    dispatch(userDeletePrivateEquipment(id));
  };

  const deletePrivateIngredient = (id: number) => {
    setLoading(true);
    dispatch(userDeletePrivateIngredient(id));
  };

  const deletePrivateRecipe = () => {
    if (!deleteId) return;
    setLoading(true);
    dispatch(userDeletePrivateRecipe(deleteId));
  };

  const disownPublicRecipe = () => {
    if (!deleteId) return;
    setLoading(true);
    dispatch(userDisownPublicRecipe(deleteId));
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

  const submitAvatar = () => {
    setLoading(true);
    dispatch(userSubmitAvatar(fullAvatar, tinyAvatar));
    dispatch(updateLocalAvatar(authname));
  };

  const subTabClick = (e: React.SyntheticEvent<EventTarget>) => setSubTab((e.target as HTMLInputElement).name);
  const tabClick =    (e: React.SyntheticEvent<EventTarget>) => setTab((e.target as HTMLInputElement).name);

  const unfavoriteRecipe = (id: number) => {
    setLoading(true);
    dispatch(userUnfavoriteRecipe(id));
  };

  const unsaveRecipe = (id: number) => {
    setLoading(true);
    dispatch(userUnsaveRecipe(id));
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
      deletePlan={deletePlan}
      deletePrivateEquipment={deletePrivateEquipment}
      deletePrivateIngredient={deletePrivateIngredient}
      deletePrivateRecipe={deletePrivateRecipe}
      disownPublicRecipe={disownPublicRecipe}
      editingId={editingId}
      feedback={feedback}
      fullCrop={fullCrop}
      getApplicationNode={getApplicationNode}
      loading={loading}
      modalActive={modalActive}
      myFavoriteRecipes={myFavoriteRecipes}
      myPlans={myPlans}
      myPrivateEquipment={myPrivateEquipment}
      myPrivateIngredients={myPrivateIngredients}
      myPrivateRecipes={myPrivateRecipes}
      myPublicRecipes={myPublicRecipes}
      mySavedRecipes={mySavedRecipes}
      onCropChange={onCropChange}
      onCropComplete={onCropComplete}
      onImageLoaded={onImageLoaded}
      onSelectFile={onSelectFile}
      submitAvatar={submitAvatar}
      subTab={subTab}
      subTabClick={subTabClick}
      tab={tab}
      tabClick={tabClick}
      tinyCrop={tinyCrop}
      unfavoriteRecipe={unfavoriteRecipe}
      unsaveRecipe={unsaveRecipe}
    />
  );
}

export const getInitialProps = initialUserProps();  // getServerSideProps ?
