import { IEquipment } from '../../store/data/types';

const url = "https://s3.amazonaws.com/nobsc-";

export function EquipmentView({ equipment: { id, name, image, equipment_type_name, description }, myPrivateEquipment, theme }: Props): JSX.Element {
  return (
    <div className={`equipment two-col-b ${theme}`} data-test="equipment">
      <div className="two-col-b-left">
        <h1>{name}</h1>

        <div className="image">
          {myPrivateEquipment.find(e => e.id === id)
            ? <img src={`${url}user-equipment/${image}`} />
            : <img src={`${url}images-01/equipment/${image}.jpg`} />}
        </div>

        <div className="type">
          <b>Equipment Type:</b>{' '}<span>{equipment_type_name}</span>
        </div>
        
        <div className="description">
          <b>Equipment Description:</b>{' '}<div>{description}</div>
        </div>
      </div>

      <div className="two-col-b-right"></div>
    </div>
  );
}

type Props = {
  equipment:          IEquipment;
  myPrivateEquipment: IEquipment[];
  theme:              string;
}