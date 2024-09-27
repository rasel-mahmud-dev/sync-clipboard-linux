import React from 'react';
import useAuthState from "../store/authState";

const HomePage = () => {
    const {auth} = useAuthState()
    return (

            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold">Welcome</h1>
            </div>

    );
};

export default HomePage;
