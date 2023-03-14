import { useSearchParams, useRouter }  from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { Crop }                   from 'react-image-crop';
import { useDispatch }                 from 'react-redux';

import { useTypedSelector as useSelector }    from '../../store';
import { createIngredient, updateIngredient } from '../../store/user/ingredient/actions';
import { getCroppedImage }                    from '../../utils/getCroppedImage';
import { NewIngredientView }                  from './view';

export default function NewIngredient() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get('id');

  const dispatch = useDispatch();
  //const ingredients =     useSelector(state => state.data.ingredients);
  const ingredientTypes = useSelector(state => state.data.ingredientTypes);
  const myIngredients =   useSelector(state => state.data.myIngredients);
  const message =         useSelector(state => state.user.message);

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ] =  useState(false);

  const [ editingId,   setEditingId ] =   useState<number|null>(null);
  const [ typeId,      setTypeId ] =      useState(0);
  const [ name,        setName ] =        useState("");
  const [ description, setDescription ] = useState("");
  const [ prevImage,   setPrevImage ] =   useState("nobsc-ingredient-default");
  const [ image,       setImage ] =       useState<string | ArrayBuffer | null>(null);
  const [ fullImage,   setFullImage ] =   useState<File | null>(null);
  const [ tinyImage,   setTinyImage ] =   useState<File | null>(null);

  const [ crop,     setCrop ] =     useState<Crop>({unit: 'px', x: 25, y: 25, width: 50, height: 50});
  const [ fullCrop, setFullCrop ] = useState("");
  const [ tinyCrop, setTinyCrop ] = useState("");

  const imageRef = useRef<HTMLImageElement>();

  useEffect(() => {
    const getExistingIngredientToEdit = () => {
      if (!id) {
        router.push('/dashboard');
        return;
      }

      setLoading(true);
      window.scrollTo(0, 0);
      const [ prev ] = myIngredients.filter(i => i.id === Number(id));
      if (!prev) {
        router.push('/dashboard');
        setLoading(false);
        return;
      }

      setEditingId(prev.id);
      setTypeId(prev.ingredient_type_id);
      setName(prev.name);
      setDescription(prev.description);
      setPrevImage(prev.image);
      
      setLoading(false);
    };

    if (id) getExistingIngredientToEdit();
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      if (message !== "") window.scrollTo(0, 0);
      setFeedback(message);
      if (message === "Ingredient created." || message === "Ingredient updated.") {
        setTimeout(() => router.push('/dashboard'), 3000);
      }
      setLoading(false);
    }

    return () => {
      isSubscribed = false;
    };
  }, [message]);

  const cancelImage = () => {
    setFullCrop("");
    setTinyCrop("");
    setImage(null);
    setFullImage(null);
    setTinyImage(null);
  };

  const changeType =        (e: SyntheticEvent) => setTypeId(Number((e.target as HTMLInputElement).value));
  const changeName =        (e: SyntheticEvent) => setName((e.target as HTMLInputElement).value);
  const changeDescription = (e: SyntheticEvent) => setDescription((e.target as HTMLInputElement).value);

  // TO DO: remove inner prefixes
  const submit = () => {
    if (!valid()) return;
    setLoading(true);
    const ingredientInfo = {ingredientTypeId: typeId, name, description, image, fullImage, tinyImage};
    if (editingId) {
      const ingredientUpdateInfo = {id: editingId, prevImage, ...ingredientInfo};
      dispatch(updateIngredient(ingredientUpdateInfo));
    } else {
      dispatch(createIngredient(ingredientInfo));
    }
  };

  const makeCrops = async (crop: Crop) => {
    if (!imageRef || !imageRef.current) return;
    if (!crop.width) return;
    const full = await getCroppedImage(280, 172, imageRef.current, crop);
    const tiny = await getCroppedImage(28, 18, imageRef.current, crop);
    if (!full || !tiny) return;
    setFullCrop(full.preview);
    setTinyCrop(tiny.preview);
    setFullImage(full.final);
    setTinyImage(tiny.final);
  };

  const onCropChange = (crop: Crop) => setCrop(crop);

  const onCropComplete = (crop: Crop) => makeCrops(crop);

  const onImageLoaded = (e: React.SyntheticEvent<HTMLImageElement>) => imageRef.current = e.currentTarget;

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (!(target.files && target.files.length > 0)) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => setImage(reader.result));
    reader.readAsDataURL(target.files[0] as Blob);
  };

  const valid = () => {
    const validTypeId = typeId !== 0;
    if (!validTypeId) {
      window.scrollTo(0, 0);
      setFeedback("Select ingredient type.");
      setTimeout(() => setFeedback(""), 3000);
      return false;
    }

    const validName = name.trim() !== "";
    if (!validName) {
      window.scrollTo(0, 0);
      setFeedback("Check name.");
      setTimeout(() => setFeedback(""), 3000);
      return false;
    }

    const validDescription = description.trim() !== "";
    if (!validDescription) {
      window.scrollTo(0, 0);
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
      editingId={editingId}
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
      submit={submit}
      tinyCrop={tinyCrop}
      typeId={typeId}
    />
  );
}

type SyntheticEvent = React.SyntheticEvent<EventTarget>;
