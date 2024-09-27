import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import {api} from "./apis";
import useAuthState from "./store/authState";
import Sidebar from "./components/Sidebar";

const sidebarItems = [
    { id: 1, label: 'Home', icon: 'https://via.placeholder.com/30' },
    { id: 22, label: 'Clips', to: "/clips", icon: 'https://via.placeholder.com/30' },
    { id: 2, label: 'Profile', icon: 'https://via.placeholder.com/30' },
    { id: 3, label: 'Settings', to: "/settings", icon: 'https://via.placeholder.com/30' },
    { id: 4, label: 'About', to: "/about", icon: 'https://via.placeholder.com/30' },
    { id: 'logout', label: 'Logout', icon: 'https://via.placeholder.com/30' }
];


const AppWrapper = () => {
    const {setAuth, auth} = useAuthState()

    useEffect(() => {
        api.get("/api/v1/auth/verify")
            .then(res => {
                setAuth(res?.data?.user)
            })
            .catch(err => setAuth(null));

        window.electron.ipcRenderer.on('clipboard-text-change', (newText) => {
            console.log(newText, "hisdfsf");
        });

        window.electron.ipcRenderer.on('clipboard-image-change', (newImageDataUrl) => {
            // setClipboardImage(newImageDataUrl);
        });

        return () => {
            window.electron.ipcRenderer.removeAllListeners('clipboard-text-change');
            window.electron.ipcRenderer.removeAllListeners('clipboard-image-change');
        };

    }, [])


    return (

        <div className="flex">
            <Sidebar auth={auth} items={sidebarItems}/>
            <Outlet/>
        </div>
    );
};

export default AppWrapper;
