import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../../store';
import { staffLogout, userLogout } from '../../../store/auth/actions';
import { dark, light } from '../../../store/theme/actions';

export function UserNav(): JSX.Element {
  const router = useRouter();

  const dispatch = useDispatch();
  const authname =             useSelector(state => state.auth.authname);
  const staffIsAuthenticated = useSelector(state => state.auth.staffIsAuthenticated);
  const userIsAuthenticated =  useSelector(state => state.auth.userIsAuthenticated);
  const theme =                useSelector(state => state.theme.theme);

  const handleLogout = () => {
    if (staffIsAuthenticated) dispatch(staffLogout());
    if (userIsAuthenticated)  dispatch(userLogout());
    router.push('/');
  };

  return (
    <div className="user-nav">
      {theme === 'light'
        ? <span className="mode" onClick={() => dispatch(dark())}><i className="moon">☾</i> Night</span>
        : <span className="mode" onClick={() => dispatch(light())}><i className="sun">☀︎</i> Day</span>
      }

      <Link href="/help">Help</Link>

      {(!staffIsAuthenticated && !userIsAuthenticated) && <Link href="/register">Create Account</Link>}
      {(!staffIsAuthenticated && !userIsAuthenticated) && <Link href="/login">Sign In</Link>}

      {staffIsAuthenticated && <Link href="/staff-dashboard">{`Hello, ${authname}`}</Link>}
      {staffIsAuthenticated && <span className="logout" onClick={handleLogout}>Sign Out</span>}

      {userIsAuthenticated && <Link href="/dashboard">{`Hello, ${authname}`}</Link>}
      {userIsAuthenticated && <span className="logout" onClick={handleLogout}>Sign Out</span>}

      {/*<Link href="/cart"><a  data-test="cart">Cart</Link>*/}
    </div>
  );
}