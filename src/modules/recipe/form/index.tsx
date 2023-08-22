import axios                           from 'axios';
import Link                            from 'next/link';
import { useSearchParams, useRouter }  from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop, PixelCrop }  from 'react-image-crop';
import { useDispatch }                 from 'react-redux';
import { v4 as uuid }                  from 'uuid';
import 'react-image-crop/dist/ReactCrop.css';

import { ExpandCollapse, LoaderButton }    from '../../components';
import { useTypedSelector as useSelector } from '../../store';
import { createPrivateRecipe, createPublicRecipe, updatePrivateRecipe, updatePublicRecipe } from '../../store/user/recipe/actions';
import type { RequiredMethod }             from '../../store/user/recipe/types';
import { endpoint }                        from '../../utils/api';
import { getCroppedImage }                 from '../../utils/getCroppedImage';
import { validRecipeInfo }                 from './validRecipeInfo';

// REMOVE THIS FILE?
// OR MOVE TO STAFF

export default function RecipeForm() {
  const router =    useRouter();
  const params =    useSearchParams();
  const ownership = params.get('ownership');  // TO DO: triple test
  const recipe_id =        params.get('recipe_id');
  // TO DO: change
  /*if (!id || !ownership) {
    router.push('/dashboard');
    return null;
  }*/

  const dispatch = useDispatch();

  const units =               useSelector(state => state.data.units);
  const equipment =           useSelector(state => state.data.equipment);
  const my_equipment =        useSelector(state => state.data.my_equipment);
  const ingredient_types =    useSelector(state => state.data.ingredient_types);
  const ingredients =         useSelector(state => state.data.ingredients);
  const my_ingredients =      useSelector(state => state.data.my_ingredients);
  const recipe_types =        useSelector(state => state.data.recipe_types);
  const cuisines =            useSelector(state => state.data.cuisines);
  const methods =             useSelector(state => state.data.methods);
  const recipes =             useSelector(state => state.data.recipes);
  const my_favorite_recipes = useSelector(state => state.data.my_favorite_recipes);
  const my_saved_recipes =    useSelector(state => state.data.my_saved_recipes);
  const my_private_recipes =  useSelector(state => state.data.my_private_recipes);
  const my_public_recipes =   useSelector(state => state.data.my_public_recipes);

  const authname =          useSelector(state => state.auth.authname);
  const message =           useSelector(state => state.user.message);

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ] =  useState(false);

  const [ editingId,    setEditingId ] =    useState<number|null>(null);

  const [ recipe_type_id, setRecipeTypeId ] = useState<number>(0);
  const [ cuisine_id,    setCuisineId ] =    useState<number>(0);
  const [ title,        setTitle ] =        useState("");
  const [ description,  setDescription ] =  useState("");
  const [ directions,   setDirections ] =   useState("");
  const [ usedMethods,  setUsedMethods ] =  useState<Methods>({
     1: false,  2: false,  3: false,  4: false,  5: false,  6: false,
     7: false,  8: false,  9: false, 10: false, 11: false, 12: false,
    13: false, 14: false, 15: false, 16: false, 17: false, 18: false,
    19: false, 20: false, 21: false, 22: false, 23: false, 24: false
  });
  const [ equipmentRows, setEquipmentRows ] =   useState<EquipmentRow[]>([
    {key: uuid(), amount: "", equipment_type_id: "", equipment_id: ""}
  ]);
  const [ ingredientRows, setIngredientRows ] = useState<IngredientRow[]>([
    {key: uuid(), amount: "", unit_id: "", ingredient_type_id: "", ingredient_id: ""}
  ]);
  const [ subrecipeRows, setSubrecipeRows ] =   useState<SubrecipeRow[]>([]);

  const initialCrop: Crop = {unit: 'px', x: 25, y: 25, width: 50, height: 50};  // TO DO: change to NOBSC images ratio

  const recipeImageRef = useRef<HTMLImageElement>();
  const [ recipePrevImage,  setRecipePrevImage ] =  useState("nobsc-recipe-default");
  const [ recipeImage,      setRecipeImage ] =      useState<IImage>(null);
  const [ recipeFullImage,  setRecipeFullImage ] =  useState<File | null>(null);
  const [ recipeThumbImage, setRecipeThumbImage ] = useState<File | null>(null);
  const [ recipeTinyImage,  setRecipeTinyImage ] =  useState<File | null>(null);
  const [ recipeCrop,       setRecipeCrop ] =       useState<Crop>(initialCrop);
  const [ recipeFullCrop,   setRecipeFullCrop ] =   useState("");
  const [ recipeThumbCrop,  setRecipeThumbCrop ] =  useState("");
  const [ recipeTinyCrop,   setRecipeTinyCrop ] =   useState("");

  const equipmentImageRef = useRef<HTMLImageElement>();
  const [ equipmentPrevImage, setEquipmentPrevImage ] = useState("nobsc-recipe-equipment-default");
  const [ equipmentImage,     setEquipmentImage ] =     useState<IImage>(null);
  const [ equipmentFullImage, setEquipmentFullImage ] = useState<File | null>(null);
  const [ equipmentCrop,      setEquipmentCrop ] =      useState<Crop>(initialCrop);
  const [ equipmentFullCrop,  setEquipmentFullCrop ] =  useState("");

  const ingredientsImageRef = useRef<HTMLImageElement>();
  const [ ingredientsPrevImage, setIngredientsPrevImage ] = useState("nobsc-recipe-ingredients-default");
  const [ ingredientsImage,     setIngredientsImage ] =     useState<IImage>(null);
  const [ ingredientsFullImage, setIngredientsFullImage ] = useState<File | null>(null);
  const [ ingredientsCrop,      setIngredientsCrop ] =      useState<Crop>(initialCrop);
  const [ ingredientsFullCrop,  setIngredientsFullCrop ] =  useState("");

  const cookingImageRef = useRef<HTMLImageElement>();
  const [ cookingPrevImage, setCookingPrevImage ] = useState("nobsc-recipe-cooking-default");
  const [ cookingImage,     setCookingImage ] =     useState<IImage>(null);
  const [ cookingFullImage, setCookingFullImage ] = useState<File | null>(null);
  const [ cookingCrop,      setCookingCrop ] =      useState<Crop>(initialCrop);
  const [ cookingFullCrop,  setCookingFullCrop ] =  useState("");

  useEffect(() => {
    let mounted = true;

    async function getExistingRecipeToEdit() {
      if (!recipe_id || !ownership) {
        router.push('/dashboard');
        return;
      }
      setLoading(true);
      window.scrollTo(0, 0);
      const res = await axios.post(`${endpoint}/user/recipe/edit/${ownership}`, {recipe_id}, {withCredentials: true});
      const recipe: IExistingRecipeToEdit = res.data.recipe;
      if (!recipe) {
        router.push('/dashboard');
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
      setEditingId(recipe.recipe_id);
      setRecipeTypeId(recipe_type_id);
      setCuisineId(cuisine_id);
      setTitle(title);
      setDescription(description);
      setDirections(directions);

      // double check this!!!
      const methodsToSet: number[] = [];
      required_methods?.map(m => methodsToSet.push(m.method_id));
      setUsedMethods(prevState => {
        const nextState = {...prevState};
        methodsToSet.map(method_id => {
          nextState[method_id] = true;
        });
        return nextState;
      });

      // TO DO: allow for optional amount and optional unit_id
      setEquipmentRows(required_equipment.map(({ amount, equipment_type_id, equipment_id }) => ({
        key: uuid(), amount, equipment_type_id, equipment_id
      })));

      setIngredientRows(required_ingredients.map(({ amount, unit_id, ingredient_type_id, ingredient_id }) => ({
        key: uuid(), amount, unit_id, ingredient_type_id, ingredient_id
      })));

      setSubrecipeRows(required_subrecipes.map(({ amount, unit_id, recipe_type_id, cuisine_id, subrecipe_id }) => ({
        key: uuid(), amount, unit_id, recipe_type_id, cuisine_id, subrecipe_id
      })));
      
      setRecipePrevImage(recipe_image);
      setEquipmentPrevImage(equipment_image);
      setIngredientsPrevImage(ingredients_image);
      setCookingPrevImage(cooking_image);
      setLoading(false);
    }

    if (mounted) {
      if (recipe_id) getExistingRecipeToEdit();
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
        setTimeout(() => router.push('/dashboard'), 3000);
      }
      setLoading(false);  // move ?
    }

    return () => {
      isSubscribed = false;
    };
  }, [message]);

  const changeRecipeType =  (e: SyntheticEvent) => setRecipeTypeId(Number((e.target as HTMLInputElement).value));
  const changeCuisine =     (e: SyntheticEvent) => setCuisineId(Number((e.target as HTMLInputElement).value));
  const changeTitle =       (e: SyntheticEvent) => setTitle((e.target as HTMLInputElement).value);
  const changeDescription = (e: SyntheticEvent) => setDescription((e.target as HTMLInputElement).value);
  const changeDirections =  (e: SyntheticEvent) => setDirections((e.target as HTMLInputElement).value);

  const changeMethods = (e: SyntheticEvent) => {
    const id = (e.target as HTMLInputElement).id;
    setUsedMethods(prevState => ({...prevState, [id]: !prevState[id]}));
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
    const newRows =     Array.from(ingredientRows);
    const elToUpdate =  newRows.findIndex(el => el.key === rowKey);
    const name =        (e.target as HTMLInputElement).name;
    const value =       (e.target as HTMLInputElement).value;
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

  const addEquipmentRow = () =>
    setEquipmentRows([...equipmentRows, {key: uuid(), amount: "", equipment_type_id: "", equipment_id: ""}]);

  const addIngredientRow = () =>
    setIngredientRows([...ingredientRows, {key: uuid(), amount: "", unit_id: "", ingredient_type_id: "", ingredient_id: ""}]);

  const addSubrecipeRow = () =>
    setSubrecipeRows([...subrecipeRows, {key: uuid(), amount: "", unit_id: "", recipe_type_id: "", cuisine_id: "", subrecipe_id: ""}]);

  const removeEquipmentRow = (rowKey: string) =>
    setEquipmentRows(equipmentRows.filter(row => row.key !== rowKey));

  const removeIngredientRow = (rowKey: string) =>
    setIngredientRows(ingredientRows.filter(row => row.key !== rowKey));

  const removeSubrecipeRow = (rowKey: string) =>
    setSubrecipeRows(subrecipeRows.filter(row => row.key !== rowKey));
  
  const availableEquipment = [...equipment, ...my_equipment];

  const availableIngredients = [...ingredients, ...my_ingredients];

  const availableRecipes = [
    ...recipes,
    ...(my_favorite_recipes.length ? my_favorite_recipes : []),  // TO DO: make sure they can't be the author
    ...(my_saved_recipes.length    ? my_saved_recipes    : []),  // TO DO: make sure they can't be the author
    ...(my_private_recipes.length  ? (editingId && recipe_id !== 0 ? my_private_recipes.filter(r => r.recipe_id != recipe_id) : my_private_recipes) : []),  // TO DO: change to "000..." ???
    ...(my_public_recipes.length   ? (editingId && recipe_id !== 0 ? my_public_recipes.filter(r => r.recipe_id != recipe_id)  : my_public_recipes)  : [])   // TO DO: change to "000..." ???
  ];

  /*

  Images

  */

  const url = "https://s3.amazonaws.com/nobsc-user-recipe";

  const commonReactCropProps = {
    aspect:    1,
    className: "crop-tool",
    disabled:  true,
    locked:    true,
    maxHeight: 172,
    maxWidth:  280,
    minHeight: 172,
    minWidth:  280,
    style: {
      minHeight: "300px"
    }
  };
  
  const makeCookingCrops = async (crop: Crop) => {
    if (!cookingImageRef.current) return;
    const full = await getCroppedImage(280, 172, cookingImageRef.current, crop);
    if (!full) return;
    setCookingFullCrop(full.preview);
    setCookingFullImage(full.final);
  };

  const makeEquipmentCrops = async (crop: Crop) => {
    if (!equipmentImageRef.current) return;
    const full = await getCroppedImage(280, 172, equipmentImageRef.current, crop);
    if (!full) return;
    setEquipmentFullCrop(full.preview);
    setEquipmentFullImage(full.final);
  };

  const makeIngredientsCrops = async (crop: Crop) => {
    if (!ingredientsImageRef.current) return;
    const full = await getCroppedImage(280, 172, ingredientsImageRef.current, crop);
    if (!full) return;
    setIngredientsFullCrop(full.preview);
    setIngredientsFullImage(full.final);
  };

  const makeRecipeCrops = async (crop: Crop) => {
    if (!recipeImageRef.current) return;
    const full =  await getCroppedImage(280, 172, recipeImageRef.current, crop);
    const thumb = await getCroppedImage(100, 62,  recipeImageRef.current, crop);
    const tiny =  await getCroppedImage(28,  18,  recipeImageRef.current, crop);
    if (!full || !thumb || !tiny) return;
    setRecipeFullCrop(full.preview);
    setRecipeThumbCrop(thumb.preview);
    setRecipeTinyCrop(tiny.preview);
    setRecipeFullImage(full.final);
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
    setCookingFullCrop("");
    setCookingImage(null);
    setCookingFullImage(null);
  };

  const cancelEquipmentImage = () => {
    setEquipmentFullCrop("");
    setEquipmentImage(null);
    setEquipmentFullImage(null);
  };

  const cancelIngredientsImage = () => {
    setIngredientsFullCrop("");
    setIngredientsImage(null);
    setIngredientsFullImage(null);
  };

  const cancelRecipeImage = () => {
    setRecipeFullCrop("");
    setRecipeThumbCrop("");
    setRecipeTinyCrop("");
    setRecipeImage(null);
    setRecipeFullImage(null);
    setRecipeThumbImage(null);
    setRecipeTinyImage(null);
  };

  /*

  Submit

  */

  const submit = () => {
    if (!validRecipeInfo({
      ownership,
      recipe_type_id,
      cuisine_id,
      title,
      description,
      directions,
      required_methods: usedMethods,
      required_equipment: equipmentRows,
      required_ingredients: ingredientRows,
      required_subrecipes: subrecipeRows,
      setFeedback
    })) return;

    const getCheckedMethods = () => {
      const checkedMethods: RequiredMethod[] = [];
      Object.entries(usedMethods).forEach(([ key, value ]) => {
        if (value === true) checkedMethods.push({method_id: Number(key)});
      });
      return checkedMethods;
    };

    const getRequiredEquipment = () => equipmentRows.map(e => ({
      amount:       Number(e.amount),
      equipment_id: e.equipment_id
    }));  // bug ?

    const getRequiredIngredients = () => ingredientRows.map(i => ({
      amount:  Number(i.amount),
      unit_id: Number(i.unit_id),
      ingredient_id: i.ingredient_id
    }));  // bug ?

    const getRequiredSubrecipes = () => subrecipeRows.map(s => ({
      amount:       Number(s.amount),
      unit_id:      Number(s.unit_id),
      subrecipe_id: s.subrecipe_id
    }));  // bug ?

    const recipeInfo = {
      ownership,
      recipe_type_id,
      cuisine_id,
      title,
      description,
      directions,
      required_methods: getCheckedMethods(),
      required_equipment: getRequiredEquipment(),
      required_ingredients: getRequiredIngredients(),
      required_subrecipes: getRequiredSubrecipes(),
      //recipeImage,
      //recipeFullImage,
      //recipeThumbImage,
      //recipeTinyImage,
      //equipmentImage,
      //equipmentFullImage,
      //ingredientsImage,
      //ingredientsFullImage,
      //cookingImage,
      //cookingFullImage
    };

    setLoading(true);

    if (editingId) {
      // TO DO: AUTHORIZE THEM ON THE BACK END, MAKE SURE THEY ACTUALLY DO OWN THE RECIPE BEFORE ENTERING ANYTHING INTO MySQL / AWS S3!!!
      const recipeUpdateInfo = {...recipeInfo, recipe_id: editingId, recipePrevImage, equipmentPrevImage, ingredientsPrevImage, cookingPrevImage};
      if      (ownership === "private") dispatch(updatePrivateRecipe(recipeUpdateInfo));
      else if (ownership === "public")  dispatch(updatePublicRecipe(recipeUpdateInfo));
    } else {
      if      (ownership === "private") dispatch(createPrivateRecipe(recipeInfo));
      else if (ownership === "public")  dispatch(createPublicRecipe(recipeInfo));
    }
  };

  return (
    <div className="one-col new-recipe">
      <h1>New Recipe</h1>

      <p className="feedback">{feedback}</p>

      <h2>Ownership</h2>
      <ExpandCollapse>
        <div>
          <p>Once submitted, a recipe's ownership can't be changed.</p><br />

          <p>Public:</p>
          <p>- Anyone can view</p>
          <p>- May only use official NOBSC equipment, ingredients, and recipes, and public recipes submitted by other users</p>
          <p>- Can't be deleted, but can be disowned (author will be changed from "{authname}" to "Unknown")</p><br />

          <p>Tip: If you're setting your recipe to public, please be sure to include all four images below.</p><br />

          <p>Private:</p>
          <p>- Only you can view</p>
          <p>- May also use private equipment, ingredients, and recipes submitted by you</p>
          <p>- Can be deleted</p><br />

          <p>Tip: If you're still improving your recipe, make it private for now, then make a public version later.</p><br />
        </div>
      </ExpandCollapse>
      <div className="ownership">
        <span>
          <input checked={ownership === "private"} disabled={true} name="private" type="radio" value="private" />
          <label>Private</label>
        </span>
        <span>
          <input checked={ownership === "public"} disabled={true} name="public" type="radio" value="public" />
          <label>Public</label>
        </span>
      </div>

      <h2>Type of Recipe</h2>
      <select id="recipe_type_id" name="recipeType" onChange={changeRecipeType} required value={recipeTypeId}>
        <option value=""></option>
        {recipe_types.map(({ recipe_type_id, recipe_type_name }) => (<option key={recipe_type_id} value={recipe_type_id}>{recipe_type_name}</option>))}
      </select>

      <h2>Cuisine</h2>
      <select id="cuisine_id" name="cuisine" onChange={changeCuisine} required value={cuisineId}>
        <option value=""></option>
        {cuisines.map(({ cuisine_id, cuisine_name }) => (<option key={cuisine_id} value={cuisine_id}>{cuisine_name}</option>))}
      </select>

      <h2>Title</h2>
      <input className="title" id="recipe_title" max={100} min={2} name="title" onChange={changeTitle} type="text" value={title} />

      <h2>Description / Author Note</h2>
      <input className="description" id="recipe_description" max={150} min={2} name="description" onChange={changeDescription} type="text" value={description} />

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
              <select name="amount" onChange={(e) => changeEquipmentRow(e, key)} required value={amount}>
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <label>Type:</label>
              <select name="type" onChange={(e) => changeEquipmentRow(e, key)} required value={equipment_type_id}>
                <option value=""></option>
                <option value="2">Preparing</option>
                <option value="3">Cooking</option>
              </select>
              <label>Equipment:</label>
              <select name="equipment" onChange={(e) => changeEquipmentRow(e, key)} required value={equipment_id}>
                <option value=""></option>
                {availableEquipment
                  .filter(e => e.equipment_type_id == equipment_type_id)
                  .map((e, index) => <option key={index} value={e.equipment_id}>{e.equipment_name}</option>)}
              </select>
              <button className="--remove" onClick={() => removeEquipmentRow(key)}>Remove</button>
            </div>
          ))}
        </div>
        <button className="--add-row" onClick={addEquipmentRow}>Add Equipment</button>
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
                required
                step="any"
                type="number"
                value={amount}
              />

              <label>Unit:</label>
              <select name="unit" onChange={(e) => changeIngredientRow(e, key)} required value={unit_id}>
                <option value=""></option>
                {units.map((u, index) => <option key={index} value={u.unit_id}>{u.unit_name}</option>)}
              </select>

              <label>Type:</label>
              <select name="type" onChange={(e) => changeIngredientRow(e, key)} required value={ingredient_type_id}>
                <option value=""></option>
                {ingredient_types.map((i, index) => (<option key={index} value={i.ingredient_type_id}>{i.ingredient_type_name}</option>))}
              </select>

              <label>Ingredient:</label>
              <select name="ingredient" onChange={(e) => changeIngredientRow(e, key)} required value={ingredient_id}>
                <option value=""></option>
                {availableIngredients
                  .filter(i => i.ingredient_type_id == ingredient_type_id)
                  .map((i, index) => <option key={index} value={i.ingredient_id}>{i.ingredient_name}</option>)}
              </select>

              <button className="--remove" onClick={() => removeIngredientRow(key)}>Remove</button>
            </div>
          ))}
        </div>
        <button className="--add-row" onClick={addIngredientRow}>Add Ingredient</button>
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
                required
                step="any"
                type="number"
                value={s.amount}
              />
              
              <label>Unit:</label>
              <select name="unit" onChange={(e) => changeSubrecipeRow(e, s.key)} required value={s.unit_id}>
                <option value=""></option>
                {units.map((u, index) => <option key={index} value={u.unit_id}>{u.unit_name}</option>)}
              </select>
              
              <label>Type:</label>
              <select name="type" onChange={(e) => changeSubrecipeRow(e, s.key)} required value={s.type}>
                <option value=""></option>
                {recipe_types.map((r, index) => <option key={index} value={r.recipe_type_id}>{r.recipe_type_name}</option>)}
              </select>
              
              <label>Cuisine:</label>
              <select name="cuisine" onChange={(e) => changeSubrecipeRow(e, s.key)} required value={s.cuisine}>
                <option value=""></option>
                {cuisines.map((c, index) => <option key={index} value={c.cuisine_id}>{c.cuisine_name}</option>)}
              </select>
              
              <label>Subrecipe:</label>
              <select className="--subrecipe" name="subrecipe" onChange={(e) => changeSubrecipeRow(e, s.key)} required value={s.subrecipe_id}>
                <option value=""></option>
                {availableRecipes
                  .filter(r => r.recipe_type_id == s.type)
                  .filter(r => r.cuisine_id == s.cuisine)
                  .map((r, index) => <option key={index} value={r.recipe_id}>{r.title}</option>)}
              </select>
              
              <button className="--remove" onClick={() => removeSubrecipeRow(s.key)}>Remove</button>
            </div>
          ))}
        </div>
        <button className="--add-row" onClick={addSubrecipeRow}>Add Subrecipe</button>
      </div>

      <h2>Directions</h2>
      <textarea className="directions" id="recipe_directions" name="directions" onChange={changeDirections} value={directions} />

      <div className="new-recipe-images">
      <div className="recipe-image">
        <h2>Image of Finished Recipe</h2>

        {!recipeImage && (
          <div>
            {!editingId ? <img src={`${url}/nobsc-recipe-default`} /> : recipePrevImage && <img src={`${url}/${recipePrevImage}`} />}
            <h4>Change</h4>
            <input accept="image/*" name="image-input" onChange={(e) => onSelectFile(e, "recipe")} type="file" />
          </div>
        )}

        {recipeImage && (
          <div>
            <ReactCrop crop={recipeCrop} onChange={onRecipeCropChange} onComplete={onRecipeCropComplete} {...commonReactCropProps}>
              <img onLoad={onRecipeImageLoaded} src={recipeImage as string} />
            </ReactCrop>

            <ToolTip />

            <div className="crops">
              <div className="crop-full-outer">
                <span>Full Size: </span><img className="crop-full" src={recipeFullCrop} />
              </div>
              <div className="crop-thumb-outer">
                <span>Thumb Size: </span><img className="crop-thumb" src={recipeThumbCrop} />
              </div>
              <div className="crop-tiny-outer">
                <span>Tiny Size: </span><img className="crop-tiny" src={recipeTinyCrop} />
              </div>
            </div>

            <button className="image-cancel-button" disabled={loading} onClick={cancelRecipeImage}>Cancel</button>
          </div>
        )}
      </div>

      <div className="equipment-image">
        <h2>Image of All Equipment</h2>

        {!equipmentImage && (
          <div>
            {!editingId ? <img src={`${url}/nobsc-recipe-default`} /> : equipmentPrevImage && <img src={`${url}-equipment/${equipmentPrevImage}`} />}
            <h4>Change</h4>
            <input accept="image/*" name="equipment-image-input" onChange={(e) => onSelectFile(e, "equipment")} type="file" />
          </div>
        )}

        {equipmentImage && (
          <div>
            <ReactCrop crop={equipmentCrop} onChange={onEquipmentCropChange} onComplete={onEquipmentCropComplete} {...commonReactCropProps}>
              <img onLoad={onEquipmentImageLoaded} src={equipmentImage as string} />
            </ReactCrop>
            
            <ToolTip />

            <div className="crops">
              <div className="crop-full-outer">
                <span>Full Size: </span><img className="crop-full" src={equipmentFullCrop} />
              </div>
            </div>

            <button className="image-cancel-button" disabled={loading} onClick={cancelEquipmentImage}>Cancel</button>
          </div>
        )}
      </div>

      <div className="ingredients-image">
        <h2>Image of All Ingredients</h2>

        {!ingredientsImage && (
          <div>
            {!editingId ? <img src={`${url}/nobsc-recipe-default`} /> : ingredientsPrevImage && <img src={`${url}-ingredients/${ingredientsPrevImage}`} />}
            <h4>Change</h4>
            <input accept="image/*" name="ingredients-image-input" onChange={(e) => onSelectFile(e, "ingredients")} type="file" />
          </div>
        )}

        {ingredientsImage && (
          <div>
            <ReactCrop crop={ingredientsCrop} onChange={onIngredientsCropChange} onComplete={onIngredientsCropComplete} {...commonReactCropProps}>
              <img onLoad={onIngredientsImageLoaded} src={ingredientsImage as string} />
            </ReactCrop>
            
            <ToolTip />

            <div className="crops">
              <div className="crop-full-outer">
                <span>Full Size: </span><img className="crop-full" src={ingredientsFullCrop} />
              </div>
            </div>

            <button className="image-cancel-button" disabled={loading} onClick={cancelIngredientsImage}>Cancel</button>
          </div>
        )}
      </div>

      <div className="cooking-image">
        <h2>Image of Cooking In Action</h2>

        {!cookingImage && (
          <div>
            {!editingId ? <img src={`${url}/nobsc-recipe-default`} /> : cookingPrevImage && <img src={`${url}-cooking/${cookingPrevImage}`} />}
            <h4>Change</h4>
            <input accept="image/*" name="cooking-image-input" onChange={(e) => onSelectFile(e, "cooking")} type="file" />
          </div>
        )}

        {cookingImage && (
          <div>
            <ReactCrop crop={cookingCrop} onChange={onCookingCropChange} onComplete={onCookingCropComplete} {...commonReactCropProps}>
              <img onLoad={onCookingImageLoaded} src={cookingImage as string} />
            </ReactCrop>
            
            <ToolTip />

            <div className="crops">
              <div className="crop-full-outer">
                <span>Full Size: </span><img className="crop-full" src={cookingFullCrop} />
              </div>
            </div>

            <button className="image-cancel-button" disabled={loading} onClick={cancelCookingImage}>Cancel</button>
          </div>
        )}
      </div>
    </div>

      <div className="finish">
        <Link className="cancel-button" href="/dashboard">Cancel</Link>
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

