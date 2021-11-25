
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter} from 'react-router-dom'
import Routes from './routes'
import AuthProvider from './contexts/auth';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider } from "@chakra-ui/react";
import theme from '../src/lib/theme'
import ThemeToggleButton from './components/theme-toggle-button';
const App = () => {
  return (
  
    <AuthProvider>

     <BrowserRouter>
      <ToastContainer autoClose={3000}/>
      <Routes />
     </BrowserRouter>
    </AuthProvider>
   
  );
}

export default App;
