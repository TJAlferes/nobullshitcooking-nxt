import Link from 'next/link';
import AriaModal from 'react-aria-modal';

import { IWorkRecipe } from '../../../store/data/types';

export function Recipes({ activateModal, deactivateModal, deleteName, getApplicationNode, handleDeleteRecipe, modalActive, recipes }: Props): JSX.Element {
  return (
    <div className="dashboard-content">
      <h2>Recipes</h2>

      <Link className="new-entity" to="/recipes/private/submit">Create New Recipe</Link>

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
            <p>{'Delete Recipe: '}{deleteName}{' ?'}</p>
            <button className="--cancel" onClick={deactivateModal}>No</button>
            <button className="action" onClick={handleDeleteRecipe}>Yes, Delete Recipe</button>
          </AriaModal>
        )
        : false
      }

      {recipes.map(r => (
        <div className="dashboard-item" key={r.id}>
          <span className="name"><Link to={`/user-recipe/${r.id}`}>{r.title}</Link></span>
          <span className="action"><Link to={`/user-recipe/private/edit/${r.id}`}>Edit</Link></span>
          <span className="delete" onClick={() => activateModal(r.id, r.title)}>Delete</span>
        </div>
      ))}
    </div>
  );
}

type Props = {
  activateModal(id: number, name: string): void;
  deactivateModal():                       void;
  deleteName:                              string;
  getApplicationNode():                    Element | Node;
  handleDeleteRecipe():                    void;
  modalActive:                             boolean;
  recipes:                                 IWorkRecipe[];
};