function ToolTip() {
  return (
    <span className="crop-tool-tip">
      Move the crop to your desired position. The image&#40;s&#41; will be saved for you:
    </span>
  );
}

// TO DO: move types to one location

type ChangeEvent =         React.ChangeEvent<HTMLInputElement>;
type SyntheticEvent =      React.SyntheticEvent<EventTarget>;
type SyntheticImageEvent = React.SyntheticEvent<HTMLImageElement>;

type IImage = string | ArrayBuffer | null;

export interface IExistingRecipeToEdit {
  recipe_id:         string;
  recipe_type_id:    number;
  cuisine_id:        number;
  owner_id:          number;
  title:             string;
  description:       string;
  directions:        string;
  required_methods:     ExistingRequiredMethod[];
  required_equipment:   ExistingRequiredEquipment[];
  required_ingredients: ExistingRequiredIngredient[];
  required_subrecipes:  ExistingRequiredSubrecipe[];
  recipe_image:      string;
  equipment_image:   string;
  ingredients_image: string;
  cooking_image:     string;
}

// change these too?

export type ExistingRequiredMethod = {
  method_id: number;
};

export type ExistingRequiredEquipment = {
  amount?:           number;
  equipment_type_id: number;
  equipment_id:      string;
};

export type ExistingRequiredIngredient = {
  amount?:            number;
  unit_id?:           number;
  ingredient_type_id: number;
  ingredient_id:      string;
};

