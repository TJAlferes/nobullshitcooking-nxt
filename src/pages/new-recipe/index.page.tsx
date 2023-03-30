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
import type { RequiredMethod } from '../../store/user/recipe/types';
import { endpoint }            from '../../utils/api';
import { getCroppedImage }     from '../../utils/getCroppedImage';
import { validRecipeInfo }     from './validRecipeInfo';

export default function NewRecipe() {
  const router =    useRouter();
  const params =    useSearchParams();
  const ownership = params.get('ownership');  // TO DO: triple test
  const id =        Number(params.get('id'));
  // TO DO: change
  if (!id || !ownership) {
    router.push('/dashboard');
    return null;
  }

  const dispatch = useDispatch();

  const measurements =      useSelector(state => state.data.measurements);
  
  const equipment =         useSelector(state => state.data.equipment);
  const myEquipment =       useSelector(state => state.data.myEquipment);

  const ingredientTypes =   useSelector(state => state.data.ingredientTypes);
  const ingredients =       useSelector(state => state.data.ingredients);
  const myIngredients =     useSelector(state => state.data.myIngredients);

  const recipeTypes =       useSelector(state => state.data.recipeTypes);
  const cuisines =          useSelector(state => state.data.cuisines);
  const methods =           useSelector(state => state.data.methods);
  const recipes =           useSelector(state => state.data.recipes);
  const myFavoriteRecipes = useSelector(state => state.data.myFavoriteRecipes);
  const mySavedRecipes =    useSelector(state => state.data.mySavedRecipes);
  const myPrivateRecipes =  useSelector(state => state.data.myPrivateRecipes);
  const myPublicRecipes =   useSelector(state => state.data.myPublicRecipes);

  const authname =          useSelector(state => state.auth.authname);
  const message =           useSelector(state => state.user.message);

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ] =  useState(false);

  const [ editingId,    setEditingId ] =    useState<number|null>(null);

  const [ recipeTypeId, setRecipeTypeId ] = useState<number>(0);
  const [ cuisineId,    setCuisineId ] =    useState<number>(0);
  const [ title,        setTitle ] =        useState("");
  const [ description,  setDescription ] =  useState("");
  const [ directions,   setDirections ] =   useState("");
  const [ usedMethods,  setUsedMethods ] =  useState<IMethods>({
     1: false,  2: false,  3: false,  4: false,  5: false,  6: false,
     7: false,  8: false,  9: false, 10: false, 11: false, 12: false,
    13: false, 14: false, 15: false, 16: false, 17: false, 18: false,
    19: false, 20: false, 21: false, 22: false, 23: false, 24: false
  });
  const [ equipmentRows, setEquipmentRows ] =   useState<IEquipmentRow[]>([
    {key: uuid(), amount: "", type: "", id: ""}
  ]);
  const [ ingredientRows, setIngredientRows ] = useState<IIngredientRow[]>([
    {key: uuid(), amount: "", measurementId: "", type: "", id: ""}
  ]);
  const [ subrecipeRows, setSubrecipeRows ] =   useState<ISubrecipeRow[]>([]);

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
      if (!id || !ownership) {
        router.push('/dashboard');
        return;
      }
      setLoading(true);
      window.scrollTo(0, 0);
      const res = await axios.post(`${endpoint}/user/recipe/edit/${ownership}`, {id}, {withCredentials: true});
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
        equipment,
        ingredients,
        methods,
        subrecipes,
        recipe_image,
        equipment_image,
        ingredients_image,
        cooking_image
      } = recipe;
      setEditingId(recipe.id);
      setRecipeTypeId(recipe_type_id);
      setCuisineId(cuisine_id);
      setTitle(title);
      setDescription(description);
      setDirections(directions);
      // double check this!!!
      const methodsToSet: number[] = [];
      methods.length && methods.map(m => methodsToSet.push(m.method_id));
      setUsedMethods(prevState => {
        const nextState = {...prevState};
        methodsToSet.map(method => {
          nextState[method] = true;
        });
        return nextState;
      });
      setEquipmentRows(
        equipment.map(r => ({
          key:    uuid(),
          amount: r.amount,
          type:   r.equipment_type_id,
          id:     r.equipment_id
        }))
      );
      setIngredientRows(
        ingredients.map(r => ({
          key:           uuid(),
          amount:        r.amount,
          measurementId: r.measurement_id,
          type:          r.ingredient_type_id,
          id:            r.ingredient_id
        }))
      );
      setSubrecipeRows(
        subrecipes.map(r => ({
          key:           uuid(),
          amount:        r.amount,
          measurementId: r.measurement_id,
          type:          r.recipe_type_id,
          cuisine:       r.cuisine_id,
          id:            r.subrecipe_id
        }))
      );
      setRecipePrevImage(recipe_image);
      setEquipmentPrevImage(equipment_image);
      setIngredientsPrevImage(ingredients_image);
      setCookingPrevImage(cooking_image);
      setLoading(false);
    }

    if (mounted) {
      if (id) getExistingRecipeToEdit();
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
    setEquipmentRows([...equipmentRows, {key: uuid(), amount: "", type: "", id: ""}]);

  const addIngredientRow = () =>
    setIngredientRows([...ingredientRows, {key: uuid(), amount: "", measurementId: "", type: "", id: ""}]);

  const addSubrecipeRow = () =>
    setSubrecipeRows([...subrecipeRows, {key: uuid(), amount: "", measurementId: "", type: "", cuisine: "", id: ""}]);

  const removeEquipmentRow = (rowKey: string) =>
    setEquipmentRows(equipmentRows.filter(row => row.key !== rowKey));

  const removeIngredientRow = (rowKey: string) =>
    setIngredientRows(ingredientRows.filter(row => row.key !== rowKey));

  const removeSubrecipeRow = (rowKey: string) =>
    setSubrecipeRows(subrecipeRows.filter(row => row.key !== rowKey));
  
  const availableEquipment = [...equipment, ...myEquipment];

  const availableIngredients = [...ingredients, ...myIngredients];

  const availableRecipes = [
    ...recipes,
    ...(myFavoriteRecipes.length ? myFavoriteRecipes : []),  // TO DO: make sure they can't be the author
    ...(mySavedRecipes.length    ? mySavedRecipes    : []),  // TO DO: make sure they can't be the author
    ...(myPrivateRecipes.length  ? (editingId && id !== 0 ? myPrivateRecipes.filter(r => r.id != id) : myPrivateRecipes) : []),
    ...(myPublicRecipes.length   ? (editingId && id !== 0 ? myPublicRecipes.filter(r => r.id != id)  : myPublicRecipes)  : [])
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
      recipeTypeId,
      cuisineId,
      title,
      description,
      directions,
      methods: usedMethods,
      equipment: equipmentRows,
      ingredients: ingredientRows,
      subrecipes: subrecipeRows,
      setFeedback
    })) return;

    const getCheckedMethods = () => {
      const checkedMethods: RequiredMethod[] = [];
      Object.entries(usedMethods).forEach(([ key, value ]) => {
        if (value === true) checkedMethods.push({id: Number(key)});
      });
      return checkedMethods;
    };
    const getRequiredEquipment =   () => equipmentRows.map(e => ({amount: Number(e.amount), id: Number(e.id)}));                                           // bug ?
    const getRequiredIngredients = () => ingredientRows.map(i => ({amount: Number(i.amount), measurementId: Number(i.measurementId), id: Number(i.id)}));  // bug ?
    const getRequiredSubrecipes =  () => subrecipeRows.map(s => ({amount: Number(s.amount), measurementId: Number(s.measurementId), id: Number(s.id)}));   // bug ?

    const recipeInfo = {
      ownership,
      recipeTypeId,
      cuisineId,
      title,
      description,
      directions,
      methods: getCheckedMethods(),
      equipment: getRequiredEquipment(),
      ingredients: getRequiredIngredients(),
      subrecipes: getRequiredSubrecipes(),
      recipeImage,
      recipeFullImage,
      recipeThumbImage,
      recipeTinyImage,
      equipmentImage,
      equipmentFullImage,
      ingredientsImage,
      ingredientsFullImage,
      cookingImage,
      cookingFullImage
    };

    setLoading(true);

    if (editingId) {
      const recipeUpdateInfo = {...recipeInfo, id: editingId, recipePrevImage, equipmentPrevImage, ingredientsPrevImage, cookingPrevImage};
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
        {recipeTypes.map(({ id, name }) => (<option key={id} data-test={name} value={id}>{name}</option>))}
      </select>

      <h2>Cuisine</h2>
      <select id="cuisine_id" name="cuisine" onChange={changeCuisine} required value={cuisineId}>
        <option value=""></option>
        {cuisines.map(({ id, name }) => (<option key={id} value={id} data-test={name}>{name}</option>))}
      </select>

      <h2>Title</h2>
      <input className="title" id="recipe_title" max={100} min={2} name="title" onChange={changeTitle} type="text" value={title} />

      <h2>Description / Author Note</h2>
      <input className="description" id="recipe_description" max={150} min={2} name="description" onChange={changeDescription} type="text" value={description} />

      <h2>Methods</h2>
      <div className="methods">
        {methods.map(({ id, name }) => (
          <span className="method" key={id}>
            <input
              checked={usedMethods[id] === true ? true : false}
              data-test={`${id}-${name}`}
              id={`${id}`}
              onChange={e => changeMethods(e)}
              type="checkbox"
            />
            <label data-test={name}>{name}</label>
          </span>
        ))}
      </div>

      <div className="required-equipment">
        <h2>Equipment</h2>
        <div className="equipment-rows">
          {equipmentRows.map(({ key, amount, type, id }) => (
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
              <select name="type" onChange={(e) => changeEquipmentRow(e, key)} required value={type}>
                <option value=""></option>
                <option value="2">Preparing</option>
                <option value="3">Cooking</option>
              </select>
              <label>Equipment:</label>
              <select name="equipment" onChange={(e) => changeEquipmentRow(e, key)} required value={id}>
                <option value=""></option>
                {availableEquipment
                  .filter(e => e.equipment_type_id == type)
                  .map((e, index) => <option key={index} value={e.id}>{e.name}</option>)}
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
          {ingredientRows.map(({ key, amount, measurementId, type, id }) => (
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
              <select name="unit" onChange={(e) => changeIngredientRow(e, key)} required value={measurementId}>
                <option value=""></option>
                {measurements.map((m, index) => <option key={index} value={m.id}>{m.name}</option>)}
              </select>

              <label>Type:</label>
              <select name="type" onChange={(e) => changeIngredientRow(e, key)} required value={type}>
                <option value=""></option>
                {ingredientTypes.map((i, index) => (<option key={index} value={i.id}>{i.name}</option>))}
              </select>

              <label>Ingredient:</label>
              <select name="ingredient" onChange={(e) => changeIngredientRow(e, key)} required value={id}>
                <option value=""></option>
                {availableIngredients
                  .filter(i => i.ingredient_type_id == type)
                  .map((i, index) => <option key={index} value={i.id}>{i.name}</option>)}
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
              <select name="unit" onChange={(e) => changeSubrecipeRow(e, s.key)} required value={s.measurementId}>
                <option value=""></option>
                {measurements.map((m, index) => <option key={index} value={m.id}>{m.name}</option>)}
              </select>
              
              <label>Type:</label>
              <select name="type" onChange={(e) => changeSubrecipeRow(e, s.key)} required value={s.type}>
                <option value=""></option>
                {recipeTypes.map((r, index) => <option key={index} value={r.id}>{r.name}</option>)}
              </select>
              
              <label>Cuisine:</label>
              <select name="cuisine" onChange={(e) => changeSubrecipeRow(e, s.key)} required value={s.cuisine}>
                <option value=""></option>
                {cuisines.map((c, index) => <option key={index} value={c.id}>{c.name}</option>)}
              </select>
              
              <label>Subrecipe:</label>
              <select className="--subrecipe" name="subrecipe" onChange={(e) => changeSubrecipeRow(e, s.key)} required value={id}>
                <option value=""></option>
                {availableRecipes
                  .filter(r => r.recipe_type_id == s.type)
                  .filter(r => r.cuisine_id == s.cuisine)
                  .map((r, index) => <option key={index} value={r.id}>{r.title}</option>)}
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
  return <span className="crop-tool-tip">Move the crop to your desired position. The image&#40;s&#41; will be saved for you:</span>;
}

type ChangeEvent =         React.ChangeEvent<HTMLInputElement>;
type SyntheticEvent =      React.SyntheticEvent<EventTarget>;
type SyntheticImageEvent = React.SyntheticEvent<HTMLImageElement>;

type IImage = string | ArrayBuffer | null;

export interface IExistingRecipeToEdit {
  id:                number;
  recipe_type_id:    number;
  cuisine_id:        number;
  owner_id:          number;
  title:             string;
  description:       string;
  directions:        string;
  methods:           IExistingRequiredMethod[];
  equipment:         IExistingRequiredEquipment[];
  ingredients:       IExistingRequiredIngredient[];
  subrecipes:        IExistingRequiredSubrecipe[];
  recipe_image:      string;
  equipment_image:   string;
  ingredients_image: string;
  cooking_image:     string;
}

// change these too?

export interface IExistingRequiredMethod {
  method_id: number;
}

export interface IExistingRequiredEquipment {
  amount:            number;
  equipment_type_id: number;
  equipment_id:      number;
}

export interface IExistingRequiredIngredient {
  amount:             number;
  measurement_id:     number;
  ingredient_type_id: number;
  ingredient_id:      number;
}

export interface IExistingRequiredSubrecipe {
  amount:         number;
  measurement_id: number;
  recipe_type_id: number;
  cuisine_id:     number;
  subrecipe_id:   number;
}

export interface IMethods {
  [index: string]: any;  // ???
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
}

export interface IEquipmentRow {
  [index: string]: any;
  key:             string;
  amount:          string | number;
  type:            string | number;  // equipmentTypeId? (just a filter for nicer UX)
  id:              string | number;
}

export interface IIngredientRow {
  [index: string]: any;
  key:             string;
  amount:          string | number;
  measurementId:   string | number;
  type:            string | number;  // ingredientTypeId? (just a filter for nicer UX)
  id:              string | number;
}

export interface ISubrecipeRow {
  [index: string]: any;
  key:             string;
  amount:          string | number;
  measurementId:   string | number;
  type:            string | number;  // recipeTypeId? (just a filter for nicer UX)
  cuisine:         string | number;  // cuisineId?    (just a filter for nicer UX)
  id:              string | number;
}
