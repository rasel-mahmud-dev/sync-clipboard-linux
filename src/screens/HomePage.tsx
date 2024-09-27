import React from 'react';
import {AiOutlineUser} from "react-icons/ai";
import useAuthState from "../store/authState";
import {useNavigate} from "react-router-dom";

// Sample sidebar data
const sidebarItems = [
    { id: 1, label: 'Home', icon: 'https://via.placeholder.com/30' },
    { id: 22, label: 'Clips', to: "/clips", icon: 'https://via.placeholder.com/30' },
    { id: 2, label: 'Profile', icon: 'https://via.placeholder.com/30' },
    { id: 3, label: 'Settings', icon: 'https://via.placeholder.com/30' },
    { id: 4, label: 'About', to: "/about", icon: 'https://via.placeholder.com/30' },
    { id: 4, label: 'Logout', icon: 'https://via.placeholder.com/30' }
];

const Sidebar = ({ items, auth }) => {
    const navigate = useNavigate()

    function jump(to?: string){
        navigate(to)
    }
    return (
        <div className="w-[200px]  p-4 bg-gray-900 h-screen">

            <div className="flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-700">
                    <AiOutlineUser/>
                </div>
            </div>
            <h2 className="text-center text-base text-gray-50 font-semibold mb-4">{auth?.username}</h2>
            <ul className="list-none p-0">
                {items.map(item => (
                    <li key={item.id} onClick={()=>item.to ? jump(item.to) : null} className="flex items-center my-2">
                        <img src={item.icon} alt={item.label} className="w-8 h-8 mr-2" />
                        <span className="text-lg">{item.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const HomePage = () => {
    const {auth} = useAuthState()
    return (
        <div className="flex">
            <Sidebar auth={auth} items={sidebarItems}/>
            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold">Welcome</h1>
            </div>
        </div>
    );
};

export default HomePage;
