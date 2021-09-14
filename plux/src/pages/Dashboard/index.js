import { useContext } from "react";

import { AuthContext } from "../../contexts/auth"

import { Header } from '../../components/Header'


export const Dashboard = () => {

    const { signOut } = useContext(AuthContext)


    return(
        <div>
            <Header />

            <h1>Dashboard</h1>
            
            <button type="button" onClick={() => signOut()}>Fazer Logout</button>
        </div>
    )
};
