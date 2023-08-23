import axios from 'axios';

import { endpoint }                        from '../../../config/api';
import { useTypedSelector as useSelector } from '../../../redux';
import { LoaderSpinner }                   from '../../shared/LoaderSpinner';
import type { Equipment }                  from '../../shared/data/state';

const url = "https://s3.amazonaws.com/nobsc-";

export default function EquipmentDetail({ equipment }: {equipment: Equipment}) {
  const my_equipment = useSelector(state => state.userData.my_equipment);

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
          {my_equipment.find(e => e.equipment_id === equipment_id)
            ? <img src={`${url}user-equipment/${image_url}`} />
            : <img src={`${url}images-01/equipment/${image_url}.jpg`} />}
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
