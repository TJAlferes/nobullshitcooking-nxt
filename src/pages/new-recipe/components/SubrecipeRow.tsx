import type { ICuisine, IMeasurement, IRecipeType, IWorkRecipe } from '../../../store/data/types';

// TO DO: limit subrecipes per recipe
export function SubrecipeRow({
  measurements,
  recipeTypes,
  cuisines,
  recipes,
  myFavoriteRecipes,
  mySavedRecipes,
  myPrivateRecipes,
  myPublicRecipes,
  editingId,
  selfId,
  rowKey,
  amount,
  measurementId,
  type,
  cuisine,
  id,
  changeSubrecipeRow,
  removeSubrecipeRow,
}: Props) {
  const availableRecipes = [
    ...recipes,
    ...(myFavoriteRecipes.length ? myFavoriteRecipes : []),  // TO DO: make sure they can't be the author
    ...(mySavedRecipes.length    ? mySavedRecipes    : []),  // TO DO: make sure they can't be the author
    ...(myPrivateRecipes.length  ? (editingId && selfId !== 0 ? myPrivateRecipes.filter(r => r.id != selfId) : myPrivateRecipes) : []),
    ...(myPublicRecipes.length   ? (editingId && selfId !== 0 ? myPublicRecipes.filter(r => r.id != selfId)  : myPublicRecipes)  : [])
  ];

  return (
    <div className="recipe-row">
      <label>Amount:</label>
      <input
        max="9999"
        min="0.125"
        name="amount"
        onChange={(e) => changeSubrecipeRow(e, rowKey)}
        required
        step="any"
        type="number"
        value={amount}
      />

      <label>Unit:</label>
      <select
        name="unit"
        onChange={(e) => changeSubrecipeRow(e, rowKey)}
        required
        value={measurementId}
      >
        <option value=""></option>
        {measurements.map((m, index) => <option key={index} value={m.id}>{m.name}</option>)}
      </select>

      <label>Type:</label>
      <select
        name="type"
        onChange={(e) => changeSubrecipeRow(e, rowKey)}
        required
        value={type}
      >
        <option value=""></option>
        {recipeTypes.map((r, index) => <option key={index} value={r.id}>{r.name}</option>)}
      </select>

      <label>Cuisine:</label>
      <select
        name="cuisine"
        onChange={(e) => changeSubrecipeRow(e, rowKey)}
        required
        value={cuisine}
      >
        <option value=""></option>
        {cuisines.map((c, index) => <option key={index} value={c.id}>{c.name}</option>)}
      </select>

      <label>Subrecipe:</label>
      <select
        className="--subrecipe"
        name="subrecipe"
        onChange={(e) => changeSubrecipeRow(e, rowKey)}
        required
        value={id}
      >
        <option value=""></option>
        {availableRecipes
          .filter(r => r.recipe_type_id == type)
          .filter(r => r.cuisine_id == cuisine)
          .map((r, index) => <option key={index} value={r.id}>{r.title}</option>)}
      </select>

      <button className="--remove" onClick={() => removeSubrecipeRow(rowKey)}>Remove</button>
    </div>
  );
}

type SyntheticEvent = React.SyntheticEvent<EventTarget>;

type Props = {
  measurements:       IMeasurement[];
  recipeTypes:        IRecipeType[];
  cuisines:           ICuisine[];
  recipes:            IWorkRecipe[];
  myFavoriteRecipes:  IWorkRecipe[];
  mySavedRecipes:     IWorkRecipe[];
  myPrivateRecipes:   IWorkRecipe[];
  myPublicRecipes:    IWorkRecipe[];
  editingId:          number | null;
  selfId:             number;
  rowKey:             string;
  amount:             string | number;
  measurementId:      string | number;  // rename ?
  type:               string | number;  // rename ?
  cuisine:            string | number;  // rename ?
  id:                 string | number;  // rename ?
  changeSubrecipeRow: (e: SyntheticEvent, rowKey: string) => void;
  removeSubrecipeRow: (rowKey: string) =>                    void;
};
