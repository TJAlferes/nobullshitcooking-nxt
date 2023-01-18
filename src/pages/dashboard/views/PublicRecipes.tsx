import Link from 'next/link';
import AriaModal from 'react-aria-modal';

import type { IWorkRecipe } from '../../../store/data/types';
import { Subtabs } from '.';

const url = "https://s3.amazonaws.com/nobsc-user-recipe";

export function PublicRecipes({ activateModal, deactivateModal, deleteName, disownPublicRecipe, getApplicationNode, modalActive, myPublicRecipes, subTab, subTabClick }: Props): JSX.Element {
  return (
    <div className="dashboard-content">
      <h2>Public Recipes</h2>

      <Link href="/user-recipes/public/submit" className="new-entity">Create New Public Recipe</Link>

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
            <p>{'Disown Recipe: '}{deleteName}{' ?'}</p>
            <button className="--cancel" onClick={deactivateModal}>No</button>
            <button className="--action" onClick={disownPublicRecipe}>Yes, Disown Recipe</button>
          </AriaModal>
        )
        : false
      }

      <Subtabs subTab={subTab} subTabClick={subTabClick} />

      {myPublicRecipes.length
        ? myPublicRecipes.map(r => (
          <div className="dashboard-item" key={r.id}>
            <span className="tiny">
              {r.recipe_image !== "nobsc-recipe-default" ? <img src={`${url}/${r.recipe_image}-tiny`} /> : <div className="img-28-18"></div>}
            </span>

            <span className="name"><Link href={`/recipe/${r.id}`}>{r.title}</Link></span>

            <span className="action"><Link href={`/user-recipe/public/edit/${r.id}`}>Edit</Link></span>

            <span className="delete" onClick={() => activateModal(r.id, r.title)}>Disown</span>
          </div>
        ))
        : <div className="no-content">You haven't created any public recipes yet.</div>
      }
    </div>
  );
}

type Props = {
  activateModal(id: number, name: string):           void;
  deactivateModal():                                 void;
  deleteName:                                        string;
  disownPublicRecipe():                              void;
  getApplicationNode():                              Element | Node;
  myPublicRecipes:                                   IWorkRecipe[];
  modalActive:                                       boolean;
  subTab:                                            string;
  subTabClick(e: React.SyntheticEvent<EventTarget>): void;
};