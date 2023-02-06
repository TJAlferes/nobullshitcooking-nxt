import type { ICuisine, IMeasurement, IRecipeType, IWorkRecipe } from '../../../store/data/types';

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
  editingId,
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
    ...(myPrivateRecipes.length
      ? (editingId && selfId !== 0
        ? myPrivateRecipes.filter(r => r.id != selfId)
        : myPrivateRecipes
      )
      : []
    ),
    ...(myPublicRecipes.length
      ? (editingId && selfId !== 0
        ? myPublicRecipes.filter(r => r.id != selfId)
        : myPublicRecipes
      )
      : []
    ),
    ...(mySavedRecipes.length ? mySavedRecipes : []),
    ...recipes,
  ];

  return (
    <div className="recipe-row">
      <label>Amount:</label>
      <input max="9999" min="0.125" name="amount" onChange={(e) => changeSubrecipeRow(e, rowKey)} required step="any" type="number" value={amount} />

      <label>Unit:</label>
      <select name="unit" onChange={(e) => changeSubrecipeRow(e, rowKey)} required value={measurementId}>
        <option value=""></option>
        {measurements.map((m, index) => <option key={index} value={m.id}>{m.name}</option>)}
      </select>

      <label>Type:</label>
      <select name="type" onChange={(e) => changeSubrecipeRow(e, rowKey)} required value={type}>
        <option value=""></option>
        {recipeTypes.map((r, index) => <option key={index} value={r.id}>{r.name}</option>)}
      </select>

      <label>Cuisine:</label>
      <select name="cuisine" onChange={(e) => changeSubrecipeRow(e, rowKey)} required value={cuisine}>
        <option value=""></option>
        {cuisines.map((c, index) => <option key={index} value={c.id}>{c.name}</option>)}
      </select>

      <label>Subrecipe:</label>
      <select className="--subrecipe" name="subrecipe" required value={id} onChange={(e) => changeSubrecipeRow(e, rowKey)}>
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
  amount:                                                string | number;
  changeSubrecipeRow(e: SyntheticEvent, rowKey: string): void;
  cuisine:                                               string | number;
  cuisines:                                              ICuisine[];
  measurements:                                          IMeasurement[];
  myFavoriteRecipes:                                     IWorkRecipe[];
  myPrivateRecipes:                                      IWorkRecipe[];
  myPublicRecipes:                                       IWorkRecipe[];
  mySavedRecipes:                                        IWorkRecipe[];
  recipes:                                               IWorkRecipe[];
  recipeTypes:                                           IRecipeType[];
  editingId:                                             number | null;
  removeSubrecipeRow(rowKey: string):                    void;
  rowKey:                                                string;
  selfId:                                                number;
  id:                                                    string | number;
  type:                                                  string | number;
  measurementId:                                         string | number;
};
