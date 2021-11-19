import React from 'react';
import { NavLink } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Home from './Home';

const Login = () => {

    function login(){
        var mail  = (document.getElementById('mail')as HTMLInputElement)?.value;
        var mdp  = (document.getElementById('mdp')as HTMLInputElement)?.value;
        sendRequestLogin(mail,mdp);
    }

    function sendRequestLogin(mail:string, mdp:string) {
        console.log(mail,mdp)
        var url = 'http://localhost:4000/api/auth/login'
        var xhr = new XMLHttpRequest()
        xhr.open('POST', url, true)
        xhr.setRequestHeader("Content-Type", "application/json");
      
      
        xhr.addEventListener('readystatechange', function(e) {
          if (xhr.readyState === 4 && xhr.status === 200) {
            var msg = "";
            (document.getElementById("msg")as HTMLInputElement).innerHTML= msg;
            var res = JSON.parse(this.response)
            localStorage.setItem("Token",res.token);
            (document.getElementById("login") as HTMLInputElement).setAttribute("display","none");
            window.location.href = "/"; 
          }
          else if (xhr.readyState === 4 && xhr.status !== 200) {
            var msg = "L'adresse mail et/ou le mot de passe sont incorectes";
            (document.getElementById("msg")as HTMLInputElement).innerHTML= msg;
          }
        })
        var data = JSON.stringify({"email":mail,"password":mdp})
        xhr.send(data)
    }

    return (
        <div id="login" className="login">
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
            <hr className="hr1"/>
            <div className="or">Or</div>
            <hr className="hr2"/>
            <NavLink to="/signup"><button className="signup">Sign up</button></NavLink>
            <Navigation />
        </div>
    );
};

export default Login;