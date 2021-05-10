import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { LoaderSpinner } from '../../components';
import { useTypedSelector as useSelector } from '../../store';
import { IEquipment } from '../../store/data/types';
import { EquipmentView } from './view';

export default function Equipment(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  const officialEquipment = useSelector(state => state.data.officialEquipment);
  const myPrivateEquipment =
    useSelector(state => state.data.myPrivateEquipment);
  const theme = useSelector(state => state.theme.theme);

  const [ equipment, setEquipment ] = useState<IEquipment>();

  useEffect(() => {
    if (!id) {
      router.push('/home');
      return;
    }

    const localEquipment = (
      officialEquipment.find(e => e.id == Number(id)) ||
      myPrivateEquipment.find(e => e.id == Number(id))
    );

    if (!localEquipment) {
      router.push('/home');
      return;
    }
    
    setEquipment(localEquipment);
  }, []);

  return !equipment
    ? <LoaderSpinner />
    : (
      <EquipmentView
        equipment={equipment}
        myPrivateEquipment={myPrivateEquipment}
        theme={theme}
      />
    );
}