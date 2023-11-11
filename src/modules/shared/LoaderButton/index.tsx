export function LoaderButton({
  className,
  disabled = false,
  id,
  isLoading,
  loadingText,
  name,
  onClick,
  onKeyUp = (e: React.KeyboardEvent) => {},
  type = "button",
  text
}: Props) {
  return (
    <button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      id={id}
      name={name}
      onClick={e => onClick(e)}
      onKeyUp={e => onKeyUp(e)}
      type={type}
    >
      {!isLoading ? text : loadingText}
    </button>
  );
};

type Props = {
  className:                        string;
  disabled?:                        boolean;
  id:                               string;
  isLoading:                        boolean;
  loadingText:                      string;
  name?:                             string;
  onClick(e?: React.MouseEvent):    void;
  onKeyUp?(e: React.KeyboardEvent): void;
  type?:                             "button" | "submit" | "reset";
  text:                             string;
};
