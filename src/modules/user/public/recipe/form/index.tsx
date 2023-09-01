import axios                           from 'axios';
import Link                            from 'next/link';
import { useSearchParams, useRouter }  from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop, PixelCrop }  from 'react-image-crop';
import { useDispatch }                 from 'react-redux';
import { v4 as uuid }                  from 'uuid';
import 'react-image-crop/dist/ReactCrop.css';

import { endpoint }                               from '../../../../../config/api';
import { useTypedSelector as useSelector }        from '../../../../../redux';
import {
  ToolTip,
  pristineEquipmentRow,
  pristineIngredientRow,
  pristineSubrecipeRow,
  initialCrop,
  commonReactCropProps,
  ExistingRecipeToEdit,
  Methods,
  EquipmentRow,
  IngredientRow,
  SubrecipeRow,
  isValidRecipeUpload
} from '../../../../recipe/form';
import { LoaderButton }                           from '../../../../shared/LoaderButton';
import { getCroppedImage }                        from '../../../../shared/getCroppedImage';
import { createPublicRecipe, updatePublicRecipe } from '../state';

export default function UserPublicRecipeForm() {
  const router = useRouter();

  const params = useSearchParams();
  const recipe_id = params.get('recipe_id');

  const dispatch = useDispatch();

  const units            = useSelector(state => state.data.units);
  const equipment        = useSelector(state => state.data.equipment);
  const ingredient_types = useSelector(state => state.data.ingredient_types);
  const ingredients      = useSelector(state => state.data.ingredients);
  const recipe_types     = useSelector(state => state.data.recipe_types);
  const cuisines         = useSelector(state => state.data.cuisines);
  const methods          = useSelector(state => state.data.methods);
  const recipes          = useSelector(state => state.data.recipes);

  const my_favorite_recipes = useSelector(state => state.userData.my_favorite_recipes);
  const my_saved_recipes    = useSelector(state => state.userData.my_saved_recipes);
  const my_public_recipes   = useSelector(state => state.userData.my_public_recipes);

  const authname = useSelector(state => state.authentication.authname);
  const message  = useSelector(state => state.system.message);

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ]  = useState(false);

  const [ recipe_type_id, setRecipeTypeId ] = useState(0);
  const [ cuisine_id,     setCuisineId ]    = useState(0);
  const [ title,          setTitle ]        = useState("");
  const [ description,    setDescription ]  = useState("");
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

  const [ previousRecipeImage, setPreviousRecipeImage ] = useState("default");
  const [ recipeMediumImage,   setRecipeMediumImage ]   = useState<File | null>(null);
  const [ recipeThumbImage,    setRecipeThumbImage ]    = useState<File | null>(null);
  const [ recipeTinyImage,     setRecipeTinyImage ]     = useState<File | null>(null);
  const [ recipeImageCaption,  setRecipeImageCaption ]  = useState("");

  const [ previousEquipmentImage, setPreviousEquipmentImage ] = useState("default");
  const [ equipmentMediumImage,   setEquipmentMediumImage ]   = useState<File | null>(null);
  const [ equipmentImageCaption,  setEquipmentImageCaption ]  = useState("");

  const [ previousIngredientsImage, setPreviousIngredientsImage ] = useState("default");
  const [ ingredientsMediumImage,   setIngredientsMediumImage ]   = useState<File | null>(null);
  const [ ingredientsImageCaption,  setIngredientsImageCaption ]  = useState("");

  const [ previousCookingImage, setPreviousCookingImage ] = useState("default");
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
        router.push(`/${authname}/private/dashboard`);
        return;
      }

      setLoading(true);
      window.scrollTo(0, 0);

      const res = await axios.post(
        `${endpoint}/user/public/recipe/edit/`,
        {recipe_id},
        {withCredentials: true}
      );
      
      const recipe: ExistingRecipeToEdit = res.data.recipe;
      if (!recipe) {
        router.push(`/${authname}/private/dashboard`);
        return;
      }

      const {
        recipe_type_id,
        cuisine_id,
        title,
        description,
        directions,
        required_equipment,
        required_ingredients,
        required_methods,
        required_subrecipes,
        recipe_image,
        equipment_image,
        ingredients_image,
        cooking_image
      } = recipe;

      setRecipeTypeId(recipe_type_id);
      setCuisineId(cuisine_id);
      setTitle(title);
      setDescription(description);
      setDirections(directions);
      setUsedMethods(prevState => {
        const nextState = {...prevState};
        required_methods?.map(({ method_id }) => {
          nextState[method_id] = true;
        });
        return nextState;
      });
      setEquipmentRows(required_equipment.map(r => ({...r, key: uuid()})));
      setIngredientRows(required_ingredients.map(r => ({...r, key: uuid()})));
      setSubrecipeRows(required_subrecipes.map(r => ({...r, key: uuid()})));
      setPreviousRecipeImage(recipe_image.image_url);
      setPreviousEquipmentImage(equipment_image.image_url);
      setPreviousIngredientsImage(ingredients_image.image_url);
      setPreviousCookingImage(cooking_image.image_url);
      setRecipeImageCaption(recipe_image.caption);
      setEquipmentImageCaption(equipment_image.caption);
      setIngredientsImageCaption(ingredients_image.caption);
      setCookingImageCaption(cooking_image.caption);

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

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      if (message !== "") window.scrollTo(0, 0);

      setFeedback(message);

      if (message === "Recipe created." || message === "Recipe updated.") {
        setTimeout(() => router.push(`/${authname}/private/dashboard`), 3000);
      }

      setLoading(false);  // move ?
    }

    return () => {
      isSubscribed = false;
    };
  }, [message]);

  const changeRecipeType  = (e: SyntheticEvent) => setRecipeTypeId(Number((e.target as HTMLInputElement).value));
  const changeCuisine     = (e: SyntheticEvent) => setCuisineId(Number((e.target as HTMLInputElement).value));
  const changeTitle       = (e: SyntheticEvent) => setTitle((e.target as HTMLInputElement).value);
  const changeDescription = (e: SyntheticEvent) => setDescription((e.target as HTMLInputElement).value);
  const changeDirections  = (e: SyntheticEvent) => setDirections((e.target as HTMLInputElement).value);

  const changeRecipeImageCaption = (e: SyntheticEvent) =>
    setRecipeImageCaption((e.target as HTMLInputElement).value);

  const changeEquipmentImageCaption = (e: SyntheticEvent) =>
    setEquipmentImageCaption((e.target as HTMLInputElement).value);

  const changeIngredientsImageCaption = (e: SyntheticEvent) =>
    setIngredientsImageCaption((e.target as HTMLInputElement).value);

  const changeCookingImageCaption = (e: SyntheticEvent) =>
    setCookingImageCaption((e.target as HTMLInputElement).value);

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
  
  // IMPORTANT: note that my_private_equipment are NOT allowed in a public recipe
  // This must also be checked on the backend server
  const availableEquipment = equipment;

  // IMPORTANT: note that my_private_ingredients are NOT allowed in a public recipe
  // This must also be checked on the backend server
  const availableIngredients = ingredients;

  // IMPORTANT: note that my_private_recipes are NOT allowed in a public recipe
  // This must also be checked on the backend server
  const availableRecipes = [
    ...recipes,
    ...(my_favorite_recipes.length ? my_favorite_recipes : []),  // TO DO: make sure they can't be the author
    ...(my_saved_recipes.length    ? my_saved_recipes    : []),  // TO DO: make sure they can't be the author
    ...(
      my_public_recipes.length
      ? (
        recipe_id
        ? my_public_recipes.filter(r => r.recipe_id != recipe_id)
        : my_public_recipes
      )
      : []
    )
  ];

  /*

  Images

  */
  
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

  /*

  Submit

  */

  const submit = () => {
    const getCheckedMethods = () => {
      return Object.keys(usedMethods)
        .filter(key => usedMethods[parseInt(key)] === true)
        .map(key => ({method_id: parseInt(key)}));
    };

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

    if (!isValidRecipeUpload({
      recipe_type_id,
      cuisine_id,
      title,
      description,
      directions,
      required_methods:     getCheckedMethods(),
      required_equipment:   getRequiredEquipment(),
      required_ingredients: getRequiredIngredients(),
      required_subrecipes:  getRequiredSubrecipes(),
      setFeedback
    })) return;

    const recipeInfo = {
      recipe_type_id,
      cuisine_id,
      title,
      description,
      directions,
      required_methods:     getCheckedMethods(),
      required_equipment:   getRequiredEquipment(),
      required_ingredients: getRequiredIngredients(),
      required_subrecipes:  getRequiredSubrecipes(),
      recipe_image: {
        name:    "default",
        caption: recipeImageCaption,
        medium:  recipeMediumImage,
        thumb:   recipeThumbImage,
        tiny:    recipeTinyImage
      },
      equipment_image: {
        name:    "default",
        caption: equipmentImageCaption,
        medium:  equipmentMediumImage
      },
      ingredients_image: {
        name:    "default",
        caption: ingredientsImageCaption,
        medium:  ingredientsMediumImage
      },
      cooking_image: {
        name:    "default",
        caption: cookingImageCaption,
        medium:  cookingMediumImage
      }
    };

    setLoading(true);

    if (recipe_id) {
      // TO DO: AUTHORIZE ON BACK END, MAKE SURE THEY ACTUALLY OWN THE RECIPE
      // BEFORE ENTERING ANYTHING INTO MySQL / AWS S3!!!
      const recipeUpdateInfo = {
        ...recipeInfo,
        recipe_id,
        previousRecipeImage,
        previousEquipmentImage,
        previousIngredientsImage,
        previousCookingImage
      };

      dispatch(updatePublicRecipe(recipeUpdateInfo));
    } else {
      dispatch(createPublicRecipe(recipeInfo));
    }
  };

  return (
    <div className="one-col new-recipe">
      <h1>Create/Update Public Recipe</h1>

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
        type="text"
        value={description}
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
                value={amount}
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
                  availableEquipment
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

        {/* TO DO: Add brand and variety */}
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
                value={amount}
                placeholder='Enter amount (optional)'
              />

              <label>Unit:</label>
              <select
                name="unit"
                onChange={(e) => changeIngredientRow(e, key)}
                value={unit_id}
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
                  availableIngredients
                    .filter(i => i.ingredient_type_id == ingredient_type_id)
                    .map((i, index) => (
                      <option key={index} value={i.ingredient_id}>
                        {i.ingredient_name}
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
                value={s.amount}
                placeholder='Enter amount (optional)'
              />
              
              <label>Unit:</label>
              <select
                name="unit"
                onChange={(e) => changeSubrecipeRow(e, s.key)}
                value={s.unit_id}
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
                  availableRecipes
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
                ? <img src={`${url}/nobsc-recipe-default`} />
                : previousRecipeImage && <img src={`${url}/${previousRecipeImage}`} />
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
                : previousEquipmentImage && <img src={`${url}-equipment/${previousEquipmentImage}`} />
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
                : previousIngredientsImage && <img src={`${url}-ingredients/${previousIngredientsImage}`} />
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
                : previousCookingImage && <img src={`${url}-cooking/${previousCookingImage}`} />
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
        <Link className="cancel-button" href={`/${authname}/private/dashboard`}>
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

const url = "https://s3.amazonaws.com/nobsc-user-recipe";

// TO DO: move types to one location

type ChangeEvent =         React.ChangeEvent<HTMLInputElement>;
type SyntheticEvent =      React.SyntheticEvent<EventTarget>;
type SyntheticImageEvent = React.SyntheticEvent<HTMLImageElement>;

type Image = string | ArrayBuffer | null;
