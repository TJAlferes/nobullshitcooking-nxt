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

export async function getServerSideProps({ params }: ServerSideProps) {
  const res = await axios.get(
    `${endpoint}/equipment/${encodeURIComponent(params.equipment_name)}`
  );

  return {
    props: {
      equipment: res.data
    }
  };
}

type ServerSideProps = {
  params: {
    equipment_name: string;
  };
};

/*
DOES NOT WORK AT SCALE.
WE GET HTTP RESPONSE CODE 429 ERRORS DUE TO EXCEEDING RATE LIMIT.
FOR NOW, WE JUST USE getServerSideProps INSTEAD.
TO DO: FIX

export async function getStaticPaths() {
  const res = await axios.get(`${endpoint}/equipment/names`);

  const paths = res.data.map((equipment: {name: string}) => ({
    params: {
      equipment_name: equipment.name
    }
  }));

  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params }: StaticProps) {
  const res = await axios.get(
    `${endpoint}/equipment/${encodeURIComponent(params.equipment_name)}`
  );

  return {
    props: {
      equipment: res.data
    }
  };
}

type StaticProps = {
  params: {
    equipment_name: string;
  };
};
*/
