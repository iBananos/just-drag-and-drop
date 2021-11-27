import { NavLink } from "react-router-dom";
import logo from '../assets/Logo.png';
import close from "../assets/close.png";
import * as utils from "../Utils";
const Navigation = () => {

    function displayToggle(){
        (document.getElementById("barreLaterale")as HTMLElement).style.display = "block";
        (document.getElementById("view") as HTMLElement).style.marginLeft = "200px";
        (document.getElementById("toggle")as HTMLElement).style.display = "none";
        (document.getElementById("close")as HTMLElement).style.display = "block";
    }

    function closeToggle(){
        (document.getElementById("barreLaterale")as HTMLElement).style.display = "none";
        (document.getElementById("toggle")as HTMLElement).style.display = "block";
        (document.getElementById("view") as HTMLElement).style.marginLeft = "0";
        (document.getElementById("close")as HTMLElement).style.display = "none";
    }

    function gestionNav(){
        var width = window.innerWidth;
        console.log(width)
        if(width > 750){
            (document.getElementById("company") as HTMLElement).style.display = "block";
        }else{
            (document.getElementById("close")as HTMLElement).style.display = "none";
            (document.getElementById("toggle")as HTMLElement).style.display = "block";
            (document.getElementById("company") as HTMLElement).style.display = "none";
        }
    }
    window.addEventListener('resize', gestionNav);
    setInterval(checkTokenValidity,5000);

    function checkTokenValidity(){
        let xsrfToken = localStorage.getItem("xsrfToken");
        let accessTokenExpires = localStorage.getItem("accessTokenExpires");
        let refreshTokenExpires = localStorage.getItem("refreshTokenExpires");
        if (xsrfToken && accessTokenExpires && refreshTokenExpires) {
            if (parseInt(accessTokenExpires, 10) < Date.now()+30000 && parseInt(accessTokenExpires, 10) > Date.now() ){
                console.log("demande de refresh")
                utils.default.refreshToken();
            } 
        }
    }

    function deleteToken(){
        localStorage.removeItem("xsrfToken");
        localStorage.removeItem("accessTokenExpires");
        localStorage.removeItem("refreshTokenExpires");
        window.location.href = "/"
    }

    function UserNav() {
        return <ul>
        <li><NavLink onClick={window.location.reload} to="/">Home</NavLink></li>
        <li className="dropdown">
            <div className="dropbtn">Database</div>
            <div className="dropdown-content">
                <NavLink onClick={window.location.reload} to="/upload">Upload</NavLink>
                <NavLink onClick={window.location.reload} to="/mydatabase">My databases</NavLink>
            </div></li>
        <li className="dropdown">
            <div className="dropbtn">Analyze</div>
            <div className="dropdown-content">
                <NavLink onClick={window.location.reload} to="/analyze">New analyze</NavLink>
                <NavLink onClick={window.location.reload} to="/history">History</NavLink>
            </div></li>
        <li><NavLink onClick={deleteToken}  to="/">Disconnect</NavLink></li>
        </ul>
      }
      
    function GuestNav() {
        return <ul>
        <li><NavLink onClick={window.location.reload} to="/">Home</NavLink></li>
        <li><NavLink onClick={window.location.reload} to="/login">Log in</NavLink></li>
        </ul>
    }

    function Nav() {
        if(localStorage.getItem("xsrfToken") && localStorage.getItem("accessTokenExpires") && localStorage.getItem("refreshTokenExpires")){
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