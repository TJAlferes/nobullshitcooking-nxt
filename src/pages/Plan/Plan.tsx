import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../store';
import { load } from '../../store/plannerView/actions';
import { PlanView } from './view';

export default function Plan() {
  const router = useRouter();
  const params = useSearchParams();
  const id = Number(params.get('id'));

  const dispatch = useDispatch();
  const myPlans =     useSelector(state => state.data.myPlans);
  const expandedDay = useSelector(state => state.plannerView.expandedDay);
  const planName =    useSelector(state => state.plannerView.planName);
  const planData =    useSelector(state => state.plannerView.planData);

  useEffect(() => {
    const getPlan = () => {
      window.scrollTo(0, 0);
      const [ prev ] = myPlans.filter(p => p.id === Number(id));
      dispatch(load(prev.name, prev.data));
    };

    if (id) getPlan();
    else router.push('/');
  }, []);

  return <PlanView expandedDay={expandedDay} planName={planName} planData={planData} />;
}
