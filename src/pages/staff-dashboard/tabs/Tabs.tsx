export function Tabs({ handleTabClick, tab }: Props): JSX.Element {
  return (
    <div className="dashboard-tabs">
      <button className={tab === "recipes" ? "--active" : undefined}     name="recipes"     onClick={e => handleTabClick(e)}>Recipes</button>
      <button className={tab === "ingredients" ? "--active" : undefined} name="ingredients" onClick={e => handleTabClick(e)}>Ingredients</button>
      <button className={tab === "equipment" ? "--active" : undefined}   name="equipment"   onClick={e => handleTabClick(e)}>Equipment</button>
    </div>
  );
}

type Props = {
  handleTabClick(e: React.SyntheticEvent<EventTarget>): void;
  tab:                                                  string;
};