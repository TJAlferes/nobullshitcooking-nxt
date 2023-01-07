import Link from 'next/link';

import { LoaderButton } from '../../components';

const url = "https://s3.amazonaws.com/nobsc-images-01/auth/";

export function LoginView({ email, feedback, emailChange, loginClick, loginKeyUp, passwordChange, loading, password, validateLoginInfo }: Props): JSX.Element {
  return (
    <div className="login" onKeyUp={e => loginKeyUp(e)}>
      <Link href="/">
        <a>
          <img className="--desktop" src={`${url}logo-large-white.png`} />
          <img className="--mobile"  src={`${url}logo-small-white.png`} />
        </a>
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
          onChange={emailChange}
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
          onChange={passwordChange}
          size={20}
          type="password"
          value={password}
        />

        <LoaderButton
          className="login__button"
          disabled={!validateLoginInfo()}
          id="login-button"
          isLoading={loading}
          loadingText="Signing In..."
          name="submit"
          onClick={loginClick}
          onKeyUp={loginKeyUp}
          text="Sign In"
        />
      </form>
    </div>
  );
}

type Props = {
  email:                                                string;
  feedback:                                             string;
  emailChange(e: React.SyntheticEvent<EventTarget>):    void;
  loginClick(e: React.MouseEvent):                      void;
  loginKeyUp(e: React.KeyboardEvent):                   void;
  passwordChange(e: React.SyntheticEvent<EventTarget>): void;
  loading:                                              boolean;
  password:                                             string;
  validateLoginInfo():                                  boolean;
};