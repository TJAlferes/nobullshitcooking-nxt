import axios                           from 'axios';
import Link                            from 'next/link';
import { useSearchParams, useRouter }  from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent }            from 'react';
import ReactCrop, { Crop, PixelCrop }  from 'react-image-crop';
import { v4 as uuidv4 }                from 'uuid';
import 'react-image-crop/dist/ReactCrop.css';

import { endpoint }                      from '../../../config/api';
import { useAuth, useData, useUserData } from '../../../store';
import { LoaderButton }                  from '../../shared/LoaderButton';
import { getCroppedImage }               from '../../shared/getCroppedImage';
import type { Ownership }                from '../../shared/types';

export default function RecipeForm({ ownership }: Props) {
  const router = useRouter();

  const params = useSearchParams();
  const recipe_id = params.get('recipe_id');

  const { authname } = useAuth();
  const { units, ingredient_types, recipe_types, cuisines, methods } = useData();
  const { setMyPublicRecipes, setMyPrivateRecipes } = useUserData();

  const { allowedEquipment, allowedIngredients, allowedRecipes } = useAllowedContent(ownership, recipe_id);

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ]  = useState(false);

  const [ recipe_type_id, setRecipeTypeId ] = useState(0);
  const [ cuisine_id,     setCuisineId ]    = useState(0);
  const [ title,          setTitle ]        = useState("");
  const [ description,    setDescription ]  = useState("");
  const [ active_time,    setActiveTime  ]  = useState("");
  const [ total_time,     setTotalTime   ]  = useState("");
  const [ directions,     setDirections ]   = useState("");

  const [ usedMethods,  setUsedMethods ] = useState<Methods>(
    methods.reduce((acc: {[key: number]: boolean}, curr) => {
      acc[curr.method_id] = false;
      return acc;
    }, {})
  );
  const [ equipmentRows,  setEquipmentRows ]  = useState<EquipmentRow[]>([pristineEquipmentRow]);
  const [ ingredientRows, setIngredientRows ] = useState<IngredientRow[]>([pristineIngredientRow]);
  const [ subrecipeRows,  setSubrecipeRows ]  = useState<SubrecipeRow[]>([]);

  const [ previousRecipeImageFilename, setPreviousRecipeImageFilename ] = useState("");
  const [ recipeMediumImage,   setRecipeMediumImage ]   = useState<File | null>(null);
  const [ recipeThumbImage,    setRecipeThumbImage ]    = useState<File | null>(null);
  const [ recipeTinyImage,     setRecipeTinyImage ]     = useState<File | null>(null);
  const [ recipeImageCaption,  setRecipeImageCaption ]  = useState("");

  const [ previousEquipmentImageFilename, setPreviousEquipmentImageFilename ] = useState("");
  const [ equipmentMediumImage,   setEquipmentMediumImage ]   = useState<File | null>(null);
  const [ equipmentImageCaption,  setEquipmentImageCaption ]  = useState("");

  const [ previousIngredientsImageFilename, setPreviousIngredientsImageFilename ] = useState("");
  const [ ingredientsMediumImage,   setIngredientsMediumImage ]   = useState<File | null>(null);
  const [ ingredientsImageCaption,  setIngredientsImageCaption ]  = useState("");

  const [ previousCookingImageFilename, setPreviousCookingImageFilename ] = useState("");
  const [ cookingMediumImage,   setCookingMediumImage ]   = useState<File | null>(null);
  const [ cookingImageCaption,  setCookingImageCaption ]  = useState("");

  const recipeImageRef = useRef<HTMLImageElement>();
  const [ recipeImage,              setRecipeImage ]              = useState<Image>(null);
  const [ recipeCrop,               setRecipeCrop ]               = useState<Crop>(initialCrop);
  const [ recipeMediumImagePreview, setRecipeMediumImagePreview ] = useState("");
  const [ recipeThumbImagePreview,  setRecipeThumbImagePreview ]  = useState("");
  const [ recipeTinyImagePreview,   setRecipeTinyImagePreview ]   = useState("");

  const equipmentImageRef = useRef<HTMLImageElement>();
  const [ equipmentImage,              setEquipmentImage ]              = useState<Image>(null);
  const [ equipmentCrop,               setEquipmentCrop ]               = useState<Crop>(initialCrop);
  const [ equipmentMediumImagePreview, setEquipmentMediumImagePreview ] = useState("");

  const ingredientsImageRef = useRef<HTMLImageElement>();
  const [ ingredientsImage,              setIngredientsImage ]              = useState<Image>(null);
  const [ ingredientsCrop,               setIngredientsCrop ]               = useState<Crop>(initialCrop);
  const [ ingredientsMediumImagePreview, setIngredientsMediumImagePreview ] = useState("");

  const cookingImageRef = useRef<HTMLImageElement>();
  const [ cookingImage,              setCookingImage ]              = useState<Image>(null);
  const [ cookingCrop,               setCookingCrop ]               = useState<Crop>(initialCrop);
  const [ cookingMediumImagePreview, setCookingMediumImagePreview ] = useState("");

  useEffect(() => {
    let mounted = true;

    async function getExistingRecipeToEdit() {
      if (!recipe_id) {
        router.push(`/dashboard`);
        return;
      }

      setLoading(true);
      window.scrollTo(0, 0);

      const res = await axios.get(
        `${endpoint}/users/${authname}/${ownership}-recipes/${recipe_id}/edit`,
        {withCredentials: true}
      );
      
      const recipe: ExistingRecipeToEdit = res.data;
      if (!recipe) {
        router.push(`/dashboard`);
        return;
      }

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

      setPreviousRecipeImageFilename(recipe.recipe_image.image_filename);
      setPreviousEquipmentImageFilename(recipe.equipment_image.image_filename);
      setPreviousIngredientsImageFilename(recipe.ingredients_image.image_filename);
      setPreviousCookingImageFilename(recipe.cooking_image.image_filename);

      setRecipeImageCaption(recipe.recipe_image.caption);
      setEquipmentImageCaption(recipe.equipment_image.caption);
      setIngredientsImageCaption(recipe.ingredients_image.caption);
      setCookingImageCaption(recipe.cooking_image.caption);

      setLoading(false);
    }

    if (mounted) {
      if (!authname) {
        router.push(`/404`);
        return;
      }

      if (recipe_id) {
        getExistingRecipeToEdit();
      }
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
      const res = await axios.get(`${endpoint}/users/${authname}/private-recipes`, {withCredentials: true});
      setMyPrivateRecipes(res.data);
    }
  };

  const changeRecipeType  = (e: ChangeEvent<HTMLSelectElement>) => setRecipeTypeId(Number(e.target.value));
  const changeCuisine     = (e: ChangeEvent<HTMLSelectElement>) => setCuisineId(Number(e.target.value));
  const changeTitle       = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const changeDescription = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
  const changeActiveTime  = (e: ChangeEvent<HTMLInputElement>) => setActiveTime(e.target.value);
  const changeTotalTime   = (e: ChangeEvent<HTMLInputElement>) => setTotalTime(e.target.value);
  const changeDirections  = (e: ChangeEvent<HTMLTextAreaElement>) => setDirections(e.target.value);

  const changeRecipeImageCaption      = (e: ChangeEvent<HTMLInputElement>) => setRecipeImageCaption(e.target.value);
  const changeEquipmentImageCaption   = (e: ChangeEvent<HTMLInputElement>) => setEquipmentImageCaption(e.target.value);
  const changeIngredientsImageCaption = (e: ChangeEvent<HTMLInputElement>) => setIngredientsImageCaption(e.target.value);
  const changeCookingImageCaption     = (e: ChangeEvent<HTMLInputElement>) => setCookingImageCaption(e.target.value);

  const changeMethods = (e: SyntheticEvent) => {
    const id = (e.target as HTMLInputElement).id;
    setUsedMethods(prevState => ({...prevState, [id]: !prevState[parseInt(id)]}));
  };

  const changeEquipmentRow = (e: SyntheticEvent, rowKey: string) => {
    const newRows =    Array.from(equipmentRows);
    const elToUpdate = newRows.findIndex(el => el.key === rowKey);
    const name =       (e.target as HTMLInputElement).name;
    const value =      (e.target as HTMLInputElement).value as string;
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

  const addEquipmentRow  = () =>
    setEquipmentRows([...equipmentRows, pristineEquipmentRow]);

  const addIngredientRow = () =>
    setIngredientRows([...ingredientRows, pristineIngredientRow]);

  const addSubrecipeRow  = () =>
    setSubrecipeRows([...subrecipeRows, pristineSubrecipeRow]);

  const removeEquipmentRow = (rowKey: string) =>
    setEquipmentRows(equipmentRows.filter(row => row.key !== rowKey));

  const removeIngredientRow = (rowKey: string) =>
    setIngredientRows(ingredientRows.filter(row => row.key !== rowKey));

  const removeSubrecipeRow = (rowKey: string) =>
    setSubrecipeRows(subrecipeRows.filter(row => row.key !== rowKey));
  
  const makeCookingCrops = async (crop: Crop) => {
    if (!cookingImageRef.current) return;
    const full = await getCroppedImage(560, 346, cookingImageRef.current, crop);
    if (!full) return;
    setCookingMediumImagePreview(full.preview);
    setCookingMediumImage(full.final);
  };

  const makeEquipmentCrops = async (crop: Crop) => {
    if (!equipmentImageRef.current) return;
    const full = await getCroppedImage(560, 346, equipmentImageRef.current, crop);  // was 280, 172
    if (!full) return;
    setEquipmentMediumImagePreview(full.preview);
    setEquipmentMediumImage(full.final);
  };

  const makeIngredientsCrops = async (crop: Crop) => {
    if (!ingredientsImageRef.current) return;
    const full = await getCroppedImage(560, 346, ingredientsImageRef.current, crop);
    if (!full) return;
    setIngredientsMediumImagePreview(full.preview);
    setIngredientsMediumImage(full.final);
  };

  const makeRecipeCrops = async (crop: Crop) => {
    if (!recipeImageRef.current) return;
    const full =  await getCroppedImage(560, 346, recipeImageRef.current, crop);
    const thumb = await getCroppedImage(100, 62,  recipeImageRef.current, crop);
    const tiny =  await getCroppedImage(28,  18,  recipeImageRef.current, crop);
    if (!full || !thumb || !tiny) return;
    setRecipeMediumImagePreview(full.preview);
    setRecipeThumbImagePreview(thumb.preview);
    setRecipeTinyImagePreview(tiny.preview);
    setRecipeMediumImage(full.final);
    setRecipeThumbImage(thumb.final);
    setRecipeTinyImage(tiny.final);
  };

  const onCookingCropChange =     (crop: PixelCrop) => setCookingCrop(crop);
  const onEquipmentCropChange =   (crop: PixelCrop) => setEquipmentCrop(crop);
  const onIngredientsCropChange = (crop: PixelCrop) => setIngredientsCrop(crop);
  const onRecipeCropChange =      (crop: PixelCrop) => setRecipeCrop(crop);

  // remove these ???
  const onCookingCropComplete =     (crop: Crop) => makeCookingCrops(crop);
  const onEquipmentCropComplete =   (crop: Crop) => makeEquipmentCrops(crop);
  const onIngredientsCropComplete = (crop: Crop) => makeIngredientsCrops(crop);
  const onRecipeCropComplete =      (crop: Crop) => makeRecipeCrops(crop);

  const onCookingImageLoaded =     (e: SyntheticImageEvent) => cookingImageRef.current = e.currentTarget;
  const onEquipmentImageLoaded =   (e: SyntheticImageEvent) => equipmentImageRef.current = e.currentTarget;
  const onIngredientsImageLoaded = (e: SyntheticImageEvent) => ingredientsImageRef.current = e.currentTarget;
  const onRecipeImageLoaded =      (e: SyntheticImageEvent) => recipeImageRef.current = e.currentTarget;
  
  const onSelectFile = (e: ChangeEvent, type: string) => {
    const target = e.target as HTMLInputElement;
    if (!(target.files && target.files.length > 0)) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (type === "cooking")     setCookingImage(reader.result);
      if (type === "equipment")   setEquipmentImage(reader.result);
      if (type === "ingredients") setIngredientsImage(reader.result);
      if (type === "recipe")      setRecipeImage(reader.result);
    });
    reader.readAsDataURL(target.files[0] as Blob);
  };

  const cancelCookingImage = () => {
    setCookingMediumImagePreview("");
    setCookingImage(null);
    setCookingMediumImage(null);
  };

  const cancelEquipmentImage = () => {
    setEquipmentMediumImagePreview("");
    setEquipmentImage(null);
    setEquipmentMediumImage(null);
  };

  const cancelIngredientsImage = () => {
    setIngredientsMediumImagePreview("");
    setIngredientsImage(null);
    setIngredientsMediumImage(null);
  };

  const cancelRecipeImage = () => {
    setRecipeMediumImagePreview("");
    setRecipeThumbImagePreview("");
    setRecipeTinyImagePreview("");
    setRecipeImage(null);
    setRecipeMediumImage(null);
    setRecipeThumbImage(null);
    setRecipeTinyImage(null);
  };

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

  const submit = async () => {
    setLoading(true);
    window.scrollTo(0, 0);

    if (!isValidRecipeUpload({
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
      setFeedback
    })) return;

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
      // TO DO: how can they reset image_filename to "default"? Do they even need this ability?
      recipe_image: {
        image_filename: recipe_id ? previousRecipeImageFilename : "default",
        caption:        recipeImageCaption,
        type:           1,
        order:          1,
        medium:         recipeMediumImage,
        thumb:          recipeThumbImage,
        tiny:           recipeTinyImage
      },
      equipment_image: {
        image_filename: recipe_id ? previousEquipmentImageFilename : "default",
        caption:        equipmentImageCaption,
        type:           2,
        order:          1,
        medium:         equipmentMediumImage
      },
      ingredients_image: {
        image_filename: recipe_id ? previousIngredientsImageFilename : "default",
        caption:        ingredientsImageCaption,
        type:           3,
        order:          1,
        medium:         ingredientsMediumImage
      },
      cooking_image: {
        image_filename: recipe_id ? previousCookingImageFilename : "default",
        caption:        cookingImageCaption,
        type:           4,
        order:          1,
        medium:         cookingMediumImage
      }
    };

    // TO DO: AUTHORIZE ON BACK END, MAKE SURE THEY ACTUALLY OWN THE RECIPE
    // BEFORE ENTERING ANYTHING INTO MySQL / AWS S3!!!

    // upload any images to AWS S3, then insert info into MySQL
    const {
      recipe_image,
      equipment_image,
      ingredients_image,
      cooking_image
    } = recipe_upload;
    try {
      if (recipe_image.medium && recipe_image.thumb && recipe_image.tiny) {
        const { data } = await axios.post(
          `${endpoint}/signed-url`,
          {subfolder: `${ownership}/recipe/`},
          {withCredentials: true}
        );
        await uploadImageToAWSS3(data.mediumSignature, recipe_image.medium);
        await uploadImageToAWSS3(data.thumbSignature, recipe_image.thumb);
        await uploadImageToAWSS3(data.tinySignature, recipe_image.tiny);
        recipe_image.image_filename = data.filename;
        recipe_image.medium = null;
        recipe_image.thumb  = null;
        recipe_image.tiny   = null;
      }
    
      if (equipment_image.medium) {
        const { data } = await axios.post(
          `${endpoint}/signed-url`,
          {subfolder: `${ownership}/recipe-equipment/`},
          {withCredentials: true}
        );
        await uploadImageToAWSS3(data.mediumSignature, equipment_image.medium);
        equipment_image.image_filename = data.filename;
        equipment_image.medium = null;
      }
    
      if (ingredients_image.medium) {
        const { data } = await axios.post(
          `${endpoint}/signed-url`,
          {subfolder: `${ownership}/recipe-ingredients/`},
          {withCredentials: true}
        );
        await uploadImageToAWSS3(data.mediumSignature, ingredients_image.medium);
        ingredients_image.image_filename = data.filename;
        ingredients_image.medium = null;
      }
    
      if (cooking_image.medium) {
        const { data } = await axios.post(
          `${endpoint}/signed-url`,
          {subfolder: `${ownership}/recipe-cooking/`},
          {withCredentials: true}
        );
        await uploadImageToAWSS3(data.mediumSignature, cooking_image.medium);
        cooking_image.image_filename = data.filename;
        cooking_image.medium = null;
      }

      const editing = recipe_id !== null;
      if (editing) {
        const res = await axios.patch(
          `${endpoint}/users/${authname}/${ownership}-recipes/${recipe_id}`,
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
          `${endpoint}/users/${authname}/${ownership}-recipes/${recipe_id}`,
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

  return (
    <div className="one-col new-recipe">
      {
        ownership === "private"
        && recipe_id
        ? <h1>Update Private Recipe</h1>
        : <h1>Create Private Recipe</h1>
      }
      {
        ownership === "public"
        && recipe_id
        ? <h1>Update Public Recipe</h1>
        : <h1>Create Public Recipe</h1>
      }

      <p className="feedback">{feedback}</p>

      <h2>Recipe Type</h2>
      <select
        id="recipe_type_id"
        name="recipeType"
        onChange={changeRecipeType}
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
        onChange={changeCuisine}
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
        onChange={changeTitle}
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
        onChange={changeDescription}
        type="time"
        value={description}
      />

      <h2>Active Time</h2>
      <input
        className="time"
        name="active_time"
        onChange={changeActiveTime}
        type="time"
        value={active_time}
      />

      <h2>Total Time</h2>
      <input
        className="time"
        name="total_time"
        onChange={changeTotalTime}
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
              onChange={e => changeMethods(e)}
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
                onChange={(e) => changeEquipmentRow(e, key)}
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
                onChange={(e) => changeEquipmentRow(e, key)}
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
                onChange={(e) => changeEquipmentRow(e, key)}
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
                onClick={() => removeEquipmentRow(key)}
              >Remove</button>
            </div>
          ))}
        </div>

        <button className="--add-row" onClick={addEquipmentRow}>
          Add Equipment
        </button>
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
                onChange={(e) => changeIngredientRow(e, key)}
                step="any"
                type="number"
                value={amount ?? ""}
                placeholder='Enter amount (optional)'
              />

              <label>Unit:</label>
              <select
                name="unit"
                onChange={(e) => changeIngredientRow(e, key)}
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
                onChange={(e) => changeIngredientRow(e, key)}
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
                onChange={(e) => changeIngredientRow(e, key)}
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
                onClick={() => removeIngredientRow(key)}
              >Remove</button>
            </div>
          ))}
        </div>

        <button className="--add-row" onClick={addIngredientRow}>
          Add Ingredient
        </button>
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
                onChange={(e) => changeSubrecipeRow(e, s.key)}
                step="any"
                type="number"
                value={s.amount ?? ""}
                placeholder='Enter amount (optional)'
              />
              
              <label>Unit:</label>
              <select
                name="unit"
                onChange={(e) => changeSubrecipeRow(e, s.key)}
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
                onChange={(e) => changeSubrecipeRow(e, s.key)}
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
                onChange={(e) => changeSubrecipeRow(e, s.key)}
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
                onClick={() => removeSubrecipeRow(s.key)}
              >Remove</button>
            </div>
          ))}
        </div>

        <button className="--add-row" onClick={addSubrecipeRow}>
          Add Subrecipe
        </button>
      </div>

      <h2>Directions</h2>
      <textarea
        className="directions"
        id="recipe_directions"
        name="directions"
        onChange={changeDirections}
        value={directions}
      />

      <div className="new-recipe-images">
        <div className="recipe-image">
          <h2>Image of Finished Recipe</h2>
  
          {!recipeImage && (
            <div>
              {
                !recipe_id
                ? <img src={`${url}/default`} />
                : previousRecipeImageFilename && <img src={`${url}/${previousRecipeImageFilename}`} />
              }

              <h4>Change</h4>
              <input
                accept="image/*"
                name="image-input"
                onChange={(e) => onSelectFile(e, "recipe")}
                type="file"
              />
            </div>
          )}
  
          {recipeImage && (
            <div>
              <ReactCrop
                crop={recipeCrop}
                onChange={onRecipeCropChange}
                onComplete={onRecipeCropComplete}
                {...commonReactCropProps}
              >
                <img onLoad={onRecipeImageLoaded} src={recipeImage as string} />
              </ReactCrop>
  
              <ToolTip />
  
              <div className="crops">
                <div className="crop-full-outer">
                  <span>Full Size: </span>
                  <img className="crop-full" src={recipeMediumImagePreview} />
                </div>

                <div className="crop-thumb-outer">
                  <span>Thumb Size: </span>
                  <img className="crop-thumb" src={recipeThumbImagePreview} />
                </div>

                <div className="crop-tiny-outer">
                  <span>Tiny Size: </span>
                  <img className="crop-tiny" src={recipeTinyImagePreview} />
                </div>
              </div>

              <h4>Caption:</h4>
              <input
                className="caption"
                max={150}
                min={2}
                name="caption"
                onChange={changeRecipeImageCaption}
                type="text"
                value={recipeImageCaption}
              />
  
              <button
                className="image-cancel-button"
                disabled={loading}
                onClick={cancelRecipeImage}
              >Cancel</button>
            </div>
          )}
        </div>

        <div className="equipment-image">
          <h2>Image of All Equipment</h2>
  
          {!equipmentImage && (
            <div>
              {
                !recipe_id
                ? <img src={`${url}/nobsc-recipe-default`} />
                : previousEquipmentImageFilename && <img src={`${url}-equipment/${previousEquipmentImageFilename}`} />
              }

              <h4>Change</h4>
              <input
                accept="image/*"
                name="equipment-image-input"
                onChange={(e) => onSelectFile(e, "equipment")}
                type="file"
              />
            </div>
          )}
  
          {equipmentImage && (
            <div>
              <ReactCrop
                crop={equipmentCrop}
                onChange={onEquipmentCropChange}
                onComplete={onEquipmentCropComplete}
                {...commonReactCropProps}
              >
                <img onLoad={onEquipmentImageLoaded} src={equipmentImage as string} />
              </ReactCrop>
              
              <ToolTip />
  
              <div className="crops">
                <div className="crop-full-outer">
                  <span>Full Size: </span>
                  <img className="crop-full" src={equipmentMediumImagePreview} />
                </div>
              </div>

              <h4>Caption:</h4>
              <input
                className="caption"
                max={150}
                min={2}
                name="caption"
                onChange={changeEquipmentImageCaption}
                type="text"
                value={equipmentImageCaption}
              />
  
              <button
                className="image-cancel-button"
                disabled={loading}
                onClick={cancelEquipmentImage}
              >Cancel</button>
            </div>
          )}
        </div>

        <div className="ingredients-image">
          <h2>Image of All Ingredients</h2>
  
          {!ingredientsImage && (
            <div>
              {
                !recipe_id
                ? <img src={`${url}/nobsc-recipe-default`} />
                : previousIngredientsImageFilename && <img src={`${url}-ingredients/${previousIngredientsImageFilename}`} />
              }

              <h4>Change</h4>
              <input
                accept="image/*"
                name="ingredients-image-input"
                onChange={(e) => onSelectFile(e, "ingredients")}
                type="file"
              />
            </div>
          )}
  
          {ingredientsImage && (
            <div>
              <ReactCrop
                crop={ingredientsCrop}
                onChange={onIngredientsCropChange}
                onComplete={onIngredientsCropComplete}
                {...commonReactCropProps}
              >
                <img onLoad={onIngredientsImageLoaded} src={ingredientsImage as string} />
              </ReactCrop>
              
              <ToolTip />
  
              <div className="crops">
                <div className="crop-full-outer">
                  <span>Full Size: </span>
                  <img className="crop-full" src={ingredientsMediumImagePreview} />
                </div>
              </div>

              <h4>Caption:</h4>
              <input
                className="caption"
                max={150}
                min={2}
                name="caption"
                onChange={changeIngredientsImageCaption}
                type="text"
                value={ingredientsImageCaption}
              />
  
              <button
                className="image-cancel-button"
                disabled={loading}
                onClick={cancelIngredientsImage}
              >Cancel</button>
            </div>
          )}
        </div>

        <div className="cooking-image">
          <h2>Image of Cooking In Action</h2>
  
          {!cookingImage && (
            <div>
              {
                !recipe_id
                ? <img src={`${url}/nobsc-recipe-default`} />
                : previousCookingImageFilename && <img src={`${url}-cooking/${previousCookingImageFilename}`} />
              }
  
              <h4>Change</h4>
              <input
                accept="image/*"
                name="cooking-image-input"
                onChange={(e) => onSelectFile(e, "cooking")}
                type="file"
              />
            </div>
          )}
  
          {cookingImage && (
            <div>
              <ReactCrop
                crop={cookingCrop}
                onChange={onCookingCropChange}
                onComplete={onCookingCropComplete}
                {...commonReactCropProps}
              >
                <img onLoad={onCookingImageLoaded} src={cookingImage as string} />
              </ReactCrop>
              
              <ToolTip />
  
              <div className="crops">
                <div className="crop-full-outer">
                  <span>Full Size: </span>
                  <img className="crop-full" src={cookingMediumImagePreview} />
                </div>
              </div>

              <h4>Caption:</h4>
              <input
                className="caption"
                max={150}
                min={2}
                name="caption"
                onChange={changeCookingImageCaption}
                type="text"
                value={cookingImageCaption}
              />
  
              <button
                className="image-cancel-button"
                disabled={loading}
                onClick={cancelCookingImage}
              >Cancel</button>
            </div>
          )}
        </div>
      </div>

      <div className="finish">
        <Link className="cancel-button" href={`/dashboard`}>
          Cancel
        </Link>

        <LoaderButton
          className="submit-button"
          id="user_submit_recipe_button"
          isLoading={loading}
          loadingText="Submitting Recipe..."
          name="submit"
          onClick={submit}
          text="Submit Recipe"
        />
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

  // EXTREMELY IMPORTANT:
  // Note that:
  // my_private_equipment, my_private_ingredients, and my_private_recipes are
  // only allowed in a recipe of "private" ownership
  //
  // my_public_recipes, my_favorite_recipes, and my_saved_recipes are
  // only allowed in a recipe of "private" or "public" ownership
  //
  // This MUST also be checked on the backend server!!!

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

