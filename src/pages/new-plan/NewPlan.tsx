import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../store';
import { clearWork, setCreating, setEditingId, setPlanName, setPlanData } from '../../store/planner/actions';
import { createNewPlan, editPlan } from '../../store/user/plan/actions';
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
  const message = useSelector(state => state.user.message);
  const theme =   useSelector(state => state.theme.theme);

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
      dispatch(setEditingId(Number(prev.id)));
      dispatch(setPlanName(prev.name));
      dispatch(setPlanData(prev.data));
      setLoading(false);
    };

    if (editing) {
      dispatch(clearWork());
      getExistingPlanToEdit();
    } else {
      dispatch(clearWork());
      dispatch(setCreating());
    }
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      if (message !== "") window.scrollTo(0,0);
      setFeedback(message);
      if (message === "Plan created." || message === "Plan updated.") {
        setTimeout(() => {
          dispatch(clearWork());
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
    dispatch(clearWork());
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
    dispatch(setPlanName(nextName));
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
      dispatch(editPlan(planInfo));
    } else {
      const planInfo = {name: planName, data: getPlanData()};
      dispatch(createNewPlan(planInfo));
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
      theme={theme}
    />
  );
}

type Props = {
  editing: boolean;
};

export default NewPlan;