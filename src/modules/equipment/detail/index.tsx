import { LoaderSpinner }      from '../../shared/LoaderSpinner';
import type { EquipmentView } from '../../shared/data/state';

const url = "https://s3.amazonaws.com/nobsc-";

export default function EquipmentDetail({ equipment }: {equipment: EquipmentView}) {
  const {
    equipment_id,
    equipment_name,
    image_url,
    equipment_type_name,
    notes
  } = equipment;

  if (!equipment) {
    return <LoaderSpinner />;
  }

  return (
    <div className="two-col equipment">
      <div className="two-col-left">
        <h1>{equipment_name}</h1>

        <div className="image">
          <img src={`${url}images-01/equipment/${image_url}.jpg`} />
        </div>

        <div className="type">
          <b>Equipment Type:</b>{' '}<span>{equipment_type_name}</span>
        </div>

        <div className="notes">
          <b>Equipment Notes:</b>{' '}<div>{notes}</div>
        </div>
      </div>

      <div className="two-col-right"></div>
    </div>
  );
}
