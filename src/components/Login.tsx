import React, { useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import { api } from "../apis";
import useAuthState from "../store/authState";
import {useNavigate} from "react-router-dom";

const Login: React.FC = () => {
    const [userInput, setUserInput] = useState<{ email: string, password: string, device: string }>({
        email: "rasel.mahmud.dev@gmail.com",
        password: "123",
        device: "windows"
    });

    const {setAuth}  = useAuthState()
    const navigate = useNavigate()
    const [error, setError] = useState<string>("");

    const mutation = useMutation<any, any, { email: string, password: string }>({
        mutationFn: (payload) => api.post("/api/v1/auth/login", payload),
        onSuccess: (data) => {
            const {user, session} = data?.data?.data || {}
            setAuth({
                ...user,
                sessionId: session.id,
                device: session.device,
                token: session.token,
            })
            localStorage.setItem("token", session.token)
            navigate("/")
        },
        onError: (err) => {
            setError('Login failed. Please check your credentials.');
        }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInput((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!userInput.email || !userInput.password) {
            setError('Please fill in all fields.');
            return;
        }

        setError('');
        mutation.mutate(userInput);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                {error && <p className="mb-4 text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={userInput.email}
                            onChange={handleInputChange}
                            required
                            className="mt-1 p-2 text-gray-950 block bg-transparent w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={userInput.password}
                            onChange={handleInputChange}
                            required
                            className="mt-1 p-2 text-gray-950 bg-transparent block w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
