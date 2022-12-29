import { Feed } from './Feed/Feed';
import { Suggestions } from './Suggestions/Suggestions';

export function Home(): JSX.Element {
  return <div className="home"><Feed /><Suggestions /></div>;
}