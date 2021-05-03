export function Subtabs({ subTabClick, subTab }: Props): JSX.Element {
  function Subtab({ displayText, subTabName }: SubtabProps) {
    return (
      <button
        className={
          subTab === subTabName
            ? "dashboard-subtab--active"
            : "dashboard-subtab"
        }
        name={subTabName}
        onClick={e => subTabClick(e)}
      >
        {displayText}
      </button>
    );
  }

  return (
    <div className="dashboard-subtabs">
      <Subtab displayText="Private" subTabName="private" />
      <Subtab displayText="Public" subTabName="public" />
      <Subtab displayText="Favorite" subTabName="favorite" />
      <Subtab displayText="Saved" subTabName="saved" />
    </div>
  );
}

type Props = {
  subTabClick(e: React.SyntheticEvent<EventTarget>): void;
  subTab: string;
};

type SubtabProps = {
  displayText: string;
  subTabName: string;
};