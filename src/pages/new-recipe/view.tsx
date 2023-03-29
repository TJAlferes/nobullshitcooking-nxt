import Link from          'next/link';
import type { Crop } from 'react-image-crop';

import { ExpandCollapse, LoaderButton } from '../../components';
import type { ICuisine, IEquipment, IIngredient, IIngredientType, IMeasurement, IMethod, IRecipeType, IWorkRecipe } from '../../store/data/types';
import { EquipmentRow, IngredientRow, SubrecipeRow, ImageUploads } from './components';
import type { IMethods, IEquipmentRow, IIngredientRow, ISubrecipeRow } from './index.page';

export function NewRecipeView({
  id,
  ownership,
  measurements,
  equipment,
  myEquipment,
  ingredientTypes,
  ingredients,
  myIngredients,
  recipeTypes,
  cuisines,
  methods,
  recipes,
  myFavoriteRecipes,
  mySavedRecipes,
  myPrivateRecipes,
  myPublicRecipes,
  authname,
  feedback,
  loading,
  editingId,
  recipeTypeId,
  cuisineId,
  title,
  description,
  directions,
  usedMethods,
  equipmentRows,
  ingredientRows,
  subrecipeRows,
  recipePrevImage,
  recipeImage,
  recipeCrop,
  recipeFullCrop,
  recipeThumbCrop,
  recipeTinyCrop,
  equipmentPrevImage,
  equipmentImage,
  equipmentCrop,
  equipmentFullCrop,
  ingredientsPrevImage,
  ingredientsImage,
  ingredientsCrop,
  ingredientsFullCrop,
  cookingPrevImage,
  cookingImage,
  cookingCrop,
  cookingFullCrop,
  changeRecipeType,
  changeCuisine,
  changeTitle,
  changeDescription,
  changeDirections,
  changeMethods,
  changeEquipmentRow,
  changeIngredientRow,
  changeSubrecipeRow,
  addEquipmentRow,
  addIngredientRow,
  addSubrecipeRow,
  removeEquipmentRow,
  removeIngredientRow,
  removeSubrecipeRow,
  onSelectFile,
  onRecipeImageLoaded,
  onRecipeCropChange,
  onRecipeCropComplete,
  cancelRecipeImage,
  onEquipmentImageLoaded,
  onEquipmentCropChange,
  onEquipmentCropComplete,
  cancelEquipmentImage,
  onIngredientsImageLoaded,
  onIngredientsCropChange,
  onIngredientsCropComplete,
  cancelIngredientsImage,
  onCookingImageLoaded,
  onCookingCropChange,
  onCookingCropComplete,
  cancelCookingImage,
  submit
}: Props) {
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
            <EquipmentRow
              key={key}
              equipment={equipment}
              myEquipment={ownership === "private" ? myEquipment : []}
              rowKey={key}
              amount={amount}
              type={type}
              id={id}
              changeEquipmentRow={changeEquipmentRow}
              removeEquipmentRow={removeEquipmentRow}
            />
          ))}
        </div>
        <button className="--add-row" onClick={addEquipmentRow}>Add Equipment</button>
      </div>

      <div className="required-ingredients">
        <h2>Ingredients</h2>
        <div className="ingredient-rows">
          {ingredientRows.map(({ key, amount, measurementId, type, id }) => (
            <IngredientRow
              key={key}
              measurements={measurements}
              ingredientTypes={ingredientTypes}
              ingredients={ingredients}
              myIngredients={ownership === "private" ? myIngredients : []}
              rowKey={key}
              amount={amount}
              measurementId={measurementId}
              type={type}
              id={id}
              changeIngredientRow={changeIngredientRow}
              removeIngredientRow={removeIngredientRow}
            />
          ))}
        </div>
        <button className="--add-row" onClick={addIngredientRow}>Add Ingredient</button>
      </div>

      <div className="required-subrecipes">
        <h2>Subrecipes</h2>
        <div className="subrecipe-rows">
          {subrecipeRows.map(s => (
            <SubrecipeRow
              key={s.key}
              measurements={measurements}
              recipeTypes={recipeTypes}
              cuisines={cuisines}
              recipes={recipes}
              myFavoriteRecipes={myFavoriteRecipes}
              mySavedRecipes={mySavedRecipes}
              myPrivateRecipes={ownership === "private" ? myPrivateRecipes : []}
              myPublicRecipes={myPublicRecipes}
              editingId={editingId}
              selfId={id}
              rowKey={s.key}
              amount={s.amount}
              measurementId={s.measurementId}
              type={s.type}
              cuisine={s.cuisine}
              id={s.id}
              changeSubrecipeRow={changeSubrecipeRow}
              removeSubrecipeRow={removeSubrecipeRow}
            />
          ))}
        </div>
        <button className="--add-row" onClick={addSubrecipeRow}>Add Subrecipe</button>
      </div>

      <h2>Directions</h2>
      <textarea className="directions" id="recipe_directions" name="directions" onChange={changeDirections} value={directions} />

      <ImageUploads
        cancelCookingImage={cancelCookingImage}
        cancelEquipmentImage={cancelEquipmentImage}
        cancelIngredientsImage={cancelIngredientsImage}
        cancelRecipeImage={cancelRecipeImage}
        cookingCrop={cookingCrop}
        cookingFullCrop={cookingFullCrop}
        cookingImage={cookingImage}
        cookingPrevImage={cookingPrevImage}
        editingId={editingId}
        equipmentCrop={equipmentCrop}
        equipmentFullCrop={equipmentFullCrop}
        equipmentImage={equipmentImage}
        equipmentPrevImage={equipmentPrevImage}
        ingredientsCrop={ingredientsCrop}
        ingredientsFullCrop={ingredientsFullCrop}
        ingredientsImage={ingredientsImage}
        ingredientsPrevImage={ingredientsPrevImage}
        loading={loading}
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
        recipeCrop={recipeCrop}
        recipeFullCrop={recipeFullCrop}
        recipeImage={recipeImage}
        recipePrevImage={recipePrevImage}
        recipeThumbCrop={recipeThumbCrop}
        recipeTinyCrop={recipeTinyCrop}
      />

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

