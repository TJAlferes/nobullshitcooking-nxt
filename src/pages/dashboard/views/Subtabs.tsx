export function Subtabs({ subTab, subTabClick }: Props): JSX.Element {
  return (
    <div className="dashboard-subtabs">
      <button className={subTab === "private" ? "--active" : undefined}  name={"private"}  onClick={e => subTabClick(e)}>{"Private"}</button>
      <button className={subTab === "public" ? "--active" : undefined}   name={"public"}   onClick={e => subTabClick(e)}>{"Public"}</button>
      <button className={subTab === "favorite" ? "--active" : undefined} name={"favorite"} onClick={e => subTabClick(e)}>{"Favorite"}</button>
      <button className={subTab === "saved" ? "--active" : undefined}    name={"saved"}    onClick={e => subTabClick(e)}>{"Saved"}</button>
    </div>
  );
}

type Props = {
  subTab:                                            string;
  subTabClick(e: React.SyntheticEvent<EventTarget>): void;
};