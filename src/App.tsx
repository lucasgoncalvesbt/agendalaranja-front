import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/footer';

import Nav from './components/Nav';
import { AuthContextProvider } from './contexts/AuthContext';
import Routes from './Routes';

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Nav />
        <Routes />
        <Footer />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
