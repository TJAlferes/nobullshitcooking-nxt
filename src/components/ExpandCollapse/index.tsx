import React, { ReactNode, useState } from 'react';

import { ExpandCollapseView } from './view';

const noop = () => {};

export function ExpandCollapse({
  children,
  headingWhileCollapsed = "More info (Click here to expand)",
  headingWhileExpanded = "(Click here to collapse)",
  isDisabled = false,
  handler = noop
}: Props) {
  const [ expanded, setExpanded ] = useState(false);

  const toggle = () => {
    if (isDisabled) return;
    setExpanded(prevState => !prevState);
    if (handler) handler();
  }

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
  children:               ReactNode;
  headingWhileCollapsed?: ReactNode;
  headingWhileExpanded?:  ReactNode;
  isDisabled?:            boolean;
  handler?:               Function;
};
