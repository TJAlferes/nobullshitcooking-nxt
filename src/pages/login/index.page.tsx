import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../store';
import { staffLogin, userLogin } from '../../store/auth/actions';
import { LoginView } from './view';

// TO DO: make Sign In button css not change color on hover while in Signing In... AKA isloading state
// TO DO: finite state machine

export default function Login(): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  //const authname = useSelector(state => state.auth.authname);
  const message =             useSelector(state => state.auth.message);
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

  //useEffect(() => {
  //  if (authname !== "") router.push('/dashboard');
  //}, [authname]);

  const emailChange =    (e: React.SyntheticEvent<EventTarget>) => setEmail((e.target as HTMLInputElement).value);
  const passwordChange = (e: React.SyntheticEvent<EventTarget>) => setPassword((e.target as HTMLInputElement).value);

  const loginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!validateLoginInfo()) return;
    setLoading(true);
    if (pathname === "/staff-login") dispatch(staffLogin(email, password));
    if (pathname === "/login")       dispatch(userLogin(email, password, router));
  }

  const loginKeyUp = (e: React.KeyboardEvent) => {
    if (loading) return;
    if (!validateLoginInfo()) return;
    if (e.key && (e.key !== "Enter")) return;
    setLoading(true);
    if (pathname === "/staff-login") dispatch(staffLogin(email, password));
    if (pathname === "/login")       dispatch(userLogin(email, password, router));
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