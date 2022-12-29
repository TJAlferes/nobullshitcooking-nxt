import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../store';
import { plannerClearWork, plannerSetCreating, plannerSetEditingId, plannerSetPlanName, plannerSetPlanData } from '../../store/planner/actions';
import { userCreateNewPlan, userEditPlan } from '../../store/user/plan/actions';
import { NewPlanView } from './view';

export function NewPlan({ editing }: Props): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const { myFavoriteRecipes, myPlans, myPrivateRecipes, myPublicRecipes, mySavedRecipes, recipes } = useSelector(state => state.data);  // don't destructure useSelector?
  const expanded =    useSelector(state => state.planner.expanded);
  const expandedDay = useSelector(state => state.planner.expandedDay);
  const editingId =   useSelector(state => state.planner.editingId);
  const planName =    useSelector(state => state.planner.planName);
  const recipeListsInsideDays = useSelector(state => state.planner.recipeListsInsideDays);  // shorten name
  const message =         useSelector(state => state.user.message);
  const twoColumnATheme = useSelector(state => state.theme.twoColumnATheme);  // rename all these to just `theme`

  const [ feedback,    setFeedback ] =    useState("");
  const [ loading,     setLoading ] =     useState(false);
  const [ modalActive, setModalActive ] = useState(false);
  const [ tab,         setTab ] =         useState("official");

  useEffect(() => {
    const getExistingPlanToEdit = () => {
      window.scrollTo(0,0);
      setLoading(true);
      const [ prev ] = myPlans.filter(p => p.id === Number(id));
      // batch these three?
      dispatch(plannerSetEditingId(Number(prev.id)));
      dispatch(plannerSetPlanName(prev.name));
      dispatch(plannerSetPlanData(prev.data));
      setLoading(false);
    };

    if (editing) {
      dispatch(plannerClearWork());
      getExistingPlanToEdit();
    } else {
      dispatch(plannerClearWork());
      dispatch(plannerSetCreating());
    }
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      if (message !== "") window.scrollTo(0,0);
      setFeedback(message);
      if (message === "Plan created." || message === "Plan updated.") {
        setTimeout(() => {
          dispatch(plannerClearWork());
          router.push('/dashboard');
        }, 3000);
      }
      setLoading(false);
    }

    return () => {
      isSubscribed = false;
    };
  }, [message]);

  const activateModal =   () => setModalActive(true);
  const deactivateModal = () => setModalActive(false);

  const discardChanges = () => {
    setModalActive(false);
    dispatch(plannerClearWork());
    router.push('/dashboard');
  };

  const getApplicationNode = (): Element | Node => document.getElementById('root') as Element | Node;

  const getPlanData = () => JSON.stringify(recipeListsInsideDays);  // clean/format? *** keys???

  const changePlanName = (e: React.SyntheticEvent<EventTarget>) => {
    const nextName = (e.target as HTMLInputElement).value.trim();
    if (nextName.length > 20) {
      window.scrollTo(0,0);
      setFeedback("Please keep your plan name under 20 characters");
      setTimeout(() => setFeedback(""), 3000);
      return;
    }
    dispatch(plannerSetPlanName(nextName));
  };

  const clickTab = (e: React.SyntheticEvent<EventTarget>) => setTab((e.target as HTMLButtonElement).name);

  const valid = () => {
    const validPlanName = planName.trim() !== "";
    const validPlanNameLength = planName.trim().length < 21;
    if (!validPlanName) {
      window.scrollTo(0,0);
      setFeedback("You forgot to name your plan...");
      setTimeout(() => setFeedback(""), 3000);
      return false;
    }
    if (!validPlanNameLength) {
      window.scrollTo(0,0);
      setFeedback("Please keep your plan name under 20 characters");
      setTimeout(() => setFeedback(""), 3000);
      return false;
    }
    return validPlanName && validPlanNameLength;
  };

  const handleSubmit = () => {
    if (!valid()) return;
    setLoading(true);
    if (editing) {
      const planInfo = {id: editingId as number, name: planName, data: getPlanData()};
      dispatch(userEditPlan(planInfo));
    } else {
      const planInfo = {name: planName, data: getPlanData()};
      dispatch(userCreateNewPlan(planInfo));
    }
  }

  return (
    <NewPlanView
      activateModal={activateModal}
      deactivateModal={deactivateModal}
      discardChanges={discardChanges}
      myFavoriteRecipes={myFavoriteRecipes}
      myPrivateRecipes={myPrivateRecipes}
      myPublicRecipes={myPublicRecipes}
      mySavedRecipes={mySavedRecipes}
      officialRecipes={recipes}
      editing={editing}
      expanded={expanded}
      expandedDay={expandedDay}
      feedback={feedback}
      getApplicationNode={getApplicationNode}
      changePlanName={changePlanName}
      handleSubmit={handleSubmit}
      clickTab={clickTab}
      loading={loading}
      modalActive={modalActive}
      planName={planName}
      recipeListsInsideDays={recipeListsInsideDays}
      tab={tab}
      twoColumnATheme={twoColumnATheme}
    />
  );
}

type Props = {
  editing: boolean;
};

export default NewPlan;