import Link from 'next/link';

import { IEquipment } from '../../../store/data/types';

export function Equipment({
  deletePrivateEquipment,
  myPrivateEquipment
}: Props): JSX.Element {
  return (
    <div className="dashboard-content">
      <h2 className="dashboard__h2">Private Equipment</h2>

      <Link href="/user-equipment/submit">
        <a className="new-entity">Create New Equipment</a>
      </Link>

      {myPrivateEquipment.length
        ? myPrivateEquipment.map(e => (
          <div className="dashboard-item" key={e.id}>
            <span className="dashboard-item-tiny">
              {e.image !== "nobsc-equipment-default"
                ? <img src={`https://s3.amazonaws.com/nobsc-user-equipment/${e.image}-tiny`} />
                : <div className="img-28-18"></div>
              }
            </span>

            <span className="dashboard-item-name">
              <Link href={`/user-equipment/${e.id}`}>
                <a className="dashboard-item__a">{e.name}</a>
              </Link>
            </span>

            <span className="dashboard-item-action">
              <Link href={`/user-equipment/edit/${e.id}`}>
                <a className="dashboard-item__a">Edit</a>
              </Link>
            </span>

            <span
              className="dashboard-item-delete"
              onClick={() => deletePrivateEquipment(e.id)}
            >
              Delete
            </span>
          </div>
        ))
        : (
          <div className="dashboard-no-content">
            You haven't created any private equipment yet.
          </div>
        )
      }
    </div>
  );
}

type Props = {
  deletePrivateEquipment(id: number): void;
  myPrivateEquipment: IEquipment[];
};