import React from "react";
import AppWrapper from "./AppWrapper";
import Login from "./components/Login";
import {createBrowserRouter} from "react-router-dom";
import HomePage from "./screens/HomePage";
import Protected from "./components/Protected";
import Clips from "./screens/Clips";
import AboutPage from "./screens/About";
import Settings from "./screens/Settings";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <AppWrapper/>,
        children: [
            {path: "", element: <Protected> <HomePage/></Protected>},
            {path: "login", element: <Login/>},
            {path: "clips", element: <Protected> <Clips/></Protected>},
            {path: "settings", element: <Protected><Settings/></Protected>},
            {path: "about", element: <AboutPage/>},
            // {path: "register", element: <RegisterPage />},
        ]
    }
])

export default routes
