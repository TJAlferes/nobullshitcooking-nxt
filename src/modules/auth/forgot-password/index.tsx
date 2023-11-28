import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { endpoint } from '../../../config/api';

export default function ForgotPassword() {
  const router = useRouter();

  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const requestTemporaryPassword = async () => {
    if (!email) {
      return setFeedback('Email required.');
    }

    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);

    try {
      const res = await axios.post(`${endpoint}/forgot-password`, {email});
      if (res.status === 201) {
        router.push('/reset-password');
      } else {
        setFeedback(res.data.error);
      }
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  const handleClick = async () => {
    if (!loading) await requestTemporaryPassword();
  };

  const handleKeyUp = async (key: string) => {
    if (!loading && key === "Enter") await requestTemporaryPassword();
  };

  return (
    <div className="login" onKeyUp={e => handleKeyUp(e.key)}>
      <Link href="/">
        <img className="--desktop" src={`${url}logo-large-white.png`} />
        <img className="--mobile"  src={`${url}logo-small-white.png`} />
      </Link>

      <form>
        <h1>Forgotten Password</h1>

        <p className="feedback">{feedback}</p>

        <p>Forgot password? We can email you a temporary password, and you can set a new password.</p>

        <label>Email</label>
        <input
          autoComplete="email"
          autoFocus
          disabled={loading}
          id="email"
          maxLength={50}
          name="email"
          onChange={e => setEmail(e.target.value)}
          size={20}
          type="text"
          value={email}
        />

        <button
          className="request-temporary-password__button"
          disabled={email.length < 5 || email.length > 60}
          onClick={handleClick}
        >{loading ? 'Requesting...' : 'Request Temporary Password'}</button>
      </form>
    </div>
  );
}

const url = "https://s3.amazonaws.com/nobsc-images-01/auth/";
