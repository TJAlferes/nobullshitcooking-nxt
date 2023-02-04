import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../store';
import { userRegister, userVerify } from '../../store/auth/actions';
import { RegisterView } from './view';

export default function Register({ confirmingUser }: Props): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const userIsAuthenticated = useSelector(state => state.auth.userIsAuthenticated);
  const message =             useSelector(state => state.auth.message);
  const [ confirmationCode, setConfirmationCode ] = useState("");
  const [ email,            setEmail ] =            useState("");
  const [ feedback,         setFeedback ] =         useState("");
  const [ loading,          setLoading ] =          useState(false);
  const [ password,         setPassword ] =         useState("");
  const [ passwordAgain,    setPasswordAgain ] =    useState("");
  const [ username,         setUsername ] =         useState("");

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      setFeedback(message);
      setLoading(false);
    }
    return () => {
      isSubscribed = false;
    };
  }, [message]);

  useEffect(() => {
    if (userIsAuthenticated) router.push('/dashboard');
  }, [userIsAuthenticated]);

  const confirmationCodeChange = (e: SyntheticEvent) => setConfirmationCode((e.target as HTMLInputElement).value);
  const emailChange =            (e: SyntheticEvent) => setEmail((e.target as HTMLInputElement).value);
  const usernameChange =         (e: SyntheticEvent) => setUsername((e.target as HTMLInputElement).value);
  const passwordChange =         (e: SyntheticEvent) => setPassword((e.target as HTMLInputElement).value);
  const passwordAgainChange =    (e: SyntheticEvent) => setPasswordAgain((e.target as HTMLInputElement).value);

  const registerClick = () => {
    if (loading) return;
    if (!validateRegistrationInfo()) return;
    setLoading(true);
    dispatch(userRegister(email, password, username, router));  // do you really need to pass the router here?
  };

  const registerKeyUp = (e: React.KeyboardEvent) => {
    if (loading) return;
    if (!validateRegistrationInfo()) return;
    if (e.key && (e.key !== "Enter")) return;
    setLoading(true);
    dispatch(userRegister(email, password, username, router));
  };

  const verifyClick = () => {
    if (loading) return;
    if (!validateConfirmationCode()) return;
    setLoading(true);
    dispatch(userVerify(email, password, confirmationCode, router));
  };

  const verifyKeyUp = (e: React.KeyboardEvent) => {
    if (loading) return;
    if (!validateConfirmationCode()) return;
    if (e.key && (e.key !== "Enter")) return;
    setLoading(true);
    dispatch(userVerify(email, password, confirmationCode, router));
  };

  const validateConfirmationCode = () => confirmationCode.length > 1;
  const validateRegistrationInfo = () => ((username.length > 1) && (email.length > 4) && (password.length > 5) && (password == passwordAgain));
  
  return (
    <RegisterView
      confirmationCode={confirmationCode}
      confirmingUser={confirmingUser}
      email={email}
      feedback={feedback}
      confirmationCodeChange={confirmationCodeChange}
      emailChange={emailChange}
      passwordChange={passwordChange}
      passwordAgainChange={passwordAgainChange}
      registerClick={registerClick}
      registerKeyUp={registerKeyUp}
      usernameChange={usernameChange}
      verifyClick={verifyClick}
      verifyKeyUp={verifyKeyUp}
      loading={loading}
      password={password}
      passwordAgain={passwordAgain}
      username={username}
      validateConfirmationCode={validateConfirmationCode}
      validateRegistrationInfo={validateRegistrationInfo}
    />
  );
}

type SyntheticEvent = React.SyntheticEvent<EventTarget>;

type Props = {
  confirmingUser: boolean;
};