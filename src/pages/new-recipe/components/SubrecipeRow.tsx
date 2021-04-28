import {
  ICuisine,
  IMeasurement,
  IRecipeType,
  IWorkRecipe
} from '../../../store/data/types';

export function SubrecipeRow({
  amount,
  cuisine,
  cuisines,
  measurements,
  myFavoriteRecipes,
  myPrivateRecipes,
  myPublicRecipes,
  mySavedRecipes,
  recipes,
  recipeTypes,
  editing,
  changeSubrecipeRow,
  removeSubrecipeRow,
  rowKey,
  selfId,
  id,
  type,
  measurementId
}: Props): JSX.Element {
  const availableRecipes = [
    ...(myFavoriteRecipes.length ? myFavoriteRecipes : []),
    ...(
      myPrivateRecipes.length
        ? (
          editing && selfId !== 0
            ? myPrivateRecipes.filter(r => r.id != selfId)
            : myPrivateRecipes
        )
        : []
    ),
    ...(
      myPublicRecipes.length
        ? (
          editing && selfId !== 0
            ? myPublicRecipes.filter(r => r.id != selfId)
            : myPublicRecipes
        )
        : []
    ),
    ...(mySavedRecipes.length ? mySavedRecipes : []),
    ...recipes,
  ];

  return (
    <div className="subrecipe-row">

      <label className="subrecipe-row-label">Amount:</label>
      <input
        className="subrecipe-row-manual-amount"
        max="9999"
        min="0.125"
        name="amount"
        onChange={(e) => changeSubrecipeRow(e, rowKey)}
        required
        step="any"
        type="number"
        value={amount}
      />

      <label className="subrecipe-row-label">Unit:</label>
      <select
        className="subrecipe-row-select-unit"
        name="unit"
        onChange={(e) => changeSubrecipeRow(e, rowKey)}
        required
        value={measurementId}
      >
        <option value=""></option>
        {measurements.map((m, index) => (
          <option key={index} value={m.id}>{m.name}</option>
        ))}
      </select>

      <label className="subrecipe-row-label">Type:</label>
      <select
        className="subrecipe-ro-select-subrecipe-type"
        name="type"
        onChange={(e) => changeSubrecipeRow(e, rowKey)}
        required
        value={type}
      >
        <option value=""></option>
        {recipeTypes.map((r, index) => (
          <option key={index} value={r.id}>{r.name}</option>
        ))}
      </select>

      <label className="subrecipe-row-label">Cuisine:</label>
      <select
        className="subrecipe-row-select-cuisine"
        name="cuisine"
        onChange={(e) => changeSubrecipeRow(e, rowKey)}
        required
        value={cuisine}
      >
        <option value=""></option>
        {cuisines.map((c, index) => (
          <option key={index} value={c.id}>{c.name}</option>
        ))}
      </select>

      <label className="subrecipe-row-label">Subrecipe:</label>
      <select
        className="subrecipe-row-select-subrecipe"
        name="subrecipe"
        required
        value={id}
        onChange={(e) => changeSubrecipeRow(e, rowKey)}
      >
        <option value=""></option>
        {availableRecipes
          .filter(r => r.recipe_type_id == type)
          .filter(r => r.cuisine_id == cuisine)
          .map((r, index) => (
            <option key={index} value={r.id}>{r.title}</option>
          ))}
      </select>

      <button
        className="new-recipe__remove-row-button"
        data-test="subrecipe-row-remove-row"
        onClick={() => removeSubrecipeRow(rowKey)}
      >
        Remove
      </button>

    </div>
  );
}

type Props = {
  amount: string | number;
  cuisine: string | number;
  cuisines: ICuisine[];
  measurements: IMeasurement[];
  myFavoriteRecipes: IWorkRecipe[];
  myPrivateRecipes: IWorkRecipe[];
  myPublicRecipes: IWorkRecipe[];
  mySavedRecipes: IWorkRecipe[];
  recipes: IWorkRecipe[];
  recipeTypes: IRecipeType[];
  editing: boolean;
  changeSubrecipeRow(
    e: React.SyntheticEvent<EventTarget>,
    rowKey: string
  ): void;
  removeSubrecipeRow(rowKey: string): void;
  rowKey: string;
  selfId: number;
  id: string | number;
  type: string | number;
  measurementId: string | number;
};