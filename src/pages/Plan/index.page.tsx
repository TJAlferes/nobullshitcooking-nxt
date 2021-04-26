import dynamic from 'next/dynamic';

//import { LoaderSpinner } from '../../components';
const Plan = dynamic(() => import('./Plan'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

export default function PlanPage({ twoColumnATheme }: Props): JSX.Element {
  return <Plan twoColumnATheme={twoColumnATheme} />;
}

type Props = {
  twoColumnATheme: string;
};