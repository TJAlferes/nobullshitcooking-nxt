import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../store';
import { plannerViewLoad } from '../../store/plannerView/actions';
//import MobilePlanView from './views/MobilePlanView';
import { PlanView } from './PlanView';

export default function Plan({
  planView,
  twoColumnATheme
}: Props): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const myPlans = useSelector(state => state.data.myPlans);
  const expanded = useSelector(state => state.plannerView.expanded);
  const expandedDay = useSelector(state => state.plannerView.expandedDay);
  const planName = useSelector(state => state.plannerView.planName);
  const recipeListsInsideDays =
    useSelector(state => state.plannerView.recipeListsInsideDays);

  useEffect(() => {
    const getPlan = () => {
      window.scrollTo(0, 0);
      const [ prev ] = myPlans.filter(p => p.id === Number(id));
      dispatch(plannerViewLoad(prev.name, prev.data));
    };

    if (id) getPlan();
    else router.push('/home');
  }, []);

  //if (planView === "mobile") MobilePlanView;
  //if (planView === "desktop") PlanView;

  return (
    <PlanView
      expanded={expanded}
      expandedDay={expandedDay}
      planName={planName}
      recipeListsInsideDays={recipeListsInsideDays}
      twoColumnATheme={twoColumnATheme}
    />
  );
}

type Props = {
  planView: string;
  twoColumnATheme: string;
};