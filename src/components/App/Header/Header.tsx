import React from 'react';

import { useTypedSelector as useSelector } from '../../../store';
import { Logo } from './Logo/Logo';
import { Promo } from './Promo/Promo';
import Search from './Search/Search';
import SiteNav from './SiteNav/SiteNav';
import UserNav from './UserNav/UserNav';

export function Header(): JSX.Element {
  const theme = useSelector(state => state.theme.headerTheme);  // useContext?

  return (
    <header className={`header ${theme}`}>
      <div className="header-row-1">
        <div className="header-row-1-col-1"><Logo theme={theme} /></div>

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