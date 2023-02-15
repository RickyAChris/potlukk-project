import { useState, useEffect } from 'react';
import { authenticateUser } from '../api/sign-in-requests';
import { useNavigate } from "react-router-dom";
import '../styles.css';

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
    
    <div className="container1">
        <div className="label">
            <h1>Sign-In</h1>
        </div> 
        <div className="signin"> 
            <div>
                <label>User Name:</label>
                <input type="text" placeholder="johndoe" onChange={e=>setUsername(e.target.value)}/>
            </div>

            <div>
                <label>Password:</label>
                <input type="text" placeholder="*******" onChange={e=>setPassword(e.target.value)}/>
            </div>

            <div>
                <button onClick={handleSubmit}>Sign In</button>
            </div>

        </div>
        <div className="signup">
            <div>
                <label>New User</label>
            </div>

            <div>
                <button onClick={ToRegistration}>Sign Up</button>
            </div>
            
        </div>
    </div>

    </>
}

