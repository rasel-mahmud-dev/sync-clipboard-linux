import React from 'react'
import './style.css'
import ActionBar from "./ActionBar";
import LoginForm from "./components/Login";

// Your Counter component
const Counter = () => {
    const [count, setCount] = React.useState(0)

    return (
        <>
            {/*<ActionBar/>*/}

            <div className=" ">

               <LoginForm />


            </div>

        </>

    )
}


export default Counter
