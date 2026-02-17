import { createContext, useEffect, useMemo, useState } from 'react';
import { api, setAuthToken } from '../api/client';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const data = localStorage.getItem('wa-auth');
    return data ? JSON.parse(data) : { token: '', user: null };
  });

  useEffect(() => {
    setAuthToken(auth.token);
    localStorage.setItem('wa-auth', JSON.stringify(auth));
  }, [auth]);

  const value = useMemo(
    () => ({
      auth,
      login: async (payload) => {
        const { data } = await api.post('/auth/login', payload);
        setAuth(data);
      },
      register: async (payload) => {
        const { data } = await api.post('/auth/register', payload);
        setAuth(data);
      },
      logout: () => setAuth({ token: '', user: null }),
    }),
    [auth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
