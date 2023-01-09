import React, { FC } from 'react';

export const ExpandCollapseView: FC<Props> = ({ children, expanded, headingWhileCollapsed, headingWhileExpanded, toggle }): JSX.Element => {
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
  expanded:              boolean;
  headingWhileCollapsed: string;
  headingWhileExpanded:  string;
  toggle():              void; 
};