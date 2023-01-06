import Link from 'next/link';
import AriaModal from 'react-aria-modal';

import { IPlan } from '../../../store/data/types';

export function Plans({ activateModal, creatingPlan, deactivateModal, deleteName, deletePlan, editingId, getApplicationNode, modalActive, myPlans }: Props): JSX.Element {
  return (
    <div className="dashboard-content">
      <h2>Plans</h2>

      {(!creatingPlan && !editingId) && <Link href="/user-plan/submit"><a className="new-entity">Create New Plan</a></Link>}
      {( creatingPlan && !editingId) && <Link href="/user-plan/submit"><a className="new-entity">Finish Creating Plan</a></Link>}
      {(!creatingPlan &&  editingId) && <Link href={`/user-plan/edit/${editingId}`}><a className="new-entity">Finish Updating Plan</a></Link>}

      {modalActive
        ? (
          <AriaModal
            dialogClass="dashboard-modal"
            focusDialog={true}
            focusTrapOptions={{returnFocusOnDeactivate: false}}
            getApplicationNode={getApplicationNode}
            onExit={deactivateModal}
            titleText="Cancel?"
            underlayClickExits={false}
          >
            <p>{'Delete Plan: '}{deleteName}{' ?'}</p>
            <button className="--cancel" onClick={deactivateModal}>No</button>
            <button className="--action" onClick={deletePlan}>Yes, Delete Plan</button>
          </AriaModal>
        )
        : false
      }

      {myPlans.length
        ? myPlans.map(p => (
          <div className="dashboard-item" key={p.id}>
            <span className="name"><Link href={`/user-plan/${p.id}`}><a className="dashboard-item__a">{p.name}</a></Link></span>

            {(!creatingPlan && !editingId) &&
              <span className="action"><Link href={`/user-plan/edit/${p.id}`}><a className="dashboard-item__a">Edit</a></Link></span>
            }

            {(!creatingPlan && !editingId) && <span className="delete" onClick={() => activateModal(p.id, p.name)}>Delete</span>}
          </div>
        ))
        : <div className="no-content">You haven't created any plans yet.</div>
      }
    </div>
  );
}

type Props = {
  activateModal(id: number, name: string): void;
  creatingPlan:                            boolean;
  deactivateModal():                       void;
  deleteName:                              string;
  deletePlan():                            void;
  editingId:                               number | null;
  getApplicationNode():                    Element | Node;
  modalActive:                             boolean;
  myPlans:                                 IPlan[];
};