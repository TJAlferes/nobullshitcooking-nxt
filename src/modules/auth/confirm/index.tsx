import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useApi } from '../../../store';

export default function Confirm() {
  const router = useRouter();

  const { api } = useApi();

  const [ feedback, setFeedback ] = useState('');
  const [ loading,  setLoading ]  = useState(false);

  const [ confirmation_code, setConfirmationCode ] = useState('');
  
  const confirm = async () => {
    if (!confirmation_code) {
      return setFeedback('Confirmation Code required.')
    }

    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);

    try {
      const res = await api.post('/confirm', {confirmation_code});
      if (res.status === 204) {
        setFeedback('User account confirmed.');
        setTimeout(() => {
          router.push('/login');
        }, 4000);
      } else {
        setFeedback(res.data.message);
      }
    } catch (err) {
      setFeedback('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  const confirmClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!loading) await confirm();
  };

  const confirmKeyUp = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!loading && e.key === "Enter") await confirm();
  };

  const url = 'https://s3.amazonaws.com/nobsc-images-01/auth';
  
  return (
    <div className="auth confirm" onKeyUp={e => confirmKeyUp(e)}>
      <Link href="/" className="home-links">
        <img className="--desktop" src={`${url}/logo-large-white.png`} />
        <img className="--mobile" src={`${url}/logo-small-white.png`} />
      </Link>

      <form>
        <h1>Confirm</h1>

        <p className="feedback">{feedback}</p>

        <p>Check your email for the confirmation code.</p>

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

        <button
          disabled={confirmation_code.length !== 36}
          onClick={e => confirmClick(e)}
          type="button"
        >{loading ? 'Confirming...' : 'Confirm'}</button>
        
        <Link className='troubleshoot' href='/resend-confirmation-code'>
          Can't find your confirmation code?
        </Link>
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
