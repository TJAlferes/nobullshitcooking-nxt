import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { Logo } from '..';
import SiteNav from './SiteNav/SiteNav';
import { useTypedSelector as useSelector } from '../../store';
import { closeLeftNav } from '../../store/menu/actions';

export default function LeftNav(): JSX.Element {
  const dispatch = useDispatch();
  const { pathname } = useRouter();

  const { authname, userIsAuthenticated } = useSelector(state => state.auth);
  const theme = useSelector(state => state.theme.leftNavTheme);

  const backgroundColor = theme === "left-nav-light" ? "#ddd" : "#444";
  
  const click = () => {
    dispatch(closeLeftNav());
  };

  function NavLink({ dataTest, text, to }: NavLinkProps): JSX.Element {
    const style = (to === pathname) ? {backgroundColor} : {};

    return (
      <Link href={to}>
        <a
          style={style}
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

        <Logo theme={theme} />
      </div>

      <div className="left-nav-main">
        {
          userIsAuthenticated &&
          <NavLink dataTest="dashboard" text={authname} to="/dashboard" />
        }
        {userIsAuthenticated && <hr />}

        <NavLink dataTest="home" text="News" to="/" />
        {
          userIsAuthenticated &&
          <NavLink dataTest="chat" text="Chat" to="/chat" />
        }
        {
          userIsAuthenticated &&
          <NavLink dataTest="friends" text="Friends" to="/friends" />
        }
        <hr />

        <SiteNav />
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
        <hr />

        <NavLink
          dataTest="filtration"
          text="Water Filtration"
          to="/page/promo/water-filtration"
        />
        <NavLink dataTest="tea" text="Tea" to="/page/promo/tea" />
        <NavLink dataTest="coffee" text="Coffee" to="/page/promo/coffee" />
        <hr />

        <NavLink
          dataTest="outdoors"
          text="Outdoors"
          to="/page/promo/outdoors"
        />
        <NavLink dataTest="garden" text="Garden" to="/page/promo/garden" />
        <NavLink dataTest="tools" text="Tools" to="/page/promo/tools" />
        <hr />

        <NavLink
          dataTest="seasonal"
          text="Seasonal"
          to="/page/promo/seasonal"
        />
        <hr />

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