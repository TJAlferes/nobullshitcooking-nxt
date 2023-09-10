import axios                   from 'axios';
import Link                    from 'next/link';
import { useRouter }           from 'next/navigation';
import { useEffect, useState } from 'react';

import { endpoint }                        from '../../../config/api';
import { useTypedSelector as useSelector } from '../../../redux';
import { LoaderButton }                    from '../../shared/LoaderButton';

export default function Confirm() {
  const router   = useRouter();

  const authname = useSelector(state => state.authentication.authname);
  const message  = useSelector(state => state.system.message);

  const [ confirmation_code, setConfirmationCode ] = useState("");

  const [ email,    setEmail ]    = useState("");
  const [ password, setPassword ] = useState("");

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
  }, [message]);

  useEffect(() => {
    if (authname !== '') router.push('/dashboard');
  }, [authname]);

  const confirmationCodeChange = (e: SyntheticEvent) =>
    setConfirmationCode((e.target as HTMLInputElement).value);

  const emailChange = (e: React.SyntheticEvent<EventTarget>) =>
    setEmail((e.target as HTMLInputElement).value);

  const passwordChange = (e: React.SyntheticEvent<EventTarget>) =>
    setPassword((e.target as HTMLInputElement).value);
  
  const confirm = async () => {
    setLoading(true);

    try {
      const { data } = await axios.patch(
        `${endpoint}/auth/confirm`,
        {confirmation_code}
      );
      
      setFeedback(data.message);
  
      if (data.message === "User account confirmed.") {
        // delay(4000);
        router.push('/login');
      }
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }
  
    // delay(4000);
    setFeedback("");
  };

  const requestResend = async () => {
    setLoading(true);

    try {
      const { data } = await axios.patch(
        `${endpoint}/auth/resend-confirmation-code`,
        {email, password}
      );
  
      setFeedback(data.message);
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }
  
    // delay(4000);
    setFeedback("");
  };

  const confirmClick = async () => {
    if (loading) return;
    if (!validateConfirmationCode()) return;
    setLoading(true);
    await confirm();
  };

  const confirmKeyUp = async (e: React.KeyboardEvent) => {
    if (loading) return;
    if (!validateConfirmationCode()) return;
    if (e.key && (e.key !== "Enter")) return;
    setLoading(true);
    await confirm();
  };

  const requestResendClick = async () => {
    if (loading) return;
    if (!validateResendInfo()) return;
    setLoading(true);
    await requestResend();
  };

  const requestResendKeyUp = async (e: React.KeyboardEvent) => {
    if (loading) return;
    if (!validateResendInfo()) return;
    setLoading(true);
    await requestResend();
  };

  const validateConfirmationCode = () => confirmation_code.length > 1;  // ???
  const validateResendInfo = () => (email.length > 4 && password.length > 5);
  
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

        <p>Can't find your confirmation code? We can email you a new one:</p>

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
          className="request-resend-confirmation-code"
          disabled={!validateConfirmationCode()}
          id="request-resend-confirmation-code"
          isLoading={loading}
          loadingText="Resending..."
          name="submit"
          onClick={requestResendClick}
          onKeyUp={requestResendKeyUp}
          text="Request Resend"
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
