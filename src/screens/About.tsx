import React , { useEffect, useState } from "react";
import { FaGithub, FaTwitter } from "react-icons/fa"; // Importing icons from react-icons

export default function AboutPage() {
    const [systemInfo, setSystemInfo] = useState({
        os: "",
        memory: 0,
        cores: 0,
    });

    useEffect(() => {
        // Fetch system information on component mount
        const fetchSystemInfo = async () => {
            const info = await window?.electron?.getSystemInfo();
            console.log(info, "jhio")
            setSystemInfo(info);
        };

        fetchSystemInfo();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-center">About</h1>
                <div className="flex items-center justify-center my-4">
                    <img
                        src="/placeholder.svg?height=128&width=128"
                        alt="MyDesktopApp Logo"
                        className="h-32 w-32 rounded-full"
                    />
                </div>
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-semibold">RsClipboardSync</h2>
                    <p className="text-gray-400">Version 1.0.0</p>
                </div>
                <p className="text-center mb-6">
                    RsClipboardSync is a powerful tool designed to simplify your workflow and boost productivity.
                </p>
                <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center">
            <span className="mr-2 h-5 w-5">
              <i className="fas fa-info-circle"></i>
            </span>
                        System Information
                    </h3>
                    <ul className="space-y-1 text-sm">
                        <li><span className="font-medium">OS:</span> {systemInfo.os}</li>
                        <li><span className="font-medium">Memory:</span> {systemInfo.memory} GB</li>
                        <li><span className="font-medium">Cores:</span> {systemInfo.cores}</li>
                    </ul>
                </div>
                <div className="flex flex-col items-center mt-4">
                    <div className="flex justify-center space-x-4 mb-4">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 border border-gray-600 rounded hover:bg-gray-700"
                        >
                            <FaGithub className="h-5 w-5" />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 border border-gray-600 rounded hover:bg-gray-700"
                        >
                            <FaTwitter className="h-5 w-5" />
                        </a>
                    </div>
                    <p className="text-sm text-gray-400 text-center">
                        © 2024 RsClipboardSync. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
