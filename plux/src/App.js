
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter} from 'react-router-dom'
import Routes from './routes'
import AuthProvider from './contexts/auth';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider } from "@chakra-ui/react";
import theme from '../src/lib/theme'

const App = () => {
  return (
    <ChakraProvider theme={theme} >
    <AuthProvider>
     <BrowserRouter>
      <ToastContainer autoClose={3000}/>
      <Routes />
     </BrowserRouter>
    </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
