export function Tabs({ tab, tabClick }: Props): JSX.Element {
  return (
    <div className="dashboard-tabs">
      <button className={tab === "avatar" ? "--active" : ""}      name={"avatar"}      onClick={e => tabClick(e)}>{"Avatar"}</button>
      <button className={tab === "plans" ? "--active" : ""}       name={"plans"}       onClick={e => tabClick(e)}>{"Plans"}</button>
      <button className={tab === "recipes" ? "--active" : ""}     name={"recipes"}     onClick={e => tabClick(e)}>{"Recipes"}</button>
      <button className={tab === "ingredients" ? "--active" : ""} name={"ingredients"} onClick={e => tabClick(e)}>{"Ingredients"}</button>
      <button className={tab === "equipment" ? "--active" : ""}   name={"equipment"}   onClick={e => tabClick(e)}>{"Equipment"}</button>
    </div>
  );
}

type Props = {
  tab:                                            string;
  tabClick(e: React.SyntheticEvent<EventTarget>): void;
};