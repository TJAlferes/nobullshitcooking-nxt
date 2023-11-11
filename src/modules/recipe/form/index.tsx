import axios from 'axios';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import { v4 as uuidv4 } from 'uuid';
import 'react-image-crop/dist/ReactCrop.css';

import { endpoint } from '../../../config/api';
import { useAuth, useData, useUserData } from '../../../store';
import { NOBSC_USER_ID } from '../../shared/constants';
import { getCroppedImage } from '../../shared/getCroppedImage';
import { uploadImageToAwsS3 } from '../../shared/uploadImageToAwsS3';
import type { Ownership } from '../../shared/types';

export default function RecipeForm({ ownership }: Props) {
  const router = useRouter();

  const params = useSearchParams();
  const recipe_id = params.get('recipe_id');

  const { auth_id, authname } = useAuth();
  const { units, ingredient_types, recipe_types, cuisines, methods } = useData();
  const { setMyPublicRecipes, setMyPrivateRecipes } = useUserData();

  const {
    allowedEquipment,
    allowedIngredients,
    allowedRecipes
  } = useAllowedContent(ownership, recipe_id);

  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const [recipe_type_id, setRecipeTypeId] = useState(0);
  const [cuisine_id, setCuisineId] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [active_time, setActiveTime] = useState('');
  const [total_time, setTotalTime] = useState('');
  const [directions, setDirections] = useState('');
  const [usedMethods, setUsedMethods] = useState<Methods>(
    methods.reduce((acc: { [key: number]: boolean }, curr) => {
      acc[curr.method_id] = false;
      return acc;
    }, {})
  );
  const [equipmentRows, setEquipmentRows] = useState<EquipmentRow[]>([pristineEquipmentRow]);
  const [ingredientRows, setIngredientRows] = useState<IngredientRow[]>([pristineIngredientRow]);
  const [subrecipeRows, setSubrecipeRows] = useState<SubrecipeRow[]>([]);

  const recipeImageRef = useRef<HTMLImageElement>();
  const [recipeImageState, setRecipeImageState] = useState<ImageState>({
    image: null,
    crop: initialCrop,
    mediumPreview: "",
    thumbPreview: "",
    tinyPreview: ""
  });
  const [recipeMediumImage, setRecipeMediumImage] = useState<File | null>(null);
  const [recipeThumbImage, setRecipeThumbImage] = useState<File | null>(null);
  const [recipeTinyImage, setRecipeTinyImage] = useState<File | null>(null);
  const [recipe_image, setRecipeImage] = useState({
    image_id: "",
    image_filename: "default",
    caption: "",
    type: 1
  });

  const equipmentImageRef = useRef<HTMLImageElement>();
  const [equipmentImageState, setEquipmentImageState] = useState<ImageState>({
    image: null,
    crop: initialCrop,
    mediumPreview: ""
  });
  const [equipmentMediumImage, setEquipmentMediumImage] = useState<File | null>(null);
  const [equipment_image, setEquipmentImage] = useState({
    image_id: "",
    image_filename: "default",
    caption: "",
    type: 2
  });

  const ingredientsImageRef = useRef<HTMLImageElement>();
  const [ingredientsImageState, setIngredientsImageState] = useState<ImageState>({
    image: null,
    crop: initialCrop,
    mediumPreview: ""
  });
  const [ingredientsMediumImage, setIngredientsMediumImage] = useState<File | null>(null);
  const [ingredients_image, setIngredientsImage] = useState({
    image_id: "",
    image_filename: "default",
    caption: "",
    type: 3
  });

  const cookingImageRef = useRef<HTMLImageElement>();
  const [cookingImageState, setCookingImageState] = useState<ImageState>({
    image: null,
    crop: initialCrop,
    mediumPreview: ""
  });
  const [cookingMediumImage, setCookingMediumImage] = useState<File | null>(null);
  const [cooking_image, setCookingImage] = useState({
    image_id: "",
    image_filename: "default",
    caption: "",
    type: 4
  });

  useEffect(() => {
    let mounted = true;

    async function getExistingRecipeToEdit() {
      window.scrollTo(0, 0);
      setLoading(true);
      const res = await axios.get(
        `${endpoint}/users/${authname}/${ownership}-recipes/${recipe_id}/edit`,
        {withCredentials: true}
      );
      const recipe: ExistingRecipeToEdit = res.data;
      if (!recipe) return router.push(`/dashboard`);
      setRecipeTypeId(recipe.recipe_type_id);
      setCuisineId(recipe.cuisine_id);
      setTitle(recipe.title);
      setDescription(recipe.description);
      setActiveTime(recipe.active_time);
      setTotalTime(recipe.total_time);
      setDirections(recipe.directions);
      setUsedMethods(prevState => {
        const nextState = {...prevState};
        recipe.required_methods?.map(({ method_id }) => {
          nextState[method_id] = true;
        });
        return nextState;
      });
      setEquipmentRows(recipe.required_equipment.map(r => ({...r, key: uuidv4()})));
      setIngredientRows(recipe.required_ingredients.map(r => ({...r, key: uuidv4()})));
      setSubrecipeRows(recipe.required_subrecipes.map(r => ({...r, key: uuidv4()})));
      setRecipeImage({...recipe_image, ...recipe.recipe_image});
      setEquipmentImage({...equipment_image, ...recipe.equipment_image});
      setIngredientsImage({...ingredients_image, ...recipe.ingredients_image});
      setCookingImage({...cooking_image, ...recipe.cooking_image});
      setLoading(false);
    }

    if (mounted) {
      if (!authname) return router.push(`/404`);
      if (recipe_id) getExistingRecipeToEdit();
    }

    return () => {
      mounted = false;
    };
  }, []);

  const getMyRecipes = async () => {
    if (ownership === "public") {
      const res = await axios.get(`${endpoint}/users/${authname}/public-recipes`);
      setMyPublicRecipes(res.data);
    } else if (ownership === "private") {
      const res = await axios.get(
        `${endpoint}/users/${authname}/private-recipes`,
        {withCredentials: true}
      );
      setMyPrivateRecipes(res.data);
    }
  };  // do this in getServerSideProps???

  const changeEquipmentRow = (e: SyntheticEvent, rowKey: string) => {
    const newRows =    Array.from(equipmentRows);
    const elToUpdate = newRows.findIndex(el => el.key === rowKey);
    const name =       (e.target as HTMLInputElement).name;
    const value =      (e.target as HTMLInputElement).value;
    const obj =        newRows[elToUpdate];
    if (!obj) return;
    obj[name] = value;
    setEquipmentRows(newRows);
  };

  const changeIngredientRow = (e: SyntheticEvent, rowKey: string) => {
    const newRows =    Array.from(ingredientRows);
    const elToUpdate = newRows.findIndex(el => el.key === rowKey);
    const name =       (e.target as HTMLInputElement).name;
    const value =      (e.target as HTMLInputElement).value;
    const obj =        newRows[elToUpdate];
    if (!obj) return;
    obj[name] = value;
    setIngredientRows(newRows);
  };

  const changeSubrecipeRow = (e: SyntheticEvent, rowKey: string) => {
    const newRows =    Array.from(subrecipeRows);
    const elToUpdate = newRows.findIndex(el => el.key === rowKey);
    const name =       (e.target as HTMLInputElement).name;
    const value =      (e.target as HTMLInputElement).value;
    const obj =        newRows[elToUpdate];
    if (!obj) return;
    obj[name] = value;
    setSubrecipeRows(newRows);
  };
  
  const onSelectFile = (e: ChangeEvent, type: string) => {
    const target = e.target as HTMLInputElement;
    if (!(target.files && target.files.length > 0)) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (type === "recipe") {
        setRecipeImageState({...recipeImageState, image: reader.result});
      }
      if (type === "equipment") {
        setEquipmentImageState({...equipmentImageState, image: reader.result});
      }
      if (type === "ingredients") {
        setIngredientsImageState({...ingredientsImageState, image: reader.result});
      }
      if (type === "cooking") {
        setCookingImageState({...cookingImageState, image: reader.result});
      }
    });
    reader.readAsDataURL(target.files[0] as Blob);
  };
  
  const onRecipeCropComplete = async (crop: Crop) => {
    if (!recipeImageRef.current) return;
    const medium =  await getCroppedImage(560, 560, recipeImageRef.current, crop);
    const thumb = await getCroppedImage(100, 100, recipeImageRef.current, crop);
    const tiny =  await getCroppedImage(28, 28, recipeImageRef.current, crop);
    if (!medium || !thumb || !tiny) return;
    setRecipeImageState({
      ...recipeImageState,
      mediumPreview: medium.preview,
      thumbPreview: thumb.preview,
      tinyPreview: tiny.preview
    });
    setRecipeMediumImage(medium.final);
    setRecipeThumbImage(thumb.final);
    setRecipeTinyImage(tiny.final);
  };

  const onEquipmentCropComplete = async (crop: Crop) => {
    if (!equipmentImageRef.current) return;
    const medium = await getCroppedImage(560, 560, equipmentImageRef.current, crop);
    if (!medium) return;
    setEquipmentImageState({...equipmentImageState, mediumPreview: medium.preview});
    setEquipmentMediumImage(medium.final);
  };

  const onIngredientsCropComplete = async (crop: Crop) => {
    if (!ingredientsImageRef.current) return;
    const medium = await getCroppedImage(560, 560, ingredientsImageRef.current, crop);
    if (!medium) return;
    setIngredientsImageState({...ingredientsImageState, mediumPreview: medium.preview});
    setIngredientsMediumImage(medium.final);
  };

  const onCookingCropComplete = async (crop: Crop) => {
    if (!cookingImageRef.current) return;
    const medium = await getCroppedImage(560, 560, cookingImageRef.current, crop);
    if (!medium) return;
    setCookingImageState({...cookingImageState, mediumPreview: medium.preview});
    setCookingMediumImage(medium.final);
  };

  const cancelRecipeImage = () => {
    setRecipeImageState({
      ...recipeImageState,
      image: null,
      //crop
      mediumPreview: "",
      thumbPreview: "",
      tinyPreview: ""
    });
    setRecipeMediumImage(null);
    setRecipeThumbImage(null);
    setRecipeTinyImage(null);
  };

  const cancelEquipmentImage = () => {
    setEquipmentImageState({
      ...equipmentImageState,
      image: null,
      //crop
      mediumPreview: ""
    });
    setEquipmentMediumImage(null);
  };

  const cancelIngredientsImage = () => {
    setIngredientsImageState({
      ...ingredientsImageState,
      image: null,
      //crop
      mediumPreview: ""
    });
    setIngredientsMediumImage(null);
  };

  const cancelCookingImage = () => {
    setCookingImageState({
      ...cookingImageState,
      image: null,
      //crop
      mediumPreview: ""
    });
    setCookingMediumImage(null);
  };

  // TO DO: confirmation modal
  const deleteRecipeImageFromAWSS3 = () =>
    setRecipeImage({...recipe_image, image_filename: "default"});

  const deleteEquipmentImageFromAWSS3 = () =>
    setEquipmentImage({...equipment_image, image_filename: "default"});

  const deleteIngredientsImageFromAWSS3 = () =>
    setIngredientsImage({...ingredients_image, image_filename: "default"});

  const deleteCookingImageFromAWSS3 = () =>
    setCookingImage({...cooking_image, image_filename: "default"});

  const getCheckedMethods = () => Object.keys(usedMethods)
    .filter(key => usedMethods[parseInt(key)] === true)
    .map(key => ({method_id: parseInt(key)}));

  // TO DO: map "" to null here?

  const getRequiredEquipment = () => equipmentRows.map(e => ({
    amount:       e.amount,
    equipment_id: e.equipment_id
  }));

  const getRequiredIngredients = () => ingredientRows.map(i => ({
    amount:        i.amount,
    unit_id:       i.unit_id,
    ingredient_id: i.ingredient_id
  }));

  const getRequiredSubrecipes = () => subrecipeRows.map(s => ({
    amount:       s.amount,
    unit_id:      s.unit_id,
    subrecipe_id: s.subrecipe_id
  }));

  const invalid = (message: string) => {
    setFeedback(message);
    setLoading(false);
  };

  const submit = async () => {
    window.scrollTo(0, 0);
    setFeedback('');
    setLoading(true);
    if (recipe_type_id === 0) return invalid('Recipe Type required.');
    if (cuisine_id === 0) return invalid('Cuisine required.');
    if (title.trim() === '') return invalid('Title required.');
    if (description.trim() === '') return invalid('Description required.');
    if (!validateAndFormatTime(active_time)) return invalid('Invalid time.');
    if (!validateAndFormatTime(total_time)) return invalid('Invalid time.');
    if (directions.trim() === '') return invalid('Directions required.');
    if (getCheckedMethods().length < 1) return invalid('Select required method(s).');
    for (const { equipment_id } of getRequiredEquipment()) {
      //amount
      if (!equipment_id) return invalid('Review required equipment.');
    }
    for (const { ingredient_id } of getRequiredIngredients()) {
      //amount
      //unit_id
      if (!ingredient_id) return invalid('Review required ingredients.');
    }
    for (const { subrecipe_id } of getRequiredSubrecipes()) {
      //amount
      //unit_id
      if (!subrecipe_id) return invalid('Review required subrecipes.');
    }
    const recipe_upload = {
      recipe_type_id,
      cuisine_id,
      title,
      description,
      active_time,
      total_time,
      directions,
      required_methods:     getCheckedMethods(),
      required_equipment:   getRequiredEquipment(),
      required_ingredients: getRequiredIngredients(),
      required_subrecipes:  getRequiredSubrecipes(),
      recipe_image,
      equipment_image,
      ingredients_image,
      cooking_image
    };

    // upload any newly made images to AWS S3, then insert info into MySQL
    try {
      if (recipeMediumImage && recipeThumbImage && recipeTinyImage) {
        const res = await axios.post(
          `${endpoint}/aws-s3-${ownership}-uploads`,
          {subfolder: 'recipe'},
          {withCredentials: true}
        );
        await uploadImageToAwsS3(res.data.mediumSignature, recipeMediumImage);
        await uploadImageToAwsS3(res.data.thumbSignature, recipeThumbImage);
        await uploadImageToAwsS3(res.data.tinySignature, recipeTinyImage);
        recipe_upload.recipe_image.image_filename = res.data.filename;
      }
    
      if (equipmentMediumImage) {
        const res = await axios.post(
          `${endpoint}/aws-s3-${ownership}-uploads`,
          {subfolder: 'recipe-equipment'},
          {withCredentials: true}
        );
        await uploadImageToAwsS3(res.data.mediumSignature, equipmentMediumImage);
        recipe_upload.equipment_image.image_filename = res.data.filename;
      }
    
      if (ingredientsMediumImage) {
        const res = await axios.post(
          `${endpoint}/aws-s3-${ownership}-uploads`,
          {subfolder: 'recipe-ingredients'},
          {withCredentials: true}
        );
        await uploadImageToAwsS3(res.data.mediumSignature, ingredientsMediumImage);
        recipe_upload.ingredients_image.image_filename = res.data.filename;
      }
    
      if (cookingMediumImage) {
        const res = await axios.post(
          `${endpoint}/aws-s3-${ownership}-uploads`,
          {subfolder: 'recipe-cooking'},
          {withCredentials: true}
        );
        await uploadImageToAwsS3(res.data.mediumSignature, cookingMediumImage);
        recipe_upload.cooking_image.image_filename = res.data.filename;
      }

      const editing = recipe_id !== null;
      if (editing) {
        const res = await axios.patch(
          `${endpoint}/users/${authname}/${ownership}-recipes`,
          {recipe_id, ...recipe_upload},
          {withCredentials: true}
        );
        if (res.status === 204) {
          setFeedback("Recipe updated.");
          await getMyRecipes();
          setTimeout(() => router.push(`/dashboard`), 4000);
        } else {
          setFeedback(res.data.error);
        }
      } else {
        const res = await axios.post(
          `${endpoint}/users/${authname}/${ownership}-recipes`,
          recipe_upload,
          {withCredentials: true}
        );
        if (res.status === 201) {
          setFeedback("Recipe created.");
          await getMyRecipes();
          setTimeout(() => router.push(`/dashboard`), 4000);
        } else {
          setFeedback(res.data.error);
        }
      }
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    } finally {
      setTimeout(() => {
        setFeedback("");
        setLoading(false);
      }, 4000);
    }
  };

  const url = `https://s3.amazonaws.com/nobsc-${ownership}-uploads`;

  return (
    <div className="one-col recipe-form">
      {ownership === "private" && recipe_id
        ? <h1>Update Private Recipe</h1>
        : <h1>Create Private Recipe</h1>}
      {ownership === "public" && recipe_id
        ? <h1>Update Public Recipe</h1>
        : <h1>Create Public Recipe</h1>}

      <p className="feedback">{feedback}</p>

      <h2>Recipe Type</h2>
      <select
        id="recipe_type_id"
        name="recipeType"
        onChange={e => setRecipeTypeId(Number(e.target.value))}
        required
        value={recipe_type_id}
      >
        <option value={0}>Select type</option>
        {recipe_types.map(({ recipe_type_id, recipe_type_name }) => (
          <option key={recipe_type_id} value={recipe_type_id}>
            {recipe_type_name}
          </option>
        ))}
      </select>

      <h2>Cuisine</h2>
      <select
        id="cuisine_id"
        name="cuisine"
        onChange={e => setCuisineId(Number(e.target.value))}
        required
        value={cuisine_id}
      >
        <option value={0}>Select cuisine</option>
        {cuisines.map(({ cuisine_id, cuisine_name }) => (
          <option key={cuisine_id} value={cuisine_id}>{cuisine_name}</option>
        ))}
      </select>

      <h2>Title</h2>
      <input
        className="title"
        id="recipe_title"
        max={100}
        min={2}
        name="title"
        onChange={e => setTitle(e.target.value)}
        type="text"
        value={title}
      />

      <h2>Description / Author Note</h2>
      <input
        className="description"
        id="recipe_description"
        max={150}
        min={2}
        name="description"
        onChange={e => setDescription(e.target.value)}
        type="time"
        value={description}
      />

      <h2>Active Time</h2>
      <input
        className="time"
        name="active_time"
        onChange={e => setActiveTime(e.target.value)}
        type="time"
        value={active_time}
      />

      <h2>Total Time</h2>
      <input
        className="time"
        name="total_time"
        onChange={e => setTotalTime(e.target.value)}
        type=""
        value={total_time}
      />

      <h2>Methods</h2>
      <div className="methods">
        {methods.map(({ method_id, method_name }) => (
          <span className="method" key={method_id}>
            <input
              checked={usedMethods[method_id] === true ? true : false}
              id={`${method_id}`}
              onChange={e =>
                setUsedMethods(prevState => ({
                  ...prevState,
                  [e.target.id]: !prevState[parseInt(e.target.id)]
                }))
              }
              type="checkbox"
            />
            <label>{method_name}</label>
          </span>
        ))}
      </div>

      <div className="required-equipment">
        <h2>Equipment</h2>

        <div className="equipment-rows">
          {equipmentRows.map(({ key, amount, equipment_type_id, equipment_id }) => (
            <div className="recipe-row" key={key}>
              <label>Amount:</label>
              <select
                name="amount"
                onChange={e => changeEquipmentRow(e, key)}
                required
                value={amount ?? ""}
              >
                <option value={0}>Select amount (optional)</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>

              <label>Type:</label>
              <select
                name="type"
                onChange={e => changeEquipmentRow(e, key)}
                required
                value={equipment_type_id}
              >
                <option value={0}>Select type</option>
                <option value={2}>Preparing</option>
                <option value={3}>Cooking</option>
              </select>

              <label>Equipment:</label>
              <select
                name="equipment"
                onChange={e => changeEquipmentRow(e, key)}
                required
                value={equipment_id}
              >
                <option value="">Select equipment</option>
                {
                  allowedEquipment
                    .filter(e => e.equipment_type_id == equipment_type_id)
                    .map((e, index) => (
                      <option key={index} value={e.equipment_id}>
                        {e.equipment_name}
                      </option>
                    ))
                }
              </select>

              <button
                className="--remove"
                onClick={() => setEquipmentRows(equipmentRows.filter(row => row.key !== key))}
              >Remove</button>
            </div>
          ))}
        </div>

        <button
          className="--add-row"
          onClick={() => setEquipmentRows([...equipmentRows, pristineEquipmentRow])}
        >Add Equipment</button>
      </div>

      <div className="required-ingredients">
        <h2>Ingredients</h2>
        
        <div className="ingredient-rows">
          {ingredientRows.map(({ key, amount, unit_id, ingredient_type_id, ingredient_id }) => (
            <div className="recipe-row" key={key}>
              <label>Amount:</label>
              <input
                max="9999"
                min="0.125"
                name="amount"
                onChange={e => changeIngredientRow(e, key)}
                step="any"
                type="number"
                value={amount ?? ""}
                placeholder='Enter amount (optional)'
              />

              <label>Unit:</label>
              <select
                name="unit"
                onChange={e => changeIngredientRow(e, key)}
                value={unit_id ?? ""}
              >
                <option value={0}>Select unit (optional)</option>
                {units.map((u, index) => (
                  <option key={index} value={u.unit_id}>{u.unit_name}</option>
                ))}
              </select>

              <label>Type:</label>
              <select
                name="type"
                onChange={e => changeIngredientRow(e, key)}
                required
                value={ingredient_type_id}
              >
                <option value={0}>Select type</option>
                {ingredient_types.map((i, index) => (
                  <option key={index} value={i.ingredient_type_id}>
                    {i.ingredient_type_name}
                  </option>
                ))}
              </select>

              <label>Ingredient:</label>
              <select
                name="ingredient"
                onChange={e => changeIngredientRow(e, key)}
                required
                value={ingredient_id}
              >
                <option value="">Select ingredient</option>
                {
                  allowedIngredients
                    .filter(i => i.ingredient_type_id == ingredient_type_id)
                    .map((i, index) => (
                      <option key={index} value={i.ingredient_id}>
                        {i.fullname}
                      </option>
                    ))
                }
              </select>

              <button
                className="--remove"
                onClick={() => setIngredientRows(ingredientRows.filter(row => row.key !== key))}
              >Remove</button>
            </div>
          ))}
        </div>

        <button
          className="--add-row"
          onClick={() => setIngredientRows([...ingredientRows, pristineIngredientRow])}
        >Add Ingredient</button>
      </div>

      <div className="required-subrecipes">
        <h2>Subrecipes</h2>
        
        <div className="subrecipe-rows">
          {subrecipeRows.map(s => (
            <div className="recipe-row" key={s.key}>
              <label>Amount:</label>
              <input
                max="9999"
                min="0.125"
                name="amount"
                onChange={e => changeSubrecipeRow(e, s.key)}
                step="any"
                type="number"
                value={s.amount ?? ""}
                placeholder='Enter amount (optional)'
              />
              
              <label>Unit:</label>
              <select
                name="unit"
                onChange={e => changeSubrecipeRow(e, s.key)}
                value={s.unit_id ?? ""}
              >
                <option value={0}>Select unit (optional)</option>
                {units.map((u, index) => (
                  <option key={index} value={u.unit_id}>{u.unit_name}</option>
                ))}
              </select>
              
              <label>Type:</label>
              <select
                name="type"
                onChange={e => changeSubrecipeRow(e, s.key)}
                required
                value={s.recipe_type_id}
              >
                <option value={0}>Select type</option>
                {recipe_types.map((r, index) => (
                  <option key={index} value={r.recipe_type_id}>
                    {r.recipe_type_name}
                  </option>
                ))}
              </select>
              
              <label>Cuisine:</label>
              <select
                name="cuisine"
                onChange={(e) => changeSubrecipeRow(e, s.key)}
                required
                value={s.cuisine_id}
              >
                <option value={0}>Select cuisine</option>
                {cuisines.map((c, index) => (
                  <option key={index} value={c.cuisine_id}>
                    {c.cuisine_name}
                  </option>
                ))}
              </select>
              
              <label>Subrecipe:</label>
              <select
                className="--subrecipe"
                name="subrecipe"
                onChange={e => changeSubrecipeRow(e, s.key)}
                required
                value={s.subrecipe_id}
              >
                <option value="">Select subrecipe</option>
                {
                  allowedRecipes
                    .filter(r => r.recipe_type_id == s.recipe_type_id)
                    .filter(r => r.cuisine_id == s.cuisine_id)
                    .map((r, index) => (
                      <option key={index} value={r.recipe_id}>{r.title}</option>
                    ))
                }
              </select>
              
              <button
                className="--remove"
                onClick={() => setSubrecipeRows(subrecipeRows.filter(row => row.key !== s.key))}
              >Remove</button>
            </div>
          ))}
        </div>

        <button
          className="--add-row"
          onClick={() => setSubrecipeRows([...subrecipeRows, pristineSubrecipeRow])}
        >Add Subrecipe</button>
      </div>

      <h2>Directions</h2>
      <textarea
        className="directions"
        id="recipe_directions"
        name="directions"
        onChange={e => setDirections(e.target.value)}
        value={directions}
      />

      <div className="recipe-form-images">
        <div className="recipe-image">
          <h2>Image of Finished Recipe</h2>
          {
            !recipeImageState.image
            ? (
              <>
                {!recipe_id
                  ? <img src={`${url}/recipe/${NOBSC_USER_ID}/default`} />
                  : <img src={`${url}/recipe/${auth_id}/${recipe_image!.image_filename}`} />}
                <h4>Change</h4>
                <input
                  accept="image/*"
                  name="image-input"
                  onChange={(e) => onSelectFile(e, "recipe")}
                  type="file"
                />
                {recipe_id
                  ? <button onClick={deleteRecipeImageFromAWSS3}>Delete / Reset To Default</button>
                  : false}
              </>
            )
            : (
              <>
                <ReactCrop
                  crop={recipeImageState.crop}
                  onChange={(crop) => setRecipeImageState({...recipeImageState, crop})}
                  onComplete={onRecipeCropComplete}
                  {...commonReactCropProps}
                >
                  <img
                    onLoad={e => recipeImageRef.current = e.currentTarget}
                    src={recipeImageState.image as string}
                  />
                </ReactCrop>
                <ToolTip />
                <div className="crops">
                  <div className="crop-full-outer">
                    <span>Full Size: </span>
                    <img className="crop-full" src={recipeImageState.mediumPreview} />
                  </div>
                  <div className="crop-thumb-outer">
                    <span>Thumb Size: </span>
                    <img className="crop-thumb" src={recipeImageState.thumbPreview} />
                  </div>
                  <div className="crop-tiny-outer">
                    <span>Tiny Size: </span>
                    <img className="crop-tiny" src={recipeImageState.tinyPreview} />
                  </div>
                </div>
                <h4>Caption:</h4>
                <input
                  className="caption"
                  max={150}
                  min={2}
                  name="caption"
                  onChange={e => setRecipeImage({...recipe_image, caption: e.target.value})}
                  type="text"
                  value={recipe_image!.caption}
                />
                <button
                  className="image-cancel-button"
                  disabled={loading}
                  onClick={cancelRecipeImage}
                >Cancel</button>
              </>
            )
          }
        </div>

        <div className="equipment-image">
          <h2>Image of All Equipment</h2>
          {
            !equipmentImageState.image
            ? (
              <>
                {!recipe_id
                  ? <img src={`${url}/recipe-equipment/${NOBSC_USER_ID}/default`} />
                  : <img src={`${url}/recipe-equipment/${auth_id}/${equipment_image!.image_filename}`} />}
                <h4>Change</h4>
                <input
                  accept="image/*"
                  name="equipment-image-input"
                  onChange={(e) => onSelectFile(e, "equipment")}
                  type="file"
                />
                {recipe_id
                  ? <button onClick={deleteEquipmentImageFromAWSS3}>Delete / Reset To Default</button>
                  : false}
              </>
            )
            : (
              <>
                <ReactCrop
                  crop={equipmentImageState.crop}
                  onChange={(crop) => setEquipmentImageState({...equipmentImageState, crop})}
                  onComplete={onEquipmentCropComplete}
                  {...commonReactCropProps}
                >
                  <img
                    onLoad={e => equipmentImageRef.current = e.currentTarget}
                    src={equipmentImageState.image as string}
                  />
                </ReactCrop>
                <ToolTip />
                <div className="crops">
                  <div className="crop-full-outer">
                    <span>Full Size: </span>
                    <img className="crop-full" src={equipmentImageState.mediumPreview} />
                  </div>
                </div>
                <h4>Caption:</h4>
                <input
                  className="caption"
                  max={150}
                  min={2}
                  name="caption"
                  onChange={e => setEquipmentImage({...equipment_image, caption: e.target.value})}
                  type="text"
                  value={equipment_image!.caption}
                />
                <button
                  className="image-cancel-button"
                  disabled={loading}
                  onClick={cancelEquipmentImage}
                >Cancel</button>
              </>
            )
          }
        </div>

        <div className="ingredients-image">
          <h2>Image of All Ingredients</h2>
          {
            !ingredientsImageState.image
            ? (
              <>
                {!recipe_id
                  ? <img src={`${url}/recipe-ingredients/${NOBSC_USER_ID}/default`} />
                  : <img src={`${url}/recipe-ingredients/${auth_id}/${ingredients_image!.image_filename}`} />
                }
                <h4>Change</h4>
                <input
                  accept="image/*"
                  name="ingredients-image-input"
                  onChange={(e) => onSelectFile(e, "ingredients")}
                  type="file"
                />
                {recipe_id
                  ? <button onClick={deleteIngredientsImageFromAWSS3}>Delete / Reset To Default</button>
                  : false}
              </>
            )
            : (
              <>
                <ReactCrop
                  crop={ingredientsImageState.crop}
                  onChange={(crop) => setIngredientsImageState({...ingredientsImageState, crop})}
                  onComplete={onIngredientsCropComplete}
                  {...commonReactCropProps}
                >
                  <img
                    onLoad={e => ingredientsImageRef.current = e.currentTarget}
                    src={ingredientsImageState.image as string}
                  />
                </ReactCrop>
                <ToolTip />
                <div className="crops">
                  <div className="crop-full-outer">
                    <span>Full Size: </span>
                    <img className="crop-full" src={ingredientsImageState.mediumPreview} />
                  </div>
                </div>
                <h4>Caption:</h4>
                <input
                  className="caption"
                  max={150}
                  min={2}
                  name="caption"
                  onChange={e => setIngredientsImage({...ingredients_image, caption: e.target.value})}
                  type="text"
                  value={ingredients_image!.caption}
                />
                <button
                  className="image-cancel-button"
                  disabled={loading}
                  onClick={cancelIngredientsImage}
                >Cancel</button>
              </>
            )
          }
        </div>

        <div className="cooking-image">
          <h2>Image of Cooking In Action</h2>
          {
            !cookingImageState.image
            ? (
              <>
                {!recipe_id
                  ? <img src={`${url}/recipe-cooking/${NOBSC_USER_ID}/default`} />
                  : <img src={`${url}/recipe-cooking/${auth_id}/${cooking_image!.image_filename}`} />}
                <h4>Change</h4>
                <input
                  accept="image/*"
                  name="cooking-image-input"
                  onChange={(e) => onSelectFile(e, "cooking")}
                  type="file"
                />
                {recipe_id
                  ? <button onClick={deleteCookingImageFromAWSS3}>Delete / Reset To Default</button>
                  : false}
              </>
            )
            : (
              <>
                <ReactCrop
                  crop={cookingImageState.crop}
                  onChange={(crop) => setCookingImageState({...cookingImageState, crop})}
                  onComplete={onCookingCropComplete}
                  {...commonReactCropProps}
                >
                  <img
                    onLoad={e => cookingImageRef.current = e.currentTarget}
                    src={cookingImageState.image as string}
                  />
                </ReactCrop>
                <ToolTip />
                <div className="crops">
                  <div className="crop-full-outer">
                    <span>Full Size: </span>
                    <img className="crop-full" src={cookingImageState.mediumPreview} />
                  </div>
                </div>
                <h4>Caption:</h4>
                <input
                  className="caption"
                  max={150}
                  min={2}
                  name="caption"
                  onChange={e => setCookingImage({...cooking_image, caption: e.target.value})}
                  type="text"
                  value={cooking_image!.caption}
                />
                <button
                  className="image-cancel-button"
                  disabled={loading}
                  onClick={cancelCookingImage}
                >Cancel</button>
              </>
            )
          }
        </div>
      </div>

      <div className="finish">
        <Link className="cancel-button" href='/dashboard'>Cancel</Link>

        <button
          className='submit-button'
          disabled={loading}
          onClick={submit}
        >{loading ? 'Creating...' : 'Create'}</button>
      </div>
    </div>
  );
}

