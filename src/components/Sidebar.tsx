
// Sample sidebar data
import {useNavigate} from "react-router-dom";
import {AiOutlineUser} from "react-icons/ai";
import React from "react";
import useAuthState from "../store/authState";


const Sidebar = ({ items, auth }) => {
    const navigate = useNavigate()
    const {setAuth } = useAuthState()

    function jump(item?: any){
        if(item?.to) navigate(item?.to)

        if(item.id == "logout"){
            setAuth(null)
            localStorage.removeItem("token")
        }
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
                    <li key={item.id} onClick={()=>jump(item)} className="flex items-center my-2">
                        <img src={item.icon} alt={item.label} className="w-8 h-8 mr-2" />
                        <span className="text-lg">{item.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default Sidebar