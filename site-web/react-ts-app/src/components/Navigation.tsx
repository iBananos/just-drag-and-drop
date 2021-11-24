import { NavLink } from "react-router-dom";
import logo from '../assets/Logo.png';
import close from "../assets/close.png";
const Navigation = () => {

    function displayToggle(){
        (document.getElementById("barreLaterale")as HTMLElement).style.display = "block";
        (document.getElementById("toggle")as HTMLElement).style.display = "none";
        (document.getElementById("close")as HTMLElement).style.display = "block";
    }

    function closeToggle(){
        (document.getElementById("barreLaterale")as HTMLElement).style.display = "none";
        (document.getElementById("toggle")as HTMLElement).style.display = "block";
        (document.getElementById("close")as HTMLElement).style.display = "none";
    }

    function gestionNav(){
        var width = window.innerWidth;
        console.log(width)
        if(width > 750){
            (document.getElementById("company") as HTMLElement).style.display = "block";
        }else{
            (document.getElementById("company") as HTMLElement).style.display = "none";
        }
    }
    window.addEventListener('resize', gestionNav);

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
            <div id="close" onClick={closeToggle}><img className="close" src={close} alt="" /></div>
            <div onClick={displayToggle}>
            <li id="toggle" className="toggle" >
                <span className="toggle-menu-bar"></span>
                <span className="toggle-menu-bar"></span>
                <span className="toggle-menu-bar"></span>
            </li>
            </div>
            <img className="logo" src={logo} alt="JustDragAndDrop"/>
            <h1 className="company" id="company">Just Drag & Drop</h1>
            <Nav />
        </div>
        
    );
};

export default Navigation;