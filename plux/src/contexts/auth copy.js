
import { useState, useEffect, createContext } from 'react'
import Axios from 'axios'
import { toast } from 'react-toastify';
export const AuthContext = createContext({


}); 
 
export default function AuthProvider({children}){

    const [dataUsers, setDataUsers] = useState();
    const [ user, setUser] = useState(null)
    const [ loadingAuth, setLoadingAuth] = useState(false)
    const [ loading, setLoading] = useState(true)

    useEffect(()=>{
        function loadStorage(){

            const storageUser = localStorage.getItem('SistemaUser')

            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }
            setLoading(false)
        }    
        loadStorage();
    }, [])



    //Login usuario
    const singIn = async (login, senha) => {
        setLoadingAuth(true)   
        Axios.get('http://localhost:3001/api/buscarUser',{
        login: login,
        senha: senha,
        }).then((response) => {
        if(response.data.message){
            setDataUsers(response.data.message);
        }else{
            setDataUsers(response.data)   
            
            let dataUser = {
                uid: response.data.usu_id,
                login: response.data.usu_login,
                senha: response.data.usu_senha,
            }

            setUser(dataUser)
            storegeUser(dataUser)
            setLoadingAuth(false);  
            toast.success("Bem Vindo ao Plux !", {
                icon: "🚀"
              });
        }
        })
        .catch((error) => {
            console.log(error);
            toast.error("Ops algo deu errado !", {
                icon: "☹️"
            });
            setLoadingAuth(false);
        })
    }

 


    const signUp = async (nome, login, email, senha) => {
     setLoadingAuth(true)   
        Axios.post('http://localhost:3001/api/cadastro',{ 
        nome: nome,
        login: login,
        email: email,
        senha: senha,
        }).then((response) => {
        console.log(response)
        })
        Axios.post('http://localhost:3001/api/buscarUser',{
        login: login,
        senha: senha,
        }).then((response) => {
        if(response.data.message){
            setDataUsers(response.data.message);
        }else{
            setDataUsers(response.data)   
            let dataUser = {
                uid: response.data.usu_id,
                login: response.data.usu_login,
                senha: response.data.usu_senha,
            }

            setUser(dataUser)
            storegeUser(dataUser)
            setLoadingAuth(false); 
            toast.success("");
            toast.success("Bem Vindo de volta !", {
                icon: "👋"
              });
        }
        })
        .catch((error) => {
            console.log(error);
            toast.error("Ops algo deu errado !", {
                icon: "☹️"
            });
            setLoadingAuth(false);
        })
    }
        




    function storegeUser(dataUser){
        localStorage.setItem('SistemaUser', JSON.stringify(dataUser))
    }


    const signOut = () => {

    localStorage.removeItem('SistemaUser');
    setUser(null);


    }


    return(
        //reconhece como verdadeiro caso seja nulo
     <AuthContext.Provider value={{ 
         signed: !!user, 
         user, 
         loading, 
         signUp,
         signOut,
         singIn,
         loadingAuth
         }}
         > 
         {children}
     </AuthContext.Provider>
  )
}

