import Link                    from 'next/link';
import { useRouter }           from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch }         from 'react-redux';

import { LoaderButton }                    from '../../shared/components';
import { useTypedSelector as useSelector } from '../../store';
import { confirm }                         from './state';

export default function Register() {
  const router =       useRouter();

  const dispatch = useDispatch();
  const userIsAuthenticated = useSelector(state => state.auth.userIsAuthenticated);
  const message =             useSelector(state => state.auth.message);  // change to state.system.message

  const [ confirmation_code, setConfirmationCode ] = useState("");
  const [ feedback,         setFeedback ] =         useState("");
  const [ loading,          setLoading ] =          useState(false);

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

  const confirmClick = () => {
    if (loading) return;
    if (!validateConfirmationCode()) return;
    setLoading(true);
    dispatch(confirm(confirmation_code, router));
  };

  const confirmKeyUp = (e: React.KeyboardEvent) => {
    if (loading) return;
    if (!validateConfirmationCode()) return;
    if (e.key && (e.key !== "Enter")) return;
    setLoading(true);
    dispatch(confirm(confirmation_code, router));
  };

  const validateConfirmationCode = () => confirmation_code.length > 1;  // ???
  
  return (
    <div className="register" onKeyUp={e => confirmKeyUp(e)}>
      <Link href="/" className="home-links">
        <img className="--desktop" src={`${url}logo-large-white.png`} />
        <img className="--mobile" src={`${url}logo-small-white.png`} />
      </Link>

      <form>
        <h1>Confirm</h1>

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
          loadingText="Confirming..."
          name="submit"
          onClick={confirmClick}
          onKeyUp={confirmKeyUp}
          text="Confirm"
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