import { IEquipment } from '../../store/data/types';

export function EquipmentView({
  myPrivateEquipment,
  equipment: { id, name, image, equipment_type_name, description },
  twoColumnBTheme
}: Props): JSX.Element {
  return (
    <div
      className={`equipment two-column-b ${twoColumnBTheme}`}
      data-test="equipment"
    >
      <div className="left-column">
        <div className="equipment-details">
          <h1 className="equipment__name">{name}</h1>

          <div className="equipment__image">
            {myPrivateEquipment.find(e => e.id === id)
              ? <img src={`https://s3.amazonaws.com/nobsc-user-equipment/${image}`} />
              : <img src={`https://s3.amazonaws.com/nobsc-images-01/equipment/${image}.jpg`} />
            }
          </div>

          <div className="equipment__type-outer">
            <b>Equipment Type:</b>
            {' '}
            <span className="equipment__type">{equipment_type_name}</span>
          </div>
          
          <div className="equipment__description-outer">
            <b>Equipment Description:</b>
            {' '}
            <div className="equipment__description">{description}</div>
          </div>
        </div>
      </div>

      <div className="right-column">
      </div>
    </div>
  );
}

type Props = {
  myPrivateEquipment: IEquipment[];
  equipment: IEquipment;
  twoColumnBTheme: string;
}