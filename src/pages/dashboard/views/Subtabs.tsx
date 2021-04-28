export function Subtabs({ subTabClick, subTab }: Props): JSX.Element {
  function SubtabButton({ displayText, subTabName }: SubtabButtonProps) {
    return (
      <button
        className={
          subTab === subTabName
          ? "dashboard__subtab--active"
          : "dashboard__subtab"
        }
        name={subTabName}
        onClick={e => subTabClick(e)}
      >
        {displayText}
      </button>
    );
  }

  return (
    <div className="dashboard__subtabs">
      <SubtabButton displayText="Private" subTabName="private" />
      <SubtabButton displayText="Public" subTabName="public" />
      <SubtabButton displayText="Favorite" subTabName="favorite" />
      <SubtabButton displayText="Saved" subTabName="saved" />
    </div>
  );
}

type Props = {
  subTabClick(e: React.SyntheticEvent<EventTarget>): void;
  subTab: string;
};

type SubtabButtonProps = {
  displayText: string;
  subTabName: string;
};