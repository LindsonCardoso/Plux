import { useContext } from "react";

import { AuthContext } from "../../contexts/auth"
export const Dashboard = () => {

    const { signOut } = useContext(AuthContext)


    return(
        <div>
            <h1>Dashboard</h1>
            <button type="button" onClick={() => signOut()}>Fazer Logout</button>
        </div>
    )
};
