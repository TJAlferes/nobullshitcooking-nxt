import Link                            from 'next/link';
import { useSearchParams, useRouter }  from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop }             from "react-image-crop";
import { useDispatch }                 from 'react-redux';
import 'react-image-crop/dist/ReactCrop.css';

import { CropPreview, LoaderButton }          from '../../components';
import { useTypedSelector as useSelector }    from '../../store';
import { createIngredient, updateIngredient } from '../../store/user/ingredient/actions';
import { getCroppedImage }                    from '../../utils/getCroppedImage';

export default function IngredientForm() {
  const router = useRouter();
  const params = useSearchParams();
  const ingredient_id = params.get('ingredient_id');

  const dispatch = useDispatch();
  //const ingredients =     useSelector(state => state.data.ingredients);
  const ingredient_types = useSelector(state => state.data.ingredient_types);
  const my_ingredients =   useSelector(state => state.data.my_ingredients);
  const message =          useSelector(state => state.user.message);

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ] =  useState(false);

  const ingredient_id                               = params.get('ingredient_id');
  const [ editing_id,         setEditingId ]        = useState<string|null>(null);
  const [ ingredient_type_id, setIngredientTypeId ] = useState(0);
  const [ ingredient_name,    setIngredientName ]   = useState("");
  const [ description, setDescription ] = useState("");
  const [ prevImage,   setPrevImage ] =   useState("nobsc-ingredient-default");
  const [ image,       setImage ] =       useState<string | ArrayBuffer | null>(null);
  const [ fullImage,   setFullImage ] =   useState<File | null>(null);
  const [ tinyImage,   setTinyImage ] =   useState<File | null>(null);

  const [ crop,     setCrop ] =     useState<Crop>({unit: 'px', x: 25, y: 25, width: 50, height: 50});
  const [ fullCrop, setFullCrop ] = useState("");
  const [ tinyCrop, setTinyCrop ] = useState("");

  const imageRef = useRef<HTMLImageElement>();

  const dir = 'https://s3.amazonaws.com/nobsc-user-ingredients';

  useEffect(() => {
    const getExistingIngredientToEdit = () => {
      if (!ingredient_id) {
        router.push('/dashboard');
        return;
      }

      setLoading(true);
      window.scrollTo(0, 0);
      const [ prev ] = my_ingredients.filter(i => i.ingredient_id === ingredient_id);
      if (!prev) {
        router.push('/dashboard');
        setLoading(false);
        return;
      }

      setEditingId(prev.ingredient_id);
      setIngredientTypeId(prev.ingredient_type_id);
      setIngredientName(prev.ingredient_name);
      setDescription(prev.description);
      setPrevImage(prev.image_url);
      
      setLoading(false);
    };

    if (ingredient_id) getExistingIngredientToEdit();
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

  const changeType =        (e: SyntheticEvent) => setTypeId(Number((e.target as HTMLInputElement).value));
  const changeName =        (e: SyntheticEvent) => setName((e.target as HTMLInputElement).value);
  const changeDescription = (e: SyntheticEvent) => setDescription((e.target as HTMLInputElement).value);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (!(target.files && target.files.length > 0)) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => setImage(reader.result));
    reader.readAsDataURL(target.files[0] as Blob);
  };

  const makeCrops = async (crop: Crop) => {
    if (!imageRef.current) return;
    const full = await getCroppedImage(280, 172, imageRef.current, crop);
    const tiny = await getCroppedImage(28, 18, imageRef.current, crop);
    if (!full || !tiny) return;
    setFullCrop(full.preview);
    setTinyCrop(tiny.preview);
    setFullImage(full.final);
    setTinyImage(tiny.final);
  };

  const onImageLoaded =  (e: React.SyntheticEvent<HTMLImageElement>) => imageRef.current = e.currentTarget;
  const onCropChange =   (crop: Crop) => setCrop(crop);
  const onCropComplete = (crop: Crop) => makeCrops(crop);

  const cancelImage = () => {
    setFullCrop("");
    setTinyCrop("");
    setImage(null);
    setFullImage(null);
    setTinyImage(null);
  };

  const valid = () => {
    const validTypeId = ingredient_type_id !== 0;
    if (!validTypeId) {
      window.scrollTo(0, 0);
      setFeedback("Select ingredient type.");
      setTimeout(() => setFeedback(""), 3000);
      return false;
    }

    const validName = ingredient_name.trim() !== "";
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

  // TO DO: remove inner prefixes
  const submit = () => {
    if (!valid()) return;
    setLoading(true);
    const ingredientInfo = {ingredient_type_id, ingredient_name, description, image, fullImage, tinyImage};
    if (editing_id) {
      // TO DO: AUTHORIZE THEM ON THE BACK END, MAKE SURE THEY ACTUALLY DO OWN THE INGREDIENT BEFORE ENTERING ANYTHING INTO MySQL / AWS S3!!!
      const ingredientUpdateInfo = {ingredient_id: editing_id, prevImage, ...ingredientInfo};
      dispatch(updateIngredient(ingredientUpdateInfo));
    } else {
      dispatch(createIngredient(ingredientInfo));
    }
  };

  return (
    <div className="one-col new-ingredient">
      <h1>New Ingredient</h1>

      <p className="feedback">{feedback}</p>

      <h2>Type of Ingredient</h2>
      <select name="ingredientType" onChange={changeType} required value={typeId}>
        <option value=""></option>
        {ingredientTypes.map(({ id, name }) => (<option key={id} value={id}>{name}</option>))}
      </select>

      <h2>Name</h2>
      <input className="name" onChange={changeName} type="text" value={name} />

      <h2>Description</h2>
      <textarea className="description" onChange={changeDescription} value={description} />

      <div>
        <h2>Image of Ingredient</h2>

        {!image && (
          <div>
            {!editingId ? <img src={`${dir}/nobsc-ingredient-default`} /> : prevImage && <img src={`${dir}/${prevImage}`} />}
            <h4>Change</h4>
            <input accept="image/*" onChange={onSelectFile} type="file" />
          </div>
        )}

        {image && (
          <div>
            <ReactCrop
              aspect={1}
              className="crop-tool"
              crop={crop}
              onChange={onCropChange}
              onComplete={onCropComplete}
              style={{minHeight: "300px"}}
            >
              <img onLoad={onImageLoaded} src={image as string} />
            </ReactCrop>
            <CropPreview cancelImage={cancelImage} fullCrop={fullCrop} loading={loading} tinyCrop={tinyCrop} />
          </div>
        )}
      </div>

      <div className="finish">
        <Link href="/dashboard" className="cancel-button">Cancel</Link>

        <LoaderButton
          className="submit-button"
          id="create_new_private_user_ingredient_button"
          isLoading={loading}
          loadingText="Creating..."
          name="submit"
          onClick={submit}
          text="Create"
        />
      </div>
    </div>
  );
}

type SyntheticEvent = React.SyntheticEvent<EventTarget>;
