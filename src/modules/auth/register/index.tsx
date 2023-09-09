import axios                   from 'axios';
import Link                    from 'next/link';
import { useRouter }           from 'next/navigation';
import { useEffect, useState } from 'react';

import { endpoint }                        from '../../../config/api';
import { useTypedSelector as useSelector } from '../../../redux';
import { LoaderButton }                    from '../../shared/LoaderButton';

export default function Register() {
  const router = useRouter();

  const authname = useSelector(state => state.authentication.authname);
  const message  = useSelector(state => state.system.message);  // not needed here???

  const [ email,         setEmail ]         = useState("");
  const [ password,      setPassword ]      = useState("");
  const [ passwordAgain, setPasswordAgain ] = useState("");
  const [ username,      setUsername ]      = useState("");

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ]  = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      setFeedback(message);
      setLoading(false);
    }
    return () => {
      isSubscribed = false;
    };
  }, [message]);  // not needed here???

  useEffect(() => {
    if (authname !== '') router.push('/dashboard');
  }, [authname]);

  const emailChange         = (e: SyntheticEvent) => setEmail((e.target as HTMLInputElement).value);
  const usernameChange      = (e: SyntheticEvent) => setUsername((e.target as HTMLInputElement).value);
  const passwordChange      = (e: SyntheticEvent) => setPassword((e.target as HTMLInputElement).value);
  const passwordAgainChange = (e: SyntheticEvent) => setPasswordAgain((e.target as HTMLInputElement).value);

  const register = async () => {
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${endpoint}/user/create`,
        {email, password, username}
      );
  
      setFeedback(data.message);
  
      if (data.message === 'User account created.') {
        // delay(4000);
        router.push('/confirm');
      }
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }

    // delay(4000);
    setFeedback("");
  };

  const registerClick = async () => {
    if (loading) return;
    if (!validateRegistrationInfo()) return;
    await register();
  };

  const registerKeyUp = async (e: React.KeyboardEvent) => {
    if (loading) return;
    if (!validateRegistrationInfo()) return;
    if (e.key && (e.key !== "Enter")) return;
    await register();
  };

  const validateRegistrationInfo = () => (
    username.length > 1
    && email.length > 4
    && password.length > 5
    && password == passwordAgain
  );  // TO DO: do most of this in HTML
  
  return (
    <div className="register" onKeyUp={e => registerKeyUp(e)}>
      <Link href="/" className="home-links">
        <img className="--desktop" src={`${url}logo-large-white.png`} />
        <img className="--mobile" src={`${url}logo-small-white.png`} />
      </Link>

      <form>
        <h1>Create Account</h1>

        <p className="feedback">{feedback}</p>

        <label>Username</label>
        <input
          autoComplete="username"
          autoFocus
          disabled={loading}
          id="username"
          maxLength={20}
          name="username"
          onChange={usernameChange}
          size={20}
          type="text"
          value={username}
        />

        <label>Email</label>
        <input
          autoComplete="email"
          disabled={loading}
          id="email"
          maxLength={60}
          name="email"
          onChange={emailChange}
          size={20}
          type="email"
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

        <label>Password Again</label>
        <input
          autoComplete="current-password"
          disabled={loading}
          id="passwordAgain"
          maxLength={20}
          name="passwordAgain"
          onChange={passwordAgainChange}
          size={20}
          type="password"
          value={passwordAgain}
        />
        
        <LoaderButton
          className="create-account"
          disabled={!validateRegistrationInfo()}
          id="create_account"
          isLoading={loading}
          loadingText="Creating Account..."
          name="submit"
          onClick={registerClick}
          onKeyUp={registerKeyUp}
          text="Create Account"
        />
      </form>

      <div className="links">
        <Link href="/terms">Terms of Use</Link>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/help">Help</Link>
      </div>

      <div className="copyright">
        &copy;{` ${(new Date().getFullYear())}, NoBullshitCooking`}
      </div>
    </div>
  );
}

type SyntheticEvent = React.SyntheticEvent<EventTarget>;

const url = "https://s3.amazonaws.com/nobsc-images-01/auth/";
