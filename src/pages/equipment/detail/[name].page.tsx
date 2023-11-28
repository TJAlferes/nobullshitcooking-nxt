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

export async function getStaticPaths() {
  const response = await axios.get(`${endpoint}/equipment/names`);

  const paths = response.data.map((equipment: {name: string}) => ({
    params: {
      name: encodeURIComponent(equipment.name)
    }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }: StaticProps) {
  const response = await axios.get(`${endpoint}/equipment/${params.name}`);

  return {
    props: {
      equipment: response.data
    }
  };
}

type StaticProps = {
  params: {
    name: string;
  };
};
