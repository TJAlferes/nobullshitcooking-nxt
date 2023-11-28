import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { endpoint } from '../../../config/api';

export default function Confirm() {
  const router = useRouter();

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ]  = useState(false);

  const [ confirmation_code, setConfirmationCode ] = useState("");
  
  const confirm = async () => {
    if (!confirmation_code) {
      return setFeedback('Confirmation Code required.')
    }

    setLoading(true);
    setFeedback('');
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
  };

  const confirmClick = async () => {
    if (!loading) await confirm();
  };

  const confirmKeyUp = async (key: string) => {
    if (!loading && key === "Enter") await confirm();
  };
  
  return (
    <div className="register" onKeyUp={e => confirmKeyUp(e.key)}>
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
          onChange={e => setConfirmationCode(e.target.value)}
          size={36}
          type="text"
          value={confirmation_code}
        />

        <p>Please check your email for the confirmation code.</p>

        <button
          className="verify-confirmation-code"
          disabled={confirmation_code.length !== 36}
          onClick={confirmClick}
        >{loading ? 'Confirming...' : 'Confirm'}</button>
      </form>

      <p>Can't find your confirmation code? We can email you a new one:</p>
      <Link href='/resend-confirmation-code'>Resend Confirmation Code</Link>

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
