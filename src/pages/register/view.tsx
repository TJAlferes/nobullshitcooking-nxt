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
    <form>
      <h1>Create Account</h1>

      <p className="feedback">{feedback}</p>

      <label>Username</label>
      <input
        autoComplete="username"
        autoFocus
        disabled={loading}
        id="username"
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
  );

  const verifyForm = () => (
    <form>
      <h1>Verify</h1>

      <p className="feedback">{feedback}</p>

      <label>Code</label>
      <input
        autoComplete="confirmation-code"
        autoFocus
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
        className="verify-confirmation-code"
        disabled={!validateConfirmationCode()}
        id="verify_confirmation_code"
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
        <a className="home-links">
          <img className="--desktop" src={`${url}logo-large-white.png`} />
          <img className="--mobile" src={`${url}logo-small-white.png`} />
        </a>
      </Link>

      {confirmingUser === true ? verifyForm() : registerForm()}

      <div className="links">
        <Link href="/page/site/terms"><a>Terms of Use</a></Link>
        <Link href="/page/site/privacy"><a>Privacy Policy</a></Link>
        <Link href="/page/site/help"><a>Help</a></Link>
      </div>

      <p className="copyright">Copyright 2015-2023 NoBullshitCooking. All Rights Reserved.</p>
    </div>
  );
}

type SyntheticEvent = React.SyntheticEvent<EventTarget>;

type Props = {
  confirmationCode:                          string;
  confirmingUser:                            boolean;
  email:                                     string;
  feedback:                                  string;
  loading:                                   boolean;
  confirmationCodeChange(e: SyntheticEvent): void;
  emailChange(e: SyntheticEvent):            void;
  passwordChange(e: SyntheticEvent):         void;
  passwordAgainChange(e: SyntheticEvent):    void;
  registerClick():                           void;
  registerKeyUp(e: React.KeyboardEvent):     void;
  usernameChange(e: SyntheticEvent):         void;
  verifyClick():                             void;
  verifyKeyUp(e: React.KeyboardEvent):       void;
  password:                                  string;
  passwordAgain:                             string;
  username:                                  string;
  validateConfirmationCode():                boolean;
  validateRegistrationInfo():                boolean;
};