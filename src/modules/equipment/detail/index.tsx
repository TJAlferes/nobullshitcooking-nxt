import { useRouter } from 'next/navigation';

import { useAuth } from '../../../store';
import type { EquipmentView } from '../../../store';
import { LoaderSpinner } from '../../shared/LoaderSpinner';
import type { Ownership } from '../../shared/types';

export default function EquipmentDetail({ ownership, equipment }: Props) {
  const router = useRouter();

  const { auth_id } = useAuth();

  if (!equipment) return <LoaderSpinner />;  // or return router.push('/404'); ???

  const {
    owner_id,
    equipment_name,
    image_filename,
    caption,
    equipment_type_name,
    notes
  } = equipment;

  let url = `https://s3.amazonaws.com/nobsc-${ownership}-uploads/equipment`;
  if (ownership === 'private') {
    if (auth_id !== owner_id) {
      router.push('/404');
      return false;
    }
    url += `/${auth_id}`;
  }

  return (
    <div className="one-col equipment-detail">
      <h1>{equipment_name}</h1>

      <div className="image">
        <img src={`${url}/${image_filename}.jpg`} />
        <span>{caption}</span>
      </div>

      <div className="type">
        <b>Equipment Type:</b>{' '}<span>{equipment_type_name}</span>
      </div>
      
      <div className="notes">
        <b>Equipment Notes:</b>{' '}<div>{notes}</div>
      </div>
    </div>
  );
}

type Props = {
  ownership: Ownership;
  equipment: EquipmentView;
};
