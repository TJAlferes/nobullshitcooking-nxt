import React from 'react';

import { IEquipment } from '../../../store/data/types';

export function EquipmentRow({
  amount,
  equipment,
  myPrivateEquipment,
  id,
  handleEquipmentRowChange,
  removeEquipmentRow,
  rowKey,
  type
}: Props): JSX.Element {
  const availableEquipment = [
    ...equipment,
    ...(myPrivateEquipment.length ? myPrivateEquipment : [])
  ];
  return (
    <div className="equipment-row">

      <label className="equipment-row-label">Amount:</label>
      <select
        className="equipment-row-select-amount"
        name="amount"
        onChange={(e) => handleEquipmentRowChange(e, rowKey)}
        required
        value={amount}
      >
        <option value=""></option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <label className="equipment-row-label">Type:</label>
      <select
        className="equipment-row-select-equipment-type"
        name="type"
        onChange={(e) => handleEquipmentRowChange(e, rowKey)}
        required
        value={type}
      >
        <option value=""></option>
        <option value="2">Preparing</option>
        <option value="3">Cooking</option>
      </select>

      <label className="equipment-row-label">Equipment:</label>
      <select
        className="equipment-row-select-equipment"
        name="equipment"
        onChange={(e) => handleEquipmentRowChange(e, rowKey)}
        required
        value={id}
      >
        <option value=""></option>
        {availableEquipment
          .filter(e => e.equipment_type_id == type)
          .map((e, index) => (
            <option key={index} value={e.id}>{e.name}</option>
          ))}
      </select>

      <button
        className="new-recipe__remove-row-button"
        data-test="equipment-row-remove-row"
        onClick={() => removeEquipmentRow(rowKey)}
      >
        Remove
      </button>
    </div>
  );
}

type Props = {
  amount: string | number;
  equipment: IEquipment[];
  myPrivateEquipment: IEquipment[];
  id: string | number;
  handleEquipmentRowChange(
    e: React.SyntheticEvent<EventTarget>,
    rowKey: string
  ): void;
  removeEquipmentRow(rowKey: string): void;
  rowKey: string;
  type: string | number;
};