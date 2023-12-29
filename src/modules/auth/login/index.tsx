import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useAuth, useApi } from '../../../store';

export default function Login() {
  const router = useRouter();

  const { login } = useAuth();
  const { api } = useApi();

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
      const res = await api.post('/login', {email, password});
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

  const loginClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!loading) await loginHandler();
  };

  const loginKeyUp = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!loading && e.key === "Enter") await loginHandler();
  };

  const url = 'https://s3.amazonaws.com/nobsc-images-01/auth';

  return (
    <div className="auth login" onKeyUp={e => loginKeyUp(e)}>
      <Link href="/" className="home-links">
        <img className="--desktop" src={`${url}/logo-large-white.png`} />
        <img className="--mobile" src={`${url}/logo-small-white.png`} />
      </Link>

      <form>
        <h1>Login</h1>

        <p className="feedback">{feedback}</p>

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

        <label>Password</label>
        <input
          autoComplete="current-password"
          disabled={loading}
          id="password"
          minLength={8}
          maxLength={64}
          name="password"
          onChange={e => setPassword(e.target.value)}
          size={64}
          type="password"
          value={password}
        />

        <button
          disabled={loading
            || email.length < 5
            || email.length > 60
            || password.length < 8
            || password.length > 64
          }
          onClick={(e) => loginClick(e)}
          type="button"
        >{loading ? 'Logging In...' : 'Login'}</button>

        <Link className='troubleshoot' href='/forgot-password'>Forgot password?</Link>
      </form>
    </div>
  );
}
