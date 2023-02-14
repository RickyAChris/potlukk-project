import { useState } from "react"

export type User = {
    userId: number,
    username: string,
    password: string,
    fname: string,
    lname: string,
    allergies: string[]
}

export  async function getAllUsers(): Promise<User[]>{
    const httpResponse = await fetch("http://127.0.0.1:8000/lukkers");
    const users: User[] = await httpResponse.json();
    return users;
}

export type UserCreation = {
    username: string,
    password: string,
    fname: string,
    lname: string,
    allergies: string[]
}

export type SignIn = {
    username:string,
    password:string
}

export async function createUser(user: UserCreation): Promise<User>{
    const httpResponse = await fetch("http://127.0.0.1:8000/lukkers", {
        method:"POST",
        body: JSON.stringify(user),
        headers:{
            "Content-Type": "application/json"
        }
    });

    const lukker:User = await httpResponse.json();
    return lukker;
}

export async function authenticateUser (username:string, password:string):Promise<User>{
    const httpResponse = await fetch("http://localhost:8000/verify",{
    method:"POST",
    body: JSON.stringify({username, password}),
    headers:{
        "Content-Type": "application/json"
    }
    });
    const data = await httpResponse.json();
  if (httpResponse.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
    
}