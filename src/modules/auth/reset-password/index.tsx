import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { api } from '../../../config/api';

export default function ResetPassword() {
  const router = useRouter();

  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [temporary_password, setTemporaryPassword] = useState('');
  const [new_password, setNewPassword] = useState('');

  const resetPasswordHandler = async () => {
    if (!email) {
      return setFeedback('Email required.');
    }
    if (!temporary_password) {
      return setFeedback('Temporary Password required.');
    }
    if (!new_password) {
      return setFeedback('New Password required.');
    }

    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);

    try {
      const res = await api.patch(
        '/reset-password',
        {email, temporary_password, new_password}
      );
      if (res.status === 204) {
        router.push('/login');
      } else {
        setFeedback(res.data.error);
      }
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  const resetPasswordClick = async () => {
    if (!loading) await resetPasswordHandler();
  };

  const resetPasswordKeyUp = async (key: string) => {
    if (!loading && key === "Enter") await resetPasswordHandler();
  };

  const url = 'https://s3.amazonaws.com/nobsc-images-01/auth';

  return (
    <div className="auth reset-password" onKeyUp={e => resetPasswordKeyUp(e.key)}>
      <Link href="/" className="home-links">
        <img className="--desktop" src={`${url}/logo-large-white.png`} />
        <img className="--mobile" src={`${url}/logo-small-white.png`} />
      </Link>

      <form>
        <h1>Reset Password</h1>

        <p className="feedback">{feedback}</p>

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

        <label>Temporary Password</label>
        <input
          autoComplete="temporary-password"
          disabled={loading}
          id="temporary-password"
          maxLength={20}
          name="temporary-password"
          onChange={e => setTemporaryPassword(e.target.value)}
          size={20}
          type="password"
          value={temporary_password}
        />

        <label>Set New Password</label>
        <input
          autoComplete="new-password"
          disabled={loading}
          id="new-password"
          maxLength={20}
          name="new-password"
          onChange={e => setNewPassword(e.target.value)}
          size={20}
          type="password"
          value={new_password}
        />

        <button
          disabled={email.length < 5
            || email.length > 60
            || temporary_password.length < 6
            || temporary_password.length > 60
            || new_password.length < 6
            || new_password.length > 60
          }
          onClick={resetPasswordClick}
        >{loading ? 'Resetting...' : 'Reset'}</button>
      </form>
    </div>
  );
}
