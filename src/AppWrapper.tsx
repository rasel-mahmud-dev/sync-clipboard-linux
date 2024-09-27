import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import {api} from "./apis";
import useAuthState from "./store/authState";

const AppWrapper = () => {
    const {setAuth} = useAuthState()

    useEffect(() => {
        api.get("/api/v1/auth/verify")
            .then(res => {
                setAuth(res?.data?.user)
            })
            .catch(err => setAuth(null));
    }, [])


    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default AppWrapper;
