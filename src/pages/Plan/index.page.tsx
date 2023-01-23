import dynamic from 'next/dynamic';

//import { LoaderSpinner } from '../../components';
const Plan = dynamic(() => import('./Plan'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

export default function PlanPage(): JSX.Element {
  return <Plan />;
}
