import React, { ReactNode, useState } from 'react';

import { ExpandCollapseView } from './view';

export function ExpandCollapse({ children, headingWhileCollapsed = "More info (Click here to expand)", headingWhileExpanded = "(Click here to collapse)" }: Props) {
  const [ expanded, setExpanded ] = useState(false);

  const toggle = () => setExpanded(prevState => !prevState);

  return (
    <ExpandCollapseView expanded={expanded} toggle={toggle} headingWhileCollapsed={headingWhileCollapsed} headingWhileExpanded={headingWhileExpanded}>
      {children}
    </ExpandCollapseView>
  );
};

type Props = {
  children:               ReactNode;
  headingWhileCollapsed?: ReactNode;
  headingWhileExpanded?:  ReactNode;
};
