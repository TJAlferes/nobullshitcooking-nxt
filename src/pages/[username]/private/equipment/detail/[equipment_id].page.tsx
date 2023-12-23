import axios from 'axios';

import { endpoint } from '../../../../../config/api';
import EquipmentDetail from '../../../../../modules/equipment/detail';
import type { EquipmentView } from '../../../../../store';

export default function UserPrivateEquipmentDetailPage({ equipment }: Props) {
  return <EquipmentDetail ownership='private' equipment={equipment} />
}

export async function getServerSideProps({ params }: ServerSideProps) {
  const res = await axios.get(
    `${endpoint}/users/${params.username}/private-equipment/${params.equipment_id}`,
    {withCredentials: true}
  );

  if (res.status === 401) {
    return {
      props: {},
      redirect: {
        permanent:   false,
        destination: "/login"
      }
    };
  }

  return {
    props: {
      equipment: res.data
    }
  };
}

type Props = {
  equipment: EquipmentView;
};

type ServerSideProps = {
  params: {
    username:     string;
    equipment_id: string;
  };
};
