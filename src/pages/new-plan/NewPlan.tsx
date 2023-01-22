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
  const expandedDay = useSelector(state => state.planner.expandedDay);
  const editingId =   useSelector(state => state.planner.editingId);
  const planName =    useSelector(state => state.planner.planName);
  const planData =    useSelector(state => state.planner.planData);
  const message =     useSelector(state => state.user.message);
  const theme =       useSelector(state => state.theme.theme);

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
      if (message !== "") window.scrollTo(0, 0);
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

  const getPlanData = () => JSON.stringify(planData);  // clean/format? *** keys???

  const changePlanName = (e: React.SyntheticEvent<EventTarget>) => {
    const nextName = (e.target as HTMLInputElement).value.trim();
    if (nextName.length > 20) {
      window.scrollTo(0, 0);
      setFeedback("Please keep your plan name under 20 characters");
      setTimeout(() => setFeedback(""), 3000);
      return;
    }
    dispatch(setPlanName(nextName));
  };

  const clickTab = (e: React.SyntheticEvent<EventTarget>) => setTab((e.target as HTMLButtonElement).name);

  const valid = () => {
    const validName =       planName.trim() !== "";
    const validNameLength = planName.trim().length < 21;

    if (!validName) {
      window.scrollTo(0, 0);
      setFeedback("You forgot to name your plan...");
      setTimeout(() => setFeedback(""), 3000);
      return false;
    }

    if (!validNameLength) {
      window.scrollTo(0, 0);
      setFeedback("Please keep your plan name under 20 characters");
      setTimeout(() => setFeedback(""), 3000);
      return false;
    }

    return validName && validNameLength;
  };

  const handleSubmit = () => {
    if (!valid()) return;

    setLoading(true);

    const planInfo = {
      name: planName,
      data: getPlanData()
    };

    if (editing) {
      const planEditInfo = {
        id: editingId as number,
        ...planInfo
      };

      dispatch(editPlan(planEditInfo));
    } else {
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
      expandedDay={expandedDay}
      feedback={feedback}
      getApplicationNode={getApplicationNode}
      changePlanName={changePlanName}
      handleSubmit={handleSubmit}
      clickTab={clickTab}
      loading={loading}
      modalActive={modalActive}
      planName={planName}
      planData={planData}
      tab={tab}
      theme={theme}
    />
  );
}

type Props = {
  editing: boolean;
};

export default NewPlan;