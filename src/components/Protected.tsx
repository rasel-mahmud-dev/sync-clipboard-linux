import React from "react";
import useAuthState from "../store/authState";
import {Navigate} from "react-router-dom";


const Protected = ({ children }) => {
    const { auth, authFetched } = useAuthState();
    if (!authFetched) return <h1>Loading...</h1>;

    if (authFetched && auth) {
        return children;
    }

    return (
        <div>
            <Navigate to="login" />
        </div>
    );
};




export default Protected;
