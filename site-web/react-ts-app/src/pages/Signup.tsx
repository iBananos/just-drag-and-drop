import Navigation from '../components/Navigation';
import help from "../assets/help.png";
import helpL from "../assets/helpLight.png";
import * as utils from "../Utils";
let pathUrl =  window.location
let hostname = "";
if (pathUrl.origin === "http://localhost:3000") {
    hostname =  "http://localhost:4000";
} 




const Signup = () => {

    let sourceHelp;
    if(!localStorage.getItem("theme") || localStorage.getItem("theme")==='dark'){sourceHelp = help}else{sourceHelp = helpL}
  

    window.onload= function() {
        getSvg();
    }
    
    function getSvg() {
        let urlencoded = new URLSearchParams();
        fetch(hostname + "/api/auth/captcha", {method: 'POST', body: urlencoded, redirect: 'follow'})
        .then(response => response.text())
        .then(result => {
            let res = JSON.parse(result);
            (document.getElementById("svg") as HTMLInputElement).innerHTML = res.captcha;
        })
        .catch(error => console.log('error', error));
    }


    function createAccount() {
        let mail = (document.getElementById('mail')as HTMLInputElement)?.value;
        let mdp1 = (document.getElementById('mpd1')as HTMLInputElement)?.value;
        let mdp2 = (document.getElementById('mpd2')as HTMLInputElement)?.value;
        let surname = (document.getElementById('surname')as HTMLInputElement)?.value;
        let name = (document.getElementById('name')as HTMLInputElement)?.value;
        let captcha = (document.getElementById('captcha')as HTMLInputElement)?.value;

        if (mdp1 === mdp2) { 
            sendRequestSignUp(mail ,mdp1, name, surname, captcha);
        }
        else {
            let msg : string = "Les mots de passes ne correspondent pas";
            //(document.getElementById("msg") as HTMLInputElement).innerHTML= msg;
            utils.default.doAlert("danger",msg);
        }
    }

    function sendRequestSignUp(mail:string, mdp:string, name : string, surname : string, captcha : string) {
        let url = hostname + '/api/auth/signup'
        let xhr = new XMLHttpRequest()
        xhr.open('POST', url, true)
        xhr.setRequestHeader("Content-Type", "application/json");
      
        xhr.addEventListener('readystatechange', function(e) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("c'est bon"); // TODO FAIRE LA PAGE DE REDIRECTION  
                window.location.href = "/";
            }
            else if (xhr.readyState === 4 && xhr.status !== 200) {
                let res = JSON.parse(this.response);
                //(document.getElementById("msg") as HTMLInputElement).innerHTML= res.message;
                
                if (res.message === "Captcha invalide !") {
                    (document.getElementById("svg") as HTMLInputElement).innerHTML = res.captcha;
                    utils.default.doAlert("warning",res.message);
                }else{
                    utils.default.doAlert("danger",res.message);
                }
            }
        });

        let data = JSON.stringify({"email": mail, "password": mdp, "name": name, "surname": surname, "captcha": captcha})
        xhr.send(data);
    }


    return (
        <div className="signup">
            <div className="blurSignup">
                <h1>Welcome !</h1>
                <h2>Sign up to create an account</h2>
                <div className="box1">
                    <div className="phTitle" >Name</div>
                    <input className="ph" id="name" placeholder="ex : Alexandre"></input>
                </div>
                <div className="box1">
                    <div className="phTitle" >Surname</div>
                    <input className="ph" id="surname" placeholder="ex : Dubois"></input>
                </div>
                <div className="box1">
                    <div className="phTitle" >Email address</div>
                    <input className="ph" id="mail" placeholder="example@mail.com"></input>
                </div>
                <div className="box2">
                    <div className="phTitle">Password</div>
                    <img src={sourceHelp} className="helpMDP" alt="" title="The password must contain at least: 1 upper case, 1 lower case, 1 symbol, 1 number, 10 characters "/>
                    <input type="password" id="mpd1" className="ph" placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"></input>
                </div>
                <div className="box3">
                    <div className="phTitle">Confirmation password</div>
                    <input type="password" id="mpd2" className="ph" placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"></input>
                </div>
                <br/>
                <div id="svg"></div>
                <div className="box1 captcha">
                    <input className="ph captchaInput" id="captcha" placeholder="captcha"></input>
                </div>
                <p className="msg" id="msg"></p>
                <button className="signup" onClick={createAccount}>Sign up</button>  
             </div>
            <Navigation />
        </div>
    );
};

export default Signup;