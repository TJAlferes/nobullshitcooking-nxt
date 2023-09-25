import { createContext, useContext, useState }      from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

export const AuthnameContext = createContext<string | null>(null);

export const SetAuthnameContext = createContext<Dispatch<SetStateAction<string>> | null>(null);

export function AuthnameProvider({ children }: {children?: ReactNode}) {
  const [ authname, setAuthname ] = useState<string>("");

  return (
    <AuthnameContext.Provider value={authname}>
      <SetAuthnameContext.Provider value={setAuthname}>
        {children}
      </SetAuthnameContext.Provider>
    </AuthnameContext.Provider>
  );
};

export function useAuthname() {
  const authname = useContext(AuthnameContext);
  //if (!authname) {
  //  throw new Error("No authname context");
  //}
  return authname;
}

export function useSetAuthname() {
  const setAuthname = useContext(SetAuthnameContext);
  //if (!setAuthname) {
  //  throw new Error("No setAuthname context");
  //}
  return setAuthname;
}
