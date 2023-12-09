import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { endpoint } from '../../../config/api';
import { useAuth } from '../../../store';

export default function Login() {
  const router = useRouter();

  const { login } = useAuth();

  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async () => {
    window.scrollTo(0, 0);
    if (!email) return setFeedback('Email required.');
    if (!password) return setFeedback('Password required.');
    setLoading(true);
    setFeedback('');
    try {
      const res = await axios.post(`${endpoint}/login`, {email, password});
      if (res.status === 201) {
        login(res.data);
        router.push('/dashboard');
      } else {
        setFeedback(res.data.error);
      }
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  const loginClick = async () => {
    if (!loading) await loginHandler();
  };

  const loginKeyUp = async (key: string) => {
    if (!loading && key === "Enter") await loginHandler();
  };

  const url = 'https://s3.amazonaws.com/nobsc-images-01/auth';

  return (
    <div className="auth login" onKeyUp={e => loginKeyUp(e.key)}>
      <Link href="/" className="home-links">
        <img className="--desktop" src={`${url}/logo-large-white.png`} />
        <img className="--mobile" src={`${url}/logo-small-white.png`} />
      </Link>

      <form>
        <h1>Sign In</h1>

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

        <label>Password</label>
        <input
          autoComplete="current-password"
          disabled={loading}
          id="password"
          maxLength={20}
          name="password"
          onChange={e => setPassword(e.target.value)}
          size={20}
          type="password"
          value={password}
        />

        <button
          disabled={loading
            || email.length < 5
            || email.length > 60
            || password.length < 6
            || password.length > 60
          }
          onClick={loginClick}
        >{loading ? 'Signing In...' : 'Sign In'}</button>

        <Link className='troubleshoot' href='/forgot-password'>Forgot password?</Link>
      </form>
    </div>
  );
}
