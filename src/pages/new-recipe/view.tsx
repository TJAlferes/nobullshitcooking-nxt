import Link from          'next/link';
import type { Crop } from 'react-image-crop';

import { ExpandCollapse, LoaderButton } from '../../components';
import type { ICuisine, IEquipment, IIngredient, IIngredientType, IMeasurement, IMethod, IRecipeType, IWorkRecipe } from '../../store/data/types';
import { EquipmentRow, IngredientRow, SubrecipeRow, ImageUploads } from './components';
import type { IMethods, IEquipmentRow, IIngredientRow, ISubrecipeRow } from './index.page';

export function NewRecipeView({
  addEquipmentRow,
  addIngredientRow,
  addSubrecipeRow,
  authname,
  cancelCookingImage,
  cancelEquipmentImage,
  cancelIngredientsImage,
  cancelRecipeImage,
  changeCuisine,
  changeDescription,
  changeDirections,
  changeEquipmentRow,
  changeIngredientRow,
  changeMethods,
  changeRecipeType,
  changeSubrecipeRow,
  changeTitle,
  cookingCrop,
  cookingFullCrop,
  cookingImage,
  cookingPrevImage,
  cuisineId,
  cuisines,
  equipment,
  ingredients,
  ingredientTypes,
  measurements,
  methods,
  myFavoriteRecipes,
  myEquipment,
  myIngredients,
  myPrivateRecipes,
  myPublicRecipes,
  mySavedRecipes,
  recipes,
  recipeTypes,
  description,
  directions,
  editingId,
  equipmentCrop,
  equipmentFullCrop,
  equipmentImage,
  equipmentPrevImage,
  equipmentRows,
  feedback,
  id,
  ingredientsCrop,
  ingredientsFullCrop,
  ingredientsImage,
  ingredientsPrevImage,
  ingredientRows,
  loading,
  usedMethods,
  onCookingCropChange,
  onCookingCropComplete,
  onCookingImageLoaded,
  onEquipmentCropChange,
  onEquipmentCropComplete,
  onEquipmentImageLoaded,
  onIngredientsCropChange,
  onIngredientsCropComplete,
  onIngredientsImageLoaded,
  onRecipeCropChange,
  onRecipeCropComplete,
  onRecipeImageLoaded,
  onSelectFile,
  ownership,
  recipeCrop,
  recipeFullCrop,
  recipeImage,
  recipePrevImage,
  recipeThumbCrop,
  recipeTinyCrop,
  recipeTypeId,
  removeEquipmentRow,
  removeIngredientRow,
  removeSubrecipeRow,
  submit,
  subrecipeRows,
  title
}: Props) {
  return (
    <div className="new-recipe one-col-a">
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
              amount={amount}
              equipment={equipment}
              myEquipment={ownership === "private" ? myEquipment : []}
              id={id}
              changeEquipmentRow={changeEquipmentRow}
              key={key}
              removeEquipmentRow={removeEquipmentRow}
              rowKey={key}
              type={type}
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
              amount={amount}
              ingredients={ingredients}
              ingredientTypes={ingredientTypes}
              measurementId={measurementId}
              measurements={measurements}
              myIngredients={ownership === "private" ? myIngredients : []}
              changeIngredientRow={changeIngredientRow}
              id={id}
              key={key}
              removeIngredientRow={removeIngredientRow}
              rowKey={key}
              type={type}
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
              amount={s.amount}
              cuisine={s.cuisine}
              cuisines={cuisines}
              measurementId={s.measurementId}
              measurements={measurements}
              myFavoriteRecipes={myFavoriteRecipes}
              myPrivateRecipes={ownership === "private" ? myPrivateRecipes : []}
              myPublicRecipes={myPublicRecipes}
              mySavedRecipes={mySavedRecipes}
              recipes={recipes}
              recipeTypes={recipeTypes}
              editingId={editingId}
              changeSubrecipeRow={changeSubrecipeRow}
              key={s.key}
              removeSubrecipeRow={removeSubrecipeRow}
              rowKey={s.key}
              selfId={id}
              id={s.id}
              type={s.type}
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
type SyntheticImageEvent = React.SyntheticEvent<HTMLImageElement>;

type Props = {
  addEquipmentRow():                                      void;
  addIngredientRow():                                     void;
  addSubrecipeRow():                                      void;
  authname:                                               string;
  cancelCookingImage():                                   void;
  cancelEquipmentImage():                                 void;
  cancelIngredientsImage():                               void;
  cancelRecipeImage():                                    void;
  changeCuisine(e: SyntheticEvent):                       void;
  changeDescription(e: SyntheticEvent):                   void;
  changeDirections(e: SyntheticEvent):                    void;
  changeEquipmentRow(e: SyntheticEvent, rowKey: string):  void;
  changeIngredientRow(e: SyntheticEvent, rowKey: string): void;
  changeMethods(e: SyntheticEvent):                       void;
  changeRecipeType(e: SyntheticEvent):                    void;
  changeSubrecipeRow(e: SyntheticEvent, rowKey: string):  void;
  changeTitle(e: SyntheticEvent):                         void;
  cookingCrop:                                            Crop;
  cookingFullCrop:                                        string;
  cookingImage:                                           string | ArrayBuffer | null;
  cookingPrevImage:                                       string;
  cuisineId:                                              number;
  cuisines:                                               ICuisine[];
  equipment:                                              IEquipment[];
  ingredients:                                            IIngredient[];
  ingredientTypes:                                        IIngredientType[];
  measurements:                                           IMeasurement[];
  methods:                                                IMethod[];
  myFavoriteRecipes:                                      IWorkRecipe[];
  myEquipment:                                            IEquipment[];
  myIngredients:                                          IIngredient[];
  myPrivateRecipes:                                       IWorkRecipe[];
  myPublicRecipes:                                        IWorkRecipe[];
  mySavedRecipes:                                         IWorkRecipe[];
  recipes:                                                IWorkRecipe[];
  recipeTypes:                                            IRecipeType[];
  description:                                            string;
  directions:                                             string;
  editingId:                                              number | null;
  equipmentCrop:                                          Crop;
  equipmentFullCrop:                                      string;
  equipmentImage:                                         string | ArrayBuffer | null;
  equipmentPrevImage:                                     string;
  equipmentRows:                                          IEquipmentRow[];
  feedback:                                               string;
  id:                                                     number;
  ingredientsCrop:                                        Crop;
  ingredientsFullCrop:                                    string;
  ingredientsImage:                                       string | ArrayBuffer | null;
  ingredientsPrevImage:                                   string;
  ingredientRows:                                         IIngredientRow[];
  loading:                                                boolean;
  usedMethods:                                            IMethods;
  onCookingCropChange(crop: Crop):                        void;
  onCookingCropComplete(crop: Crop):                      void;
  onCookingImageLoaded(e: SyntheticImageEvent):           void;
  onEquipmentCropChange(crop: Crop):                      void;
  onEquipmentCropComplete(crop: Crop):                    void;
  onEquipmentImageLoaded(e: SyntheticImageEvent):         void;
  onIngredientsCropChange(crop: Crop):                    void;
  onIngredientsCropComplete(crop: Crop):                  void;
  onIngredientsImageLoaded(e: SyntheticImageEvent):       void;
  onRecipeCropChange(crop: Crop):                         void;
  onRecipeCropComplete(crop: Crop):                       void;
  onRecipeImageLoaded(e: SyntheticImageEvent):            void;
  onSelectFile(e: ChangeEvent, type: string):             void;
  ownership:                                              string;
  recipeCrop:                                             Crop;
  recipeFullCrop:                                         string;
  recipeImage:                                            string | ArrayBuffer | null;
  recipePrevImage:                                        string;
  recipeThumbCrop:                                        string;
  recipeTinyCrop:                                         string;
  recipeTypeId:                                           number;
  removeEquipmentRow(rowKey: string):                     void;
  removeIngredientRow(rowKey: string):                    void;
  removeSubrecipeRow(rowKey: string):                     void;
  submit():                                               void;
  subrecipeRows:                                          ISubrecipeRow[];
  title:                                                  string;
};
