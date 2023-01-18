import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../store';
import { closeLeftNav } from '../../store/menu/actions';
import { Logo } from '..';
import menuItems from './Menu/items';
import { Menu } from './Menu';

function NavLink({ dataTest, text, to }: NavLinkProps): JSX.Element {
  const { pathname } = useRouter();
  const theme =        useSelector(state => state.theme.theme);

  const backgroundColor = theme === "light" ? "#ddd" : "#444";
  const style =           (to === pathname) ? {backgroundColor} : {};

  return <Link href={to} data-test={dataTest} style={style}>{`${text}`}</Link>;
}

export function LeftNav(): JSX.Element {
  const dispatch = useDispatch();
  const authname =            useSelector(state => state.auth.authname);
  const userIsAuthenticated = useSelector(state => state.auth.userIsAuthenticated);
  const theme =               useSelector(state => state.theme.theme);
  const [ expanded, setExpanded ] = useState("none");
  
  const click = () => dispatch(closeLeftNav());

  const openMenu = (dropdown: string) => {
    if (dropdown === expanded) return;
    setExpanded(dropdown);
  };

  const closeMenus = () => setExpanded("none");

  return (
    <nav className={`left-nav ${theme}`}>
      <div className="heading">
        <svg className="toggle" onClick={click}><g><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="white"></path></g></svg>
        <Logo />
      </div>

      <div className="anchor" onMouseLeave={closeMenus}>
        <Menu closeMenus={closeMenus} expanded={expanded} level={0} menuItems={menuItems} openMenu={openMenu} />
      </div>

      <div className="main">
        <NavLink dataTest="home" text="Home" to="/" />
        <hr />

        {userIsAuthenticated && <NavLink dataTest="dashboard" text={authname} to="/dashboard" />}
        {userIsAuthenticated && <NavLink dataTest="chat" text="Chat" to="/chat" />}
        {userIsAuthenticated && <NavLink dataTest="friends" text="Friends" to="/friends" />}
        {userIsAuthenticated && <hr />}

        <NavLink dataTest="supplements" text="Supplements" to="/page/guide/food/nutrition/supplements" />
        <NavLink dataTest="equipment" text="Equipment" to="/supply/kitchen-equipment" />
        <hr />

        <NavLink dataTest="filtration" text="Water Filtration" to="/page/promo/water-filtration" />
        <NavLink dataTest="tea" text="Tea" to="/page/promo/tea" />
        <NavLink dataTest="coffee" text="Coffee" to="/page/promo/coffee" />
        <hr />

        <NavLink dataTest="outdoors" text="Outdoors" to="/page/promo/outdoors" />
        <NavLink dataTest="garden" text="Garden" to="/page/promo/garden" />
        <NavLink dataTest="tools" text="Tools" to="/page/promo/tools" />
        <hr />

        <NavLink dataTest="seasonal" text="Seasonal" to="/page/promo/seasonal" />
        <hr />

        <NavLink dataTest="charity" text="Charity" to="/page/site/charity" />
      </div>
    </nav>
  );
}

type NavLinkProps = {
  dataTest: string;
  to:       string;
  text:     string;
};