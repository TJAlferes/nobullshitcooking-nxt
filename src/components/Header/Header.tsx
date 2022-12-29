import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../store';
import { openLeftNav } from '../../store/menu/actions';
import { Logo } from '..';
import Search from './Search';
import { UserNav } from './UserNav';

export function Header(): JSX.Element {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);

  const click = () => dispatch(openLeftNav());

  return (
    <header className={`header ${theme}`}>
      <div className="header-l">
        <svg className="left-nav-toggle" onClick={click}><g><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="white"></path></g></svg>
        <Logo />
      </div>
      <Search />
      <UserNav />
    </header>
  );
}