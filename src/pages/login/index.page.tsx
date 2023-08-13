import Link                       from 'next/link';
import { usePathname, useRouter } from 'next/navigation';  // or useRouter from 'next/router' ?
import { useEffect, useState }    from 'react';
import { useDispatch }            from 'react-redux';

import { LoaderButton }                    from '../../components';
import { useTypedSelector as useSelector } from '../../store';
import { login }                           from '../../store/auth/actions';

// TO DO: make Sign In button css not change color on hover while in Signing In... AKA isloading state

export default function Login() {
  const pathname = usePathname();
  const router =   useRouter();

  const dispatch = useDispatch();
  const message =  useSelector(state => state.auth.message);

  const [ email,    setEmail ] =    useState("");
  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ] =  useState(false);
  const [ password, setPassword ] = useState("");

  const url = "https://s3.amazonaws.com/nobsc-images-01/auth/";

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      setFeedback(message);
      setLoading(false);
    }
    return () => {
      isSubscribed = false;
    };
  }, [message]);

  const emailChange =    (e: React.SyntheticEvent<EventTarget>) => setEmail((e.target as HTMLInputElement).value);
  const passwordChange = (e: React.SyntheticEvent<EventTarget>) => setPassword((e.target as HTMLInputElement).value);

  const loginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!validateLoginInfo()) return;
    setLoading(true);
    if (pathname === "/login") dispatch(login(email, password, router));
  }

  const loginKeyUp = (e: React.KeyboardEvent) => {
    if (loading) return;
    if (!validateLoginInfo()) return;
    if (e.key && (e.key !== "Enter")) return;
    setLoading(true);
    if (pathname === "/login") dispatch(login(email, password, router));
  }

  const validateLoginInfo = () => (email.length > 4 && password.length > 5);

  return (
    <div className="login" onKeyUp={e => loginKeyUp(e)}>
      <Link href="/">
        <img className="--desktop" src={`${url}logo-large-white.png`} />
        <img className="--mobile"  src={`${url}logo-small-white.png`} />
      </Link>

      <form>
        <h1>Sign In</h1>

        <p className="feedback">{feedback}</p>

        <label>Email</label>
        <input
          autoComplete="email"
          autoFocus
          disabled={loading}
          id="email"
          maxLength={50}
          name="email"
          onChange={emailChange}
          size={20}
          type="text"
          value={email}
        />

        <label>Password</label>
        <input
          autoComplete="current-password"
          disabled={loading}
          id="password"
          maxLength={20}
          name="password"
          onChange={passwordChange}
          size={20}
          type="password"
          value={password}
        />

        <LoaderButton
          className="login__button"
          disabled={!validateLoginInfo()}
          id="login-button"
          isLoading={loading}
          loadingText="Signing In..."
          name="submit"
          onClick={loginClick}
          onKeyUp={loginKeyUp}
          text="Sign In"
        />
      </form>
    </div>
  );
}
