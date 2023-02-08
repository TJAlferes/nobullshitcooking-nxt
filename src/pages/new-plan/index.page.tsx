import dynamic from 'next/dynamic';

//import { LoaderSpinner } from '../../components';
const NewPlan = dynamic(() => import('./NewPlan'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

export default function NewPlanPage(): JSX.Element {
  return <NewPlan />;
}
