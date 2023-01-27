import { useMemo } from 'react';
import AriaModal from 'react-aria-modal';
import { v4 as uuidv4 } from 'uuid';

import { ExpandCollapse, LoaderButton } from '../../components';
import type { IWorkRecipe } from '../../store/data/types';
import type { IData } from '../../store/planner/types';
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
  expandedDay,
  feedback,
  getApplicationNode,
  changePlanName,
  handleSubmit,
  clickTab,
  loading,
  modalActive,
  planName,
  planData,
  tab,
  theme
}: Props): JSX.Element {
  // move out?
  const memoizedMonthlyPlan = useMemo(() => {
    return (
      <div className="plan__monthly-plan">
        <div className="monthly-plan">
          <div className="header">
            <span>Sunday</span>
            <span>Monday</span>
            <span>Tuesday</span>
            <span>Wednesday</span>
            <span>Thursday</span>
            <span>Friday</span>
            <span>Saturday</span>
          </div>

          <div className="body">
            {Object.keys(planData).map((recipeList, i) => (
              <div className="monthly-plan__body-day" key={i} >
                <div className="body-day__content">
                  <Day day={i + 1} expandedDay={expandedDay} recipes={planData[Number(recipeList)]} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="expanded-day-container">
          {expandedDay && <ExpandedDay day={expandedDay} expandedDay={expandedDay} recipes={planData[expandedDay]} />}
        </div>
      </div>
    );
  }, [planData, expandedDay]);

  // move out?
  const memoizedRecipes = useMemo(() => {
    const tabToList: ITabToList = {
      "official": officialRecipes,
      "private":  myPrivateRecipes,
      "public":   myPublicRecipes,
      "favorite": myFavoriteRecipes,
      "saved":    mySavedRecipes
    };
    const recipes: IWorkRecipe[] = tabToList[tab];

    // Even though recipe.id and recipe.owner_id are not used when creating/editing a plan (NewPlan-),
    // they are set at this stage because they are used when viewing a plan (Plan-)
    return <Recipes day={0} expandedDay={expandedDay} recipes={recipes.map(({ id, title, recipe_image, owner_id }) => ({key: uuidv4(), id, title, recipe_image, owner_id}))} />;
  }, [tab]);

  return (
    <div className={`new-plan two-col-a ${theme}`}>
      <div className="heading">
        <h1>New Plan</h1>
        <p className="feedback">{feedback}</p>
        <div className="name">
          <label>Plan Name:</label><input onChange={changePlanName} type="text" value={planName} />
        </div>
      </div>

      <div className="calendar">
        {memoizedMonthlyPlan}
        <div className="recipes-tabs">
          <button className={(tab === "official") ? "--active" : ""} name="official" onClick={e => clickTab(e)}>"Official"</button>
          <button className={(tab === "private") ? "--active" : ""}  name="private"  onClick={e => clickTab(e)}>"My Private"</button>
          <button className={(tab === "public") ? "--active" : ""}   name="public"   onClick={e => clickTab(e)}>"My Public"</button>
          <button className={(tab === "favorite") ? "--active" : ""} name="favorite" onClick={e => clickTab(e)}>"My Favorite"</button>
          <button className={(tab === "saved") ? "--active" : ""}    name="saved"    onClick={e => clickTab(e)}>"My Saved"</button>
        </div>
        {memoizedRecipes}
      </div>

      <div><ExpandCollapse><ToolTip /></ExpandCollapse></div>

      <div className="finish">
        <button className="cancel-button" onClick={activateModal}>Cancel</button>

        {modalActive
          ? (
            <AriaModal
              dialogClass="cancel"
              focusDialog={true}
              focusTrapOptions={{returnFocusOnDeactivate: false}}
              getApplicationNode={getApplicationNode}
              onExit={deactivateModal}
              titleText="Cancel?"
              underlayClickExits={false}
            >
              <p>Cancel new plan? Changes will not be saved.</p>
              <button className="cancel-cancel" onClick={deactivateModal}>No, Keep Working</button>
              <button className="cancel-button" onClick={discardChanges}>Yes, Discard Changes</button>
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

function ToolTip() {
  return (
    <div>
      <p>- To add a recipe to your plan, drag it from the recipe list and drop it on a day</p>
      <p>- To use the same recipe more than once, simply drag from the recipe list again</p>
      <p>- To remove a recipe from your plan, drag and drop it back into the recipe list</p><br />

      <p>Tip: Remember that you can make multiple plans.</p><br />

      <p>- To move a recipe to a different day, drag it from its current day and drop it on your desired day</p>
      <p>- Click on a day to expand it</p>
      <p>- While a day is expanded, you may reorder its recipes by dragging them up or down</p><br />

      <p>Tip: You don't have to cook every day, especially when just starting out. It's best to make a plan you can follow through on.</p><br />
    </div>
  );
}
interface ITabToList {
  [index: string]: any;
  "official": IWorkRecipe[];
  "private":  IWorkRecipe[];
  "public":   IWorkRecipe[];
  "favorite": IWorkRecipe[];
  "saved":    IWorkRecipe[];
}

type SyntheticEvent = React.SyntheticEvent<EventTarget>;

type Props = {
  activateModal():                   void;
  deactivateModal():                 void;
  discardChanges():                  void;
  myFavoriteRecipes:                 IWorkRecipe[];
  myPrivateRecipes:                  IWorkRecipe[];
  myPublicRecipes:                   IWorkRecipe[];
  mySavedRecipes:                    IWorkRecipe[];
  officialRecipes:                   IWorkRecipe[];
  editing:                           boolean;
  expandedDay:                       number | null;
  feedback:                          string;
  getApplicationNode():              Element | Node;
  changePlanName(e: SyntheticEvent): void;
  handleSubmit():                    void;
  clickTab(e: SyntheticEvent):       void;
  loading:                           boolean;
  modalActive:                       boolean;
  planName:                          string;
  planData:                          IData;
  tab:                               string;
  theme:                             string;
};