import { useContext } from 'react';
import './header.css'
import { AuthContext } from '../../contexts/auth'
import avatar from '../../assets/avatar.png'

import { Link } from 'react-router-dom'

//import { FcHome, FcCollaboration, FcSupport } from "react-icons/fc";

export const Header = () => {

    const { user } = useContext(AuthContext)

   return(
    <div className="sidebar">
        <div>
         <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="foto avatar"/>
        </div>
    
 

    </div>
   ) 
}