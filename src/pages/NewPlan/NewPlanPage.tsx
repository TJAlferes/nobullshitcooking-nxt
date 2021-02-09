import React from 'react';
import { lazy, LazyBoundary } from 'react-imported-component';

//const MobileNewPlanToggle = lazy(() => import('./MobileNewPlanToggle'));
const NewPlan = lazy(() => import('./NewPlan'));
import './newPlanPage.css'

export default function NewPlanPage({
  editing,
  twoColumnATheme
}: Props): JSX.Element {
  return (
    <div className="new-plan-page">
      <LazyBoundary fallback={<div>Loading...</div>} >
        <NewPlan
          editing={editing}
          planView="desktop"
          twoColumnATheme={twoColumnATheme}
        />
      </LazyBoundary>
    </div>
  );
}

type Props = {
  editing: boolean;
  twoColumnATheme: string;
};