import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
//import { connect, ConnectedProps } from 'react-redux';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../store';
import { authStaffLogin, authUserLogin } from '../../store/auth/actions';
import { LoginView } from './LoginView';

// TO DO: make Sign In button css not change color on hover while in Signing In... AKA isloading state
// TO DO: finite state machine!!!

export function Login(): JSX.Element {
  const dispatch = useDispatch();
  const message = useSelector(state => state.auth.message);
  const { pathname } = useRouter();

  const [ email, setEmail ] = useState("");
  const [ feedback, setFeedback ] = useState("");
  const [ loading, setLoading ] = useState(false);
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

  const handleEmailChange = (e: React.SyntheticEvent<EventTarget>) =>
    setEmail((e.target as HTMLInputElement).value);
  
  const handleLoginClick = () => {
    if (loading) return;
    if (!validateLoginInfo()) return;
    setLoading(true);
    if (pathname === "/staff-login") dispatch(authStaffLogin(email, password));
    if (pathname === "/login") dispatch(authUserLogin(email, password));
  }

  const handleLoginKeyUp = (e: React.KeyboardEvent) => {
    if (loading) return;
    if (!validateLoginInfo()) return;
    if (e.key && (e.key !== "Enter")) return;
    setLoading(true);
    if (pathname === "/staff-login") dispatch(authStaffLogin(email, password));
    if (pathname === "/login") dispatch(authUserLogin(email, password));
  }

  const handlePasswordChange = (e: React.SyntheticEvent<EventTarget>) =>
    setPassword((e.target as HTMLInputElement).value);

  const validateLoginInfo = () => ((email.length > 4) && (password.length > 5));

  return (
    <LoginView
      email={email}
      feedback={feedback}
      handleEmailChange={handleEmailChange}
      handleLoginClick={handleLoginClick}
      handleLoginKeyUp={handleLoginKeyUp}
      handlePasswordChange={handlePasswordChange}
      loading={loading}
      password={password}
      validateLoginInfo={validateLoginInfo}
    />
  );
}

/*interface RootState {
  auth: {
    message: string;
  };
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const mapStateToProps = (state: RootState) => ({message: state.auth.message});

const mapDispatchToProps = {
  authStaffLogin: (email: string, password: string) =>
    authStaffLogin(email, password),
  authUserLogin: (email: string, password: string) =>
    authUserLogin(email, password)
};

const connector = connect(mapStateToProps, mapDispatchToProps);*/

//export default connector(Login);
export default Login;