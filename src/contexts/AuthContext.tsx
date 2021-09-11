import React, { createContext, ReactNode, useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
}

type AuthContextType = {
  user: User | undefined;
  signIn: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {

  }, [])

  async function signIn() {

  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}