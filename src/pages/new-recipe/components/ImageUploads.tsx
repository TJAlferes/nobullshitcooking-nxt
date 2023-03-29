import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const url = "https://s3.amazonaws.com/nobsc-user-recipe";

function ToolTip() {
  return <span className="crop-tool-tip">Move the crop to your desired position. The image&#40;s&#41; will be saved for you:</span>;
}

// TO DO: change h4 elems to label elms with for attr
// TO DO: change some div elems to react fragments (maybe)
export function ImageUploads({
  loading,
  editingId,
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
  cancelCookingImage
}: Props) {
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

  return (
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
  );
}

type ChangeEvent =    React.ChangeEvent<HTMLInputElement>;
type SyntheticEvent = React.SyntheticEvent<HTMLImageElement>;

type Props = {
  loading:              boolean;

  editingId:            number | null;

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
};
