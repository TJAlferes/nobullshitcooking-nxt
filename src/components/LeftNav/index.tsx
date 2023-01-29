import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../store';
import { closeLeftNav } from '../../store/menu/actions';
import { Logo } from '..';
import menuItems from './Menu/items';
import { Menu } from './Menu';

function NavLink({ text, to }: NavLinkProps): JSX.Element {
  const { pathname } = useRouter();
  const theme =        useSelector(state => state.theme.theme);

  const backgroundColor = theme === "light" ? "#ddd" : "#444";
  const style =           (to === pathname) ? {backgroundColor} : {};

  return <Link href={to} style={style}>{`${text}`}</Link>;
}

export function LeftNav(): JSX.Element | null {
  const dispatch = useDispatch();
  const authname =            useSelector(state => state.auth.authname);
  const userIsAuthenticated = useSelector(state => state.auth.userIsAuthenticated);
  const leftNav =             useSelector(state => state.menu.leftNav);
  const [ expanded, setExpanded ] = useState("none");
  
  const click = () => dispatch(closeLeftNav());

  const openMenu = (dropdown: string) => {
    if (dropdown === expanded) return;
    setExpanded(dropdown);
  };

  const closeMenus = () => setExpanded("none");

  return !leftNav ? (
    <>
      <div className="shadow--hide"></div>
    </>
  ) : (
    <>
      <nav className="left-nav">
        <div className="heading">
          <svg className="toggle" onClick={click}><g><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="white"></path></g></svg>
          <Logo />
        </div>

        <div className="anchor" onMouseLeave={closeMenus}>
          <Menu closeMenus={closeMenus} expanded={expanded} level={0} menuItems={menuItems} openMenu={openMenu} />
        </div>

        <div className="main">
          <NavLink text="Home" to="/" />
          <hr />

          {userIsAuthenticated && <NavLink text={authname} to="/dashboard" />}
          {userIsAuthenticated && <NavLink text="Chat" to="/chat" />}
          {userIsAuthenticated && <NavLink text="Friends" to="/friends" />}
          {userIsAuthenticated && <hr />}

          <NavLink text="Supplements" to="/page/guide/food/nutrition/supplements" />
          <NavLink text="Equipment" to="/supply/kitchen-equipment" />
          <hr />

          <NavLink text="Water Filtration" to="/page/promo/water-filtration" />
          <NavLink text="Tea" to="/page/promo/tea" />
          <NavLink text="Coffee" to="/page/promo/coffee" />
          <hr />

          <NavLink text="Outdoors" to="/page/promo/outdoors" />
          <NavLink text="Garden" to="/page/promo/garden" />
          <NavLink text="Tools" to="/page/promo/tools" />
          <hr />

          <NavLink text="Seasonal" to="/page/promo/seasonal" />
          <hr />

          <NavLink text="Charity" to="/page/site/charity" />
        </div>
      </nav>
      <div className="shadow--show"></div>
    </>
  );
}

type NavLinkProps = {
  text: string;
  to:   string;
};