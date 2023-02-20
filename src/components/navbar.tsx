import { Link } from "react-router-dom";
import '../styles/home-page-styles.css'

export function NavBar(){

    function ClearLocalStorage() {
        localStorage.clear();
    }

    return <>
        <div className="NavBar">

            <Link id='link' to='/home'><span>Home</span></Link>
            <Link id='link' to='/host'><span>Host</span></Link>
            <Link id='link' to='/' onClick={ClearLocalStorage}><span>Logout</span></Link>

        </div>

    </>

}