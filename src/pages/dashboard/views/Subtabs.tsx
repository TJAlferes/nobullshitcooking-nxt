export function Subtabs({ subTab, subTabClick }: Props): JSX.Element {
  return (
    <div className="dashboard-subtabs">
      <button className={subTab === "private" ? "--active" : ""}  name={"private"}  onClick={e => subTabClick(e)}>{"Private"}</button>
      <button className={subTab === "public" ? "--active" : ""}   name={"public"}   onClick={e => subTabClick(e)}>{"Public"}</button>
      <button className={subTab === "favorite" ? "--active" : ""} name={"favorite"} onClick={e => subTabClick(e)}>{"Favorite"}</button>
      <button className={subTab === "saved" ? "--active" : ""}    name={"saved"}    onClick={e => subTabClick(e)}>{"Saved"}</button>
    </div>
  );
}

type Props = {
  subTab:                                            string;
  subTabClick(e: React.SyntheticEvent<EventTarget>): void;
};