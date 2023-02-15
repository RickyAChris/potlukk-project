import { useEffect, useReducer, useState } from "react";
import { getAllUsers, User } from "../api/sign-in-requests";
import { NavBar } from "../components/navbar";
import { HostPageReducer, PotlukkDataState, SetUsersAction } from "../components/host-page-reducer";
import { createPotlukk, PotlukkCreation } from "../api/potlukk-requests";
import { useNavigate } from "react-router-dom";

const initialState: PotlukkDataState = {
    hostId: 10,
    title: '',
    time: 0,
    location: '',
    description: '',
    isPublic: false,
    users:[],
    selectedUsers:[]
}

export function HostPage(){
    const [potlukkState, dispatch] = useReducer(HostPageReducer, initialState);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
          const retrievedUsers = await getAllUsers();
          const formattedUsers = retrievedUsers.map((user) => ({
            ...user,
            selected: false,
          }));
          dispatch({ type: 'SET_USERS', payload: formattedUsers });
        })();
      }, []);
    
    const handleCreate = async () => {
        const userIdString: string = localStorage.getItem('userId') ?? '';
        const hostId = isNaN(parseInt(userIdString)) ? 10 : parseInt(userIdString);
        const potlukkCreation: PotlukkCreation ={
            hostId: hostId,
            details: {
                description: potlukkState.description,
                isPublic: potlukkState.isPublic,
                location: potlukkState.location,
                time: potlukkState.time,
                title: potlukkState.title,
                tags:[],
                status: 'SCHEDULED'
            }
        };
        // invitations: {
        //     lukkers: potlukkState.selectedUsers
        // }
        console.log("Creating potlukk with data: ", potlukkCreation);
        createPotlukk(potlukkCreation);
        alert("Potlukk Successfully Created!");
        navigate("/potlukkinfohost/:potlukkID");
    }

    return <>

        <NavBar/>

        <label htmlFor="setTitle">Title</label>
        <input type='text' id='setTitle' required
        onChange={e => dispatch({type:'SET_TITLE', payload:e.target.value})}></input>

        <label htmlFor="setTime">Time </label>
        <input type="datetime-local" id="setTime" required
        onChange={e => dispatch({type:'SET_DATE_TIME', payload:parseInt(e.target.value)})}/>

        <input type="text" id="setLocation" placeholder="Location" required
        onChange={e => dispatch({type:'SET_LOCATION', payload:e.target.value})}/>

        <input type="text" id="setDescription" placeholder="Description" required
        onChange={e => dispatch({type:'SET_DESCRIPTION', payload:e.target.value})}/>

        <label htmlFor="setPublic">Make Public</label>
        <input type="checkbox" id="setPublic"
        onChange={e => dispatch({type:'SET_PUBLIC', payload:Boolean(e.target.checked)})}/>

        <fieldset>
            <legend>Invite Lukkers</legend>
            <table>
                <tbody>
                    {potlukkState.users.map((user) => (
                    <tr key={user.userId}><td>{user.username} {user.fname} {user.lname}</td>
                    <td>
                        {user.selected ? (
                            <button disabled>Invited</button>
                        ) : (
                    <button onClick={() => dispatch({type:'INVITE_USER', payload:user.userId})}>Invite</button>)}</td></tr>))}

                </tbody>
            </table>
        </fieldset>

        <fieldset>
            <legend>Invited Lukkers</legend>
            <table>
                <tbody>
                {potlukkState.selectedUsers.map((user) => (
                <tr key={user.userId}><td>{user.username} {user.fname} {user.lname}</td>
                <button onClick={() => dispatch({type:'REMOVE_USER', payload: user.userId})}>Remove</button></tr>
                ))}
                </tbody>
            </table>

        </fieldset>

        <button onClick={handleCreate}>Create Potlukk</button>
    </>
}