import { NavLink } from "react-router-dom";
import logo from '../assets/Logo.png';
const Navigation = () => {

    function deleteToken(){
        localStorage.removeItem("Token");
        window.location.href = "/"
    }

    function UserNav() {
        return <ul>
        <li><NavLink onClick={window.location.reload} to="/">Home</NavLink></li>
        <li><NavLink onClick={window.location.reload} to="/upload">Upload</NavLink></li>
        <li><NavLink onClick={window.location.reload} to="/history">History</NavLink></li>
        <li><NavLink onClick={window.location.reload} to="/analyze">Analyze</NavLink></li>
        <li><NavLink onClick={window.location.reload} to="/"><span onClick={deleteToken}>Disconnect</span></NavLink></li>
        </ul>
      }
      
    function GuestNav() {
        return <ul>
        <li><NavLink onClick={window.location.reload} to="/">Home</NavLink></li>
        <li><NavLink onClick={window.location.reload} to="/upload">Upload</NavLink></li>
        <li><NavLink onClick={window.location.reload} to="/history">History</NavLink></li>
        <li><NavLink onClick={window.location.reload} to="/analyze">Analyze</NavLink></li>
        <li><NavLink onClick={window.location.reload} to="/login">Log in</NavLink></li>
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