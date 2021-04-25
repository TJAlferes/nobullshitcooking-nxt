import Link from 'next/link';
import React from 'react';

import { useTypedSelector as useSelector } from '../../store';

export default function LeftNav(): JSX.Element {
  const { authname, userIsAuthenticated } = useSelector(state => state.auth);
  const theme = useSelector(state => state.theme.leftNavTheme);

  const backgroundColor = theme === "left-nav-light" ? "#ddd" : "#444";

  function LeftNavLink({ dataTest, text, to }: LeftNavLinkProps): JSX.Element {
    return (
      <Link href={to}>
        <a
          style={{backgroundColor}}
          className="left-nav-link"
          data-test={dataTest}
        >
          {`${text}`}
        </a>
      </Link>
    );
  }

  return (
    <nav className={`left-nav ${theme}`}>
      {
        userIsAuthenticated &&
        <LeftNavLink dataTest="dashboard" text={authname} to="/dashboard" />
      }
      {userIsAuthenticated && <hr />}

      <LeftNavLink dataTest="home" text="News" to="/home" />
      {
        userIsAuthenticated &&
        <LeftNavLink dataTest="chat" text="Chat" to="/chat" />
      }
      {
        userIsAuthenticated &&
        <LeftNavLink dataTest="friends" text="Friends" to="/friends" />
      }
      <hr />

      <LeftNavLink
        dataTest="supplements"
        text="Supplements"
        to="/page/guide/food/nutrition/supplements"
      />
      <LeftNavLink
        dataTest="equipment"
        text="Equipment"
        to="/supply/kitchen-equipment"
      />
      <hr />

      <LeftNavLink
        dataTest="filtration"
        text="Water Filtration"
        to="/page/promo/water-filtration"
      />
      <LeftNavLink dataTest="tea" text="Tea" to="/page/promo/tea" />
      <LeftNavLink dataTest="coffee" text="Coffee" to="/page/promo/coffee" />
      <hr />

      <LeftNavLink
        dataTest="outdoors"
        text="Outdoors"
        to="/page/promo/outdoors"
      />
      <LeftNavLink dataTest="garden" text="Garden" to="/page/promo/garden" />
      <LeftNavLink dataTest="tools" text="Tools" to="/page/promo/tools" />
      <hr />

      <LeftNavLink
        dataTest="seasonal"
        text="Seasonal"
        to="/page/promo/seasonal"
      />
      <hr />

      <LeftNavLink dataTest="charity" text="Charity" to="/page/site/charity" />
    </nav>
  );
}

type LeftNavLinkProps = {
  dataTest: string;
  to: string;
  text: string;
};