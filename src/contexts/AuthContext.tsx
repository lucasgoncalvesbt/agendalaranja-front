import React, { createContext, ReactNode, useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import api from '../services/api';
import { useHistory } from 'react-router-dom';

type User = {
  id: number;
  nome: string;
  email: string;
}

type Decoded = {
  sub: number;
  email: string;
  nome: string;
}

type AuthContextType = {
  user: User | undefined;
  userIsAuthenticated: boolean;
  login(email: string, senha: string, callback: Function): Promise<void>;
  logout(): void;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

  useEffect(() => {
    function onLoad() {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwt_decode(token) as Decoded;
        setUser({
          id: decoded.sub,
          email: decoded.email,
          nome: decoded.nome
        })
        setUserIsAuthenticated(true);
      }
    };
    onLoad();
  }, [])

  const login = async (email: string, senha: string, callback: Function) => {
    const { data: { token } } = await api.post('/auth/sign', {
      email: email,
      senha: senha
    })
    localStorage.setItem('token', token)
    const decoded = jwt_decode(token) as Decoded;
    setUser({
      id: decoded.sub,
      email: decoded.email,
      nome: decoded.nome
    })

    console.log(user);
    callback();
  }

  const logout = () => {
    localStorage.removeItem('token');
    setUser(undefined);
    console.log("logout")
  }

  return (
    <AuthContext.Provider value={{ user, userIsAuthenticated, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}