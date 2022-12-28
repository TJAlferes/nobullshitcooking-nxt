import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../store';
import { authStaffLogin, authUserLogin } from '../../store/auth/actions';
import { LoginView } from './view';

// TO DO: make Sign In button css not change color on hover while in Signing In... AKA isloading state
// TO DO: finite state machine
export default function Login(): JSX.Element {
  const { pathname } = useRouter();
  const dispatch = useDispatch();
  const message = useSelector(state => state.auth.message);
  const [ email,    setEmail ] =    useState("");
  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ] =  useState(false);
  const [ password, setPassword ] = useState("");

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

  const emailChange = (e: React.SyntheticEvent<EventTarget>) => setEmail((e.target as HTMLInputElement).value);
  
  const passwordChange = (e: React.SyntheticEvent<EventTarget>) => setPassword((e.target as HTMLInputElement).value);

  const loginClick = () => {
    if (loading) return;
    if (!validateLoginInfo()) return;
    setLoading(true);
    if (pathname === "/staff-login") dispatch(authStaffLogin(email, password));
    if (pathname === "/login")       dispatch(authUserLogin(email, password));
  }

  const loginKeyUp = (e: React.KeyboardEvent) => {
    if (loading) return;
    if (!validateLoginInfo()) return;
    if (e.key && (e.key !== "Enter")) return;
    setLoading(true);
    if (pathname === "/staff-login") dispatch(authStaffLogin(email, password));
    if (pathname === "/login")       dispatch(authUserLogin(email, password));
  }

  const validateLoginInfo = () => ((email.length > 4) && (password.length > 5));

  return (
    <LoginView
      email={email}
      feedback={feedback}
      emailChange={emailChange}
      loginClick={loginClick}
      loginKeyUp={loginKeyUp}
      passwordChange={passwordChange}
      loading={loading}
      password={password}
      validateLoginInfo={validateLoginInfo}
    />
  );
}