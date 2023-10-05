import axios         from 'axios';
import Link          from 'next/link';
import { useRouter } from 'next/navigation';
import { useState }  from 'react';

import { endpoint }     from '../../../config/api';
import { LoaderButton } from '../../shared/LoaderButton';

export default function Confirm() {
  const router = useRouter();

  const [ confirmation_code, setConfirmationCode ] = useState("");
  
  const [ email,    setEmail ]                     = useState("");
  const [ password, setPassword ]                  = useState("");

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ]  = useState(false);

  const confirmationCodeChange = (e: ChangeEvent) => setConfirmationCode(e.target.value);
  const emailChange            = (e: ChangeEvent) => setEmail(e.target.value);
  const passwordChange         = (e: ChangeEvent) => setPassword(e.target.value);
  
  const confirm = async () => {
    setLoading(true);
    window.scrollTo(0, 0);
    try {
      const res = await axios.patch(`${endpoint}/confirm`, {confirmation_code});
      if (res.status === 204) {
        setFeedback("User account confirmed.");
        setTimeout(() => router.push('/login'), 4000);
      }
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }
    setLoading(false);
    setTimeout(() => setFeedback(""), 4000);
  };

  const requestResend = async () => {
    setLoading(true);
    window.scrollTo(0, 0);
    try {
      const res = await axios.patch(`${endpoint}/resend-confirmation-code`, {email, password});
      if (res.status === 204) {
        setFeedback("Confirmation code re-sent.");
      } else {
        setFeedback(res.data.error);
      }
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }
    setLoading(false);
    setTimeout(() => setFeedback(""), 4000);
  };

  const confirmClick = async () => {
    if (loading) return;
    await confirm();
  };

  const confirmKeyUp = async (e: React.KeyboardEvent) => {
    if (loading) return;
    if (e.key && (e.key !== "Enter")) return;
    await confirm();
  };

  const requestResendClick = async () => {
    if (loading) return;
    await requestResend();
  };

  const requestResendKeyUp = async (e: React.KeyboardEvent) => {
    if (loading) return;
    if (e.key && (e.key !== "Enter")) return;
    await requestResend();
  };
  
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
          maxLength={36}
          minLength={36}
          name="confirmationCode"
          onChange={confirmationCodeChange}
          size={36}
          type="text"
          value={confirmation_code}
        />

        <p>Please check your email for the confirmation code.</p>

        <LoaderButton
          className="verify-confirmation-code"
          disabled={confirmation_code.length !== 36}
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
          maxLength={60}
          minLength={5}
          name="email"
          onChange={emailChange}
          size={60}
          type="text"
          value={email}
        />

        <label>Password</label>
        <input
          autoComplete="current-password"
          disabled={loading}
          id="password"
          maxLength={60}
          minLength={6}
          name="password"
          onChange={passwordChange}
          size={60}
          type="password"
          value={password}
        />

        <LoaderButton
          className="request-resend-confirmation-code"
          disabled={email.length < 5
            || email.length > 60
            || password.length < 6
            || password.length > 60
          }
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

const url = "https://s3.amazonaws.com/nobsc-images-01/auth/";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