type Props = {
  ownership: Ownership;
};

function useAllowedContent(ownership: Ownership, recipe_id: string | null) {
  const { equipment, ingredients } = useData();
  const {
    my_private_equipment,
    my_private_ingredients,
    my_private_recipes,
    my_public_recipes,
    my_favorite_recipes,
    my_saved_recipes
  }= useUserData();

  const allowedEquipment = [
    ...equipment,
    ...(ownership === "private" ? my_private_equipment: [])
  ];

  const allowedIngredients = [
    ...ingredients,
    ...(ownership === "private" ? my_private_ingredients : [])
  ];

  // TO DO: let them search official recipes here
  const allowedRecipes = [
    //...recipes,
    ...(
      ownership === "private"
      ? (
        recipe_id
        ? my_private_recipes.filter(r => r.recipe_id != recipe_id)
        : my_private_recipes
      )
      : []
    ),
    ...(
      (ownership === "private" || ownership === "public")
      ? (
        recipe_id
        ? my_public_recipes.filter(r => r.recipe_id != recipe_id)
        : my_public_recipes
      )
      : []
    ),
    ...((ownership === "private" || ownership === "public") ? my_favorite_recipes : []),  // TO DO: make sure they can't be the author AND that recipe is not private
    ...((ownership === "private" || ownership === "public") ? my_saved_recipes    : []),  // TO DO: make sure they can't be the author AND that recipe is not private
  ];

  return {
    allowedEquipment,
    allowedIngredients,
    allowedRecipes
  };
}

