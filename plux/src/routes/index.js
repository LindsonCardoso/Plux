
import { Switch } from 'react-router-dom'
import Route from './Route'


//pages
import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import CadastroFuncion from '../pages/cadastro-de-funcionario'
import Profile from '../pages/Profile'

//components
import { Dashboard } from '../pages/Dashboard'
import  RegistrarPonto  from '../pages/TimePoint'

import BaterPonto from '../components/Ponto'
import DadosEmpresa from '../pages/Administrativo'

export default function Routes(){
    
    return( 
        <Switch> 
         <Route  exact path="/" component={SignIn} />
         <Route  exact path="/register" component={SignUp} />
         <Route  exact path="/dashboard" component={Dashboard} isPrivate/>
         <Route  exact path="/profile" component={Profile} isPrivate/>
         <Route  exact path="/dados-empresa" component={DadosEmpresa} isPrivate/>
       
         <Route  exact path="/cadastro-de-funcionario" component={CadastroFuncion} isPrivate/>
         <Route  exact path="/registrar-ponto" component={RegistrarPonto} isPrivate/>  
         <Route  exact path="/ponto" component={BaterPonto}/>

        </Switch>
    )
}   