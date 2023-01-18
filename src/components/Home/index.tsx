import { Feed } from './Feed';
import { Suggestions } from './Suggestions';

export function Home(): JSX.Element {
  return <div className="home"><Feed /><Suggestions /></div>;
}