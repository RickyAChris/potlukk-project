import React, { useState } from "react"
import { User, createUser, getAllUsers } from "../api/sign-in-requests"



type UserForm = {
    username: string,
    password: string,
    fname: string,
    lname: string,
    allergies: string[]

}

type UserCreatorProps = {
    setUser: React.Dispatch<React.SetStateAction<User[]>>
}

export function RegistrationPage(props:UserCreatorProps){
    const [form,setForm] = useState<UserForm>({username:"", password:"", fname:"",lname:"",allergies:[]})

    async function submitData(){
        const lukker = await createUser({
            username: form.username,
            password:form.password,
            fname:form.fname,
            lname:form.lname,
            allergies: form.allergies
        })
        const users = await getAllUsers();
        props.setUser(users);
    }


    function checkBox(event:React.FormEvent){
        console.log(event.target);
        
    }


    return <>
        <h1>Registration Page</h1>

    <label>Create Username</label>
    <input type="text" placeholder="johndoe123" onChange={e=>setForm({...form, username:e.target.value})}></input>

    <label>Create Password</label>
    <input type="text" placeholder="*******" onChange={e=>setForm({...form, password:e.target.value})}></input>

    <label>Confirm Password</label>
    <input type="text" placeholder="*******" onChange={e=>setForm({...form, password:e.target.value})}></input>

    <label>First Name</label>
    <input type="text" placeholder="John" onChange={e=>setForm({...form, fname:e.target.value})}></input>

    <label>Last Name</label>
    <input type="text" placeholder="Doe" onChange={e=>setForm({...form, lname:e.target.value})}></input>

    <h3>Allergens</h3>
    
    <input type="checkbox" id="MILK" onChange={checkBox}/><label htmlFor="MILK">Milk</label>
    <input type="checkbox" id="EGG" onChange={checkBox}/><label htmlFor="EGG">Egg</label>
    <input type="checkbox" id="SOY" onChange={checkBox}/><label htmlFor="SOY">Soy</label>
    <input type="checkbox" id="TREENUTS" onChange={checkBox}/><label htmlFor="TREENUTS">Tree Nuts</label>

    <button onClick={submitData}>Submit</button>

    </>
}



    
    // function updateAllergy(e:any){
    //     const newValue = e.target.value;
    //     if (newValue){
    //         const updatedForm = {...form};
    //         const updatedAllergies = [...updatedForm.allergies];
    //         const formattedAllergy = e.target.id.toUpperCase();
    //         updatedAllergies.push(formattedAllergy);
    //         updatedForm.allergies = updatedAllergies
    //         setForm(updatedForm);
    //     }
    // }
    // onChange={e=>updateAllergy(e)}
