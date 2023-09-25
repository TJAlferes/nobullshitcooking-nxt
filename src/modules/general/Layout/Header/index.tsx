import axios         from 'axios';
import Link          from 'next/link';
import { useRouter } from 'next/router';
import { useState }  from 'react';

import { endpoint } from '../../../../config/api';
import { useAuthname } from '../../../auth';
import { useTheme, useSetTheme } from '../../theme';
import { LeftNav }       from '../../../shared/menu';
import { Search }        from '../../../shared/search';
import { removeItem }    from '../../localStorage';

export function Header() {
  const router   = useRouter();
  const authname = useAuthname();
  const theme    = useTheme();
  const setTheme = useSetTheme();

  const [ isLeftNavOpen, setIsLeftNavOpen ] = useState(false);

  const click = () => setIsLeftNavOpen(prev => !prev);

  const logout = async () => {
    if (!authname) return;
    try {
      await axios.post(
        `${endpoint}/user/authentication/logout`,
        {},
        {withCredentials: true}
      );
  
      removeItem('appState');  // sufficient enough to clear redux store???
      //systemMessage(data.message);
    } catch(err) {
      removeItem('appState');
    }
  
    //delay(4000);
    //systemMessageClear();
    router.push('/');
  };

  return (
    <header className="header">
      <div className="site-nav">
        <svg className="left-nav-toggle" onClick={click}>
          <g>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="white"></path>
          </g>
        </svg>

        <Link className="logo" href={{pathname: "/"}}>
          <img src={`/images/header/logo-${theme}.png`} />
        </Link>
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
              <Link href="/login">Sign In</Link>
            </>
          )
          : (
            <>
              <Link href="/dashboard">{`Hello, ${authname}`}</Link>
              <span className="logout" onClick={logout}>Sign Out</span>
            </>
          )
        }

        <Link href="/cart">Cart</Link>
      </div>
      
      <LeftNav isLeftNavOpen={isLeftNavOpen} setIsLeftNavOpen={setIsLeftNavOpen} />
    </header>
  );
}
