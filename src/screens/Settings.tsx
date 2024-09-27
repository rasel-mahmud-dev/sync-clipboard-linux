import React from 'react';
import SyncConfig from "./SyncConfig";

const Settings = () => {
    return (
        <div className="w-full">
            <div className=" w-full px-4  pt-4">
                <h1 className="text-xl font-bold  text-gray-800 dark:text-gray-100">
                    My Devices
                </h1>
            </div>
            <div className="p-4">
                <SyncConfig/>
            </div>
        </div>
    );
};

export default Settings;