import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop } from "react-image-crop";
import { v4 as uuidv4 } from 'uuid';
import 'react-image-crop/dist/ReactCrop.css';

import { useApi, useAuth, useData, useUserData } from '../../../store';
import { NOBSC_USER_ID } from '../../shared/constants';
import { capitalizeFirstLetter } from '../../shared/capitalizeFirstLetter';
import { getCroppedImage } from '../../shared/getCroppedImage';
import { uploadImageToAwsS3 } from '../../shared/uploadImageToAwsS3';
import type { Ownership } from '../../shared/types';

export default function IngredientForm({ ownership }: Props) {
  const router = useRouter();

  const params = useParams();
  const ingredient_id = params['ingredient_id'];

  const { api } = useApi();
  const { auth_id, authname } = useAuth();
  const { ingredient_types } = useData();
  const { setMyPrivateIngredients } = useUserData();

  const allowedIngredients = useAllowedIngredients(ownership);

  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const [ingredient_type_id, setIngredientTypeId] = useState(0);
  const [ingredient_brand, setIngredientBrand] = useState('');
  const [ingredient_variety, setIngredientVariety] = useState('');
  const [ingredient_name, setIngredientName] = useState('');
  const [alt_names, setAltNames] = useState<AltNameRow[]>([]);
  const [notes, setNotes] = useState('');

  const imageRef = useRef<HTMLImageElement>();
  const [imageState, setImageState] = useState<ImageState>({
    image: null,
    crop: initialCrop,
    smallPreview: '',
    tinyPreview: ''
  });
  const [smallImage, setSmallImage] = useState<File | null>(null);
  const [tinyImage, setTinyImage] = useState<File | null>(null);
  const [image, setImage] = useState({
    image_id: '',
    image_filename: 'default',
    caption: '',
  });

  useEffect(() => {
    let mounted = true;

    function getExistingIngredientToEdit() {
      setLoading(true);
      window.scrollTo(0, 0);

      const ingredient = allowedIngredients.find(i => i.ingredient_id === ingredient_id);

      if (!ingredient) {
        router.push('/dashboard');
        return;
      }

      setIngredientTypeId(ingredient.ingredient_type_id);
      setIngredientBrand(ingredient.ingredient_brand ?? '');
      setIngredientVariety(ingredient.ingredient_variety ?? '')
      setIngredientName(ingredient.ingredient_name);
      setAltNames(ingredient.alt_names.map(alt_name => ({alt_name, key: uuidv4()})));
      setNotes(ingredient.notes);
      setImage({
        ...image,
        image_id: ingredient.image_id,
        image_filename: ingredient.image_filename,
        caption: ingredient.caption
      });

      setLoading(false);
    }

    if (mounted) {
      if (!authname) {
        router.push(`/404`);
        return;
      }
      if (ingredient_id) getExistingIngredientToEdit();
    }

    return () => {
      mounted = false;
    };
  }, []);

  const getMyPrivateIngredients = async () => {
    const res = await api.get(`/users/${authname}/private-ingredients`);
    setMyPrivateIngredients(res.data);
  };

  const changeAltName = (e: React.ChangeEvent<HTMLInputElement>, rowKey: string) => {
    setAltNames(prev =>
      prev.map(obj =>
        obj.key === rowKey ? {...obj, alt_name: e.target.value} : obj
      )
    );
  };

  const onSelectFile = (target: HTMLInputElement) => {
    if (!target.files) return;
    if (target.files.length < 1) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => setImageState({...imageState, image: reader.result}));
    reader.readAsDataURL(target.files[0] as Blob);
  };

  const makeCrops = async (crop: Crop) => {
    if (!imageRef.current) return;
    const small = await getCroppedImage(280, 280, imageRef.current, crop);
    const tiny = await getCroppedImage(28, 28, imageRef.current, crop);
    if (!small || !tiny) return;
    setImageState({
      ...imageState,
      smallPreview: small.preview,
      tinyPreview: tiny.preview
    });
    setSmallImage(small.final);
    setTinyImage(tiny.final);
  };

  const cancelImage = () => {
    setImageState({
      ...imageState,
      image: null,
      //crop
      smallPreview: '',
      tinyPreview: ''
    });
    setSmallImage(null);
    setTinyImage(null);
  };

  const invalid = (message: string) => {
    setFeedback(message);
    setLoading(false);
  };

  const getAltNames = () => alt_names.map(({ alt_name }) => alt_name);

  const submit = async () => {
    window.scrollTo(0, 0);
    setFeedback('');
    setLoading(true);
    if (ingredient_type_id === 0) return invalid('Ingredient Type required.');
    if (ingredient_name.trim() === "") return invalid('Ingredient Name required.');
    const ingredient_upload = {
      ingredient_type_id,
      ingredient_brand,
      ingredient_variety,
      ingredient_name,
      alt_names: getAltNames(),
      notes,
      image_filename: image.image_filename,
      caption: image.caption
    };
    // upload any images to AWS S3, then insert info into MySQL
    try {
      if (smallImage && tinyImage) {
        const res = await api.post(
          `/aws-s3-${ownership}-uploads`,
          {subfolder: 'ingredient'}
        );
        await uploadImageToAwsS3(res.data.smallSignature, smallImage);
        await uploadImageToAwsS3(res.data.tinySignature, tinyImage);
        ingredient_upload.image_filename = res.data.filename;
      }
      const editing = ingredient_id !== null;
      if (editing) {
        const res = await api.patch(
          `/users/${authname}/private-ingredients/${ingredient_id}`,
          {ingredient_id, image_id: image.image_id, ...ingredient_upload}
        );
        if (res.status === 204) {
          setFeedback('Ingredient updated.');
          await getMyPrivateIngredients();
          setTimeout(() => {
            router.push('/dashboard');
          }, 4000);
        } else {
          setFeedback(res.data.message);
        }
      } else {
        const res = await api.post(
          `/users/${authname}/private-ingredients`,
          ingredient_upload
        );
        if (res.status === 201) {
          setFeedback('Ingredient created.');
          await getMyPrivateIngredients();
          setTimeout(() => {
            router.push('/dashboard');
          }, 4000);
        } else {
          setFeedback(res.data.message);
        }
      }
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }
    setTimeout(() => {
      setFeedback('');
      setLoading(false);
    }, 4000);
  };

  const url = `https://s3.amazonaws.com/nobsc-${ownership}-uploads`;

  return (
    <div className="one-col ingredient-form">
      <h1>{ingredient_id ? 'Update' : 'Create'} {capitalizeFirstLetter(ownership)} Ingredient</h1>

      <p className="feedback">{feedback}</p>

      <label htmlFor='ingredient-type'>Ingredient Type</label>
      <select
        id='ingredient-type'
        name="ingredientType"
        onChange={e => setIngredientTypeId(Number(e.target.value))}
        required
        value={ingredient_type_id}
      >
        <option value={0}>Select type</option>
        {ingredient_types.map(({ ingredient_type_id, ingredient_type_name }) => (
          <option key={ingredient_type_id} value={ingredient_type_id}>
            {ingredient_type_name}
          </option>
        ))}
      </select>

      <label htmlFor='ingredient-brand'>Ingredient Brand (optional)</label>
      <input
        id='ingredient-brand'
        className="name"
        onChange={e => setIngredientBrand(e.target.value)}
        type="text"
        value={ingredient_brand}
      />

      <label htmlFor='ingredient-variety'>Ingredient Variety (optional)</label>
      <input
        id='ingredient-variety'
        className="name"
        onChange={e => setIngredientVariety(e.target.value)}
        type="text"
        value={ingredient_variety}
      />

      <label htmlFor='ingredient-name'>Ingredient Name</label>
      <input
        id='ingredient-name'
        className="name"
        onChange={e => setIngredientName(e.target.value)}
        type="text"
        value={ingredient_name}
      />

      <div className='alt-names'>
        <label>Alternative Names (optional)</label>

        <div className='alt-name-rows'>
          {alt_names.map(({ key, alt_name }) => (
            <div className='alt-name-row' key={key}>
              <div className="pair">
                <label htmlFor={key}>Alt Name</label>
                <input
                  id={key}
                  className="alt-name"
                  onChange={e => changeAltName(e, key)}
                  type="text"
                  value={alt_name}
                />
              </div>

              <button
                className="--remove"
                onClick={() => setAltNames(alt_names.filter(row => row.key !== key))}
              >Remove</button>
            </div>
          ))}
        </div>

        <button
          className="--add-row"
          onClick={() => setAltNames([...alt_names, pristineAltNameRow()])}
        >Add Alt Name</button>
      </div>

      <label htmlFor='notes'>Notes</label>
      <textarea id='notes' className="notes" onChange={e => setNotes(e.target.value)} value={notes} />

      <div className='ingredient-image'>
        <h4>Image of Ingredient</h4>
        {!imageState.image
          ? (
            <>
              {!ingredient_id
                ? <img className='current-image' src={`${url}/ingredient/${NOBSC_USER_ID}/default.jpg`} />
                : <img className='current-image' src={`${url}/ingredient/${auth_id}/${image.image_filename}.jpg`} />
              }
              <label>Change Image</label>
              <input
                accept="image/*"
                name="image-input"
                onChange={e => onSelectFile(e.target)}
                type="file"
              />
              {/*ingredient_id
                ? <button onClick={deleteIngredientImageFromAwsS3}>Delete / Reset To Default</button>
                : false*/}
            </>
          )
          : (
            <>
              <ReactCrop
                crop={imageState.crop}
                onChange={crop => setImageState({...imageState, crop})}
                onComplete={crop => makeCrops(crop)}
                aspect={1}
                className="crop-tool"
                style={{minHeight: "300px"}}
              >
                <img
                  onLoad={e => imageRef.current = e.currentTarget}
                  src={imageState.image as string}
                />
              </ReactCrop>
              <span className="crop-tool-tip">
                {'Resize and move the crop above. The images below will be saved for you.'}
              </span>
              <div className="crops">
                <div className="crop-small-outer">
                  <span>Small</span>
                  <img className="crop-small" src={imageState.smallPreview} />
                </div>
                <div className="crop-tiny-outer">
                  <span>Tiny</span>
                  <img className="crop-tiny" src={imageState.tinyPreview} />
                </div>
              </div>
              <label>{'Caption (optional)'}</label>
              <input
                className="caption"
                max={150}
                min={2}
                onChange={e => setImage({...image, caption: e.target.value})}
                type="text"
                value={image.caption}
              />
              <button
                className="image-cancel"
                disabled={loading}
                onClick={cancelImage}
              >Cancel</button>
            </>
          )
        }
      </div>

      <button
        className='submit-button'
        disabled={loading}
        onClick={submit}
      >
        {loading
          ? ingredient_id
            ? 'Updating...'
            : 'Creating...'
          : ingredient_id
            ? 'Update'
            : 'Create'
        }
      </button>

      <Link className="cancel-button" href="/dashboard">Cancel</Link>
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
  if (ownership === "private") return my_private_ingredients;
  if (ownership === "official") return ingredients;
  return [];
}

const pristineAltNameRow = () => ({
  key: uuidv4(),
  alt_name: ''
});

type ExistingAltName = {
  alt_name: string;
};

type AltNameRow = ExistingAltName & {
  [index: string]: number|string|null;
  key: string;
};

type ImageState = {
  image:        string | ArrayBuffer | null;
  crop:         Crop;
  smallPreview: string;
  tinyPreview:  string;
};

const initialCrop: Crop = {
  unit:   'px',
  x:      25,
  y:      25,
  width:  50,
  height: 50
};

export type IngredientUpload = {
  ingredient_type_id: number;
  ingredient_brand:   string;  // | null
  ingredient_variety: string;  // | null
  ingredient_name:    string;
  alt_names:          string[];
  notes:              string;
  image_filename:     string;
  caption:            string;
};

export type IngredientUpdateUpload = IngredientUpload & {
  ingredient_id: string;
  image_id:      string;
};

export type ExistingIngredientToEdit = IngredientUpdateUpload;
