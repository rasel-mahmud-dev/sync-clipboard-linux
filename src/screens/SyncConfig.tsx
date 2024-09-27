import React, {useState} from 'react';
import {Smartphone, Laptop} from 'lucide-react';

interface Device {
    id: number;
    name: string;
    type: 'mobile' | 'laptop';
    pull: boolean;
    push: boolean;
}

export default function SyncConfig() {
    const [devices, setDevices] = useState<Device[]>([
        {id: 1, name: 'Xiaomi', type: 'mobile', pull: false, push: false},
        {id: 2, name: 'Samsung', type: 'mobile', pull: false, push: false},
        {id: 3, name: 'MacBook M2', type: 'laptop', pull: false, push: false},
        {id: 4, name: 'Lenovo', type: 'laptop', pull: false, push: false},
    ]);

    const toggleSetting = (id: number, setting: 'pull' | 'push') => {
        setDevices(devices.map((device) =>
            device.id === id ? {...device, [setting]: !device[setting]} : device
        ));
    };

    function handleUpdate(){

    }

    return (
        <>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Device
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Pull
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Push
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {devices.map((device) => (
                        <tr key={device.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    {device.type === 'mobile' ? (
                                        <Smartphone className="h-5 w-5 text-gray-400 dark:text-gray-300 mr-2"/>
                                    ) : (
                                        <Laptop className="h-5 w-5 text-gray-400 dark:text-gray-300 mr-2"/>
                                    )}
                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {device.name}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-600 dark:bg-gray-600 transition duration-150 ease-in-out"
                                        checked={device.pull}
                                        onChange={() => toggleSetting(device.id, 'pull')}
                                    />
                                </label>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-600 dark:bg-gray-600 transition duration-150 ease-in-out"
                                        checked={device.push}
                                        onChange={() => toggleSetting(device.id, 'push')}
                                    />
                                </label>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>

            <button onClick={handleUpdate} className="bg-white text-sm dark:bg-gray-800 shadow-md rounded-md px-4 py-1.5 mt-2 overflow-hidden">
                Update
            </button>

        </>

    );
}
