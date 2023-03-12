import { Feed } from './Feed';
import { Suggestions } from './Suggestions';

export function Home() {
  return <div className="home"><Feed /><Suggestions /></div>;
}