type ImageState = {
  image:         string | ArrayBuffer | null;
  crop:          Crop;
  mediumPreview: string;
  thumbPreview?: string;
  tinyPreview?:  string;
};

type SyntheticEvent = React.SyntheticEvent<EventTarget>;

export function ToolTip() {
  return (
    <span className="crop-tool-tip">
      Move the crop to your desired position. The image&#40;s&#41; will be saved for you:
    </span>
  );
}

export const pristineEquipmentRow = {
  key:               uuidv4(),
  amount:            0,
  equipment_type_id: 0,
  equipment_id:      ""
};

export const pristineIngredientRow = {
  key:                uuidv4(),
  amount:             0,
  unit_id:            0,
  ingredient_type_id: 0,
  ingredient_id:      ""
};

export const pristineSubrecipeRow = {
  key:            uuidv4(),
  amount:         0,
  unit_id:        0,
  recipe_type_id: 0,
  cuisine_id:     0,
  subrecipe_id:   ""
};

export const initialCrop: Crop = {
  unit:   'px',
  x:      25,
  y:      25,
  width:  50,
  height: 50
};  // TO DO: change to NOBSC images ratio

export const commonReactCropProps = {
  aspect:    1,
  className: "crop-tool",
  disabled:  true,
  locked:    true,
  maxHeight: 346,
  maxWidth:  560,
  minHeight: 346,
  minWidth:  560,
  style: {
    minHeight: "346px"
  }
};

