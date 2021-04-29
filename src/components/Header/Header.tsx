import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../store';
import { leftNavShow, menuShadowShow } from '../../store/menu/actions';
import { Logo } from './Logo/Logo';
import { Promo } from './Promo/Promo';
import Search from './Search/Search';
import SiteNav from './SiteNav/SiteNav';
import UserNav from './UserNav/UserNav';

export function Header(): JSX.Element {
  const dispatch = useDispatch();

  const theme = useSelector(state => state.theme.headerTheme);  // useContext?

  const click = () => {
    dispatch(leftNavShow());
    dispatch(menuShadowShow());
  };

  return (
    <header className={`header ${theme}`}>
      <div className="header-row-1">
        <div className="header-row-1-col-1">
        <div className="left-nav-toggle" onClick={click}>Toggle</div>
          <Logo theme={theme} />
        </div>

        <div className="header-row-1-col-2"><Search theme={theme} /></div>

        <div className="header-row-1-col-3"><Promo /></div>
      </div>

      <div className="header-row-2">
        <div className="header-row-2-col-1"><SiteNav /></div>

        <div className="header-row-2-col-2"></div>

        <div className="header-row-2-col-3"><UserNav theme={theme} /></div>
      </div>
    </header>
  );
}