export type ExistingRequiredSubrecipe = {
  amount?:        number;
  unit_id?:       number;
  recipe_type_id: number;
  cuisine_id:     number;
  subrecipe_id:   string;
};

export type Methods = {
  //[index: string]: any;  // ???
  1:  boolean;
  2:  boolean;
  3:  boolean;
  4:  boolean;
  5:  boolean;
  6:  boolean;
  7:  boolean;
  8:  boolean;
  9:  boolean;
  10: boolean;
  11: boolean;
  12: boolean;
  13: boolean;
  14: boolean;
  15: boolean;
  16: boolean;
  17: boolean;
  18: boolean;
  19: boolean;
  20: boolean;
  21: boolean;
  22: boolean;
  23: boolean;
  24: boolean;
};

export type EquipmentRow = {
  //[index: string]:   any;
  key:               string;
  amount:            string | number;
  equipment_type_id: string | number;  // (just a filter for nicer UX)
  equipment_id:      string | number;
};

export type IngredientRow = {
  //[index: string]:    any;
  key:                string;
  amount:             string | number;
  unit_id:            string | number;
  ingredient_type_id: string | number;  // (just a filter for nicer UX)
  ingredient_id:      string | number;
};

export type SubrecipeRow = {
  //[index: string]: any;
  key:             string;
  amount:          string | number;
  unit_id:         string | number;
  recipe_type_id:  string | number;  // (just a filter for nicer UX)
  cuisine_id:      string | number;  // (just a filter for nicer UX)
  subrecipe_id:    string | number;  // recipe_id or subrecipe_id ???
};