const url = "https://s3.amazonaws.com/nobsc-user-recipe";

type SyntheticEvent =      React.SyntheticEvent<EventTarget>;
type SyntheticImageEvent = React.SyntheticEvent<HTMLImageElement>;

type Image = string | ArrayBuffer | null;

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

export function isValidRecipeUpload({
  recipe_type_id,
  cuisine_id,
  title,
  description,
  active_time,
  total_time,
  directions,
  required_methods,
  required_equipment,
  required_ingredients,
  required_subrecipes,
  setFeedback
}: IsValidRecipeUploadParams): boolean {
  function validateAndFormatTime(time: string) {
    // validate
    const [ hours, minutes ] = time.split(':');
  
    const parsedHours = hours ? parseInt(hours): 0;
    const parsedMinutes = minutes ? parseInt(minutes) : 0;
  
    if (isNaN(parsedHours) || isNaN(parsedMinutes)) {
      return false;
    }
  
    if (parsedHours < 0 || parsedHours > 23 || parsedMinutes < 0 || parsedMinutes > 59) {
      return false;
    }
  
    // format
    // We add leading zeroes if needed (0 becomes 00, 4 becomes 04)
    const formattedHours   = parsedHours.toString().padStart(2, '0');
    const formattedMinutes = parsedMinutes.toString().padStart(2, '0');

    time = `${formattedHours}:${formattedMinutes}`;
  
    return true;
  }

  function feedback(message: string) {
    window.scrollTo(0, 0);
    setFeedback(message);
    setTimeout(() => setFeedback(""), 3000);
    return false;
  }

  const validRecipeTypeId = recipe_type_id !== 0;
  if (!validRecipeTypeId) return feedback("Select recipe type.");

  const validCuisineId = cuisine_id !== 0;
  if (!validCuisineId) return feedback("Select cuisine.");

  const validTitle = title.trim() !== "";
  if (!validTitle) return feedback("Enter title.");

  const validDescription = description.trim() !== "";
  if (!validDescription) return feedback("Enter description.");

  const validActiveTime = validateAndFormatTime(active_time);
  if (!validActiveTime) return feedback('Invalid time.');

  const validTotalTime = validateAndFormatTime(total_time);
  if (!validTotalTime) return feedback('Invalid time.');

  const validDirections = directions.trim() !== "";
  if (!validDirections) return feedback("Enter directions.");

  const validMethods = required_methods.length < 1;
  if (!validMethods) return feedback("Select required method(s).");

  let validEquipment = true;
  if (required_equipment.length) {
    required_equipment.map(r => {
      if (!r.equipment_id) {
        validEquipment = false;
      }
    });
    
    if (!validEquipment) return feedback("Review required equipment.");
  }

  let validIngredients = true;
  if (required_ingredients.length) {
    required_ingredients.map(r => {
      if (!r.ingredient_id) {
        validIngredients = false;
      }
    });

    if (!validIngredients) return feedback("Review required ingredients.");
  }

  let validSubrecipes = true;
  if (required_subrecipes.length) {
    required_subrecipes.map(r => {
      if (!r.subrecipe_id) {
        validSubrecipes = false;
      }
    });

    if (!validSubrecipes) return feedback("Review required subrecipes.");
  }

  return true;
}

type IsValidRecipeUploadParams = {
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
  setFeedback:          (feedback: string) => void;
};

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

type ImageInfo = {
  image_filename: string;
  caption:        string;
  type:           number;
  order:          number;
};

type ImageUpload = ImageInfo & {
  medium: File | null;
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
  recipe_image:         ImageUpload & {
    thumb: File | null;
    tiny:  File | null;
  },
  equipment_image:      ImageUpload,
  ingredients_image:    ImageUpload,
  cooking_image:        ImageUpload
};

export type RecipeUpdateUpload = RecipeUpload & {
  recipe_id: string;
};

async function uploadImageToAWSS3(signature: any, image: any) {
  await axios.put(signature, image, {headers: {'Content-Type': 'image/jpeg'}});
}
