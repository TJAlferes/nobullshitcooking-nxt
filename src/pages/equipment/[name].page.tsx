import axios from 'axios';

import { LoaderSpinner }                   from '../../components';
import { useTypedSelector as useSelector } from '../../store';
import type { IEquipment }                 from '../../store/data/types';
import { endpoint }                        from '../../utils/api';

const url = "https://s3.amazonaws.com/nobsc-";

export default function Equipment({ equipment }: {equipment: IEquipment}) {
  const myEquipment = useSelector(state => state.data.myEquipment);

  const { id, name, image, equipment_type_name, description } = equipment;

  return !equipment ? <LoaderSpinner /> : (
    <div className="two-col equipment">
      <div className="two-col-left">
        <h1>{name}</h1>
        <div className="image">
          {myEquipment.find(e => e.id === id)
            ? <img src={`${url}user-equipment/${image}`} />
            : <img src={`${url}images-01/equipment/${image}.jpg`} />}
        </div>
        <div className="type">
          <b>Equipment Type:</b>{' '}<span>{equipment_type_name}</span>
        </div>
        <div className="description">
          <b>Equipment Description:</b>{' '}<div>{description}</div>
        </div>
      </div>
      <div className="two-col-right"></div>
    </div>
  );
}

function slugify(name: string) {
  return name.split(' ').map(word => word.charAt(0).toLowerCase() + word.slice(1)).join('-');
}

export async function getStaticPaths() {
  const response = await axios.get(`${endpoint}/equipment/names`);
  const paths = response.data.map((equipment: {name: string}) => ({params: {name: slugify(equipment.name)}}));
  return {paths, fallback: false};
}

export async function getStaticProps({ params }: {params: {name: string}}) {
  const response = await axios.get(`${endpoint}/equipment/${params.name}`);
  return {props: {equipment: response.data}};
}
