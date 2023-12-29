import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useApi, useAuth, useTheme } from '../../../../store';
import { AppNav } from '../../../shared/menu';
import { Search } from '../../../shared/search';

export function Header() {
  const router = useRouter();

  const { api } = useApi();
  const { authname, logout } = useAuth();
  const { theme, setTheme }  = useTheme();

  const [ isAppNavOpen, setIsAppNavOpen ] = useState(false);

  const logoutHandler = async () => {
    if (!authname) return;
    try {
      await api.post('/logout');
    } catch(err) {
      console.log(err);
    } finally {
      logout();
    }
    router.push('/');
  };

  return (
    <header className="header">
      <div className="app-nav-container">
        <svg className="app-nav-toggle" onClick={() => setIsAppNavOpen(prev => !prev)}>
          <g>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="white"></path>
          </g>
        </svg>

        <Link className="logo" href={{pathname: "/"}}>
          <img src={`/images/header/logo-${theme}.png`} />
        </Link>

        <AppNav isAppNavOpen={isAppNavOpen} setIsAppNavOpen={setIsAppNavOpen} />
      </div>

      <Search />

      <div className="user-nav">
        {theme === 'light'
          ? (
            <span className="mode" onClick={() => setTheme("dark")}>
              <i className="moon">☾</i> Night
            </span>
          )
          : (
            <span className="mode" onClick={() => setTheme("light")}>
              <i className="sun">☀︎</i> Day
            </span>
          )
        }
        <Link href="/help">Help</Link>
        {!authname
          ? (
            <>
              <Link href="/register">Create Account</Link>
              <Link href="/login">Login</Link>
            </>
          )
          : (
            <>
              <Link href="/dashboard">{`Hello, ${authname}`}</Link>
              <span className="logout" onClick={logoutHandler}>Log Out</span>
            </>
          )
        }
      </div>
    </header>
  );
}
