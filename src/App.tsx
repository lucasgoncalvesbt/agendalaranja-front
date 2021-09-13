import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Nav from './components/Nav';
import { AuthContextProvider } from './contexts/AuthContext';
import Routes from './Routes';

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Nav />
        <Routes />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
