import { NavLink } from "react-router-dom";
import logo from '../assets/Logo.png';
import light from '../assets/light.png';
import dark from '../assets/dark.png';
import close from "../assets/close.png";
import closeL from "../assets/closeLight.png";
import * as utils from "../Utils";
const Navigation = () => {
    function displayToggle(){
        (document.getElementById("barreLaterale")as HTMLElement).className = "openBar";
        //(document.getElementById("view") as HTMLElement).style.marginLeft = "200px";
        (document.getElementById("toggle")as HTMLElement).style.display = "none";
        (document.getElementById("close")as HTMLElement).style.display = "block";
    }

    function closeToggle(){
        (document.getElementById("barreLaterale")as HTMLElement).className = "closeBar";
        (document.getElementById("toggle")as HTMLElement).style.display = "block";
        //(document.getElementById("view") as HTMLElement).style.marginLeft = "0";
        (document.getElementById("close")as HTMLElement).style.display = "none";
    }

    function gestionNav(){
        let width = window.innerWidth;
        if(width > 450){
            (document.getElementById("company") as HTMLElement).style.display = "block";
        }else{
            (document.getElementById("company") as HTMLElement).style.display = "none";
        }
    }
    window.addEventListener('resize', gestionNav);
    let aenvoyer = false;
    let timesent = Date.now();
    setTheme();
    setInterval(checkTokenValidity,5000);

    function checkTokenValidity() {
        if(!aenvoyer){
            aenvoyer = true;
            timesent = Date.now();
            let xsrfToken = localStorage.getItem("xsrfToken");
            let accessTokenExpires = localStorage.getItem("accessTokenExpires");
            let refreshTokenExpires = localStorage.getItem("refreshTokenExpires");
            if (xsrfToken && accessTokenExpires && refreshTokenExpires) {
                if (parseInt(accessTokenExpires, 10) > Date.now()) {
                    if (parseInt(accessTokenExpires, 10) < Date.now()+30000) {
                        utils.default.refreshToken();
                        
                    }
                } 
                else if (parseInt(refreshTokenExpires, 10) < Date.now()+30000) {
                    utils.default.refreshToken();
                }
                else {
                    deleteToken()
                }
                
            }
            
        }if(Date.now() > timesent + 2000){
            aenvoyer = false;
            timesent = Date.now();
        }
    }

    function deleteToken(){
        localStorage.removeItem("xsrfToken");
        localStorage.removeItem("accessTokenExpires");
        localStorage.removeItem("refreshTokenExpires");
        
        window.location.href = "/?status=disconnected"
    }

    function UserNav() {
        let source;
        if(!localStorage.getItem("theme") || localStorage.getItem("theme")==='dark'){source = dark}else{source = light}
        return <ul>
            <img src={source} className="theme" id="theme" alt="" onClick={switchTheme} />
        <li><NavLink onClick={window.location.reload} to="/">Home</NavLink></li>
        <li><NavLink onClick={window.location.reload} to="/demo">Demo</NavLink></li>
        <li className="dropdown">
            <div className="dropbtn">Database</div>
            <div className="dropdown-content">
                <NavLink onClick={window.location.reload} to="/upload">Upload</NavLink>
                <NavLink onClick={window.location.reload} to="/mydatabase">My databases</NavLink>
            </div></li>
        <li className="dropdown">
            <div className="dropbtn">Analyze</div>
            <div className="dropdown-content">
                <span className="TEST"><NavLink onClick={window.location.reload} to="/analyze">New analyze</NavLink></span>
                <NavLink onClick={window.location.reload} to="/dataVisu">Data visualisation</NavLink>
                <NavLink onClick={window.location.reload} to="/history">History</NavLink>
            </div></li>
        <li><NavLink onClick={deleteToken}  to="/">Disconnect</NavLink></li>
        </ul>
      }
      
    function GuestNav() {
        let source;
        if(!localStorage.getItem("theme") || localStorage.getItem("theme")==='dark'){source = dark}else{source = light}
        return <ul>
            <img src={source} className="theme" id="theme" alt="" onClick={switchTheme} />
        <li><NavLink onClick={window.location.reload} to="/">Home</NavLink></li>
        <li><NavLink onClick={window.location.reload} to="/demo">Demo</NavLink></li>
        <li><NavLink onClick={window.location.reload} to="/login">Log in</NavLink></li>
        <li><NavLink onClick={window.location.reload} to="/signup">Sign up</NavLink></li>
        </ul>
    }
    function switchTheme(){
        if(!localStorage.getItem("theme") || localStorage.getItem("theme")==='light'){
            localStorage.setItem("theme","dark");
            (document.documentElement as HTMLElement).style.setProperty("--color_back","rgba(30, 30, 30, 0.705)");
            (document.documentElement as HTMLElement).style.setProperty("--color_trans","#8670700c");
            (document.documentElement as HTMLElement).style.setProperty("--color_nav","#181925");
            (document.documentElement as HTMLElement).style.setProperty("--color_history","rgba(24, 24, 24, 0.856)");
            (document.documentElement as HTMLElement).style.setProperty("--color_button","#171824");
            (document.documentElement as HTMLElement).style.setProperty("--color_button_hover","#bba422");
            (document.documentElement as HTMLElement).style.setProperty("--color_text","#bba422");
            (document.documentElement as HTMLElement).style.setProperty("--color_placeholder","rgb(107, 101, 72)");
            (document.documentElement as HTMLElement).style.setProperty("--color_shadow","black");
            //(document.body as HTMLElement).style.background = "url('../assets/background2.png')";
            (document.body as HTMLElement).style.backgroundColor = "black";
            let imageTheme = (document.getElementById("theme") as HTMLImageElement)
            if(imageTheme!==null) imageTheme.src = dark;            

        }else{
            localStorage.setItem("theme","light");
            (document.documentElement as HTMLElement).style.setProperty("--color_back","#fafbff");
            (document.documentElement as HTMLElement).style.setProperty("--color_trans","transparent");
            (document.documentElement as HTMLElement).style.setProperty("--color_nav","#fafbff");
            (document.documentElement as HTMLElement).style.setProperty("--color_history","#f2f2f2");
            (document.documentElement as HTMLElement).style.setProperty("--color_button","#fafbff");
            (document.documentElement as HTMLElement).style.setProperty("--color_button_hover","#5961ff");
            (document.documentElement as HTMLElement).style.setProperty("--color_text","#5961ff");
            (document.documentElement as HTMLElement).style.setProperty("--color_placeholder","rgb(107, 101, 72)");
            (document.documentElement as HTMLElement).style.setProperty("--color_shadow","#f2f2f2");
            //(document.body as HTMLElement).style.backgroundColor = "url('../assets/backgroundLight.png')";
            (document.body as HTMLElement).style.backgroundColor = "#f2f4ff";
            let imageTheme = (document.getElementById("theme") as HTMLImageElement)
            if(imageTheme!==null) imageTheme.src = light;
        }
    }

    function setTheme(){
        if(!localStorage.getItem("theme") || localStorage.getItem("theme")==='dark'){

            (document.documentElement as HTMLElement).style.setProperty("--color_back","rgb(20, 20, 20)");
            (document.documentElement as HTMLElement).style.setProperty("--color_trans","#8670700c");
            (document.documentElement as HTMLElement).style.setProperty("--color_nav","#181925");
            (document.documentElement as HTMLElement).style.setProperty("--color_history","rgba(24, 24, 24, 0.856)");
            (document.documentElement as HTMLElement).style.setProperty("--color_button","#171824");
            (document.documentElement as HTMLElement).style.setProperty("--color_button_hover","#bba422");
            (document.documentElement as HTMLElement).style.setProperty("--color_text","#bba422");
            (document.documentElement as HTMLElement).style.setProperty("--color_placeholder","rgb(107, 101, 72)");
            (document.documentElement as HTMLElement).style.setProperty("--color_shadow","black");
            //(document.body as HTMLElement).style.background = "url('../assets/background2.png')";
            (document.body as HTMLElement).style.backgroundColor = "#101010";
            let imageTheme = (document.getElementById("theme") as HTMLImageElement)
            if(imageTheme!==null) imageTheme.src = dark;
            


        }else{
            (document.documentElement as HTMLElement).style.setProperty("--color_back","#fafbff");
            (document.documentElement as HTMLElement).style.setProperty("--color_trans","transparent");
            (document.documentElement as HTMLElement).style.setProperty("--color_nav","#fafbff");
            (document.documentElement as HTMLElement).style.setProperty("--color_history","#f2f2f2");
            (document.documentElement as HTMLElement).style.setProperty("--color_button","#fafbff");
            (document.documentElement as HTMLElement).style.setProperty("--color_button_hover","#5961ff");
            (document.documentElement as HTMLElement).style.setProperty("--color_text","#5961ff");
            (document.documentElement as HTMLElement).style.setProperty("--color_placeholder","rgb(107, 101, 72)");
            (document.documentElement as HTMLElement).style.setProperty("--color_shadow","#e1deff");
            //(document.body as HTMLElement).style.backgroundColor = "url('../assets/backgroundLight.png')";
            (document.body as HTMLElement).style.backgroundColor = "#f2f4ff";
            let imageTheme = (document.getElementById("theme") as HTMLImageElement)
            if(imageTheme!==null) imageTheme.src = light;
        }
    }

    function Nav() {
        if(localStorage.getItem("xsrfToken") && localStorage.getItem("accessTokenExpires") && localStorage.getItem("refreshTokenExpires")){
          return <UserNav />;
        }
        return <GuestNav />;
    }

    function Profil(){
        let source;
        if(!localStorage.getItem("theme") || localStorage.getItem("theme")==='dark'){source = close}else{source = closeL}
        if(localStorage.getItem("xsrfToken") && localStorage.getItem("accessTokenExpires") && localStorage.getItem("refreshTokenExpires")){
            return <div><div id="close" onClick={closeToggle}><img className="close" src={source} alt="" /></div> 
                    <div onClick={displayToggle}>
                                <li id="toggle" className="toggle" >
                                    <span className="toggle-menu-bar"></span>
                                    <span className="toggle-menu-bar"></span>
                                    <span className="toggle-menu-bar"></span>
                                </li>
                            </div></div>
        
        }return <div></div>
    }

    return (
        <div className="navigation">
            <div className="containerAlert"  id="containerAlert">
            </div>
            <Profil />
            <img className="logo" src={logo} alt="JustDragAndDrop" />
            <h1 className="company" id="company">Scanylab</h1>
            <Nav />
        </div>
        
    );
};

export default Navigation;