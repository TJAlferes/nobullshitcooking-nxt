import axios from 'axios';

import { endpoint } from '../../../config/api';
import EquipmentDetail from "../../../modules/equipment/detail";
import type { EquipmentView } from '../../../store';

export default function EquipmentDetailPage({ equipment }: Props) {
  return <EquipmentDetail ownership="official" equipment={equipment} />;
}

type Props = {
  equipment: EquipmentView;
};

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

  return {
    paths,
    fallback: false
  };
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
