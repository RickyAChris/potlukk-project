import { Link } from "react-router-dom";


export function NavBar(){


    return <>
        <div className="NavBar">

            <Link to='/home'>Home</Link>
            <Link to='/host'>Host</Link>
            <Link to='/'>Logout</Link>

        </div>

    </>

}