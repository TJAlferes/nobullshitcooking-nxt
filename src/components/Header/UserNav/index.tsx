import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../../store';
import { authStaffLogout, authUserLogout } from '../../../store/auth/actions';
import {
  themeDarkTrigger,
  themeLightTrigger
} from '../../../store/theme/actions';

export function UserNav(): JSX.Element {
  const router = useRouter();

  const dispatch = useDispatch();
  const authname = useSelector(state => state.auth.authname);
  const staffIsAuthenticated =
    useSelector(state => state.auth.staffIsAuthenticated);
  const userIsAuthenticated =
    useSelector(state => state.auth.userIsAuthenticated);
  const theme = useSelector(state => state.theme.theme);

  const handleLogout = () => {
    if (staffIsAuthenticated) dispatch(authStaffLogout());
    if (userIsAuthenticated) dispatch(authUserLogout());
    router.push('/home');
  };

  return (
    <div className="user-nav">
      {theme === 'light' ? (
        <span className="mode" onClick={() => dispatch(themeDarkTrigger())}>
          <i className="moon-symbol">☾</i> Night
        </span>
      ) : (
        <span className="mode" onClick={() => dispatch(themeLightTrigger())}>
          <i className="sun-symbol">☀︎</i> Day
        </span>
      )}

      <Link href="/help">
        <a className="user-nav__a" data-test="help">Help</a>
      </Link>

      {(!staffIsAuthenticated && !userIsAuthenticated) && (
        <>
          <Link href="/register">
            <a className="user-nav__a" data-test="register">
              Create Account
            </a>
          </Link>

          <Link href="/login">
            <a className="user-nav__a" data-test="login">Sign In</a>
          </Link>
        </>
      )}

      {staffIsAuthenticated && (
        <>
          <Link href="/staff-dashboard">
            <a className="user-nav__a" data-test="staff-dashboard">
              {`Hello, ${authname}`}
            </a>
          </Link>

          <span className="user-nav__a" onClick={handleLogout}>Sign Out</span>
        </>
      )}

      {userIsAuthenticated && (
        <>
          <Link href="/dashboard">
            <a className="user-nav__a" data-test="dashboard">
              {`Hello, ${authname}`}
            </a>
          </Link>

          <span className="user-nav__a"onClick={handleLogout}>Sign Out</span>
        </>
      )}

      {/*<Link href="/cart">
        <a className="user-nav__a" data-test="cart">Cart</a>
      </Link>*/}
    </div>
  );
}