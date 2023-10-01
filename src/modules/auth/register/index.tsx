import axios         from 'axios';
import Link          from 'next/link';
import { useRouter } from 'next/navigation';
import { useState }  from 'react';

import { endpoint }     from '../../../config/api';
import { LoaderButton } from '../../shared/LoaderButton';

export default function Register() {
  const router = useRouter();

  const [ email,         setEmail ]         = useState("");
  const [ password,      setPassword ]      = useState("");
  const [ passwordAgain, setPasswordAgain ] = useState("");
  const [ username,      setUsername ]      = useState("");

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ]  = useState(false);

  const emailChange         = (e: ChangeEvent) => setEmail(e.target.value);
  const usernameChange      = (e: ChangeEvent) => setUsername(e.target.value);
  const passwordChange      = (e: ChangeEvent) => setPassword(e.target.value);
  const passwordAgainChange = (e: ChangeEvent) => setPasswordAgain(e.target.value);

  const register = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${endpoint}/users`, {email, password, username});
      setFeedback(res.data.message);
      if (res.data.message === 'User account created.') {
        // delay(4000);
        router.push('/confirm');
      }
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }
    // delay(4000);
    setFeedback("");
  };

  const registerClick = async () => {
    if (loading) return;
    if (!validateRegistrationInfo()) return;
    await register();
  };

  const registerKeyUp = async (e: React.KeyboardEvent) => {
    if (loading) return;
    if (!validateRegistrationInfo()) return;
    if (e.key && (e.key !== "Enter")) return;
    await register();
  };

  const validateRegistrationInfo = () => password == passwordAgain;
  
  return (
    <div className="register" onKeyUp={e => registerKeyUp(e)}>
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
          minLength={2}
          maxLength={20}
          name="username"
          onChange={usernameChange}
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
          onChange={emailChange}
          size={20}
          type="email"
          value={email}
        />

        <label>Password</label>
        <input
          autoComplete="current-password"
          disabled={loading}
          id="password"
          minLength={6}
          maxLength={20}
          name="password"
          onChange={passwordChange}
          size={20}
          type="password"
          value={password}
        />

        <label>Password Again</label>
        <input
          autoComplete="current-password"
          disabled={loading}
          id="passwordAgain"
          maxLength={20}
          name="passwordAgain"
          onChange={passwordAgainChange}
          size={20}
          type="password"
          value={passwordAgain}
        />
        
        <LoaderButton
          className="create-account"
          disabled={!validateRegistrationInfo()}
          id="create_account"
          isLoading={loading}
          loadingText="Creating Account..."
          name="submit"
          onClick={registerClick}
          onKeyUp={registerKeyUp}
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

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
