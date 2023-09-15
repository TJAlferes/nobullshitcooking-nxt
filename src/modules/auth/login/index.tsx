import axios           from 'axios';
import Link            from 'next/link';
import { useRouter }   from 'next/navigation';
import { useState }    from 'react';
import { useDispatch } from 'react-redux';

import { endpoint }     from '../../../config/api';
import { LoaderButton } from '../../shared/LoaderButton';
import { useSetAuthname } from '..';

export default function Login() {
  const router   = useRouter();
  const dispatch = useDispatch();
  const setAuthname = useSetAuthname();

  const [ email,    setEmail ]    = useState("");
  const [ password, setPassword ] = useState("");

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ]  = useState(false);

  const emailChange = (e: React.SyntheticEvent<EventTarget>) =>
    setEmail((e.target as HTMLInputElement).value);

  const passwordChange = (e: React.SyntheticEvent<EventTarget>) =>
    setPassword((e.target as HTMLInputElement).value);

  const login = async () => {
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${endpoint}/user/authentication/login`,
        {email, password},
        {withCredentials: true}
      );
  
      setFeedback(data.message);
  
      if (data.message === 'Signed in.') {
        setAuthname(data.username);
        dispatch(setInitialUserData());  // setItem('user_data', data.user_data);
        router.push('/dashboard');
      }
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }
  
    //delay(4000);
    setFeedback("");
  };

  const loginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!validateLoginInfo()) return;
    login();
  }

  const loginKeyUp = (e: React.KeyboardEvent) => {
    if (loading) return;
    if (!validateLoginInfo()) return;
    if (e.key && (e.key !== "Enter")) return;
    login();
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

const url = "https://s3.amazonaws.com/nobsc-images-01/auth/";
