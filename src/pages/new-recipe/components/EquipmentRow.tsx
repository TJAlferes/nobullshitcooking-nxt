import { IEquipment } from '../../../store/data/types';

export function EquipmentRow({ amount, equipment, myPrivateEquipment, id, changeEquipmentRow, removeEquipmentRow, rowKey, type }: Props): JSX.Element {
  const availableEquipment = [...equipment, ...(myPrivateEquipment.length ? myPrivateEquipment : [])];
  
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
          .map((e, index) => (<option key={index} value={e.id}>{e.name}</option>))}
      </select>

      <button className="--remove" onClick={() => removeEquipmentRow(rowKey)}>Remove</button>
    </div>
  );
}

type SyntheticEvent = React.SyntheticEvent<EventTarget>;

type Props = {
  amount:                                                string | number;
  changeEquipmentRow(e: SyntheticEvent, rowKey: string): void;
  equipment:                                             IEquipment[];
  myPrivateEquipment:                                    IEquipment[];
  id:                                                    string | number;
  removeEquipmentRow(rowKey: string):                    void;
  rowKey:                                                string;
  type:                                                  string | number;
};