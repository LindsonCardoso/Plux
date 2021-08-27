
import { useState, useEffect, createContext } from 'react'


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


    async function signUp(email, password, nome){
        setLoading(true);
    }


    return(
        //reconhece como verdadeiro caso seja nulo
     <AuthContext.Provider value={{ signed: !!user, user, loading}}>
         
         {children}
     </AuthContext.Provider>
  )
}

