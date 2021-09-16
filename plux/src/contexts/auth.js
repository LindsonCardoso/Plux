
import { useState, useEffect, createContext } from 'react'
import Axios from 'axios'
import { toast } from 'react-toastify';
export const AuthContext = createContext({


}); 
 
export default function AuthProvider({children}){

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
            
        Axios.post('http://localhost:3001/api/login',{
        login: login,
        senha: senha,
        }).then( async (response, value) => {
        if(response.data.message){
            setLoadingAuth(false);
            toast.error("Login/senha invalidos !", {
                icon: "☹️"
            });
        }else{
            let uid =  response.data[0].usu_id;

            const dataUser = await response.data;
                
            console.log('dados do response: '+(dataUser))
            
            let data = {
                uid: uid,
                nome: dataUser[0].usu_nome,
                avatarUrl: dataUser[0].usu_avatar,
                email: dataUser[0].usu_email 
            }
                
            //console.log(data);
           
            console.log('dados do datauser: '+JSON.stringify(data));
            setUser(data)
            storegeUser(data)
            setLoadingAuth(false);  
            toast.success("Bem Vindo de volta !", {
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
        Axios.post('http://localhost:3001/api/login',{
        login: login,
        senha: senha,
        }).then( async (response, value) => {   
        if(response.data.message){
        setLoadingAuth(false);
        toast.error("Login/senha invalidos !", {
            icon: "☹️"
        });
        }else{
            let uid =  response.data[0].usu_id;

            let dataUser = await response.data;
                
            //console.log('dados do response: '+(dataUser))
            

            let data = {
                uid: uid,
                nome: dataUser[0].usu_nome, 
                login: dataUser[0].usu_login,
                email:  dataUser[0].usu_email,
                avatarUrl: null
            };

            setUser(data)
            storegeUser(data)
            setLoadingAuth(false); 
            toast.success("Bem Vindo ao Plux!", {
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
        


    function storegeUser(data){
        localStorage.setItem('SistemaUser', JSON.stringify(data))
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

