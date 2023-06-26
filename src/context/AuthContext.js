import React, { useState, useEffect, createContext } from "react";
import { setToken, getToken, removeToken } from "../api/token";
import { useUser } from "../hooks";
import { LoaderAuth } from "../components/Auth";
import { Grid, Transition } from "semantic-ui-react";

export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
});

export function AuthProvider(props) {
  const { children } = props;
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [auth, setAuth] = useState(null);
  const { getMe } = useUser();

  useEffect(() => {
    (async () => {
      const token = getToken();
      if (token) {
        const me = await getMe(token);
        setAuth({ token, me });
      } else {
        setAuth(null);
      }
      setLoadingAuth(false);
    })();
  }, []);

  const login = async (token) => {
    setToken(token);
    const me = await getMe(token);
    setAuth({ token, me });
  };

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
    }
  };

  const valueContext = {
    auth,
    login,
    logout,
  };

  return (
    <>
      {loadingAuth ? (
        <LoaderAuth />
      ) : (
        <AuthContext.Provider value={valueContext}>
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
}
