import React, { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { User, createUser, getAllUsers, UserCreation } from "../api/sign-in-requests"
import { useNavigate } from "react-router-dom"


type UserForm = {
    username: string,
    password: string,
    confirmPassword: string,
    fname: string,
    lname: string,
    allergies: string[]
}


export function RegistrationPage(){
    const navigate = useNavigate();
    const [form,setForm] = useState<UserForm>({
        username:"",
         password:"", 
         confirmPassword:"",
         fname:"",
         lname:"",
         allergies:[]})

    const queryClient = useQueryClient();

    const createUserMutation = useMutation(createUser, {
        onSuccess: () => queryClient.invalidateQueries("usercache")
    });

    function isFormValid(){
        if(!form.username || !form.password || !form.confirmPassword || !form.fname || !form.lname) {
            alert("Please fill in all the fields");
            return;
        }

        if(form.password.length < 10 || !/[!@#$%^&*(),.?":{}|<>]/.test(form.password)){
            alert("Password must: Be atleast 10 characters long and Contain 1 special character");
            return;
        }
        if(form.password !== form.confirmPassword){
            alert("Passwords must match");
            return;
        }
        return true;
    }



    function addUser(){
        if(!isFormValid()){
            return;
        }
        const newUser: UserCreation ={
            username: form.username,
            password: form.password,
            fname: form.fname,
            lname: form.lname,
            allergies: form.allergies
        }
        createUser(newUser);
        alert("Account Successfully Created!");
        navigate("/");
    }


    function checkBoxHandler(event:React.FormEvent<HTMLInputElement>){
        const checked = event.currentTarget.checked;
        const id = event.currentTarget.id;

        setForm(prevForm =>{
            let newAllergies = [...prevForm.allergies];
            if(checked){
                newAllergies.push(id);
            } else {
                newAllergies = newAllergies.filter(allergy => allergy !== id);
            }
            return{
                ...prevForm,
                allergies: newAllergies
            };
        }); 
    }


    return <>
        <h1>Registration Page</h1>

    <label>Create Username</label>
    <input type="text" placeholder="janedoe123" onChange={e=>setForm({...form, username:e.target.value})}></input>

    <label>Create Password</label>
    <input type="text" placeholder="abc1234567!" onChange={e=>setForm({...form, password:e.target.value})}></input>

    <label>Confirm Password</label>
    <input type="text" placeholder="retype" onChange={e=>setForm({...form, confirmPassword:e.target.value})}></input>

    <label>First Name</label>
    <input type="text" placeholder="Jane" onChange={e=>setForm({...form, fname:e.target.value})}></input>

    <label>Last Name</label>
    <input type="text" placeholder="Doe" onChange={e=>setForm({...form, lname:e.target.value})}></input>

    <h3>Allergens</h3>
    
    <input type="checkbox" id="MILK" onChange={checkBoxHandler}/><label htmlFor="MILK">Milk</label>
    <input type="checkbox" id="EGG" onChange={checkBoxHandler}/><label htmlFor="EGG">Egg</label>
    <input type="checkbox" id="SOY" onChange={checkBoxHandler}/><label htmlFor="SOY">Soy</label>
    <input type="checkbox" id="TREENUTS" onChange={checkBoxHandler}/><label htmlFor="TREENUTS">Tree Nuts</label>

    <button onClick={addUser}>Submit</button>

    </>
}



    

function useEffect(arg0: () => void, arg1: never[]) {
    throw new Error("Function not implemented.")
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
