import Link from 'next/link';

import type { IEquipment } from '../../../store/data/types';

const url = "https://s3.amazonaws.com/nobsc-user-equipment";

export function Equipment({ deletePrivateEquipment, myPrivateEquipment }: Props): JSX.Element {
  return (
    <div className="dashboard-content">
      <h2>Private Equipment</h2>

      <Link href="/user-equipment/submit" className="new-entity">Create New Equipment</Link>

      {myPrivateEquipment.length
        ? myPrivateEquipment.map(e => (
          <div className="dashboard-item" key={e.id}>
            <span className="tiny">{e.image !== "nobsc-equipment-default" ? <img src={`${url}/${e.image}-tiny`} /> : <div className="img-28-18"></div>}</span>

            <span className="name"><Link href={`/user-equipment/${e.id}`}>{e.name}</Link></span>

            <span className="action"><Link href={`/user-equipment/edit/${e.id}`}>Edit</Link></span>

            <span className="delete" onClick={() => deletePrivateEquipment(e.id)}>Delete</span>
          </div>
        ))
        : <div className="no-content">You haven't created any private equipment yet.</div>
      }
    </div>
  );
}

type Props = {
  deletePrivateEquipment(id: number): void;
  myPrivateEquipment:                 IEquipment[];
};