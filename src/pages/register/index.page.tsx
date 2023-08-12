import Link                           from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState }        from 'react';
import { useDispatch }                from 'react-redux';

import { LoaderButton }                    from '../../components';
import { useTypedSelector as useSelector } from '../../store';
import { register, verify }        from '../../store/auth/actions';

export default function Register() {
  const router =       useRouter();
  const searchParams = useSearchParams();
  const confirmingUser = searchParams.get('confirm');

  const dispatch = useDispatch();
  const userIsAuthenticated = useSelector(state => state.auth.userIsAuthenticated);
  const message =             useSelector(state => state.auth.message);

  const [ confirmation_code, setConfirmationCode ] = useState("");
  const [ email,            setEmail ] =            useState("");
  const [ feedback,         setFeedback ] =         useState("");
  const [ loading,          setLoading ] =          useState(false);
  const [ password,         setPassword ] =         useState("");
  const [ passwordAgain,    setPasswordAgain ] =    useState("");
  const [ username,         setUsername ] =         useState("");

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

  useEffect(() => {
    if (userIsAuthenticated) router.push('/dashboard');
  }, [userIsAuthenticated]);

  const confirmationCodeChange = (e: SyntheticEvent) => setConfirmationCode((e.target as HTMLInputElement).value);
  const emailChange =            (e: SyntheticEvent) => setEmail((e.target as HTMLInputElement).value);
  const usernameChange =         (e: SyntheticEvent) => setUsername((e.target as HTMLInputElement).value);
  const passwordChange =         (e: SyntheticEvent) => setPassword((e.target as HTMLInputElement).value);
  const passwordAgainChange =    (e: SyntheticEvent) => setPasswordAgain((e.target as HTMLInputElement).value);

  const registerClick = () => {
    if (loading) return;
    if (!validateRegistrationInfo()) return;
    setLoading(true);
    dispatch(register(email, password, username, router));  // do you really need to pass the router here?
  };

  const registerKeyUp = (e: React.KeyboardEvent) => {
    if (loading) return;
    if (!validateRegistrationInfo()) return;
    if (e.key && (e.key !== "Enter")) return;
    setLoading(true);
    dispatch(register(email, password, username, router));
  };

  const verifyClick = () => {
    if (loading) return;
    if (!validateConfirmationCode()) return;
    setLoading(true);
    dispatch(verify(email, password, confirmation_code, router));
  };

  const verifyKeyUp = (e: React.KeyboardEvent) => {
    if (loading) return;
    if (!validateConfirmationCode()) return;
    if (e.key && (e.key !== "Enter")) return;
    setLoading(true);
    dispatch(verify(email, password, confirmation_code, router));
  };

  const validateConfirmationCode = () => confirmation_code.length > 1;  // ???
  const validateRegistrationInfo = () => (username.length > 1 && email.length > 4 && password.length > 5 && password == passwordAgain);  // TO DO: do most of this in HTML
  
  return (
    <div className="register" onKeyUp={e => registerKeyUp(e)}>
      <Link href="/" className="home-links">
        <img className="--desktop" src={`${url}logo-large-white.png`} />
        <img className="--mobile" src={`${url}logo-small-white.png`} />
      </Link>

      {confirmingUser ? (
        <form>
          <h1>Verify</h1>

          <p className="feedback">{feedback}</p>

          <label>Code</label>
          <input
            autoComplete="confirmation-code"
            autoFocus
            disabled={loading}
            id="confirmationCode"
            maxLength={20}
            name="confirmationCode"
            onChange={confirmationCodeChange}
            size={20}
            type="text"
            value={confirmation_code}
          />

          <p>Please check your email for the confirmation code.</p>

          <LoaderButton
            className="verify-confirmation-code"
            disabled={!validateConfirmationCode()}
            id="verify_confirmation_code"
            isLoading={loading}
            loadingText="Verifying..."
            name="submit"
            onClick={verifyClick}
            onKeyUp={registerKeyUp}
            text="Verify"
          />
        </form>
      ) : (
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
      )}

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
