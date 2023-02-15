import { useState, useEffect } from 'react'
import { authenticateUser } from '../api/sign-in-requests';
import { useNavigate } from "react-router-dom"

export function SignInPage(){
    const navigate = useNavigate();

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async ()=>{
        const user = await authenticateUser(username, password);
        localStorage.setItem("username", username);
        localStorage.setItem("userid", String(user.userId));
        navigate("/home");
    }

    // useEffect(()=>{
    //     const user = localStorage.getItem('user');
    // },[]);

    function ToRegistration(){
        navigate("/registration")
    }



    return <>
    
    <h1>Sign-In</h1>
    <label>User Name:</label>
    <input type="text" placeholder="johndoe" onChange={e=>setUsername(e.target.value)}/>

    <label>Password:</label>
    <input type="text" placeholder="*******" onChange={e=>setPassword(e.target.value)}/>

    <button onClick={handleSubmit}>Sign In</button>


    <label>New User</label>
    <button onClick={ToRegistration}>Sign Up</button>

    </>
}

