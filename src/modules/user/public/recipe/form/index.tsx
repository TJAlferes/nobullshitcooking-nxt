export default function UserPublicRecipeForm() {
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
