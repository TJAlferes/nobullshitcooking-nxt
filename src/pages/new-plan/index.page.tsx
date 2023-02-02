import dynamic from 'next/dynamic';

//import { LoaderSpinner } from '../../components';
import { initialUserProps } from '../../store';
const NewPlan = dynamic(() => import('./NewPlan'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

export default function NewPlanPage({ editing }: Props): JSX.Element {
  return <NewPlan editing={editing} />;
}

type Props = {
  editing: boolean;
};

export const getInitialProps = initialUserProps();  // getServerSideProps ?
