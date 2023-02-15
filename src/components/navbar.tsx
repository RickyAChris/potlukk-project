import { Link } from "react-router-dom";


export function NavBar(){

    function ClearLocalStorage() {
        localStorage.clear();
    }

    return <>
        <div className="NavBar">

            <Link to='/home'>Home</Link>
            <Link to='/host'>Host</Link>
            <Link to='/' onClick={ClearLocalStorage}>Logout</Link>

        </div>

    </>

}