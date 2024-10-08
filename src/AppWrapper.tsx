import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import {api} from "./apis";
import useAuthState from "./store/authState";
import Sidebar from "./components/Sidebar";
import {useMutation} from "@tanstack/react-query";
import "./App.scss"
import useSettingState from "./store/settingsState";

const sidebarItems = [
    {id: 1, label: 'Home', icon: 'https://via.placeholder.com/30'},
    {id: 22, label: 'Clips', to: "/clips", icon: 'https://via.placeholder.com/30'},
    {id: 2, label: 'Profile', icon: 'https://via.placeholder.com/30'},
    {id: 3, label: 'Settings', to: "/settings", icon: 'https://via.placeholder.com/30'},
    {id: 4, label: 'About', to: "/about", icon: 'https://via.placeholder.com/30'},
    {id: 'logout', label: 'Logout', icon: 'https://via.placeholder.com/30'}
];


const AppWrapper = () => {
    const {setAuth, auth} = useAuthState()
    const {settings, setSettings} = useSettingState()


    const uploadClip = useMutation({
        mutationFn: (text: string) => api.post("/api/v1/clips", {content: text}),
        mutationKey: ['store-clips"']
    });

    useEffect(() => {
        api.get("/api/v1/auth/verify")
            .then(res => {
                setAuth(res?.data?.user)
                window?.electron?.authenticated(res?.data?.user)
            })
            .catch(err => setAuth(null));
    }, [])

    useEffect(() => {
        const selectedSyncDevices = useSettingState.getState()?.settings?.selectedSyncDevices
        if (auth && selectedSyncDevices) {
            window?.electron?.ipcRenderer?.on('clipboard-text-change', (newText) => {
                let pushEnableForSome = false
                const receiverIds = []
                for (let deviceId in selectedSyncDevices) {
                    const config = selectedSyncDevices[deviceId];
                    if (config.push) {
                        receiverIds.push(deviceId)
                        receiverIds.push(auth?.deviceId)
                        pushEnableForSome = true
                    }
                }

                if (pushEnableForSome) {
                    console.log("send to clip db.")
                    uploadClip.mutate(newText)

                    console.log("send to firestore.")
                    window?.electron?.sendClipToFirestore({
                        content: newText,
                        type: "text",
                        receiverIds,
                        senderId: auth?.deviceId,
                    });
                }
            });

            window.electron?.ipcRenderer?.on('clipboard-image-change', (newImageDataUrl) => {
                // setClipboardImage(newImageDataUrl);
            });
            window.electron?.ipcRenderer?.on('emit::firestore', (data) => {
                console.log("emit::firestore", data)
            });
        }

        return () => {
            window.electron?.ipcRenderer?.removeAllListeners('clipboard-text-change');
            window.electron?.ipcRenderer?.removeAllListeners('clipboard-image-change');
        };
    }, [auth, settings])

    useEffect(() => {
        async function storeSettings() {
            try {
                let settings = localStorage.getItem("settings");
                settings = JSON.parse(settings)
                setSettings(settings)

            } catch (ex) {
                settingData.mutateAsync().then(data => {
                    const settings = data?.data?.settings
                    if (settings) {
                        setSettings(settings)
                        localStorage.setItem("settings", JSON.stringify(settings))
                    }

                }).catch(ex => {
                    console.log("settings fetch fail")
                })
            }
        }

        auth && storeSettings()
    }, [auth])


    return (
        <div className="main-app">
            <Sidebar auth={auth} items={sidebarItems}/>
            <Outlet/>
        </div>
    );
};

export default AppWrapper;
