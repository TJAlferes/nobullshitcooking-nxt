import Link from 'next/link';
import AriaModal from 'react-aria-modal';

import { IWorkRecipe } from '../../../store/data/types';
import { Subtabs } from '.';

const url = "https://s3.amazonaws.com/nobsc-user-recipe";

export function PrivateRecipes({ activateModal, deactivateModal, deleteName, deletePrivateRecipe, getApplicationNode, modalActive, myPrivateRecipes, subTab, subTabClick }: Props): JSX.Element {
  return (
    <div className="dashboard-content">
      <h2>Private Recipes</h2>

      <Link href="/user-recipes/private/submit"><a className="new-entity">Create New Private Recipe</a></Link>

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
            <button className="--action" onClick={deletePrivateRecipe}>Yes, Delete Recipe</button>
          </AriaModal>
        )
        : false
      }

      <Subtabs subTab={subTab} subTabClick={subTabClick} />

      {myPrivateRecipes.length
        ? myPrivateRecipes.map(r => (
          <div className="dashboard-item" key={r.id}>
            <span className="tiny">
              {r.recipe_image !== "nobsc-recipe-default" ? <img src={`${url}/${r.recipe_image}-tiny`} /> : <div className="img-28-18"></div>}
            </span>

            <span className="name"><Link href={`/user-recipe/${r.id}`}><a>{r.title}</a></Link></span>

            <span className="action"><Link href={`/user-recipe/private/edit/${r.id}`}><a>Edit</a></Link></span>

            <span className="delete" onClick={() => activateModal(r.id, r.title)}>Delete</span>
          </div>
        ))
        : <div className="no-content">You haven't created any private recipes yet.</div>
      }
    </div>
  );
}

type Props = {
  activateModal(id: number, name: string):           void;
  deactivateModal():                                 void;
  deleteName:                                        string;
  deletePrivateRecipe():                             void;
  getApplicationNode():                              Element | Node;
  modalActive:                                       boolean;
  myPrivateRecipes:                                  IWorkRecipe[];
  subTab:                                            string;
  subTabClick(e: React.SyntheticEvent<EventTarget>): void;
};