
import React,{Component, useState, useEffect, createContext } from 'react'
import Axios from 'axios'
import { toast } from 'react-toastify';

export const AuthContext = createContext({}); 
 
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
    async function singIn(login, senha,nomeEmpresa, email){
    
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
            
            Axios.post('http://localhost:3001/api/DadosEmpresa',{ 
                email: dataUser[0].usu_email,   
                }).then( async (res) => {
                    setLoadingAuth(false);
                    console.log('dados da empresa '+res.data)      
                    const dataEmpresa = await res.data;  
                    console.log('dados do empresa: '+JSON.stringify(dataEmpresa));

                    let data = {
                        uid: uid,
                        nome: dataUser[0].usu_nome,
                        avatarUrl: dataUser[0].usu_avatar,
                        email: dataUser[0].usu_email,
                       
               
                    }          
                    console.log('dados do datauser: '+JSON.stringify(data));
                    setUser(data)
                    storegeUser(data)
                    setLoadingAuth(false);  
                    toast.success("Bem Vindo de volta !", {
                        icon: "🚀"
                    });       
                });
        }
    }).catch((error) => {
            console.log(error);
            toast.error("Ops algo deu errado !", {
                icon: "☹️"
            });
            setLoadingAuth(false);
        })
}


    async function signUp (nome, login, email, senha){
     setLoadingAuth(true)   
        Axios.post('http://localhost:3001/api/cadastro',{ 
        nome: nome,
        login: login,
        email: email,
        senha: senha,
        }).then( async (response, value) => {
            if(response.data.message){
                setLoadingAuth(false);
                console.log(response.data.message)
                toast.error("Informe outro Login!", {
                    icon: "☹️"
                });
            }else{  
                  
                setLoadingAuth(false);   
                toast.success("Cadastro Realizado!", {
                    icon: "🚀"
                });

                toast.info("Redirecionando... para tela inicial!", {
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
        
    async function cadEmpresa (nomeEmpresa,razaoSocial,cnpj,ie,email){
        setLoadingAuth(true) 
        Axios.post('http://localhost:3001/api/empresa',{ 
            nomeEmpresa: nomeEmpresa, 
            razaoSocial: razaoSocial,
            CNPJ: cnpj,
            IE: ie, 
            email: email,
        }).then( async (response, value) => {
                if(response.data.message){     
                    setLoadingAuth(false);
                    console.log(response.data.message)
                    toast.warn("Dados Ja Salvos!", {
                        icon: "☹️"
                    });
                }else{ 
                Axios.post('http://localhost:3001/api/DadosEmpresa',{ 
                nomeEmpresa: nomeEmpresa,   
                }).then( async (response, value) => {
                    setLoadingAuth(false);
                    console.log('aqui '+response.data)      
                    const dataEmpresa = await response.data;  
                    console.log('dados do datauser: '+JSON.stringify(dataEmpresa));
      
                    let data = {
                        ...user,
                        nomeEmpresa: dataEmpresa[0].cli_nome,
                        razaoSocial: dataEmpresa[0].cli_razaosocial,
                        CNPJ: dataEmpresa[0].cli_cnpj,
                        IE: dataEmpresa[0].cli_ie
                    }
                    console.log('dados do dataEmpresa: '+JSON.stringify(data));
                    setUser(data)
                    storegeUser(data)
                    setLoadingAuth(false); 
                    toast.success("Dados Salvos!", {
                        icon: "🚀"
                    });
                })
                }//else
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
         loadingAuth,
         setUser,
         storegeUser,
         cadEmpresa
         }}
         > 
         {children}
     </AuthContext.Provider>
  )
}

