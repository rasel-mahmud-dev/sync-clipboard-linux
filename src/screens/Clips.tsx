import React from "react";
import {useQuery} from "@tanstack/react-query";
import {api} from "../apis";

const Clips = () => {

    const { data, error, isLoading } = useQuery({
        queryFn: ()=> api.get("/api/v1/clips"),
        queryKey: ['clips']
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Clip Items</h1>
            <ul className="list-disc pl-5">
                {data?.map((clip) => (
                    <li key={clip.id} className="mb-2">
                        <h2 className="font-semibold">{clip.title}</h2>
                        <p>{clip.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Clips;
