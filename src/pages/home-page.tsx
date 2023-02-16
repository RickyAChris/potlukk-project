import { getPotlukks } from "../api/home-requests";
import { NavBar } from "../components/navbar";
import { useQuery } from "react-query"

export function HomePage(){

// User Features

// Three main lists are available for view
// Hosted Potlukks
// Shows potlukks the lukker is hosting
// Clicking on one forwards the user to a potlukk details page for the potlukk

const {isLoading, data =[]} = useQuery("usercache", () => getPotlukks(Number(localStorage.getItem("userId"))));
if(isLoading){
    return<h1>LOADING</h1>
}



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


    return <>
        <h1>Home Page</h1>
        <NavBar/>

       <table>
        <thead>
        <tr><th>Invited Potlukks</th></tr>
        </thead>
        <tbody>
        <tr><td>test</td></tr>
        <tr><td>test</td></tr>
        <tr><td>test</td></tr>
       </tbody>
       </table>
            
       <table>
        <thead>
        <tr><th>Attending Potlukks</th></tr>
        </thead>
        <tbody>
        <tr>{data.map(p=> <td>{p.host.userId} {p.details.title}</td>)}</tr>
        <tr><td>test</td></tr>
        <tr><td>test</td></tr>
       </tbody>
       </table>

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
            
    

        
       
    </>
}