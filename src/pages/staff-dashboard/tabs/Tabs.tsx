export function Tabs({ handleTabClick, tab }: Props): JSX.Element {
  return (
    <div className="staff-dashboard-tabs">
      <button className={tab === "recipes" ? "staff-dashboard-tab active" : "staff-dashboard-tab inactive"}     name="recipes"     onClick={e => handleTabClick(e)}>Recipes</button>
      <button className={tab === "ingredients" ? "staff-dashboard-tab active" : "staff-dashboard-tab inactive"} name="ingredients" onClick={e => handleTabClick(e)}>Ingredients</button>
      <button className={tab === "equipment" ? "staff-dashboard-tab active" : "staff-dashboard-tab inactive"}   name="equipment"   onClick={e => handleTabClick(e)}>Equipment</button>
    </div>
  );
}

type Props = {
  handleTabClick(e: React.SyntheticEvent<EventTarget>): void;
  tab:                                                  string;
};