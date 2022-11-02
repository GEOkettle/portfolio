import React from 'react';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import ToUp from './components/ToUp';
import Login from './components/Login/LoginPage';
import Register from './components/Login/RegisterPage';
import Auth from './components/hoc/auth';
import Nav from './components/Nav';
import Contact from './components/Notion/Contact';
import Notion from './components/Notion/Notion';
import Credit from './components/Credit/Credit'
import styled, { ThemeProvider } from 'styled-components';
import useStore from './store/store';




function App() {
    const {isDarkMode,inDarkMode,inLightMode} = useStore();

 
    const AuthAbout = Auth(About, null);
    const AuthNotion = Auth(Notion, null);
    const AuthCredit = Auth(Credit, false);
    const AuthLogin = Auth(Login, false);
    const AuthRegister = Auth(Register, false);
  
    return (
      
        <ThemeProvider theme={isDarkMode ? inDarkMode : inLightMode}>
        <Theme style={{height :'inherit'}}>
           
        <Nav></Nav>
        <Routes >
        <Route path='*' element={  <AuthAbout />} />
        <Route path='/about:id' element={   <AuthAbout />} />
        <Route path='/ab' element={   <Contact />} />
        <Route path='/login' element={ <AuthLogin />} />
        <Route path='/credit' element={ <AuthCredit />} />
        <Route path='/register' element={ <AuthRegister />} />
        <Route path='/notion/:slug' element={<AuthNotion />} />
        </Routes>
      <ToUp></ToUp>
        </Theme>
        </ThemeProvider>
        
    )
}



export default App

const Theme = styled.div`
background-color: ${props => props.theme.backgroundColor};

`