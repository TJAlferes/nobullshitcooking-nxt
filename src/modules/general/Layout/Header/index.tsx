import axios         from 'axios';
import Link          from 'next/link';
import { useRouter } from 'next/router';

import { endpoint } from '../../../../config/api';
import {
  useTypedDispatch as useDispatch,
  useTypedSelector as useSelector
} from '../../../../redux';
import { LeftNav }       from '../../../shared/menu';
import { toggleLeftNav } from '../../../shared/menu/state';
import { Search }        from '../../../shared/search';
import { systemMessage } from '../../shared/system/state';
import { dark, light }   from '../../ThemeProvider/state';
import { removeItem }    from '../../localStorage';

export function Header() {
  const router = useRouter();

  const dispatch = useDispatch();

  const authname            = useSelector(state => state.authentication.authname);
  const userIsAuthenticated = useSelector(state => state.authentication.userIsAuthenticated);
  const theme               = useSelector(state => state.theme.theme);

  const click = () => dispatch(toggleLeftNav());

  const logout = async () => {
    if (!userIsAuthenticated) return;
    try {
      const { data } = await axios.post(
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
          ? <span className="mode" onClick={() => dispatch(dark())}><i className="moon">☾</i> Night</span>
          : <span className="mode" onClick={() => dispatch(light())}><i className="sun">☀︎</i> Day</span>
        }
        <Link href="/help">Help</Link>
        {!userIsAuthenticated && <Link href="/register">Create Account</Link>}
        {!userIsAuthenticated && <Link href="/login">Sign In</Link>}
        {userIsAuthenticated && <Link href="/dashboard">{`Hello, ${authname}`}</Link>}
        {userIsAuthenticated && <span className="logout" onClick={logout}>Sign Out</span>}
        <Link href="/cart">Cart</Link>
      </div>
      
      <LeftNav />
    </header>
  );
}
