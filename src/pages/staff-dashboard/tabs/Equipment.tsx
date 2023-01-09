import Link from 'next/link';

import { IEquipment } from '../../../store/data/types';

export function Equipment({ equipment, handleDeleteEquipment }: Props): JSX.Element {
  return (
    <div className="dashboard-content">
      <h2>Equipment</h2>
      
      <Link className="new-entity" to="/equipment/submit">Create New Equipment</Link>

      {equipment.map(e => (
        <div className="dashboard-item" key={e.id}>
          <span className="name"><Link to={`/equipment/${e.id}`}>{e.name}</Link></span>

          <span className="action"><Link to={`/equipment/edit/${e.id}`}>Edit</Link></span>

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