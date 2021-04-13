import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../../../store';
import {
  authStaffLogout,
  authUserLogout
} from '../../../../store/auth/actions';
import {
  themeDarkTrigger,
  themeLightTrigger
} from '../../../../store/theme/actions';
import './userNav.css';

export default function UserNav({ theme }: Props): JSX.Element {
  const router = useRouter();

  const dispatch = useDispatch();
  const {
    authname,
    staffIsAuthenticated,
    userIsAuthenticated
  } = useSelector(state => state.auth);

  const handleLogout = () => {
    if (staffIsAuthenticated) dispatch(authStaffLogout());
    if (userIsAuthenticated) dispatch(authUserLogout());
    router.push('/home');
  };

  return (
    <div className="user-nav">
      {theme === 'header-light' ? (
        <span
          className="mode-button"
          onClick={() => dispatch(themeDarkTrigger())}
        >
          <i className="moon-symbol">☾</i> Night
        </span>
      ) : (
        <span
          className="mode-button"
          onClick={() => dispatch(themeLightTrigger())}
        >
          <i className="sun-symbol">☀︎</i> Day
        </span>
      )}

      <Link href="/help">
        <a className="user-nav__link" data-test="help">Help</a>
      </Link>

      {(!staffIsAuthenticated && !userIsAuthenticated) && (
        <>
          <Link href="/register">
            <a className="user-nav__link" data-test="register">
              Create Account
            </a>
          </Link>

          <Link href="/login">
            <a className="user-nav__link" data-test="login">Sign In</a>
          </Link>
        </>
      )}

      {staffIsAuthenticated && (
        <>
          <Link href="/staff-dashboard">
            <a
              className="user-nav__link--authenticated"
              data-test="staff-dashboard"
            >
              {`Hello, ${authname}`}
            </a>
          </Link>

          <span
            className="user-nav__link--authenticated"
            onClick={handleLogout}
          >
            Sign Out
          </span>
        </>
      )}

      {userIsAuthenticated && (
        <>
          <Link href="/dashboard">
            <a
              className="user-nav__link--authenticated"
              data-test="dashboard"
            >
              {`Hello, ${authname}`}
            </a>
          </Link>

          <span
            className="user-nav__link--authenticated"
            onClick={handleLogout}
          >
            Sign Out
          </span>
        </>
      )}

      {/*<Link className="user-nav__link" to="/store/view_cart">Cart</Link>*/}
    </div>
  );
}

type Props = {
  theme: string;
};