export function Subtabs({ subTab, subTabClick }: Props): JSX.Element {
  return (
    <div className="dashboard-subtabs">
      <button className={subTab === "private" ? "dashboard-subtab--active" : "dashboard-subtab"}  name={"private"}  onClick={e => subTabClick(e)}>{"Private"}</button>
      <button className={subTab === "public" ? "dashboard-subtab--active" : "dashboard-subtab"}   name={"public"}   onClick={e => subTabClick(e)}>{"Public"}</button>
      <button className={subTab === "favorite" ? "dashboard-subtab--active" : "dashboard-subtab"} name={"favorite"} onClick={e => subTabClick(e)}>{"Favorite"}</button>
      <button className={subTab === "saved" ? "dashboard-subtab--active" : "dashboard-subtab"}    name={"saved"}    onClick={e => subTabClick(e)}>{"Saved"}</button>
    </div>
  );
}

type Props = {
  subTab:                                            string;
  subTabClick(e: React.SyntheticEvent<EventTarget>): void;
};