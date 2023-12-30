import React, { ReactNode, useState } from 'react';

const noop = () => {};

export function ExpandCollapse({
  children,
  headingWhileCollapsed = "More info (Click here to expand)",
  headingWhileExpanded = "(Click here to collapse)",
  isDisabled = false,
  handler = noop,
  isExpandedByDefault = false
}: Props) {
  const [expanded, setExpanded] = useState(isExpandedByDefault);

  const toggle = () => {
    if (isDisabled) return;
    setExpanded(prevState => !prevState);
    if (handler) handler();
  };

  if (!expanded) {
    return (
      <div className="expand-collapse">
        <div className="collapsed" onClick={toggle}>{headingWhileCollapsed}</div>
      </div>
    );
  }

  return (
    <div className="expand-collapse">
      <>
        <div className="expanded" onClick={toggle}>{headingWhileExpanded}</div>
        {children}
      </>
    </div>
  );
};

type Props = {
  children:               ReactNode;
  headingWhileCollapsed?: ReactNode;
  headingWhileExpanded?:  ReactNode;
  isDisabled?:            boolean;
  handler?:               Function;
  isExpandedByDefault?:   boolean;
};
