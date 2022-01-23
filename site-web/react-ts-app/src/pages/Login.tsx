
import { NavLink } from 'react-router-dom';
import Navigation from '../components/Navigation';
import * as utils from "../Utils";
let pathUrl =  window.location
let hostname = "";
if(pathUrl.origin === "http://localhost:3000"){
    hostname =  "http://localhost:4000";
}

const Login = () => {

    function login(){
        let mail  = (document.getElementById('mail')as HTMLInputElement)?.value;
        let mdp  = (document.getElementById('mdp')as HTMLInputElement)?.value;
        sendRequestLogin(mail,mdp);
    }

    function sendRequestLogin(mail:string, mdp:string) {
        let url = hostname+'/api/auth/login'
        let xhr = new XMLHttpRequest()
        xhr.open('POST', url, true)
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.withCredentials = true;
      
      
        xhr.addEventListener('readystatechange', function(e) {
            let res;
          if (xhr.readyState === 4 && xhr.status === 200) {
            let msg = "";
            (document.getElementById("msg")as HTMLInputElement).innerHTML= msg;
            res = JSON.parse(this.response);

            localStorage.setItem("xsrfToken", res.xsrfToken);
            localStorage.setItem("accessTokenExpires", res.accessTokenExpires);
            localStorage.setItem("refreshTokenExpires", res.refreshTokenExpires);
            (document.getElementById("login") as HTMLInputElement).setAttribute("display","none");
            window.location.href = "/?status=connected"; 
          }
          else if (xhr.readyState === 4 && xhr.status !== 200) {
            res = JSON.parse(this.response);
            utils.default.doAlert("danger",res.message);
            //(document.getElementById("msg")as HTMLInputElement).innerHTML= res.message;
          }
        })
        let data = JSON.stringify({"email":mail,"password":mdp})
        xhr.send(data)
    }

    return (
        <div id="login" className="login">
            <div className="blurLogin">
            <h1>Welcome !</h1>
            <h2>Log in to your account</h2>
            <div className="box1">
                <div className="phTitle" >Email address</div>
                <input className="ph" id="mail" placeholder="example@mail.com"></input>
            </div>
            <div className="box2">
                <div className="phTitle">Password</div>
                <input type="password" id="mdp" className="ph" placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"></input>
            </div> 
            <button className="signin" onClick={login}>Log in</button>
            <span className="msg" id="msg"></span>
            <hr className="hr1"/><hr className="hr2"/>
            <div className="or">Or</div>
            <NavLink to="/signup"><button className="signup">Sign up</button></NavLink>
            </div>
            
            <Navigation />
        </div>
    );
};

export default Login;