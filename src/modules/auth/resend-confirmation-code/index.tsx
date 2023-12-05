import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { endpoint } from '../../../config/api';

// TO DO: user forgot password
export default function ResendConfirmationCode() {
  const router = useRouter();

  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const requestResend = async () => {
    if (!email) {
      return setFeedback('Email required.');
    }
    if (!password) {
      return setFeedback('Password required.');
    }

    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);

    try {
      const res = await axios.patch(`${endpoint}/resend-confirmation-code`, {email, password});
      if (res.status === 204) {
        setFeedback("Confirmation code re-sent.");
        setTimeout(() => router.push('/confirm'), 4000);
      } else {
        setFeedback(res.data.error);
      }
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  const requestResendClick = async () => {
    if (!loading) await requestResend();
  };

  const requestResendKeyUp = async (key: string) => {
    if (!loading && key === "Enter") await requestResend();
  };

  const url = 'https://s3.amazonaws.com/nobsc-images-01/auth';
  
  return (
    <div className="auth resend-confirmation-code" onKeyUp={e => requestResendKeyUp(e.key)}>
      <Link href="/" className="home-links">
        <img className="--desktop" src={`${url}/logo-large-white.png`} />
        <img className="--mobile" src={`${url}/logo-small-white.png`} />
      </Link>

      <form>
        <h1>Resend Confirmation Code</h1>

        <p className="feedback">{feedback}</p>

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
          onChange={e => setEmail(e.target.value)}
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
          onChange={e => setPassword(e.target.value)}
          size={60}
          type="password"
          value={password}
        />

        <button
          disabled={email.length < 5
            || email.length > 60
            || password.length < 6
            || password.length > 60
          }
          onClick={requestResendClick}
        >{loading ? 'Resending...' : 'Resend'}</button>
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
