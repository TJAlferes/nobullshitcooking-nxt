//import { Feed }        from './Feed';
import { Landing }     from './Landing';
import { Suggestions } from './Suggestions';

export function Home() {
  return <div className="two-col home"><Landing /><Suggestions /></div>;
}
