import Link from 'next/link';
import AriaModal from 'react-aria-modal';

import { IPlan } from '../../../store/data/types';

export function Plans({
  activateModal,
  creatingPlan,
  deactivateModal,
  deleteName,
  editingId,
  getApplicationNode,
  deletePlan,
  modalActive,
  myPlans
}: Props): JSX.Element {
  return (
    <div className="dashboard-content">
      <h2 className="dashboard-content__heading">Plans</h2>

      {(!creatingPlan && !editingId) &&
        <Link href="/user-plan/submit">
          <a className="new-entity">Create New Plan</a>
        </Link>
      }

      {(creatingPlan && !editingId) &&
        <Link href="/user-plan/submit">
          <a className="new-entity">Finish Creating Plan</a>
        </Link>
      }

      {(!creatingPlan && editingId) &&
        <Link href={`/user-plan/edit/${editingId}`}>
          <a className="new-entity">Finish Updating Plan</a>
        </Link>
      }

      {modalActive
        ? (
          <AriaModal
            dialogClass="dashboard-content__modal"
            focusDialog={true}
            focusTrapOptions={{returnFocusOnDeactivate: false}}
            getApplicationNode={getApplicationNode}
            onExit={deactivateModal}
            titleText="Cancel?"
            underlayClickExits={false}
          >
            <p className="dashboard-content__prompt">
              {'Delete Plan: '}{deleteName}{' ?'}
            </p>

            <button
              className="dashboard-content__modal-cancel-button"
              onClick={deactivateModal}
            >
              No
            </button>

            <button
              className="dashboard-content__modal-action-button"
              onClick={deletePlan}
            >
              Yes, Delete Plan
            </button>
          </AriaModal>
        )
        : false
      }

      {myPlans.length
        ? myPlans.map(p => (
          <div className="dashboard-content__item" key={p.id}>
            <span className="dashboard-content__item-name">
              <Link href={`/user-plan/${p.id}`}><a>{p.name}</a></Link>
            </span>

            {(!creatingPlan && !editingId) &&
              <span className="dashboard-content__item-action">
                <Link href={`/user-plan/edit/${p.id}`}><a>Edit</a></Link>
              </span>
            }

            {(!creatingPlan && !editingId) &&
              <span
                className="dashboard-content__item-delete"
                onClick={() => activateModal(p.id, p.name)}
              >
                Delete
              </span>
            }
          </div>
        ))
        : (
          <div className="dashboard-content__none">
            You haven't created any plans yet.
          </div>
        )
      }
    </div>
  );
}

type Props = {
  activateModal(id: number, name: string): void;
  creatingPlan: boolean;
  deactivateModal(): void;
  deleteName: string;
  editingId: number | null;
  getApplicationNode(): Element | Node;
  deletePlan(): void;
  modalActive: boolean;
  myPlans: IPlan[];
};