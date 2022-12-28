import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../store';
import { plannerViewLoad } from '../../store/plannerView/actions';
import { PlanView } from './view';

export default function Plan({ twoColumnATheme }: Props): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const myPlans = useSelector(state => state.data.myPlans);
  const expanded =    useSelector(state => state.plannerView.expanded);
  const expandedDay = useSelector(state => state.plannerView.expandedDay);
  const planName =    useSelector(state => state.plannerView.planName);
  const recipeListsInsideDays = useSelector(state => state.plannerView.recipeListsInsideDays);

  useEffect(() => {
    const getPlan = () => {
      window.scrollTo(0, 0);
      const [ prev ] = myPlans.filter(p => p.id === Number(id));
      dispatch(plannerViewLoad(prev.name, prev.data));
    };

    if (id) getPlan();
    else router.push('/home');
  }, []);

  return (<PlanView expanded={expanded} expandedDay={expandedDay} planName={planName} recipeListsInsideDays={recipeListsInsideDays} twoColumnATheme={twoColumnATheme} />);
}

type Props = {
  twoColumnATheme: string;
};