import {
  IIngredient,
  IIngredientType,
  IMeasurement
} from '../../../store/data/types';

// TO DO: Add brand and variety

export function IngredientRow({
  amount,
  ingredients,
  ingredientTypes,
  measurements,
  myPrivateIngredients,
  changeIngredientRow,
  id,
  removeIngredientRow,
  rowKey,
  type,
  measurementId
}: Props): JSX.Element {
  const availableIngredients = [
    ...ingredients,
    ...(myPrivateIngredients.length ? myPrivateIngredients : [])
  ];
  return (
    <div className="recipe-row">
      <label className="recipe-row__label">Amount:</label>

      <input
        className="recipe-row__input"
        max="9999"
        min="0.125"
        name="amount"
        onChange={(e) => changeIngredientRow(e, rowKey)}
        required
        step="any"
        type="number"
        value={amount}
      />

      <label className="recipe-row__label">Unit:</label>

      <select
        className="recipe-row__select"
        name="unit"
        onChange={(e) => changeIngredientRow(e, rowKey)}
        required
        value={measurementId}
      >
        <option value=""></option>

        {measurements.map((m, index) => (
          <option key={index} value={m.id}>{m.name}</option>
        ))}
      </select>

      <label className="recipe-row__label">Type:</label>

      <select
        className="recipe-row__select"
        name="type"
        onChange={(e) => changeIngredientRow(e, rowKey)}
        required
        value={type}
      >
        <option value=""></option>

        {ingredientTypes.map((i, index) => (
          <option key={index} value={i.id}>{i.name}</option>
        ))}
      </select>

      <label className="recipe-row__label">Ingredient:</label>

      <select
        className="recipe-row__select"
        name="ingredient"
        onChange={(e) => changeIngredientRow(e, rowKey)}
        required
        value={id}
      >
        <option value=""></option>

        {availableIngredients
          .filter(i => i.ingredient_type_id == type)
          .map((i, index) => (
            <option key={index} value={i.id}>{i.name}</option>
          ))}
      </select>

      <button
        className="recipe-row__button--remove"
        onClick={() => removeIngredientRow(rowKey)}
      >
        Remove
      </button>
    </div>
  );
}

type Props = {
  amount: string | number;
  changeIngredientRow(
    e: React.SyntheticEvent<EventTarget>,
    rowKey: string
  ): void;
  ingredients: IIngredient[];
  ingredientTypes: IIngredientType[];
  measurements: IMeasurement[];
  myPrivateIngredients: IIngredient[];
  id: string | number;
  removeIngredientRow(rowKey: string): void;
  rowKey: string;
  type: string | number;
  measurementId: string | number;
};