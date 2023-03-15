import React, { ReactNode } from 'react';

export function ExpandCollapseView({ children, expanded, headingWhileCollapsed, headingWhileExpanded, toggle }: Props) {
  return (
    <div className="expand-collapse">
      {!expanded
        ? <div className="collapsed" onClick={toggle}>{headingWhileCollapsed}</div>
        : (
          <>
            <div className="expanded" onClick={toggle}>{headingWhileExpanded}</div>
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
  headingWhileCollapsed: ReactNode;
  headingWhileExpanded:  ReactNode;
  toggle():              void; 
};
