import Link from 'next/link';
import AriaModal from 'react-aria-modal';

import { IWorkRecipe } from '../../../store/data/types';
import { Subtabs } from '.';

const url = "https://s3.amazonaws.com/nobsc-user-recipe";

export function PublicRecipes({
  activateModal,
  deactivateModal,
  deleteName,
  disownPublicRecipe,
  getApplicationNode,
  modalActive,
  myPublicRecipes,
  subTab,
  subTabClick
}: Props): JSX.Element {
  return (
    <div className="dashboard-content">
      <h2 className="dashboard__h2">Public Recipes</h2>

      <Link href="/user-recipes/public/submit">
        <a className="new-entity">Create New Public Recipe</a>
      </Link>

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
            <p className="dashboard-prompt">
              {'Disown Recipe: '}{deleteName}{' ?'}
            </p>

            <button
              className="dashboard-modal__button--cancel"
              onClick={deactivateModal}
            >
              No
            </button>

            <button
              className="dashboard-modal__button--action"
              onClick={disownPublicRecipe}
            >
              Yes, Disown Recipe
            </button>
          </AriaModal>
        )
        : false
      }

      <Subtabs subTab={subTab} subTabClick={subTabClick} />

      {myPublicRecipes.length
        ? myPublicRecipes.map(r => (
          <div className="dashboard-item" key={r.id}>
            <span className="dashboard-item-tiny">
              {r.recipe_image !== "nobsc-recipe-default"
                ? <img src={`${url}/${r.recipe_image}-tiny`} />
                : <div className="img-28-18"></div>}
            </span>

            <span className="dashboard-item-name">
              <Link href={`/recipe/${r.id}`}>
                <a className="dashboard-item__a">{r.title}</a>
              </Link>
            </span>

            <span className="dashboard-item-action">
              <Link href={`/user-recipe/public/edit/${r.id}`}>
                <a className="dashboard-item__a">Edit</a>
              </Link>
            </span>

            <span
              className="dashboard-item-delete"
              onClick={() => activateModal(r.id, r.title)}
            >
              Disown
            </span>
          </div>
        ))
        : (
          <div className="dashboard-no-content">
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
  disownPublicRecipe(): void;
  getApplicationNode(): Element | Node;
  myPublicRecipes: IWorkRecipe[];
  modalActive: boolean;
  subTab: string;
  subTabClick(e: React.SyntheticEvent<EventTarget>): void;
};