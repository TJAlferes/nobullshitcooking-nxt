import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { Crop } from 'react-image-crop';
import { useDispatch } from 'react-redux';

import { getCroppedImage } from '../../utils/getCroppedImage';
import { useTypedSelector as useSelector } from '../../store';
import {
  staffCreateNewIngredient,
  staffEditIngredient
} from '../../store/staff/ingredient/actions';
import {
  userCreateNewPrivateIngredient,
  userEditPrivateIngredient
} from '../../store/user/ingredient/actions';
import { NewIngredientView } from './view';

export function NewIngredient({ editing }: Props): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const staffIsAuthenticated =
    useSelector(state => state.auth.staffIsAuthenticated);
  const staffMessage = useSelector(state => state.staff.message);
  const userMessage = useSelector(state => state.user.message);
  const officialIngredients =
    useSelector(state => state.data.officialIngredients);
  const oneColumnATheme = useSelector(state => state.theme.oneColumnATheme);
  const ingredientTypes = useSelector(state => state.data.ingredientTypes);
  const myPrivateIngredients =
    useSelector(state => state.data.myPrivateIngredients);

  const [ feedback, setFeedback ] = useState("");
  const [ loading, setLoading ] = useState(false);

  const [ editingId, setEditingId ] = useState(0);
  const [ typeId, setTypeId ] = useState(0);
  const [ name, setName ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ prevImage, setPrevImage ] = useState("nobsc-ingredient-default");
  const [ image, setImage ] = useState<string | ArrayBuffer | null>(null);
  const [ fullImage, setFullImage ] = useState<File | null>(null);
  const [ tinyImage, setTinyImage ] = useState<File | null>(null);

  const [ crop, setCrop ] = useState<Crop>({aspect: 280 / 172});
  const [ fullCrop, setFullCrop ] = useState("");
  const [ tinyCrop, setTinyCrop ] = useState("");

  const imageRef = useRef<HTMLImageElement>();

  useEffect(() => {
    const getExistingIngredientToEdit = () => {
      if (!id) {
        const redirectPath =
          staffIsAuthenticated ? '/staff-dashboard' : '/dashboard';
        router.push(redirectPath);
        return;
      }

      setLoading(true);
      window.scrollTo(0,0);

      const [ prev ] = staffIsAuthenticated
        ? officialIngredients.filter(i => i.id === Number(id))
        : myPrivateIngredients.filter(i => i.id === Number(id));

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
      const redirectPath =
        staffIsAuthenticated ? '/staff-dashboard' : '/dashboard';

      if (message !== "") window.scrollTo(0,0);

      setFeedback(message);

      if (
        message === "Ingredient created." ||
        message === "Ingredient updated."
      ) {
        setTimeout(() => router.push(redirectPath), 3000);
      }

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

  const handleDescriptionChange = (e: React.SyntheticEvent<EventTarget>) => 
    setDescription((e.target as HTMLInputElement).value);

  const handleNameChange = (e: React.SyntheticEvent<EventTarget>) =>
    setName((e.target as HTMLInputElement).value);

  // TO DO: remove inner prefixes
  const handleSubmit = () => {
    if (!valid()) return;
    setLoading(true);
    if (editing && editingId) {
      const ingredientInfo = {
        id: editingId,
        ingredientTypeId: typeId,
        name,
        description,
        image,
        fullImage,
        tinyImage,
        prevImage
      };
      if (staffIsAuthenticated) dispatch(staffEditIngredient(ingredientInfo));
      else dispatch(userEditPrivateIngredient(ingredientInfo));
    } else {
      const ingredientInfo = {
        ingredientTypeId: typeId,
        name,
        description,
        image,
        fullImage,
        tinyImage,
      };
      if (staffIsAuthenticated) {
        dispatch(staffCreateNewIngredient(ingredientInfo));
      } else {
        dispatch(userCreateNewPrivateIngredient(ingredientInfo));
      }
    }
  };

  const handleTypeChange = (e: React.SyntheticEvent<EventTarget>) =>
    setTypeId(Number((e.target as HTMLInputElement).value));

  const makeCrops = async (crop: Crop) => {
    if (!imageRef || !imageRef.current) return;
    if (!crop.width) return;
    const full =
      await getCroppedImage(280, 172, imageRef.current, crop, "newFile.jpeg");
    const tiny =
      await getCroppedImage(28, 18, imageRef.current, crop, "newFile.jpeg");
    if (!full || !tiny) return;
    setFullCrop(full.resizedPreview);
    setTinyCrop(tiny.resizedPreview);
    setFullImage(full.resizedFinal);
    setTinyImage(tiny.resizedFinal);
  };

  const onCropChange = (crop: Crop) => setCrop(crop);

  const onCropComplete = (crop: Crop) => makeCrops(crop);

  const onImageLoaded = (image: HTMLImageElement) => imageRef.current = image;

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
      setFeedback("You forgot to select the ingredient type...");
      setTimeout(() => setFeedback(""), 3000);
      return false;
    }

    const validName = name.trim() !== "";
    if (!validName) {
      window.scrollTo(0,0);
      setFeedback("Umm, double check your name...");
      setTimeout(() => setFeedback(""), 3000);
      return false;
    }

    const validDescription = description.trim() !== "";
    if (!validDescription) {
      window.scrollTo(0,0);
      setFeedback("Umm, double check your description...");
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
      handleDescriptionChange={handleDescriptionChange}
      handleNameChange={handleNameChange}
      handleSubmit={handleSubmit}
      handleTypeChange={handleTypeChange}
      image={image}
      loading={loading}
      name={name}
      onCropChange={onCropChange}
      onCropComplete={onCropComplete}
      oneColumnATheme={oneColumnATheme}
      onImageLoaded={onImageLoaded}
      onSelectFile={onSelectFile}
      prevImage={prevImage}
      staffIsAuthenticated={staffIsAuthenticated}
      tinyCrop={tinyCrop}
      typeId={typeId}
    />
  );
};

type Props = {
  editing: boolean;
};

export default NewIngredient;