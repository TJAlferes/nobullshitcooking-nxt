import Link                           from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState }        from 'react';
import { useDispatch }                from 'react-redux';

import { LoaderButton }                    from '../../shared/components';
import { useTypedSelector as useSelector } from '../../store';
import { verify }                from './state';

export default function Register() {
  const router =       useRouter();

  const dispatch = useDispatch();
  const userIsAuthenticated = useSelector(state => state.auth.userIsAuthenticated);
  const message =             useSelector(state => state.auth.message);

  const [ confirmation_code, setConfirmationCode ] = useState("");
  //const [ email,            setEmail ] =            useState("");
  const [ feedback,         setFeedback ] =         useState("");
  const [ loading,          setLoading ] =          useState(false);
  //const [ password,         setPassword ] =         useState("");

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
  
  return (
    <div className="register" onKeyUp={e => verifyKeyUp(e)}>
      <Link href="/" className="home-links">
        <img className="--desktop" src={`${url}logo-large-white.png`} />
        <img className="--mobile" src={`${url}logo-small-white.png`} />
      </Link>

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
          onKeyUp={verifyKeyUp}
          text="Verify"
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
