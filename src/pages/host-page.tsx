import { useEffect, useReducer, useState } from "react";
import { getAllUsers, User } from "../api/sign-in-requests";
import { NavBar } from "../components/navbar";
import { HostPageReducer, PotlukkDataState, SetUsersAction } from "../components/host-page-reducer";

const initialState: PotlukkDataState = {
    time: "",
    date: "",
    location: "",
    description: "",
    isPublic: false,
    users: [],
    selectedUsers: []
}

export function HostPage(){
    const [potlukkState, dispatch] = useReducer(HostPageReducer, initialState);


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

      const invitedLukkers = potlukkState.selectedUsers.map

    return <>

        <NavBar/>

        <label htmlFor="setTime">Time </label>
        <input type="time" id="setTime" required
        onChange={e => dispatch({type:'SET_TIME', payload:e.target.value})}/>

        <label htmlFor="setDate">Date </label>
        <input type="date" id="setDate" required
        onChange={e => dispatch({type:'SET_DATE', payload:e.target.value})}/>

        <input type="text" id="setLocation" placeholder="Location"
        onChange={e => dispatch({type:'SET_LOCATION', payload:e.target.value})}/>

        <input type="text" id="setDescription" placeholder="Description"
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
    </>
}