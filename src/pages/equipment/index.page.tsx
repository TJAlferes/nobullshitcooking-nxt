import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

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
  const twoColumnBTheme = useSelector(state => state.theme.twoColumnBTheme);

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
        myPrivateEquipment={myPrivateEquipment}
        equipment={equipment}
        twoColumnBTheme={twoColumnBTheme}
      />
    );
}