import { LoaderSpinner }      from '../../shared/LoaderSpinner';
import type { Ownership }     from '../../shared/types';
import type { EquipmentView } from '../../shared/data/state';

export default function EquipmentDetail({ equipment, ownership }: Props) {
  const {
    equipment_name,
    equipment_type_name,
    notes,
    image
  } = equipment;

  if (!equipment) {
    return <LoaderSpinner />;
  }

  return (
    <div className="two-col equipment">
      <div className="two-col-left">
        <h1>{equipment_name}</h1>

        <div className="image">
          <img src={`${url}/equipment/${image.image_filename}.jpg`} />
          <span>{image.caption}</span>
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

type Props = {
  equipment: EquipmentView;
  ownership: Ownership;
};

const url = "https://s3.amazonaws.com/nobsc/";
