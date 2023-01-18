import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import type { Crop, PixelCrop } from 'react-image-crop';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

import { NOBSCAPI as endpoint } from '../../config/NOBSCAPI';
import { useTypedSelector as useSelector } from '../../store';
import { createNewRecipe, editRecipe } from '../../store/staff/recipe/actions';
import { createNewPrivateRecipe, createNewPublicRecipe, editPrivateRecipe, editPublicRecipe } from '../../store/user/recipe/actions';
import type { IRequiredMethod } from '../../store/user/recipe/types';
import { getCroppedImage } from '../../utils/getCroppedImage';
import { validRecipeInfo } from './validation/validRecipeInfo';
import { NewRecipeView } from './view';

export default function NewRecipe({ editing, ownership }: Props): JSX.Element {
  const router = useRouter();
  const id = Number(router.query['id']);  // not reliable?

  const dispatch = useDispatch();
  const staffMessage = useSelector(state => state.staff.message);
  const userMessage =  useSelector(state => state.user.message);
  const theme =        useSelector(state => state.theme.theme);
  const { authname, staffIsAuthenticated } = useSelector(state => state.auth);  // don't destructure useSelector?
  const {
    cuisines,
    equipment,
    ingredients,
    ingredientTypes,
    measurements,
    methods,
    myFavoriteRecipes,
    myPrivateEquipment,
    myPrivateIngredients,
    myPrivateRecipes,
    myPublicRecipes,
    mySavedRecipes,
    recipes,
    recipeTypes
  } = useSelector(state => state.data);

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ] =  useState(false);

  const [ editingId,    setEditingId ] =    useState<number>(0);  // |null ?
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

  const [ equipmentRows, setEquipmentRows ] = useState<IEquipmentRow[]>([
    {key: uuid(), amount: "", type: "", id: ""},
    {key: uuid(), amount: "", type: "", id: ""},
    {key: uuid(), amount: "", type: "", id: ""},
  ]);
  const [ ingredientRows, setIngredientRows ] = useState<IIngredientRow[]>([
    {key: uuid(), amount: "", measurementId: "", type: "", id: ""},
    {key: uuid(), amount: "", measurementId: "", type: "", id: ""},
    {key: uuid(), amount: "", measurementId: "", type: "", id: ""},
  ]);
  const [ subrecipeRows, setSubrecipeRows ] = useState<ISubrecipeRow[]>([]);

  // this is insane. do better.
  const [ recipePrevImage,      setRecipePrevImage ] =      useState("nobsc-recipe-default");
  const [ recipeImage,          setRecipeImage ] =          useState<IImage>(null);
  const [ recipeFullImage,      setRecipeFullImage ] =      useState<File | null>(null);
  const [ recipeThumbImage,     setRecipeThumbImage ] =     useState<File | null>(null);
  const [ recipeTinyImage,      setRecipeTinyImage ] =      useState<File | null>(null);
  const [ equipmentPrevImage,   setEquipmentPrevImage ] =   useState("nobsc-recipe-equipment-default");
  const [ equipmentImage,       setEquipmentImage ] =       useState<IImage>(null);
  const [ equipmentFullImage,   setEquipmentFullImage ] =   useState<File | null>(null);
  const [ ingredientsPrevImage, setIngredientsPrevImage ] = useState("nobsc-recipe-ingredients-default");
  const [ ingredientsImage,     setIngredientsImage ] =     useState<IImage>(null);
  const [ ingredientsFullImage, setIngredientsFullImage ] = useState<File | null>(null);
  const [ cookingPrevImage,     setCookingPrevImage ] =     useState("nobsc-recipe-cooking-default");
  const [ cookingImage,         setCookingImage ] =         useState<IImage>(null);
  const [ cookingFullImage,     setCookingFullImage ] =     useState<File | null>(null);

  const initialCropState: Crop = {unit: 'px', x: 25, y: 25, width: 50, height: 50};
  const [ recipeCrop,          setRecipeCrop ] =          useState<Crop>(initialCropState);
  const [ recipeFullCrop,      setRecipeFullCrop ] =      useState("");
  const [ recipeThumbCrop,     setRecipeThumbCrop ] =     useState("");
  const [ recipeTinyCrop,      setRecipeTinyCrop ] =      useState("");
  const [ equipmentCrop,       setEquipmentCrop ] =       useState<Crop>(initialCropState);
  const [ equipmentFullCrop,   setEquipmentFullCrop ] =   useState("");
  const [ ingredientsCrop,     setIngredientsCrop ] =     useState<Crop>(initialCropState);
  const [ ingredientsFullCrop, setIngredientsFullCrop ] = useState("");
  const [ cookingCrop,         setCookingCrop ] =         useState<Crop>(initialCropState);
  const [ cookingFullCrop,     setCookingFullCrop ] =     useState("");

  const recipeImageRef = useRef<HTMLImageElement>();
  const equipmentImageRef = useRef<HTMLImageElement>();
  const ingredientsImageRef = useRef<HTMLImageElement>();
  const cookingImageRef = useRef<HTMLImageElement>();

  useEffect(() => {
    const getExistingRecipeToEdit = async () => {
      if (!id || (!staffIsAuthenticated && !ownership)) {
        const redirectPath = staffIsAuthenticated ? '/staff-dashboard' : '/dashboard';
        router.push(redirectPath);
        return;
      }

      setLoading(true);
      window.scrollTo(0,0);

      const url = staffIsAuthenticated ? `${endpoint}/staff/recipe/edit` : `${endpoint}/user/recipe/edit/${ownership}`;
      const res = await axios.post(url, {id}, {withCredentials: true});
      const recipe: IExistingRecipeToEdit = res.data.recipe;
      if (!recipe) {
        const redirectPath = staffIsAuthenticated ? '/staff-dashboard' : '/dashboard';
        router.push(redirectPath);
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

      setRequiredEquipment(equipment);
      setRequiredIngredients(ingredients);
      setRequiredSubrecipes(subrecipes);

      setRecipePrevImage(recipe_image);
      setEquipmentPrevImage(equipment_image);
      setIngredientsPrevImage(ingredients_image);
      setCookingPrevImage(cooking_image);

      setLoading(false);
    };
    
    if (editing) getExistingRecipeToEdit();
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      const message =      staffIsAuthenticated ? staffMessage : userMessage;
      const redirectPath = staffIsAuthenticated ? '/staff-dashboard' : '/dashboard';
      if (message !== "") window.scrollTo(0,0);
      setFeedback(message);
      if (message === "Recipe created." || message === "Recipe updated.") setTimeout(() => router.push(redirectPath), 3000);
      setLoading(false);  // move?
    }

    return () => {
      isSubscribed = false;
    };
  }, [staffMessage, userMessage]);

  const addEquipmentRow = () => {
    const newEquipmentRows = equipmentRows.concat({key: uuid(), amount: "", type: "", id: ""});
    setEquipmentRows(newEquipmentRows);
  };

  const addIngredientRow = () => {
    const newIngredientRows = ingredientRows.concat({key: uuid(), amount: "", measurementId: "", type: "", id: ""});
    setIngredientRows(newIngredientRows);
  };

  const addSubrecipeRow = () => {
    const newSubrecipeRows = subrecipeRows.concat({key: uuid(), amount: "", measurementId: "", type: "", cuisine: "", id: ""});
    setSubrecipeRows(newSubrecipeRows);
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

  const getCheckedMethods = () => {
    const checkedMethods: IRequiredMethod[] = [];
    Object.entries(usedMethods).forEach(([key, value]) => {
      if (value === true) checkedMethods.push({id: Number(key)});
    });
    return checkedMethods;
    //return Object.entries(usedMethods).map(([key, value]) => (value === true) && ({id: Number(key)}));
  };

  const getRequiredEquipment = () => {
    //if (!equipmentRows.length) return [];
    return equipmentRows.map(e => ({amount: Number(e.amount), id: Number(e.id)}));
  };

  const getRequiredIngredients = () => {
    //if (!ingredientRows.length) return [];
    return ingredientRows.map(i => ({amount: Number(i.amount), measurementId: Number(i.measurementId), id: Number(i.id)}));
  };

  const getRequiredSubrecipes = () => {
    //if (subrecipeRows.length) return [];
    return subrecipeRows.map(s => ({amount: Number(s.amount), measurementId: Number(s.measurementId), id: Number(s.id)}));
  };

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

    if (editing && editingId) {
      const recipeEditInfo = {...recipeInfo, id: editingId, recipePrevImage, equipmentPrevImage, ingredientsPrevImage, cookingPrevImage};

      if (staffIsAuthenticated) dispatch(editRecipe(recipeEditInfo));
      else {
        if      (ownership === "private") dispatch(editPrivateRecipe(recipeEditInfo));
        else if (ownership === "public")  dispatch(editPublicRecipe(recipeEditInfo));
      }
    }
    else {
      if (staffIsAuthenticated) dispatch(createNewRecipe(recipeInfo));
      else {
        if      (ownership === "private") dispatch(createNewPrivateRecipe(recipeInfo));
        else if (ownership === "public")  dispatch(createNewPublicRecipe(recipeInfo));
      }
      
    }
  };

  const makeCookingCrops = async (crop: Crop) => {
    if (!cookingImageRef || !cookingImageRef.current) return;
    if (!crop.width) return;
    const full = await getCroppedImage(280, 172, cookingImageRef.current, crop);
    if (!full) return;
    setCookingFullCrop(full.preview);
    setCookingFullImage(full.final);
  };

  const makeEquipmentCrops = async (crop: Crop) => {
    if (!equipmentImageRef || !equipmentImageRef.current) return;
    if (!crop.width) return;
    const full = await getCroppedImage(280, 172, equipmentImageRef.current, crop);
    if (!full) return;
    setEquipmentFullCrop(full.preview);
    setEquipmentFullImage(full.final);
  };

  const makeIngredientsCrops = async (crop: Crop) => {
    if (!ingredientsImageRef || !ingredientsImageRef.current) return;
    if (!crop.width) return;
    const full = await getCroppedImage(280, 172, ingredientsImageRef.current, crop);
    if (!full) return;
    setIngredientsFullCrop(full.preview);
    setIngredientsFullImage(full.final);
  };

  const makeRecipeCrops = async (crop: Crop) => {
    if (!recipeImageRef || !recipeImageRef.current) return;
    if (!crop.width) return;
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

  const removeEquipmentRow = (rowKey: string) => {
    const newEquipmentRows = equipmentRows.filter(row => row.key !== rowKey);
    setEquipmentRows(newEquipmentRows);
  };

  const removeIngredientRow = (rowKey: string) => {
    const newIngredientRows = ingredientRows.filter(row => row.key !== rowKey);
    setIngredientRows(newIngredientRows);
  };

  const removeSubrecipeRow = (rowKey: string) => {
    const newSubrecipeRows = subrecipeRows.filter(row => row.key !== rowKey);
    setSubrecipeRows(newSubrecipeRows);
  };

  const setRequiredEquipment = (required: IExistingRequiredEquipment[]) => {
    const rows = required.map(r => ({key: uuid(), amount: r.amount, type: r.equipment_type_id, id: r.equipment_id}));
    setEquipmentRows(rows);
  };

  const setRequiredIngredients = (required: IExistingRequiredIngredient[]) => {
    const rows = required.map(r => ({key: uuid(), amount: r.amount, measurementId: r.measurement_id, type: r.ingredient_type_id, id: r.ingredient_id}));
    setIngredientRows(rows);
  };

  const setRequiredSubrecipes = (required: IExistingRequiredSubrecipe[]) => {
    const rows = required.map(r => ({key: uuid(), amount: r.amount, measurementId: r.measurement_id, type: r.recipe_type_id, cuisine: r.cuisine_id, id: r.subrecipe_id}));
    setSubrecipeRows(rows);
  };

  return (
    <NewRecipeView
      addEquipmentRow={addEquipmentRow}
      addIngredientRow={addIngredientRow}
      addSubrecipeRow={addSubrecipeRow}
      authname={authname}
      cancelCookingImage={cancelCookingImage}
      cancelEquipmentImage={cancelEquipmentImage}
      cancelIngredientsImage={cancelIngredientsImage}
      cancelRecipeImage={cancelRecipeImage}
      cookingCrop={cookingCrop}
      cookingFullCrop={cookingFullCrop}
      cookingImage={cookingImage}
      cookingPrevImage={cookingPrevImage}
      cuisineId={cuisineId}
      cuisines={cuisines}
      equipment={equipment}
      ingredients={ingredients}
      ingredientTypes={ingredientTypes}
      measurements={measurements}
      methods={methods}
      myFavoriteRecipes={myFavoriteRecipes}
      myPrivateEquipment={myPrivateEquipment}
      myPrivateIngredients={myPrivateIngredients}
      myPrivateRecipes={myPrivateRecipes}
      myPublicRecipes={myPublicRecipes}
      mySavedRecipes={mySavedRecipes}
      recipes={recipes}
      recipeTypes={recipeTypes}
      description={description}
      directions={directions}
      editing={editing}
      equipmentCrop={equipmentCrop}
      equipmentFullCrop={equipmentFullCrop}
      equipmentImage={equipmentImage}
      equipmentPrevImage={equipmentPrevImage}
      equipmentRows={equipmentRows}
      feedback={feedback}
      changeCuisine={changeCuisine}
      changeDescription={changeDescription}
      changeDirections={changeDirections}
      changeEquipmentRow={changeEquipmentRow}
      changeIngredientRow={changeIngredientRow}
      changeMethods={changeMethods}
      changeRecipeType={changeRecipeType}
      submit={submit}
      changeSubrecipeRow={changeSubrecipeRow}
      changeTitle={changeTitle}
      id={id}
      ingredientsCrop={ingredientsCrop}
      ingredientsFullCrop={ingredientsFullCrop}
      ingredientsImage={ingredientsImage}
      ingredientsPrevImage={ingredientsPrevImage}
      ingredientRows={ingredientRows}
      loading={loading}
      usedMethods={usedMethods}
      onCookingCropChange={onCookingCropChange}
      onCookingCropComplete={onCookingCropComplete}
      onCookingImageLoaded={onCookingImageLoaded}
      onEquipmentCropChange={onEquipmentCropChange}
      onEquipmentCropComplete={onEquipmentCropComplete}
      onEquipmentImageLoaded={onEquipmentImageLoaded}
      onIngredientsCropChange={onIngredientsCropChange}
      onIngredientsCropComplete={onIngredientsCropComplete}
      onIngredientsImageLoaded={onIngredientsImageLoaded}
      onRecipeCropChange={onRecipeCropChange}
      onRecipeCropComplete={onRecipeCropComplete}
      onRecipeImageLoaded={onRecipeImageLoaded}
      onSelectFile={onSelectFile}
      ownership={ownership}
      recipeCrop={recipeCrop}
      recipeFullCrop={recipeFullCrop}
      recipeImage={recipeImage}
      recipePrevImage={recipePrevImage}
      recipeThumbCrop={recipeThumbCrop}
      recipeTinyCrop={recipeTinyCrop}
      recipeTypeId={recipeTypeId}
      removeEquipmentRow={removeEquipmentRow}
      removeIngredientRow={removeIngredientRow}
      removeSubrecipeRow={removeSubrecipeRow}
      staffIsAuthenticated={staffIsAuthenticated}
      subrecipeRows={subrecipeRows}
      theme={theme}
      title={title}
    />
  );
};

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
  [index: string]: any;
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
  type:            string | number;  // equipmentTypeId?
  id:              string | number;
}

export interface IIngredientRow {
  [index: string]: any;
  key:             string;
  amount:          string | number;
  measurementId:   string | number;
  type:            string | number;  // ingredientTypeId?
  id:              string | number;
}

export interface ISubrecipeRow {
  [index: string]: any;
  key:             string;
  amount:          string | number;
  measurementId:   string | number;
  type:            string | number;  // recipeTypeId?
  cuisine:         string | number;  // cuisineId?
  id:              string | number;
}

type Props = {
  editing:   boolean;
  ownership: string;
};