import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  
import './styles/global.css'
//import 'bootstrap/dist/css/bootstrap.min.css';
import { ChakraProvider,CSSReset } from "@chakra-ui/react";
import theme from '../src/lib/theme'

ReactDOM.render(
  
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <CSSReset />
    <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
