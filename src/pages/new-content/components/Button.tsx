import { forwardRef, FunctionComponent, Ref } from 'react';

export const Button: FunctionComponent<Props> = forwardRef(
  ({ active, onMouseDown, ...props }, ref: Ref<HTMLSpanElement>) => <span {...props} ref={ref} style={{cursor: "pointer"}} />
);

type Props = {
  //className: string;
  active?: boolean;
  //reversed: boolean;
  onMouseDown(e: React.MouseEvent): void;
};

//className={className}
/*color: `${
          reversed
          ? active
            ? 'white'
            : '#aaa'
          : active
          ? 'black'
          : '#ccc'
        }`*/