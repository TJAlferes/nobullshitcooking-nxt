import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../store';
import { closeLeftNav } from '../../store/menu/actions';
import { Logo } from '..';
import menuItems from './Menu/items';
import { Menu } from './Menu/Menu';

// TO DO: dynamically generate menu items from content types

export function LeftNav(): JSX.Element {
  const { pathname } = useRouter();

  const dispatch = useDispatch();
  const authname = useSelector(state => state.auth.authname);
  const userIsAuthenticated =
    useSelector(state => state.auth.userIsAuthenticated);
  const theme = useSelector(state => state.theme.theme);

  const [ expanded, setExpanded ] = useState("none");

  const backgroundColor = theme === "left-nav-light" ? "#ddd" : "#444";
  
  const click = () => dispatch(closeLeftNav());

  const openMenu = (dropdown: string) => {
    if (dropdown === expanded) return;
    setExpanded(dropdown);
  };

  const closeMenus = () => setExpanded("none");

  function NavLink({ dataTest, text, to }: NavLinkProps): JSX.Element {
    const style = (to === pathname) ? {backgroundColor} : {};

    return (
      <Link href={to}>
        <a
          style={style}
          className="left-nav__a"
          data-test={dataTest}
        >
          {`${text}`}
        </a>
      </Link>
    );
  }

  return (
    <nav className={`left-nav ${theme}`}>
      <div className="left-nav-heading">
        <svg className="left-nav-toggle" onClick={click}>
          <g>
            <path
              d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
              fill="white"
            >
            </path>
          </g>
        </svg>

        <Logo />
      </div>

      <div className="left-nav-anchor" onMouseLeave={closeMenus}>
        <Menu
          closeMenus={closeMenus}
          expanded={expanded}
          level={0}
          menuItems={menuItems}
          openMenu={openMenu}
        />
      </div>

      <div className="left-nav-main">
        <hr className="left-nav__hr" />

        {userIsAuthenticated && (
          <>
            <NavLink dataTest="dashboard" text={authname} to="/dashboard" />
            <hr className="left-nav__hr" />
          </>
        )}

        <NavLink dataTest="home" text="Home" to="/" />

        {userIsAuthenticated && (
          <>
            <NavLink dataTest="chat" text="Chat" to="/chat" />
            <NavLink dataTest="friends" text="Friends" to="/friends" />
            <hr className="left-nav__hr" />
          </>
        )}

        <NavLink
          dataTest="supplements"
          text="Supplements"
          to="/page/guide/food/nutrition/supplements"
        />

        <NavLink
          dataTest="equipment"
          text="Equipment"
          to="/supply/kitchen-equipment"
        />

        <hr className="left-nav__hr" />

        <NavLink
          dataTest="filtration"
          text="Water Filtration"
          to="/page/promo/water-filtration"
        />

        <NavLink dataTest="tea" text="Tea" to="/page/promo/tea" />

        <NavLink dataTest="coffee" text="Coffee" to="/page/promo/coffee" />

        <hr className="left-nav__hr" />

        <NavLink
          dataTest="outdoors"
          text="Outdoors"
          to="/page/promo/outdoors"
        />

        <NavLink dataTest="garden" text="Garden" to="/page/promo/garden" />

        <NavLink dataTest="tools" text="Tools" to="/page/promo/tools" />

        <hr className="left-nav__hr" />

        <NavLink
          dataTest="seasonal"
          text="Seasonal"
          to="/page/promo/seasonal"
        />

        <hr className="left-nav__hr" />

        <NavLink dataTest="charity" text="Charity" to="/page/site/charity" />
      </div>
    </nav>
  );
}

type NavLinkProps = {
  dataTest: string;
  to: string;
  text: string;
};