import React, { ReactNode } from 'react';

export function ExpandCollapseView({ children, expanded, headingWhileCollapsed, headingWhileExpanded, toggle }: Props): JSX.Element {
  return (
    <div className="expand-collapse">
      {!expanded
        ? <div data-test="expand" onClick={toggle}>{headingWhileCollapsed}</div>
        : (
          <>
            <div data-test="collapse" onClick={toggle}>{headingWhileExpanded}</div>
            <br />
            {children}
          </>
        )
      }
    </div>
  );
};

type Props = {
  children:              ReactNode;
  expanded:              boolean;
  headingWhileCollapsed: string;
  headingWhileExpanded:  string;
  toggle():              void; 
};