import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './LandingPage'
import theme from './ui/Theme'
import {ThemeProvider} from "@material-ui/styles";


export default function App() {

  return (
    <ThemeProvider theme={theme}>
        <LandingPage/>
    </ThemeProvider>
  );
}

