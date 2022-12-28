import Link from 'next/link';

import { LoaderButton } from '../../components';

const url = "https://s3.amazonaws.com/nobsc-images-01/auth/";

export function RegisterView({
  confirmationCode,
  confirmingUser,
  email,
  feedback,
  loading,
  confirmationCodeChange,
  emailChange,
  passwordChange,
  passwordAgainChange,
  registerClick,
  registerKeyUp,
  usernameChange,
  verifyClick,
  verifyKeyUp,
  password,
  passwordAgain,
  username,
  validateConfirmationCode,
  validateRegistrationInfo
}: Props): JSX.Element {
  const registerForm = () => (
    <form className="register__form">
      <h1 className="register__heading">Create Account</h1>

      <p className="feedback">{feedback}</p>

      <label className="register__label">Username</label>
      <input
        autoComplete="username"
        autoFocus
        className="register__input"
        disabled={loading}
        id="username"
        maxLength={20}
        name="username"
        onChange={usernameChange}
        size={20}
        type="text"
        value={username}
      />

      <label className="register-label">Email</label>
      <input
        autoComplete="email"
        className="register__input"
        disabled={loading}
        id="email"
        maxLength={60}
        name="email"
        onChange={emailChange}
        size={20}
        type="email"
        value={email}
      />

      <label className="register-label">Password</label>
      <input
        autoComplete="current-password"
        className="register__input"
        disabled={loading}
        id="password"
        maxLength={20}
        name="password"
        onChange={passwordChange}
        size={20}
        type="password"
        value={password}
      />

      <label className="register-label">Password Again</label>
      <input
        autoComplete="current-password"
        className="register__input"
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
        className="create-account-button"
        disabled={!validateRegistrationInfo()}
        id="create_account_button"
        isLoading={loading}
        loadingText="Creating Account..."
        name="submit"
        onClick={registerClick}
        onKeyUp={registerKeyUp}
        text="Create Account"
      />
    </form>
  );

  const verifyForm = () => (
    <form className="register-confirm-form">
      <h1 className="register__heading">Verify</h1>

      <p className="feedback">{feedback}</p>

      <label className="register__label">Code</label>
      <input
        autoComplete="confirmation-code"
        autoFocus
        className="register__input"
        disabled={loading}
        id="confirmationCode"
        maxLength={20}
        name="confirmationCode"
        onChange={confirmationCodeChange}
        size={20}
        type="text"
        value={confirmationCode}
      />

      <p>Please check your email for the confirmation code.</p>

      <LoaderButton
        className="verify-confirmation-code-button"
        disabled={!validateConfirmationCode()}
        id="verify_confirmation_code_button"
        isLoading={loading}
        loadingText="Verifying..."
        name="submit"
        onClick={verifyClick}
        onKeyUp={registerKeyUp}
        text="Verify"
      />
    </form>
  );

  return (
    <div className="register" onKeyUp={e => registerKeyUp(e)}>
      <Link href="/">
        <a className="register__home-links">
          <img className="home-link--desktop" src={`${url}logo-large-white.png`} />
          <img className="home-link--mobile" src={`${url}logo-small-white.png`} />
        </a>
      </Link>

      {confirmingUser === true ? verifyForm() : registerForm()}

      <div className="register__links">
        <Link href="/page/site/terms"><a className="register__link">Terms of Use</a></Link>
        <Link href="/page/site/privacy"><a className="register__link">Privacy Policy</a></Link>
        <Link href="/page/site/help"><a className="register__link">Help</a></Link>
      </div>

      <p className="register__copyright">Copyright 2015-2023 NoBullshitCooking. All Rights Reserved.</p>
    </div>
  );
}

type Props = {
  confirmationCode: string;
  confirmingUser: boolean;
  email: string;
  feedback: string;
  loading: boolean;
  confirmationCodeChange(e: React.SyntheticEvent<EventTarget>): void;
  emailChange(e: React.SyntheticEvent<EventTarget>): void;
  passwordChange(e: React.SyntheticEvent<EventTarget>): void;
  passwordAgainChange(e: React.SyntheticEvent<EventTarget>): void;
  registerClick(): void;
  registerKeyUp(e: React.KeyboardEvent): void;
  usernameChange(e: React.SyntheticEvent<EventTarget>): void;
  verifyClick(): void;
  verifyKeyUp(e: React.KeyboardEvent): void;
  password: string;
  passwordAgain: string;
  username: string;
  validateConfirmationCode(): boolean;
  validateRegistrationInfo(): boolean;
};