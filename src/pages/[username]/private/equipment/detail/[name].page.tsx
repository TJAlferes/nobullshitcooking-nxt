import axios from 'axios';

// set up abs paths
import { endpoint } from '../../../../../config/api';
import type { Equipment } from '../../../../../modules/user/private/data/state';
import UserPrivateEquipmentDetail from "../../../../../modules/user/private/equipment/detail";

export default function UserPrivateEquipmentDetailPage({ equipment }: {equipment: Equipment}) {
  return <UserPrivateEquipmentDetail equipment={equipment} />
}

function slugify(name: string) {
  return name
    .split(' ')
    .map(word => word.charAt(0).toLowerCase() + word.slice(1))
    .join('-');
}

export async function getStaticPaths() {
  const response = await axios.get(`${endpoint}/equipment/names`);

  const paths = response.data.map((equipment: {name: string}) => ({
    params: {
      name: slugify(equipment.name)
    }
  }));

  return {paths, fallback: false};
}

export async function getStaticProps({ params }: StaticProps) {
  const response = await axios.get(`${endpoint}/equipment/${params.equipment_name}`);

  return {
    props: {
      equipment: response.data
    }
  };
}

type StaticProps = {
  params: {
    equipment_name: string;
  };
};
