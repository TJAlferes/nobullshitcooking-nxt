import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useApi } from '../../../store';

export default function ForgotPassword() {
  const router = useRouter();

  const { api } = useApi();

  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');

  const requestTemporaryPassword = async () => {
    if (!email) {
      return setFeedback('Email required.');
    }

    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);

    try {
      const res = await api.post('/forgot-password', {email});
      if (res.status === 201) {
        router.push('/reset-password');
      } else {
        setFeedback(res.data.message);
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

  const url = 'https://s3.amazonaws.com/nobsc-images-01/auth';

  return (
    <div className="auth forgot-password" onKeyUp={e => handleKeyUp(e.key)}>
      <Link href="/" className="home-links">
        <img className="--desktop" src={`${url}/logo-large-white.png`} />
        <img className="--mobile" src={`${url}/logo-small-white.png`} />
      </Link>

      <form>
        <h1>Forgot Password</h1>

        <p className="feedback">{feedback}</p>

        <p>
          Enter the email associated with your account to receive a temporary password.
          Then you can set your new password.
        </p>

        <label>Email</label>
        <input
          autoComplete="email"
          autoFocus
          disabled={loading}
          id="email"
          minLength={5}
          maxLength={60}
          name="email"
          onChange={e => setEmail(e.target.value)}
          size={60}
          type="text"
          value={email}
        />

        <button
          disabled={email.length < 5 || email.length > 60}
          onClick={handleClick}
          type="button"
        >{loading ? 'Requesting...' : 'Request Temporary Password'}</button>
      </form>
    </div>
  );
}