type ChangeEvent =         React.ChangeEvent<HTMLInputElement>;
type SyntheticEvent =      React.SyntheticEvent<EventTarget>;
//type SyntheticImageEvent = React.SyntheticEvent<HTMLImageElement>;

type Props = {
  id:        number;
  ownership: string;

  measurements:      IMeasurement[];
  equipment:         IEquipment[];
  myEquipment:       IEquipment[];
  ingredientTypes:   IIngredientType[];
  ingredients:       IIngredient[];
  myIngredients:     IIngredient[];
  recipeTypes:       IRecipeType[];
  cuisines:          ICuisine[];
  methods:           IMethod[];
  recipes:           IWorkRecipe[];
  myFavoriteRecipes: IWorkRecipe[];
  mySavedRecipes:    IWorkRecipe[];
  myPrivateRecipes:  IWorkRecipe[];
  myPublicRecipes:   IWorkRecipe[];

  authname: string;
  
  feedback: string;
  loading:  boolean;

  editingId: number | null;

  recipeTypeId: number;
  cuisineId:    number;
  title:        string;
  description:  string;
  directions:   string;

  usedMethods:    IMethods;
  equipmentRows:  IEquipmentRow[];
  ingredientRows: IIngredientRow[];
  subrecipeRows:  ISubrecipeRow[];

  recipePrevImage:      string;
  recipeImage:          string | ArrayBuffer | null;
  recipeCrop:           Crop;
  recipeFullCrop:       string;
  recipeThumbCrop:      string;
  recipeTinyCrop:       string;
  
  equipmentPrevImage:   string;
  equipmentImage:       string | ArrayBuffer | null;
  equipmentCrop:        Crop;
  equipmentFullCrop:    string;
  
  ingredientsPrevImage: string;
  ingredientsImage:     string | ArrayBuffer | null;
  ingredientsCrop:      Crop;
  ingredientsFullCrop:  string;

  cookingPrevImage:     string;
  cookingImage:         string | ArrayBuffer | null;
  cookingCrop:          Crop;
  cookingFullCrop:      string;

  changeRecipeType:    (e: SyntheticEvent) => void;
  changeCuisine:       (e: SyntheticEvent) => void;
  changeTitle:         (e: SyntheticEvent) => void;
  changeDescription:   (e: SyntheticEvent) => void;
  changeDirections:    (e: SyntheticEvent) => void;
  changeMethods:       (e: SyntheticEvent) => void;
  changeEquipmentRow:  (e: SyntheticEvent, rowKey: string) => void;
  changeIngredientRow: (e: SyntheticEvent, rowKey: string) => void;
  changeSubrecipeRow:  (e: SyntheticEvent, rowKey: string) => void;
  addEquipmentRow:     () => void;
  addIngredientRow:    () => void;
  addSubrecipeRow:     () => void;
  removeEquipmentRow:  (rowKey: string) => void;
  removeIngredientRow: (rowKey: string) => void;
  removeSubrecipeRow:  (rowKey: string) => void;
  
  onSelectFile:              (e: ChangeEvent, type: string) => void;
  onRecipeImageLoaded:       (e: SyntheticEvent) => void;
  onRecipeCropChange:        (crop: Crop) => void;
  onRecipeCropComplete:      (crop: Crop) => void;
  cancelRecipeImage:         () => void;
  onEquipmentImageLoaded:    (e: SyntheticEvent) => void;
  onEquipmentCropChange:     (crop: Crop) => void;
  onEquipmentCropComplete:   (crop: Crop) => void;
  cancelEquipmentImage:      () => void;
  onIngredientsImageLoaded:  (e: SyntheticEvent) => void;
  onIngredientsCropChange:   (crop: Crop) => void;
  onIngredientsCropComplete: (crop: Crop) => void;
  cancelIngredientsImage:    () => void;
  onCookingImageLoaded:      (e: SyntheticEvent) => void;
  onCookingCropChange:       (crop: Crop) => void;
  onCookingCropComplete:     (crop: Crop) => void;
  cancelCookingImage:        () => void;

  submit: () => void;
};
