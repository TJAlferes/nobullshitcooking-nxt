import Link                            from 'next/link';
import { useSearchParams, useRouter }  from 'next/navigation';
import EquipmentForm from '../../../../equipment/form';

export default function UserPrivateEquipmentForm() {
  return <EquipmentForm ownership='private' />;
}
