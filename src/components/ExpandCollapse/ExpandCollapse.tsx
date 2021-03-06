import React, { FC, useState } from 'react';

import { ExpandCollapseView } from './ExpandCollapseView';

export const ExpandCollapse: FC<Props> = ({
  children,
  headingWhileCollapsed = "More info (Click here to expand)",
  headingWhileExpanded = "(Click here to collapse)"
}) => {
  const [ expanded, setExpanded ] = useState(false);

  const toggle = () => setExpanded(prevState => !prevState);

  return (
    <ExpandCollapseView
      expanded={expanded}
      toggle={toggle}
      headingWhileCollapsed={headingWhileCollapsed}
      headingWhileExpanded={headingWhileExpanded}
    >
      {children}
    </ExpandCollapseView>
  );
};

type Props = {
  headingWhileCollapsed?: string;
  headingWhileExpanded?: string;
};