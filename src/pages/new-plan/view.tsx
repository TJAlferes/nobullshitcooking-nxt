import { useMemo } from 'react';
import AriaModal from 'react-aria-modal';
import { v4 as uuidv4 } from 'uuid';

import { ExpandCollapse, LoaderButton } from '../../components';
import { IWorkRecipe } from '../../store/data/types';
import { IPlannerData } from '../../store/planner/types';
import { Day, ExpandedDay, Recipes } from './components';

export function NewPlanView({
  activateModal,
  deactivateModal,
  discardChanges,
  myFavoriteRecipes,
  myPrivateRecipes,
  myPublicRecipes,
  mySavedRecipes,
  officialRecipes,
  editing,
  expanded,
  expandedDay,
  feedback,
  getApplicationNode,
  changePlanName,
  handleSubmit,
  clickTab,
  loading,
  modalActive,
  planName,
  recipeListsInsideDays,
  tab,
  theme
}: Props): JSX.Element {
  const memoizedMonthlyPlan = useMemo(() => {
    return (
      <div className="plan__monthly-plan">
        <div className="monthly-plan">
          <div className="monthly-plan__header">
            <span className="monthly-plan__header-day">Sunday</span>
            <span className="monthly-plan__header-day">Monday</span>
            <span className="monthly-plan__header-day">Tuesday</span>
            <span className="monthly-plan__header-day">Wednesday</span>
            <span className="monthly-plan__header-day">Thursday</span>
            <span className="monthly-plan__header-day">Friday</span>
            <span className="monthly-plan__header-day">Saturday</span>
          </div>

          <div className="monthly-plan__body">
            {Object.keys(recipeListsInsideDays).map((recipeList, i) => (
              <div className="monthly-plan__body-day" key={i} >
                <div className="body-day__content">
                  <Day
                    day={i + 1}
                    expanded={expanded}
                    expandedDay={expandedDay}
                    recipes={recipeListsInsideDays[Number(recipeList)]}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="expanded-day-container">
          {expandedDay && <ExpandedDay
            day={expandedDay}
            expanded={expanded}
            expandedDay={expandedDay}
            recipes={(expanded) ? recipeListsInsideDays[expandedDay] : []}
          />}
        </div>
      </div>
    );
  }, [recipeListsInsideDays, expanded, expandedDay]);

  const memoizedRecipes = useMemo(() => {
    const tabToList: ITabToList = {
      "official": officialRecipes,
      "private": myPrivateRecipes,
      "public": myPublicRecipes,
      "favorite": myFavoriteRecipes,
      "saved": mySavedRecipes
    };
    const recipes: IWorkRecipe[] = tabToList[tab];

    /*

    Note: even though recipe.id and recipe.owner_id
    are not used when creating/editing a plan (NewPlan-),
    they are set at this stage because
    they are used when viewing a plan (Plan-)

    */

    return (
      <Recipes
        day={0}
        expanded={expanded}
        expandedDay={expandedDay}
        recipes={recipes.map(({ id, title, recipe_image, owner_id }) => ({
          key: uuidv4(), id, title, recipe_image, owner_id
        }))}
      />
    );
  }, [tab]);

  const TabButton = ({ displayText, tabName }: TabButtonProps) => (
    <button
      className={
        (tab === tabName)
        ? "planner__recipes-tab--active"
        : "planner__recipes-tab"
      }
      name={tabName}
      onClick={e => clickTab(e)}
    >
      {displayText}
    </button>
  );

  return (
    <div className={`new-plan two-col-a ${theme}`}>
      <div className="new-plan__heading">
        <h1>New Plan</h1>

        <p className="feedback">{feedback}</p>

        <div className="plan__name">
          <label className="new-plan-name__label">Plan Name:</label>

          <input
            className="new-plan-name__input"
            onChange={changePlanName}
            type="text"
            value={planName}
          />
        </div>
      </div>

      <div className="new-plan__calendar-container">
        {memoizedMonthlyPlan}

        <div className="planner__recipes-tabs">
          <TabButton displayText="All Official" tabName="official" />
          <TabButton displayText="My Private" tabName="private" />
          <TabButton displayText="My Public" tabName="public" />
          <TabButton displayText="My Favorite" tabName="favorite" />
          <TabButton displayText="My Saved" tabName="saved" />
        </div>

        {memoizedRecipes}
      </div>

      <div>
        <ExpandCollapse>
          <div>
            <p>- To add a recipe to your plan, drag it from the recipe list and drop it on a day</p>
            <p>- To use the same recipe more than once, simply drag from the recipe list again</p>
            <p>- To remove a recipe from your plan, drag and drop it back into the recipe list</p>
            <br />
            <p>Tip: Remember that you can make multiple plans.</p>
            <br />
            <p>- To move a recipe to a different day, drag it from its current day and drop it on your desired day</p>
            <p>- Click on a day to expand it</p>
            <p>- While a day is expanded, you may reorder its recipes by dragging them up or down</p>
            <br />
            <p>Tip: You don't have to cook every day, especially when just starting out. It's best to make a plan you can follow through on.</p>
            <br />
          </div>
        </ExpandCollapse>
      </div>

      <div className="planner__finish-area">
        <button className="cancel-button" onClick={activateModal}>
          Cancel
        </button>

        {modalActive
          ? (
            <AriaModal
              dialogClass="planner__cancel-modal"
              focusDialog={true}
              focusTrapOptions={{returnFocusOnDeactivate: false}}
              getApplicationNode={getApplicationNode}
              onExit={deactivateModal}
              titleText="Cancel?"
              underlayClickExits={false}
            >
              <p className="planner__cancel-prompt">
                Cancel new plan? Changes will not be saved.
              </p>

              <button
                className="planner__cancel-cancel-button"
                onClick={deactivateModal}
              >
                No, Keep Working
              </button>

              <button
                className="cancel-button"
                onClick={discardChanges}
              >
                Yes, Discard Changes
              </button>
            </AriaModal>
          )
          : false
        }

        <LoaderButton
          className="submit-button"
          id="planner-submit-button"
          isLoading={loading}
          loadingText="Saving Plan..."
          name="submit"
          onClick={handleSubmit}
          text="Save Plan"
        />
      </div>
    </div>
  );
}

interface ITabToList {
  [index: string]: any;
  "official": IWorkRecipe[];
  "private": IWorkRecipe[];
  "public": IWorkRecipe[];
  "favorite": IWorkRecipe[];
  "saved": IWorkRecipe[];
}

type Props = {
  activateModal(): void;
  deactivateModal(): void;
  discardChanges(): void;
  myFavoriteRecipes: IWorkRecipe[];
  myPrivateRecipes: IWorkRecipe[];
  myPublicRecipes: IWorkRecipe[];
  mySavedRecipes: IWorkRecipe[];
  officialRecipes: IWorkRecipe[];
  editing: boolean;
  expanded: boolean;
  expandedDay: number | null;
  feedback: string;
  getApplicationNode(): Element | Node;
  changePlanName(e: React.SyntheticEvent<EventTarget>): void;
  handleSubmit(): void;
  clickTab(e: React.SyntheticEvent<EventTarget>): void;
  loading: boolean;
  modalActive: boolean;
  planName: string;
  recipeListsInsideDays: IPlannerData;
  tab: string;
  theme: string;
};

type TabButtonProps = {
  displayText: string;
  tabName: string;
};