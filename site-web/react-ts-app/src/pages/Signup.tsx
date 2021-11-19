import React from 'react';
import Navigation from '../components/Navigation';

const Signup = () => {

    function createAccount(){
        var mail = (document.getElementById('mail')as HTMLInputElement)?.value;
        var mdp1 = (document.getElementById('mpd1')as HTMLInputElement)?.value;
        var mdp2 = (document.getElementById('mpd2')as HTMLInputElement)?.value;

        if (mdp1 === mdp2) { 
            sendRequestSignUp(mail ,mdp1);
        }
        else {
            let msg : string = "Les mots de passes ne correspondent pas";
            (document.getElementById("msg") as HTMLInputElement).innerHTML= msg;
        }
    }

    function sendRequestSignUp(mail:string, mdp:string) {
        var url = 'http://localhost:4000/api/auth/signup'
        var xhr = new XMLHttpRequest()
        xhr.open('POST', url, true)
        xhr.setRequestHeader("Content-Type", "application/json");
      
        xhr.addEventListener('readystatechange', function(e) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("c'est bon"); // TODO FAIRE LA PAGE DE REDIRECTION  
                (document.getElementById("msg") as HTMLInputElement).innerHTML= "Compte crée !";
            }
            else if (xhr.readyState === 4 && xhr.status !== 200) {
                var res = JSON.parse(this.response);
                (document.getElementById("msg") as HTMLInputElement).innerHTML= res.message;
            }
        });

        var data = JSON.stringify({"email":mail,"password":mdp})
        xhr.send(data)
    }


    return (
        <div className="signup">
            <h1>Welcome !</h1>
            <h2>Sign up to create an account</h2>
            <div className="box1">
                <div className="phTitle" >Email address</div>
                <input className="ph" id="mail" placeholder="example@mail.com"></input>
            </div>
            <div className="box2">
                <div className="phTitle">Password</div>
                <input type="password" id="mpd1" className="ph" placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"></input>
            </div>
            <div className="box3">
                <div className="phTitle">Confirmation password</div>
                <input type="password" id="mpd2" className="ph" placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"></input>
            </div>
            <span className="msg" id="msg"></span> 
            <button className="signup" onClick={createAccount}>Sign up</button>
            <Navigation />
        </div>
    );
};

export default Signup;