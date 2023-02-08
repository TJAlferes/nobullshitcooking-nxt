import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LoaderSpinner } from '../../components';
import { useTypedSelector as useSelector } from '../../store';
import type { IEquipment } from '../../store/data/types';
import { EquipmentView } from './view';

export default function Equipment(): JSX.Element {
  const router = useRouter();
  const params = useSearchParams();
  const id =     Number(params.get('id'));

  const officialEquipment = useSelector(state => state.data.equipment);
  const myEquipment =       useSelector(state => state.data.myEquipment);

  const [ equipment, setEquipment ] = useState<IEquipment>();

  useEffect(() => {
    if (!id) {
      router.push('/');
      return;
    }

    const localEquipment = (officialEquipment.find(e => e.id == Number(id)) || myEquipment.find(e => e.id == Number(id)));

    if (!localEquipment) {
      router.push('/');
      return;
    }
    
    setEquipment(localEquipment);
  }, []);

  return !equipment ? <LoaderSpinner /> : <EquipmentView equipment={equipment} myEquipment={myEquipment} />;
}