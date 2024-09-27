import React from "react";
import {useQuery} from "@tanstack/react-query";
import {api} from "../apis";
import useAuthState from "../store/authState";

const Clips = () => {

    const {auth} = useAuthState()

    const {data: deviceRes} = useQuery({
        queryFn: () => api.get("/api/v1/auth/devices"),
        queryKey: ['devices'],
    });
    const devices = deviceRes?.data?.devices


    const {data, error, isLoading} = useQuery({
        queryFn: () => api.get("/api/v1/clips"),
        queryKey: ['clips']
    });

    const clips = data?.data?.clips

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    function getSender(senderDeviceId: string) {
        const sender = devices?.find(device => device._id === senderDeviceId)
        return sender?.device || "Unnone"
    }

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold mb-4">Clip Items</h1>
            <ul className="list-disc pl-5 clip-list">
                {clips?.map((clip) => (
                    <li key={clip._id} className="py-2">
                        <pre>
                            <p className="whitespace-pre">{clip.content}</p>
                        </pre>
                        <span className="text-xs mt-5">Send by {getSender(clip?.senderDeviceId)} At {clip.createdAt}</span>
                        <div className="space-x-2 mt-1">
                            {devices?.map(device => auth?.deviceId !== device?._id && (
                                <span
                                    className="w-4 text-[10px] rounded h-4 p-1 border border-gray-700">{device.device}</span>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Clips;
