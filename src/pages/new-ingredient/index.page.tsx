import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import type { Crop } from 'react-image-crop';
import { useDispatch } from 'react-redux';

import { getCroppedImage } from '../../utils/getCroppedImage';
import { useTypedSelector as useSelector } from '../../store';
import { createNewIngredient, editIngredient } from '../../store/staff/ingredient/actions';
import { createNewPrivateIngredient, editPrivateIngredient } from '../../store/user/ingredient/actions';
import { NewIngredientView } from './view';

export function NewIngredient({ editing }: Props): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const staffIsAuthenticated = useSelector(state => state.auth.staffIsAuthenticated);
  const staffMessage =         useSelector(state => state.staff.message);
  const userMessage =          useSelector(state => state.user.message);
  const ingredients =          useSelector(state => state.data.ingredients);
  const ingredientTypes =      useSelector(state => state.data.ingredientTypes);
  const myPrivateIngredients = useSelector(state => state.data.myPrivateIngredients);
  const theme =                useSelector(state => state.theme.theme);


  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ] =  useState(false);

  const [ editingId,   setEditingId ] =   useState(0);
  const [ typeId,      setTypeId ] =      useState(0);
  const [ name,        setName ] =        useState("");
  const [ description, setDescription ] = useState("");
  const [ prevImage,   setPrevImage ] =   useState("nobsc-ingredient-default");
  const [ image,       setImage ] =       useState<string | ArrayBuffer | null>(null);
  const [ fullImage,   setFullImage ] =   useState<File | null>(null);
  const [ tinyImage,   setTinyImage ] =   useState<File | null>(null);

  const [ crop,     setCrop ] =     useState<Crop>({aspect: 280 / 172});
  const [ fullCrop, setFullCrop ] = useState("");
  const [ tinyCrop, setTinyCrop ] = useState("");

  const imageRef = useRef<HTMLImageElement>();

  useEffect(() => {
    const getExistingIngredientToEdit = () => {
      if (!id) {
        const redirectPath = staffIsAuthenticated ? '/staff-dashboard' : '/dashboard';
        router.push(redirectPath);
        return;
      }
      setLoading(true);
      window.scrollTo(0,0);
      const [ prev ] = staffIsAuthenticated ? ingredients.filter(i => i.id === Number(id)) : myPrivateIngredients.filter(i => i.id === Number(id));
      setEditingId(prev.id);
      setTypeId(prev.ingredient_type_id);
      setName(prev.name);
      setDescription(prev.description);
      setPrevImage(prev.image);
      setLoading(false);
    };

    if (editing) getExistingIngredientToEdit();
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      const message = staffIsAuthenticated ? staffMessage : userMessage;
      const redirectPath = staffIsAuthenticated ? '/staff-dashboard' : '/dashboard';
      if (message !== "") window.scrollTo(0,0);
      setFeedback(message);
      if (message === "Ingredient created." || message === "Ingredient updated.") setTimeout(() => router.push(redirectPath), 3000);
      setLoading(false);
    }

    return () => {
      isSubscribed = false;
    };
  }, [staffMessage, userMessage]);

  const cancelImage = () => {
    setFullCrop("");
    setTinyCrop("");
    setImage(null);
    setFullImage(null);
    setTinyImage(null);
  };

  const changeType =        (e: React.SyntheticEvent<EventTarget>) => setTypeId(Number((e.target as HTMLInputElement).value));
  const changeName =        (e: React.SyntheticEvent<EventTarget>) => setName((e.target as HTMLInputElement).value);
  const changeDescription = (e: React.SyntheticEvent<EventTarget>) => setDescription((e.target as HTMLInputElement).value);

  // TO DO: remove inner prefixes
  const submit = () => {
    if (!valid()) return;
    setLoading(true);

    const ingredientInfo = {ingredientTypeId: typeId, name, description, image, fullImage, tinyImage};

    if (editing && editingId) {
      const ingredientEditInfo = {id: editingId, prevImage, ...ingredientInfo};
      
      if (staffIsAuthenticated) dispatch(editIngredient(ingredientEditInfo));
      else                      dispatch(editPrivateIngredient(ingredientEditInfo));
    }
    else {
      if (staffIsAuthenticated) dispatch(createNewIngredient(ingredientInfo));
      else                      dispatch(createNewPrivateIngredient(ingredientInfo));
    }
  };

  const makeCrops = async (crop: Crop) => {
    if (!imageRef || !imageRef.current) return;
    if (!crop.width) return;
    const full = await getCroppedImage(280, 172, imageRef.current, crop, "newFile.jpeg");
    const tiny = await getCroppedImage(28, 18, imageRef.current, crop, "newFile.jpeg");
    if (!full || !tiny) return;
    setFullCrop(full.resizedPreview);
    setTinyCrop(tiny.resizedPreview);
    setFullImage(full.resizedFinal);
    setTinyImage(tiny.resizedFinal);
  };

  const onCropChange =   (crop: Crop) =>              setCrop(crop);
  const onCropComplete = (crop: Crop) =>              makeCrops(crop);
  const onImageLoaded =  (image: HTMLImageElement) => imageRef.current = image;

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (!(target.files && target.files.length > 0)) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => setImage(reader.result));
    reader.readAsDataURL(target.files[0]);
  };

  const valid = () => {
    const validTypeId = typeId !== 0;
    if (!validTypeId) {
      window.scrollTo(0,0);
      setFeedback("Select ingredient type.");
      setTimeout(() => setFeedback(""), 3000);
      return false;
    }

    const validName = name.trim() !== "";
    if (!validName) {
      window.scrollTo(0,0);
      setFeedback("Check name.");
      setTimeout(() => setFeedback(""), 3000);
      return false;
    }

    const validDescription = description.trim() !== "";
    if (!validDescription) {
      window.scrollTo(0,0);
      setFeedback("Check description.");
      setTimeout(() => setFeedback(""), 3000);
      return false;
    }

    return validTypeId && validName && validDescription;
  };

  return (
    <NewIngredientView
      cancelImage={cancelImage}
      crop={crop}
      ingredientTypes={ingredientTypes}
      description={description}
      editing={editing}
      feedback={feedback}
      fullCrop={fullCrop}
      changeDescription={changeDescription}
      changeName={changeName}
      changeType={changeType}
      image={image}
      loading={loading}
      name={name}
      onCropChange={onCropChange}
      onCropComplete={onCropComplete}
      onImageLoaded={onImageLoaded}
      onSelectFile={onSelectFile}
      prevImage={prevImage}
      staffIsAuthenticated={staffIsAuthenticated}
      submit={submit}
      theme={theme}
      tinyCrop={tinyCrop}
      typeId={typeId}
    />
  );
};

type Props = {
  editing: boolean;
};

export default NewIngredient;