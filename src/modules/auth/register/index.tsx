import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { endpoint } from '../../../config/api';
import { LoaderButton } from '../../shared/LoaderButton';

export default function Register() {
  const router = useRouter();

  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  //const [status, setStatus] = useState('typing'); // 'typing', 'submitting', or 'success'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [username, setUsername] = useState('');

  const register = async () => {
    if (!username) {
      return setFeedback('Username required.');
    }
    if (!email) {
      return setFeedback('Email required.');
    }
    if (!password) {
      return setFeedback('Password required.');
    }
    if (!passwordAgain) {
      return setFeedback('Password Again required.');
    }
    if (password !== passwordAgain) {
      return setFeedback('Same password required.');
    }

    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);

    try {
      const res = await axios.post(`${endpoint}/users`, {email, password, username});
      if (res.status === 201) {
        setFeedback('User account created.');
        setTimeout(() => router.push('/confirm'), 4000);
      } else {
        setFeedback(res.data.error);
      }
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  const registerClick = async () => {
    if (!loading) await register();
  };

  const registerKeyUp = async (key: string) => {
    if (!loading && key === "Enter") await register();
  };
  
  return (
    <div className="register" onKeyUp={e => registerKeyUp(e.key)}>
      <Link href="/" className="home-links">
        <img className="--desktop" src={`${url}logo-large-white.png`} />
        <img className="--mobile" src={`${url}logo-small-white.png`} />
      </Link>

      <form>
        <h1>Create Account</h1>

        <p className="feedback">{feedback}</p>

        <label>Username</label>
        <input
          autoComplete="username"
          autoFocus
          disabled={loading}
          id="username"
          minLength={6}
          maxLength={20}
          name="username"
          onChange={e => setUsername(e.target.value)}
          size={20}
          type="text"
          value={username}
        />

        <label>Email</label>
        <input
          autoComplete="email"
          disabled={loading}
          id="email"
          minLength={5}
          maxLength={60}
          name="email"
          onChange={e => setEmail(e.target.value)}
          size={60}
          type="email"
          value={email}
        />

        <label>Password</label>
        <input
          autoComplete="current-password"
          disabled={loading}
          id="password"
          minLength={6}
          maxLength={60}
          name="password"
          onChange={e => setPassword(e.target.value)}
          size={60}
          type="password"
          value={password}
        />

        <label>Password Again</label>
        <input
          autoComplete="current-password"
          disabled={loading}
          id="passwordAgain"
          minLength={6}
          maxLength={60}
          name="passwordAgain"
          onChange={e => setPasswordAgain(e.target.value)}
          size={60}
          type="password"
          value={passwordAgain}
        />
        
        <LoaderButton
          className="create-account"
          disabled={email.length < 5
            || email.length > 60
            || password.length < 6
            || password.length > 60
            || password !== passwordAgain
          }
          id="create_account"
          isLoading={loading}
          loadingText="Creating Account..."
          name="submit"
          onClick={registerClick}
          type="button"
          text="Create Account"
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
