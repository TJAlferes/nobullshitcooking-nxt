import Link from 'next/link';

import type { IEquipment } from '../../../store/data/types';

export function Equipment({ equipment, handleDeleteEquipment }: Props): JSX.Element {
  return (
    <div className="dashboard-content">
      <h2>Equipment</h2>
      
      <Link className="new-entity" href="/new-equipment">Create New Equipment</Link>

      {equipment.map(e => (
        <div className="dashboard-item" key={e.id}>
          <span className="name"><Link href={`/equipment/${e.id}`}>{e.name}</Link></span>

          <span className="action"><Link href={`/equipment/edit/${e.id}`}>Edit</Link></span>

          <span className="delete" onClick={() => handleDeleteEquipment(e.id)}>Delete</span>
        </div>
      ))}
    </div>
  );
}

type Props = {
  equipment:                         IEquipment[];
  handleDeleteEquipment(id: number): void;
};