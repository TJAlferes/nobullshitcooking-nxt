import axios                           from 'axios';
import Link                            from 'next/link';
import { useSearchParams, useRouter }  from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop }             from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css';

import { endpoint }                      from '../../../config/api';
import { useAuth, useData, useUserData } from '../../../store';
import { LoaderButton }                  from '../../shared/LoaderButton';
import { getCroppedImage }               from '../../shared/getCroppedImage';
import type { Ownership }                from '../../shared/types';

export default function IngredientForm({ ownership }: Props) {
  const router = useRouter();

  const params = useSearchParams();
  const ingredient_id = params.get('ingredient_id');

  const { authname } = useAuth();
  const { ingredient_types } = useData();
  const { setMyPrivateIngredients } = useUserData();

  const allowedIngredients = useAllowedIngredients(ownership);

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ]  = useState(false);

  const [ ingredient_type_id, setIngredientTypeId ] = useState(0);
  const [ ingredient_brand, setIngredientBrand ] = useState<string|null>("");
  const [ ingredient_variety, setIngredientVariety ] = useState<string|null>("");
  const [ ingredient_name,    setIngredientName ]   = useState("");
  const [ notes,              setNotes ]            = useState("");

  const [ previousImageFilename, setPreviousImageFilename ] = useState("");
  const [ smallImage,            setSmallImage ]   = useState<File | null>(null);
  const [ tinyImage,             setTinyImage ]    = useState<File | null>(null);
  const [ imageCaption,          setImageCaption ] = useState("");

  const imageRef = useRef<HTMLImageElement>();
  const [ image,             setImage ]             = useState<Image>(null);
  const [ crop,              setCrop ]              = useState<Crop>(initialCrop);
  const [ smallImagePreview, setSmallImagePreview ] = useState("");
  const [ tinyImagePreview,  setTinyImagePreview ]  = useState("");

  useEffect(() => {
    let mounted = true;

    function getExistingIngredientToEdit() {
      if (!ingredient_id) {
        router.push('/dashboard');
        return;
      }

      setLoading(true);

      window.scrollTo(0, 0);

      const ingredient = allowedIngredients.find(i => i.ingredient_id === ingredient_id);
      if (!ingredient) {
        router.push('/dashboard');
        setLoading(false);
        return;
      }

      setIngredientTypeId(ingredient.ingredient_type_id);
      setIngredientBrand(ingredient.ingredient_brand);
      setIngredientVariety(ingredient.ingredient_variety)
      setIngredientName(ingredient.ingredient_name);
      setNotes(ingredient.notes);
      setPreviousImageFilename(ingredient.image.image_filename);
      setImageCaption(ingredient.image.caption);
      
      setLoading(false);
    }

    if (mounted) {
      if (!authname) {
        router.push(`/404`);
        return;
      }

      if (ingredient_id) {
        getExistingIngredientToEdit();
      }
    }

    return () => {
      mounted = false;
    };
  }, []);  // do this in getServerSideProps???

  const getMyPrivateIngredients = async () => {
    const res = await axios.get(`${endpoint}/users/${authname}/private-ingredients`, {withCredentials: true});
    setMyPrivateIngredients(res.data);
  };

  const changeIngredientType     = (e: SyntheticEvent) => setIngredientTypeId(Number((e.target as HTMLInputElement).value));
  const changeIngredientBrand    = (e: SyntheticEvent) => setIngredientBrand((e.target as HTMLInputElement).value);
  const changeIngredientVariety  = (e: SyntheticEvent) => setIngredientVariety((e.target as HTMLInputElement).value);
  const changeIngredientName     = (e: SyntheticEvent) => setIngredientName((e.target as HTMLInputElement).value);
  const changeNotes              = (e: SyntheticEvent) => setNotes((e.target as HTMLInputElement).value);
  const changeImageCaption       = (e: SyntheticEvent) => setImageCaption((e.target as HTMLInputElement).value);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (!(target.files && target.files.length > 0)) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => setImage(reader.result));
    reader.readAsDataURL(target.files[0] as Blob);
  };

  const makeCrops = async (crop: Crop) => {
    if (!imageRef.current) return;
    const small = await getCroppedImage(280, 172, imageRef.current, crop);
    const tiny = await getCroppedImage(28,  18,  imageRef.current, crop);
    if (!small || !tiny) return;
    setSmallImagePreview(small.preview);
    setTinyImagePreview(tiny.preview);
    setSmallImage(small.final);
    setTinyImage(tiny.final);
  };

  const onCropChange   = (crop: Crop) => setCrop(crop);
  const onCropComplete = (crop: Crop) => makeCrops(crop);
  const onImageLoaded  = (e: React.SyntheticEvent<HTMLImageElement>) => imageRef.current = e.currentTarget;

  const cancelImage = () => {
    setSmallImagePreview("");
    setTinyImagePreview("");
    setImage(null);
    setSmallImage(null);
    setTinyImage(null);
  };

  const submit = async () => {
    setLoading(true);
    window.scrollTo(0, 0);

    if (!isValidIngredientUpload({
      ingredient_type_id,
      ingredient_brand,
      ingredient_variety,
      ingredient_name,
      alt_names,
      notes,
      setFeedback
    })) return;

    const ingredient_upload = {
      ingredient_type_id,
      ingredient_brand,
      ingredient_variety,
      ingredient_name,
      alt_names,
      notes,
      image: {
        image_filename: ingredient_id ? previousImageFilename : "default",
        caption:        imageCaption,
        small:          smallImage,
        tiny:           tinyImage
      }
    };

    // TO DO: AUTHORIZE ON BACK END, MAKE SURE THEY ACTUALLY OWN THE INGREDIENT
    // BEFORE ENTERING ANYTHING INTO MySQL / AWS S3!!!

    // upload any images to AWS S3, then insert info into MySQL
    const { image } = ingredient_upload;
    try {
      if (image.small && image.tiny) {
        const { data } = await axios.post(
          `${endpoint}/signed-url`,
          {subfolder: 'private/ingredient/'},
          {withCredentials: true}
        );
        await uploadImageToAWSS3(data.smallSignature, image.small);
        await uploadImageToAWSS3(data.tinySignature, image.tiny);
        image.image_filename = data.filename;
        image.small = null;
        image.tiny  = null;
      }

      const editing = ingredient_id !== null;
      if (editing) {
        const res = await axios.patch(
          `${endpoint}/users/${authname}/private-ingredients/${ingredient_id}`,
          {ingredient_id, ...ingredient_upload},
          {withCredentials: true}
        );
        if (res.status === 204) {
          setFeedback("Ingredient updated.");
          await getMyPrivateIngredients();
          setTimeout(() => router.push(`/dashboard`), 4000);
        } else {
          setFeedback(res.data.error);
        }
      } else {
        const res = await axios.post(
          `${endpoint}/users/${authname}/private-ingredients`,
          ingredient_upload,
          {withCredentials: true}
        );
        if (res.status === 201) {
          setFeedback("Ingredient created.");
          await getMyPrivateIngredients();
          setTimeout(() => router.push(`/dashboard`), 4000);
        } else {
          setFeedback(res.data.error);
        }
      }
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }
  
    setTimeout(() => {
      setFeedback("");
      setLoading(false);
    }, 4000);
  };

  return (
    <div className="one-col new-ingredient">
      {
        ownership === "private"
        && ingredient_id
        ? <h1>Update Private Ingredient</h1>
        : <h1>Create Private Ingredient</h1>
      }
      {
        ownership === "official"
        && ingredient_id
        ? <h1>Update Official Ingredient</h1>
        : <h1>Create Official Ingredient</h1>
      }

      <p className="feedback">{feedback}</p>

      <h2>Ingredient Type</h2>
      <select name="ingredientType" onChange={changeIngredientType} required value={ingredient_type_id}>
        <option value=""></option>
        {ingredient_types.map(({ ingredient_type_id, ingredient_type_name }) => (
          <option key={ingredient_type_id} value={ingredient_type_id}>
            {ingredient_type_name}
          </option>
        ))}
      </select>

      <h2>Name</h2>
      <input className="name" onChange={changeIngredientName} type="text" value={ingredient_name} />

      <h2>Notes</h2>
      <textarea className="notes" onChange={changeNotes} value={notes} />

      <div>
        <h2>Image of Ingredient</h2>

        {!image && (
          <div>
            {
              !ingredient_id
              ? <img src={`${url}/default`} />
              : previousImageFilename && <img src={`${url}/${previousImageFilename}`} />
            }
            
            <h4>Change</h4>
            <input accept="image/*" name="image-input" onChange={onSelectFile} type="file" />
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

            <ToolTip />
  
            <div className="crops">
              <div className="crop-full-outer">
                <span>Small Size: </span>
                <img className="crop-full" src={smallImagePreview} />
              </div>

              <div className="crop-tiny-outer">
                <span>Tiny Size: </span>
                <img className="crop-tiny" src={tinyImagePreview} />
              </div>
            </div>

            <h4>Caption:</h4>
            <input
              className="caption"
              max={150}
              min={2}
              name="caption"
              onChange={changeImageCaption}
              type="text"
              value={imageCaption}
            />

            <button
              className="image-cancel-button"
              disabled={loading}
              onClick={cancelImage}
            >Cancel</button>
          </div>
        )}
      </div>

      <div className="finish">
        <Link href="/dashboard" className="cancel-button">Cancel</Link>

        <LoaderButton
          className="submit-button"
          id="create_ingredient_button"
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

type Props = {
  ownership: Ownership;
};

function useAllowedIngredients(ownership: Ownership) {
  const { ingredients } = useData();
  const { my_private_ingredients } = useUserData();

  // must be checked server-side!!! never let random users edit official content
  if (ownership === "private") {
    return my_private_ingredients;
  }
  if (ownership === "official") {
    return ingredients;
  }
  return [];
}

const url = 'https://s3.amazonaws.com/nobsc/';

type SyntheticEvent = React.SyntheticEvent<EventTarget>;

type Image = string | ArrayBuffer | null;

export function ToolTip() {
  return (
    <span className="crop-tool-tip">
      Move the crop to your desired position. The image&#40;s&#41; will be saved for you:
    </span>
  );
}

const initialCrop: Crop = {
  unit:   'px',
  x:      25,
  y:      25,
  width:  50,
  height: 50
};

export function isValidIngredientUpload({
  ingredient_type_id,
  ingredient_brand,
  ingredient_variety,
  ingredient_name,
  alt_names,
  notes,
  setFeedback
}: IsValidIngredientUploadParams) {
  function feedback(message: string) {
    window.scrollTo(0, 0);
    setFeedback(message);
    setTimeout(() => setFeedback(""), 3000);
    return false;
  }

  const validIngredientTypeId = ingredient_type_id !== 0;
  if (!validIngredientTypeId) return feedback("Select ingredient type.");

  //const validIngredientBrand = ingredient_brand.trim() !== "";
  //const validIngredientVariety = ingredient_variety.trim() !== "";

  const validIngredientName = ingredient_name.trim() !== "";
  if (!validIngredientName) return feedback("Enter ingredient name.");

  //const validAltNames = alt_names

  const validNotes = notes.trim() !== "";
  if (!validNotes) return feedback("Enter notes.");

  return true;
}

type IsValidIngredientUploadParams = {
  ingredient_type_id: number;
  ingredient_brand:   string;  // | null
  ingredient_variety: string;  // | null
  ingredient_name:    string;
  alt_names:          string[];
  notes:              string;
  setFeedback:        (feedback: string) => void;
};

export type ExistingIngredientToEdit = {
  ingredient_id:      string;
  ingredient_type_id: number;
  ingredient_brand:   string;  // | null
  ingredient_variety: string;  // | null
  ingredient_name:    string;
  notes:              string;
  image:              ImageInfo;
};

type ImageInfo = {
  image_filename: string;
  caption:        string;
};

type ImageUpload = ImageInfo & {
  small: File | null;
  tiny:  File | null;
};

export type IngredientUpload = {
  ingredient_type_id: number;
  ingredient_brand:   string;  // | null
  ingredient_variety: string;  // | null
  ingredient_name:    string;
  notes: string;
  image: ImageUpload;
};

export type IngredientUpdateUpload = IngredientUpload & {
  ingredient_id: string;
};

async function uploadImageToAWSS3(signature: any, image: any) {
  await axios.put(signature, image, {headers: {'Content-Type': 'image/jpeg'}});
}
