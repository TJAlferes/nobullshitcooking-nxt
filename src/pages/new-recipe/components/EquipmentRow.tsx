import type { IEquipment } from '../../../store/data/types';

export function EquipmentRow({
  equipment,
  myEquipment,
  rowKey,
  amount,
  type,
  id,
  changeEquipmentRow,
  removeEquipmentRow
}: Props) {
  const availableEquipment = [...equipment, ...myEquipment];
  
  return (
    <div className="recipe-row">
      <label>Amount:</label>
      <select name="amount" onChange={(e) => changeEquipmentRow(e, rowKey)} required value={amount}>
        <option value=""></option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <label>Type:</label>
      <select name="type" onChange={(e) => changeEquipmentRow(e, rowKey)} required value={type}>
        <option value=""></option>
        <option value="2">Preparing</option>
        <option value="3">Cooking</option>
      </select>

      <label>Equipment:</label>
      <select name="equipment" onChange={(e) => changeEquipmentRow(e, rowKey)} required value={id}>
        <option value=""></option>
        {availableEquipment
          .filter(e => e.equipment_type_id == type)
          .map((e, index) => <option key={index} value={e.id}>{e.name}</option>)}
      </select>

      <button className="--remove" onClick={() => removeEquipmentRow(rowKey)}>Remove</button>
    </div>
  );
}

type SyntheticEvent = React.SyntheticEvent<EventTarget>;

type Props = {
  equipment:          IEquipment[];
  myEquipment:        IEquipment[];
  rowKey:             string;
  amount:             string | number;
  type:               string | number;
  id:                 string | number;
  changeEquipmentRow: (e: SyntheticEvent, rowKey: string) => void;
  removeEquipmentRow: (rowKey: string) =>                    void;
};
