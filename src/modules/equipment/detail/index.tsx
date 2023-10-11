import { useRouter } from 'next/navigation';

import { useAuth }            from '../../../store';
import type { EquipmentView } from '../../../store';
import { LoaderSpinner }      from '../../shared/LoaderSpinner';
import type { Ownership }     from '../../shared/types';

export default function EquipmentDetail({ ownership, equipment }: Props) {
  const router = useRouter();

  const { auth_id } = useAuth();

  if (!equipment) return <LoaderSpinner />;  // or return router.push('/404'); ???

  const {
    owner_id,
    equipment_name,
    image,
    equipment_type_name,
    notes
  } = equipment;

  let url = "https://s3.amazonaws.com/nobsc/image/";
  if (ownership === "private") {
    if (auth_id !== owner_id) {
      router.push('/404');
      return;
    }
    url += "user/private/";
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
  ownership: Ownership;
  equipment: EquipmentView;
};
