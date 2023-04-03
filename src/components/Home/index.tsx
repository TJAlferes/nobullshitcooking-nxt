import { Feed } from './Feed';
import { Suggestions } from './Suggestions';

export function Home() {
  return <div className="two-col home"><Feed /><Suggestions /></div>;
}
