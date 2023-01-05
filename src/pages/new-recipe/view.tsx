import Link from 'next/link';
import { Crop } from 'react-image-crop';

import { ExpandCollapse, LoaderButton } from '../../components';
import { ICuisine, IEquipment, IIngredient, IIngredientType, IMeasurement, IMethod, IRecipeType, IWorkRecipe } from '../../store/data/types';
import { EquipmentRow, IngredientRow, SubrecipeRow, ImageUploads } from './components';
import { IMethods, IEquipmentRow, IIngredientRow, ISubrecipeRow } from './index.page';

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
  myPrivateEquipment,
  myPrivateIngredients,
  myPrivateRecipes,
  myPublicRecipes,
  mySavedRecipes,
  recipes,
  recipeTypes,
  description,
  directions,
  editing,
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
  onSelectCookingFile,
  onSelectEquipmentFile,
  onSelectIngredientsFile,
  onSelectRecipeFile,
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
  staffIsAuthenticated,
  submit,
  subrecipeRows,
  theme,
  title
}: Props): JSX.Element {
  return (
    <div className={`new-recipe one-col-a ${theme}`}>
      <h1 className="new-recipe__h1">New Recipe</h1>

      <p className="feedback">{feedback}</p>

      <h2 className="new-recipe__h2">Ownership</h2>
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
      <div className="new-recipe-ownerships">
        <span className="new-recipe-ownership">
          <input checked={ownership === "private"} className="new-recipe-ownership__input" disabled={true} name="private" type="radio" value="private" />
          <label className="new-recipe-ownership__label">Private</label>
        </span>
        <span className="new-recipe-ownership">
          <input checked={ownership === "public"} className="new-recipe-ownership__input" disabled={true} name="public" type="radio" value="public" />
          <label className="new-recipe-ownership__label">Public</label>
        </span>
      </div>

      <h2 className="new-recipe__h2">Type of Recipe</h2>
      <select id="recipe_type_id" name="recipeType" onChange={changeRecipeType} required value={recipeTypeId}>
        <option value=""></option>
        {recipeTypes.map(({ id, name }) => (<option key={id} data-test={name} value={id}>{name}</option>))}
      </select>

      <h2 className="new-recipe__h2">Cuisine</h2>
      <select id="cuisine_id" name="cuisine" onChange={changeCuisine} required value={cuisineId}>
        <option value=""></option>
        {cuisines.map(({ id, name }) => (<option key={id} value={id} data-test={name}>{name}</option>))}
      </select>

      <h2 className="new-recipe__h2">Title</h2>
      <input className="new-recipe-title" id="recipe_title" name="title" onChange={changeTitle} type="text" value={title} />

      <h2 className="new-recipe__h2">Description / Author Note</h2>
      <input className="new-recipe-description" id="recipe_description" name="description" onChange={changeDescription} type="text" value={description} />

      <h2 className="new-recipe__h2">Methods</h2>
      <div className="new-recipe-methods">
        {methods.map(({ id, name }) => (
          <span className="new-recipe-method" key={id}>
            <input
              checked={usedMethods[id] === true ? true : false}
              className="new-recipe-method__input"
              data-test={`${id}-${name}`}
              id={`${id}`}
              onChange={e => changeMethods(e)}
              type="checkbox"
            />
            <label className="new-recipe-method__label" data-test={name}>{name}</label>
          </span>
        ))}
      </div>

      <div className="new-recipe-required-equipment">
        <h2 className="new-recipe__h2">Equipment</h2>
        <div className="new-recipe-equipment-rows">
          {equipmentRows.map(({ amount, id, key, type }) => (
            <EquipmentRow
              amount={amount}
              equipment={equipment}
              myPrivateEquipment={ownership === "private" ? myPrivateEquipment : []}
              id={id}
              changeEquipmentRow={changeEquipmentRow}
              key={key}
              removeEquipmentRow={removeEquipmentRow}
              rowKey={key}
              type={type}
            />
          ))}
        </div>
        <button className="new-recipe__button--add-row" onClick={addEquipmentRow}>Add Equipment</button>
      </div>

      <div className="new-recipe-required-ingredients">
        <h2 className="new-recipe__h2">Ingredients</h2>
        <div className="new-recipe-ingredient-rows">
          {ingredientRows.map(({ amount, unit, id, key, type }) => (
            <IngredientRow
              amount={amount}
              ingredients={ingredients}
              ingredientTypes={ingredientTypes}
              measurementId={unit}
              measurements={measurements}
              myPrivateIngredients={ownership === "private" ? myPrivateIngredients : []}
              changeIngredientRow={changeIngredientRow}
              id={id}
              key={key}
              removeIngredientRow={removeIngredientRow}
              rowKey={key}
              type={type}
            />
          ))}
        </div>
        <button className="new-recipe__button--add-row" onClick={addIngredientRow}>Add Ingredient</button>
      </div>

      <div className="new-recipe-required-subrecipes">
        <h2 className="new-recipe__h2">Subrecipes</h2>
        <div className="new-recipe-subrecipe-rows">
          {subrecipeRows.map(s => (
            <SubrecipeRow
              amount={s.amount}
              cuisine={s.cuisine}
              cuisines={cuisines}
              measurementId={s.unit}
              measurements={measurements}
              myFavoriteRecipes={myFavoriteRecipes}
              myPrivateRecipes={ownership === "private" ? myPrivateRecipes : []}
              myPublicRecipes={myPublicRecipes}
              mySavedRecipes={mySavedRecipes}
              recipes={recipes}
              recipeTypes={recipeTypes}
              editing={editing}
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
        <button className="new-recipe__button--add-row" onClick={addSubrecipeRow}>Add Subrecipe</button>
      </div>

      <h2 className="new-recipe__h2">Directions</h2>
      <textarea className="new-recipe-directions" id="recipe_directions" name="directions" onChange={changeDirections} value={directions} />

      <ImageUploads
        cancelCookingImage={cancelCookingImage}
        cancelEquipmentImage={cancelEquipmentImage}
        cancelIngredientsImage={cancelIngredientsImage}
        cancelRecipeImage={cancelRecipeImage}
        cookingCrop={cookingCrop}
        cookingFullCrop={cookingFullCrop}
        cookingImage={cookingImage}
        cookingPrevImage={cookingPrevImage}
        editing={editing}
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
        onSelectCookingFile={onSelectCookingFile}
        onSelectEquipmentFile={onSelectEquipmentFile}
        onSelectIngredientsFile={onSelectIngredientsFile}
        onSelectRecipeFile={onSelectRecipeFile}
        recipeCrop={recipeCrop}
        recipeFullCrop={recipeFullCrop}
        recipeImage={recipeImage}
        recipePrevImage={recipePrevImage}
        recipeThumbCrop={recipeThumbCrop}
        recipeTinyCrop={recipeTinyCrop}
      />

      <div className="new-recipe-finish">
        <Link href="/dashboard"><a className="cancel-button">Cancel</a></Link>
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

type SyntheticEvent = React.SyntheticEvent<EventTarget>;
type ChangeEvent =    React.ChangeEvent<HTMLInputElement>;

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
  myPrivateEquipment:                                     IEquipment[];
  myPrivateIngredients:                                   IIngredient[];
  myPrivateRecipes:                                       IWorkRecipe[];
  myPublicRecipes:                                        IWorkRecipe[];
  mySavedRecipes:                                         IWorkRecipe[];
  recipes:                                                IWorkRecipe[];
  recipeTypes:                                            IRecipeType[];
  description:                                            string;
  directions:                                             string;
  editing:                                                boolean;
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
  onCookingImageLoaded(image: HTMLImageElement):          void;
  onEquipmentCropChange(crop: Crop):                      void;
  onEquipmentCropComplete(crop: Crop):                    void;
  onEquipmentImageLoaded(image: HTMLImageElement):        void;
  onIngredientsCropChange(crop: Crop):                    void;
  onIngredientsCropComplete(crop: Crop):                  void;
  onIngredientsImageLoaded(image: HTMLImageElement):      void;
  onRecipeCropChange(crop: Crop):                         void;
  onRecipeCropComplete(crop: Crop):                       void;
  onRecipeImageLoaded(image: HTMLImageElement):           void;
  onSelectCookingFile(e: ChangeEvent):                    void;
  onSelectEquipmentFile(e: ChangeEvent):                  void;
  onSelectIngredientsFile(e: ChangeEvent):                void;
  onSelectRecipeFile(e: ChangeEvent):                     void;
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
  staffIsAuthenticated?:                                  boolean;
  submit():                                               void;
  subrecipeRows:                                          ISubrecipeRow[];
  theme:                                                  string;
  title:                                                  string;
};