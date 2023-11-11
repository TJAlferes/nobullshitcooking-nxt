import axios from 'axios';

import { endpoint } from '../../../../config/api';
import UserPrivateEquipmentDetail from "../../../../modules/user/private-equipment/detail";
import type { EquipmentView } from '../../../../store';

export default function UserPrivateEquipmentDetailPage({ equipment }: Props) {
  return <UserPrivateEquipmentDetail equipment={equipment} />
}

export async function getServerSideProps({ params }: ServerSideProps) {
  const response = await axios.get(
    `${endpoint}/users/${params.username}/private-equipment/${params.equipment_id}`,
    {withCredentials: true}
  );
  if (response.status === 401) {
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
      equipment: response.data
    }
  };
}

type Props = {
  equipment: EquipmentView;
};

// TO DO: change your routing then

type ServerSideProps = {
  params: {
    username:     string;
    equipment_id: string;  // name AKA equipment_name
  };
};
