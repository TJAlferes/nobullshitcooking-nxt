export function Tabs({ tab, tabClick }: Props): JSX.Element {
  return (
    <div className="dashboard-tabs">
      <button className={tab === "avatar" ? "dashboard-tab--active" : "dashboard-tab"}      name={"avatar"}      onClick={e => tabClick(e)}>{"Avatar"}</button>
      <button className={tab === "plans" ? "dashboard-tab--active" : "dashboard-tab"}       name={"plans"}       onClick={e => tabClick(e)}>{"Plans"}</button>
      <button className={tab === "recipes" ? "dashboard-tab--active" : "dashboard-tab"}     name={"recipes"}     onClick={e => tabClick(e)}>{"Recipes"}</button>
      <button className={tab === "ingredients" ? "dashboard-tab--active" : "dashboard-tab"} name={"ingredients"} onClick={e => tabClick(e)}>{"Ingredients"}</button>
      <button className={tab === "equipment" ? "dashboard-tab--active" : "dashboard-tab"}   name={"equipment"}   onClick={e => tabClick(e)}>{"Equipment"}</button>
    </div>
  );
}

type Props = {
  tab:                                            string;
  tabClick(e: React.SyntheticEvent<EventTarget>): void;
};