function validateAndFormatTime(time: string) {
  // validate
  const [ hours, minutes ] = time.split(':');
  const parsedHours = hours ? parseInt(hours): 0;
  const parsedMinutes = minutes ? parseInt(minutes) : 0;
  if (isNaN(parsedHours) || isNaN(parsedMinutes)) return false;
  if (parsedHours < 0 || parsedHours > 23 || parsedMinutes < 0 || parsedMinutes > 59) return false;

  // format
  // We add leading zeroes if needed (0 becomes 00, 4 becomes 04)
  const formattedHours   = parsedHours.toString().padStart(2, '0');
  const formattedMinutes = parsedMinutes.toString().padStart(2, '0');
  time = `${formattedHours}:${formattedMinutes}`;

  return true;
}

export type RequiredMethod = {
  method_id: number;
};

export type RequiredEquipment = {
  amount:       number | null;
  equipment_id: string;
};

export type RequiredIngredient = {
  amount:        number | null;
  unit_id:       number | null;
  ingredient_id: string;
};

export type RequiredSubrecipe = {
  amount:       number | null;
  unit_id:      number | null;
  subrecipe_id: string;
};

type ExistingImage = {
  image_id:       string;
  image_filename: string;
  caption:        string;
};

export type ExistingRecipeToEdit = {
  recipe_id:            string;
  recipe_type_id:       number;
  cuisine_id:           number;
  title:                string;
  description:          string;
  active_time:          string;
  total_time:           string;
  directions:           string;
  recipe_image:         ExistingImage;
  equipment_image:      ExistingImage;
  ingredients_image:    ExistingImage;
  cooking_image:        ExistingImage;
  required_methods:     ExistingRequiredMethod[];
  required_equipment:   ExistingRequiredEquipment[];
  required_ingredients: ExistingRequiredIngredient[];
  required_subrecipes:  ExistingRequiredSubrecipe[];
};

