export function Tabs({ tabClick, tab }: Props): JSX.Element {
  function Tab({ displayText, tabName }: TabProps) {
    return (
      <button
        className={tab === tabName ? "dashboard-tab--active" : "dashboard-tab"}
        name={tabName}
        onClick={e => tabClick(e)}
      >
        {displayText}
      </button>
    );
  }

  return (
    <div className="dashboard-tabs">
      <Tab displayText="Avatar" tabName="avatar" />
      <Tab displayText="Plans" tabName="plans" />
      <Tab displayText="Recipes" tabName="recipes" />
      <Tab displayText="Ingredients" tabName="ingredients" />
      <Tab displayText="Equipment" tabName="equipment" />
    </div>
  );
}

type Props = {
  tabClick(e: React.SyntheticEvent<EventTarget>): void;
  tab: string;
};

type TabProps = {
  displayText: string;
  tabName: string;
};