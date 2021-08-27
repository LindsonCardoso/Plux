
import { Switch } from 'react-router-dom'
import Route from './Route'
import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'

import { Dashboard } from '../pages/Dashboard'
import  RegistrarPonto  from '../pages/TimePoint'

export default function Routes(){
    
    return( 
        <Switch> 
         <Route  exact path="/" component={SignIn} />
         <Route  exact path="/register" component={SignUp} />
         <Route exact path="/registrarponto" component={RegistrarPonto} />
         <Route  exact path="/dashboard" component={Dashboard} isPrivate/>
        
        </Switch>
    )
}   