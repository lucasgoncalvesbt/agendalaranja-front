import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Footer from './components/Footer';
import Nav from './components/Nav';
import { AuthContextProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import Routes from './Routes';

function App() {
  const { isAuthenticating } = useAuth();

  return (
    <BrowserRouter>
      {!isAuthenticating && (
        <AuthContextProvider>

          <>
            <Nav />
            <Routes />
            <Footer />
          </>

        </AuthContextProvider>
      )}
    </BrowserRouter>
  );
}

export default App;