export type ExistingRequiredMethod = RequiredMethod;

export type ExistingRequiredEquipment = RequiredEquipment & {
  equipment_type_id: number;  // (just a filter for nicer UX, not stored in DB)
};

export type ExistingRequiredIngredient = RequiredIngredient & {
  ingredient_type_id: number;  // (just a filter for nicer UX, not stored in DB)
};

export type ExistingRequiredSubrecipe = RequiredSubrecipe & {
  recipe_type_id: number;  // (just a filter for nicer UX, not stored in DB)
  cuisine_id:     number;  // (just a filter for nicer UX, not stored in DB)
};

export type Methods = {
  [key: number]: boolean;
};

export type EquipmentRow = ExistingRequiredEquipment & {
  [index: string]: number|string|null;
  key: string;
};

export type IngredientRow = ExistingRequiredIngredient & {
  [index: string]: number|string|null;
  key: string;
};

export type SubrecipeRow = ExistingRequiredSubrecipe & {
  [index: string]: number|string|null;
  key: string;
};

export type RecipeUpload = {
  recipe_type_id:       number;
  cuisine_id:           number;
  title:                string;
  description:          string;
  active_time:          string;
  total_time:           string;
  directions:           string;
  required_methods:     RequiredMethod[];
  required_equipment:   RequiredEquipment[];
  required_ingredients: RequiredIngredient[];
  required_subrecipes:  RequiredSubrecipe[];
  recipe_image:         ImageInfo | ImageUpdateInfo,
  equipment_image:      ImageInfo | ImageUpdateInfo,
  ingredients_image:    ImageInfo | ImageUpdateInfo,
  cooking_image:        ImageInfo | ImageUpdateInfo
};

export type RecipeUpdateUpload = RecipeUpload & {
  recipe_id: string;
};

type ImageInfo = {
  image_filename: string;
  caption:        string;
  type:           number;
};

type ImageUpdateInfo = ImageInfo & {
  image_id: string;
};
