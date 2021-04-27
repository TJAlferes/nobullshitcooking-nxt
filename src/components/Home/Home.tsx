import { Feed } from './Feed/Feed';
import { Suggestions } from './Suggestions/Suggestions';

export default function Home(): JSX.Element {
  return (
    <div className="home">
      <Feed />

      <Suggestions />
    </div>
  );
}