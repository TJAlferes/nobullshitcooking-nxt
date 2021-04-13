import Link from 'next/link';
import React from 'react';
import AriaModal from 'react-aria-modal';

import { IWorkRecipe } from '../../../store/data/types';
import { Subtabs } from '.';

export function PublicRecipes({
  activateModal,
  deactivateModal,
  deleteName,
  getApplicationNode,
  handleDisownPublicRecipe,
  handleSubTabClick,
  modalActive,
  myPublicRecipes,
  subTab
}: Props): JSX.Element {
  return (
    <div className="dashboard-content">
      <h2 className="dashboard-content__heading">Public Recipes</h2>

      <Link href="/user-recipes/public/submit">
        <a className="new-entity">Create New Public Recipe</a>
      </Link>

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
              {'Disown Recipe: '}{deleteName}{' ?'}
            </p>

            <button
              className="dashboard-content__modal-cancel-button"
              onClick={deactivateModal}
            >
              No
            </button>

            <button
              className="dashboard-content__modal-action-button"
              onClick={handleDisownPublicRecipe}
            >
              Yes, Disown Recipe
            </button>
          </AriaModal>
        )
        : false
      }

      <Subtabs handleSubTabClick={handleSubTabClick} subTab={subTab} />

      {myPublicRecipes.length
        ? myPublicRecipes.map(r => (
          <div className="dashboard-content__item" key={r.id}>
            <span className="dashboard-content__item-tiny">
              {r.recipe_image !== "nobsc-recipe-default"
                ? <img src={`https://s3.amazonaws.com/nobsc-user-recipe${r.recipe_image}-tiny`} />
                : <div className="image-default-28-18"></div>
              }
            </span>

            <span className="dashboard-content__item-name">
              <Link href={`/recipe/${r.id}`}><a>{r.title}</a></Link>
            </span>

            <span className="dashboard-content__item-action">
              <Link href={`/user-recipe/public/edit/${r.id}`}><a>Edit</a></Link>
            </span>

            <span
              className="dashboard-content__item-delete"
              onClick={() => activateModal(r.id, r.title)}
            >
              Disown
            </span>
          </div>
        ))
        : (
          <div className="dashboard-content__none">
            You haven't created any public recipes yet.
          </div>
        )
      }
    </div>
  );
}

type Props = {
  activateModal(id: number, name: string): void;
  deactivateModal(): void;
  deleteName: string;
  getApplicationNode(): Element | Node;
  handleDisownPublicRecipe(): void;
  handleSubTabClick(e: React.SyntheticEvent<EventTarget>): void;
  myPublicRecipes: IWorkRecipe[];
  modalActive: boolean;
  subTab: string;
};