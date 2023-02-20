import { getPotlukks } from "../api/home-requests";
import { NavBar } from "../components/navbar";
import { useQuery } from "react-query"
import '../styles/home-page-styles.css'
// import { useEffect, useState } from "react";

// User Features

// Three main lists are available for view
// Hosted Potlukks
// Shows potlukks the lukker is hosting
// Clicking on one forwards the user to a potlukk details page for the potlukk

// Invited Potlukks          
// Shows potlukks the lukker was invited too
// Clicking on one forwards the user to a potlukk details page for the potlukk

// Notifications
// Shows all notifications that are related to the person
// Events created by them
// Events that affect a potlukk they host or attend

// Technical Details
// Navbar uses react router
// clicking logout clears local storage and redirects to signin


export function HomePage(){


const {isLoading:isLoading, data:data =[]} = useQuery("usercache", () => getPotlukks(Number(localStorage.getItem("userid"))));
if(isLoading){
    return<h1>LOADING</h1>
}   

    return <>
    <NavBar/>
    <div className="container">
        <div className="Invited">
            <table>
                <thead>
                <tr><th>Invited Potlukks</th></tr>
                </thead>
                <tbody>
                {data.map(p => (<tr>{(<td>{p.details.title}</td>)}
                <td>{p.invitations.map(i => (i.potlukker.userId))}</td> </tr>))}
            </tbody>
        </table>
        </div>

        <div className="Attending">
            <table>
                <thead>
                <tr><th>Invited Potlukks</th></tr>
                </thead>
                <tbody>
                {data.map(p => (<tr>{(<td>{p.details.title}</td>)}
                <td>{p.invitations.map(i => (i.potlukker.userId))}</td> </tr>))}
                </tbody>
            </table>
        </div>

        <div className="Notifications">
            <table>
                <thead>
                <tr><th>Notifications</th></tr>
                </thead>
                <tbody>
                <tr><td>test</td></tr>
                <tr><td>test</td></tr>
                <tr><td>test</td></tr>
                </tbody>
            </table>   
        </div>
    </div>
    
    </>
}