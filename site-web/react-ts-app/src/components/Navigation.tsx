import { NavLink } from "react-router-dom";
import logo from './Logo.png';
const Navigation = () => {

    function deleteToken(){
        localStorage.removeItem("Token");
        window.location.href = "/"
    }

    function UserNav() {
        return <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/upload">Upload</NavLink></li>
        <li><NavLink to="/history">History</NavLink></li>
        <li><NavLink to="/analyze">Analyze</NavLink></li>
        <li><NavLink to="/"><span onClick={deleteToken}>Disconnect</span></NavLink></li>
        </ul>;
      }
      
    function GuestNav() {
        return <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/upload">Upload</NavLink></li>
        <li><NavLink to="/history">History</NavLink></li>
        <li><NavLink to="/analyze">Analyze</NavLink></li>
        <li><NavLink to="/login">Log in</NavLink></li>
        </ul>
    }

    function Nav() {
        if(localStorage.getItem("Token")){
          return <UserNav />;
        }
        return <GuestNav />;
    }

    return (
        <div className="navigation">
            <img className="logo" src={logo} alt="JustDragAndDrop"/>
            <h1 className="company">Just Drag & Drop</h1>
            <Nav />
        </div>
        
    );
};

export default Navigation;