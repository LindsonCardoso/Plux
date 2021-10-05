
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter} from 'react-router-dom'
import Routes from './routes'
import AuthProvider from './contexts/auth';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
}
const theme = extendTheme({ colors })


function App({ Component }) {
  return (
    <ChakraProvider bg="#153e75">
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
