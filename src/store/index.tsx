import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import { createContext, useContextSelector } from "use-context-selector";

import { getItem, setItem } from "../modules/general/localStorage";

function store() {
  const [ auth_id, setAuthId ]    = useState(getItem("auth_id") || "");
  const [ authname, setAuthname ] = useState(getItem("authname") || "");

  return {
    auth_id,
    authname,
    login: useCallback(({ auth_id, authname }: LoginParams) => {
      setAuthId(auth_id);
      setItem("auth_id", auth_id);
      setAuthname(authname);
      setItem("authname", authname);
    }, []),
    logout: useCallback(() => {
      setAuthId("");
      setItem("auth_id", "");
      setAuthname("");
      setItem("authname", "");
    }, []),

  };
}

const StoreContext = createContext(store());

export function StoreContextProvider({ children }: StoreContextProviderProps) {
  return (
    <StoreContext.Provider value={store()}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContextSelector(StoreContext, (s) => ({
    auth_id:  s.auth_id,
    authname: s.authname,
    login:    s.login,
    logout:   s.logout,
  }));
}

type StoreContextProviderProps = {
  children: ReactNode;
};

type LoginParams = {
  auth_id:  string;
  authname: string;
};
