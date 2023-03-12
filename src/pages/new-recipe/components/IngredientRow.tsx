import type { IIngredient, IIngredientType, IMeasurement } from '../../../store/data/types';

// TO DO: Add brand and variety

export function IngredientRow({
  amount,
  ingredients,
  ingredientTypes,
  measurements,
  myIngredients,
  changeIngredientRow,
  id,
  removeIngredientRow,
  rowKey,
  type,
  measurementId
}: Props) {
  const availableIngredients = [...ingredients, ...myIngredients];
  
  return (
    <div className="recipe-row">
      <label>Amount:</label>
      <input max="9999" min="0.125" name="amount" onChange={(e) => changeIngredientRow(e, rowKey)} required step="any" type="number" value={amount} />

      <label>Unit:</label>
      <select name="unit" onChange={(e) => changeIngredientRow(e, rowKey)} required value={measurementId}>
        <option value=""></option>
        {measurements.map((m, index) => <option key={index} value={m.id}>{m.name}</option>)}
      </select>

      <label>Type:</label>
      <select name="type" onChange={(e) => changeIngredientRow(e, rowKey)} required value={type}>
        <option value=""></option>
        {ingredientTypes.map((i, index) => (<option key={index} value={i.id}>{i.name}</option>))}
      </select>

      <label>Ingredient:</label>
      <select name="ingredient" onChange={(e) => changeIngredientRow(e, rowKey)} required value={id}>
        <option value=""></option>
        {availableIngredients
          .filter(i => i.ingredient_type_id == type)
          .map((i, index) => <option key={index} value={i.id}>{i.name}</option>)}
      </select>

      <button className="--remove" onClick={() => removeIngredientRow(rowKey)}>Remove</button>
    </div>
  );
}

type SyntheticEvent = React.SyntheticEvent<EventTarget>;

type Props = {
  amount:                                                 string | number;
  changeIngredientRow(e: SyntheticEvent, rowKey: string): void;
  ingredients:                                            IIngredient[];
  ingredientTypes:                                        IIngredientType[];
  measurements:                                           IMeasurement[];
  myIngredients:                                          IIngredient[];
  id:                                                     string | number;
  removeIngredientRow(rowKey: string):                    void;
  rowKey:                                                 string;
  type:                                                   string | number;
  measurementId:                                          string | number;
};
