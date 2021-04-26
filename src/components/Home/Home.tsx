import { LeftNav } from '..';
import { Feed } from './Feed/Feed';
import { Suggestions } from './Suggestions/Suggestions';

// TO DO: make NOBSC's LeftNav like Youtube's.

export default function Home(): JSX.Element {
  return (
    <div className="home">
      <div className="home--desktop">
        <LeftNav />
        <Feed />
        <Suggestions />
      </div>
      <div className="home--mobile">
        <Feed />
        <Suggestions />
      </div>
    </div>
  );
}