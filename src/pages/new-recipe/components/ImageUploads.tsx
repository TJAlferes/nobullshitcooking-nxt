import ReactCrop, { Crop } from 'react-image-crop';

const url = "https://s3.amazonaws.com/nobsc-user-recipe";

function ToolTip() {
  return <span className="crop-tool-tip">Move the crop to your desired position. The image&#40;s&#41; will be saved for you:</span>;
}
// TO DO: change h4 elems to label elms with for attr
// TO DO: change some div elems to react fragments (maybe)
export function ImageUploads({
  cancelCookingImage,
  cancelEquipmentImage,
  cancelIngredientsImage,
  cancelRecipeImage,
  cookingCrop,
  cookingFullCrop,
  cookingImage,
  cookingPrevImage,
  editing,
  equipmentCrop,
  equipmentFullCrop,
  equipmentImage,
  equipmentPrevImage,
  ingredientsCrop,
  ingredientsFullCrop,
  ingredientsImage,
  ingredientsPrevImage,
  loading,
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
  recipeCrop,
  recipeFullCrop,
  recipeImage,
  recipePrevImage,
  recipeThumbCrop,
  recipeTinyCrop
}: Props): JSX.Element {
  const commonReactCropProps = {
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
            {!editing ? <img src={`${url}/nobsc-recipe-default`} /> : recipePrevImage && <img src={`${url}/${recipePrevImage}`} />}
            <h4>Change</h4>
            <input accept="image/*" name="image-input" onChange={onSelectRecipeFile} type="file" />
          </div>
        )}

        {recipeImage && (
          <div>
            <ReactCrop
              crop={recipeCrop}
              imageStyle={{minHeight: "300px"}}
              onChange={onRecipeCropChange}
              onComplete={onRecipeCropComplete}
              onImageLoaded={onRecipeImageLoaded}
              src={recipeImage as string}
              {...commonReactCropProps}
            />

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
            {!editing ? <img src={`${url}/nobsc-recipe-default`} /> : equipmentPrevImage && <img src={`${url}-equipment/${equipmentPrevImage}`} />}
            <h4>Change</h4>
            <input accept="image/*" name="equipment-image-input" onChange={onSelectEquipmentFile} type="file" />
          </div>
        )}

        {equipmentImage && (
          <div>
            <ReactCrop
              crop={equipmentCrop}
              imageStyle={{minHeight: "300px"}}
              onChange={onEquipmentCropChange}
              onComplete={onEquipmentCropComplete}
              onImageLoaded={onEquipmentImageLoaded}
              src={equipmentImage as string}
              {...commonReactCropProps}
            />
            
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
            {!editing ? <img src={`${url}/nobsc-recipe-default`} /> : ingredientsPrevImage && <img src={`${url}-ingredients/${ingredientsPrevImage}`} />}
            <h4>Change</h4>
            <input accept="image/*" name="ingredients-image-input" onChange={onSelectIngredientsFile} type="file" />
          </div>
        )}

        {ingredientsImage && (
          <div>
            <ReactCrop
              crop={ingredientsCrop}
              imageStyle={{minHeight: "300px"}}
              onChange={onIngredientsCropChange}
              onComplete={onIngredientsCropComplete}
              onImageLoaded={onIngredientsImageLoaded}
              src={ingredientsImage as string}
              {...commonReactCropProps}
            />
            
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
            {!editing ? <img src={`${url}/nobsc-recipe-default`} /> : cookingPrevImage && <img src={`${url}-cooking/${cookingPrevImage}`} />}
            <h4>Change</h4>
            <input accept="image/*" name="cooking-image-input" onChange={onSelectCookingFile} type="file" />
          </div>
        )}

        {cookingImage && (
          <div>
            <ReactCrop
              crop={cookingCrop}
              imageStyle={{minHeight: "300px"}}
              onChange={onCookingCropChange}
              onComplete={onCookingCropComplete}
              onImageLoaded={onCookingImageLoaded}
              src={cookingImage as string}
              {...commonReactCropProps}
            />
            
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

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

type Props = {
  cancelCookingImage():                              void;
  cancelEquipmentImage():                            void;
  cancelIngredientsImage():                          void;
  cancelRecipeImage():                               void;
  cookingCrop:                                       Crop;
  cookingFullCrop:                                   string;
  cookingImage:                                      string | ArrayBuffer | null;
  cookingPrevImage:                                  string;
  editing:                                           boolean;
  equipmentCrop:                                     Crop;
  equipmentFullCrop:                                 string;
  equipmentImage:                                    string | ArrayBuffer | null;
  equipmentPrevImage:                                string;
  ingredientsCrop:                                   Crop;
  ingredientsFullCrop:                               string;
  ingredientsImage:                                  string | ArrayBuffer | null;
  ingredientsPrevImage:                              string;
  loading:                                           boolean;
  onCookingCropChange(crop: Crop):                   void;
  onCookingCropComplete(crop: Crop):                 void;
  onCookingImageLoaded(image: HTMLImageElement):     void;
  onEquipmentCropChange(crop: Crop):                 void;
  onEquipmentCropComplete(crop: Crop):               void;
  onEquipmentImageLoaded(image: HTMLImageElement):   void;
  onIngredientsCropChange(crop: Crop):               void;
  onIngredientsCropComplete(crop: Crop):             void;
  onIngredientsImageLoaded(image: HTMLImageElement): void;
  onRecipeCropChange(crop: Crop):                    void;
  onRecipeCropComplete(crop: Crop):                  void;
  onRecipeImageLoaded(image: HTMLImageElement):      void;
  onSelectCookingFile(e: ChangeEvent):               void;
  onSelectEquipmentFile(e: ChangeEvent):             void;
  onSelectIngredientsFile(e: ChangeEvent):           void;
  onSelectRecipeFile(e: ChangeEvent):                void;
  recipeCrop:                                        Crop;
  recipeFullCrop:                                    string;
  recipeImage:                                       string | ArrayBuffer | null;
  recipePrevImage:                                   string;
  recipeThumbCrop:                                   string;
  recipeTinyCrop:                                    string;
};