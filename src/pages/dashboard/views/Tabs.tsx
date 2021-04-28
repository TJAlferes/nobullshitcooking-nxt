export function Tabs({ tabClick, tab }: Props): JSX.Element {
  function TabButton({ displayText, tabName }: TabButtonProps) {
    return (
      <button
        className={
          tab === tabName ? "dashboard__tab--active" : "dashboard__tab"
        }
        name={tabName}
        onClick={e => tabClick(e)}
      >
        {displayText}
      </button>
    );
  }

  return (
    <div className="dashboard__tabs">
      <TabButton displayText="Avatar" tabName="avatar" />
      <TabButton displayText="Plans" tabName="plans" />
      <TabButton displayText="Recipes" tabName="recipes" />
      <TabButton displayText="Ingredients" tabName="ingredients" />
      <TabButton displayText="Equipment" tabName="equipment" />
    </div>
  );
}

type Props = {
  tabClick(e: React.SyntheticEvent<EventTarget>): void;
  tab: string;
};

type TabButtonProps = {
  displayText: string;
  tabName: string;
};