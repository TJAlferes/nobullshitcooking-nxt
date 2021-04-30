import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../store';
import { openLeftNav } from '../../store/menu/actions';
import { Logo } from '..';
import Search from './Search/Search';
import UserNav from './UserNav/UserNav';

export function Header(): JSX.Element {
  const dispatch = useDispatch();

  const theme = useSelector(state => state.theme.headerTheme);  // useContext?

  const click = () => {
    dispatch(openLeftNav());
  };

  return (
    <header className={`header ${theme}`}>
      <div className="header-col-1">
        <svg className="left-nav-toggle" onClick={click}>
          <g>
            <path
              d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
              fill="white"
            >
            </path>
          </g>
        </svg>
        <Logo theme={theme} />
      </div>

      <div className="header-col-2"><Search theme={theme} /></div>

      <div className="header-col-3"><UserNav theme={theme} /></div>
    </header>
  );
}