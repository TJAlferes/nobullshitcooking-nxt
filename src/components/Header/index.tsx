import Link from 'next/link';
import { useRouter } from 'next/router';

import { useTypedDispatch as useDispatch, useTypedSelector as useSelector } from '../../store';
import { userLogout } from '../../store/auth/actions';
import { toggleLeftNav } from '../../store/menu/actions';
import { dark, light } from '../../store/theme/actions';
import { Search } from '..';

export function Header() {
  const router = useRouter();

  const dispatch = useDispatch();
  const authname =             useSelector(state => state.auth.authname);
  const userIsAuthenticated =  useSelector(state => state.auth.userIsAuthenticated);
  const theme =                useSelector(state => state.theme.theme);

  const click = () => dispatch(toggleLeftNav());

  const handleLogout = () => {
    if (userIsAuthenticated) dispatch(userLogout());
    router.push('/');
  };

  return (
    <header className="header">
      <div className="header-l">
        <svg className="left-nav-toggle" onClick={click}>
          <g>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="white"></path>
          </g>
        </svg>

        <div className={`logo ${theme}`}>
          <Link href={{pathname: "/"}}>
            <img
              className="home-link"
              src={theme === "light" ? "/images/header/logo-mobile-red-small.png" : "/images/header/logo-mobile-dark-red-small.png"}
              width="68"
              height="20"
            />
          </Link>
        </div>
      </div>

      <Search />

      <div className="user-nav">
        {theme === 'light'
          ? <span className="mode" onClick={() => dispatch(dark())}><i className="moon">☾</i> Night</span>
          : <span className="mode" onClick={() => dispatch(light())}><i className="sun">☀︎</i> Day</span>
        }
        <Link href="/help">Help</Link>
        {!userIsAuthenticated && <Link href="/register">Create Account</Link>}
        {!userIsAuthenticated && <Link href="/login">Sign In</Link>}
        {userIsAuthenticated && <Link href="/dashboard">{`Hello, ${authname}`}</Link>}
        {userIsAuthenticated && <span className="logout" onClick={handleLogout}>Sign Out</span>}
        <Link href="/cart">Cart</Link>
      </div>
    </header>
  );
}
