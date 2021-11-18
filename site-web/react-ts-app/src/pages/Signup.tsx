import React from 'react';
import Navigation from '../components/Navigation';

const Signup = () => {

    function checkMDP(mdp1:string, mdp2:string){
        var msg : string = "";
        if (mdp1.match( /[0-9]/g) &&  mdp1.match( /[A-Z]/g) && 
            mdp1.match(/[a-z]/g) &&  mdp1.match( /[^a-zA-Z\d]/g) && mdp1.length >= 10) {
                if(mdp1 === mdp2){ // les mots de passes sont équivalents
                    (document.getElementById("msg")as HTMLInputElement).innerHTML= msg;
                    return true;
                } else {
                    msg = "Les mots de passes ne correspondent pas";
                    (document.getElementById("msg")as HTMLInputElement).innerHTML= msg;
                    return false;
                }
            }
        msg = "Le mot de passe n'est pas assez complexe";
        (document.getElementById("msg")as HTMLInputElement).innerHTML= msg;
        return false;
    }
    
    function checkMailAvailable(mail:string){
        var msg : string = "";
        var expressionReguliere = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
        if(expressionReguliere.test(mail)){
            (document.getElementById("msg")as HTMLInputElement).innerHTML= msg;
            return true;
        }
        msg = "Veuillez entrer une adresse mail valide.";
        (document.getElementById("msg")as HTMLInputElement).innerHTML= msg;
        return false;
    }

    function createAccount(){
        var mail  = (document.getElementById('mail')as HTMLInputElement)?.value;
        var mdp1  = (document.getElementById('mpd1')as HTMLInputElement)?.value;
        var mdp2  = (document.getElementById('mpd2')as HTMLInputElement)?.value;
        if(checkMailAvailable(mail) && checkMDP(mdp1,mdp2) ){
            sendRequestSignUp(mail,mdp1)
        }
        console.log("c'est pas bon")
    }
    function sendRequestSignUp(mail:string, mdp:string) {
        var url = 'http://localhost:4000/api/auth/signup'
        var xhr = new XMLHttpRequest()
        xhr.open('POST', url, true)
        xhr.setRequestHeader("Content-Type", "application/json");
      
      
        xhr.addEventListener('readystatechange', function(e) {
          if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("c'est bon") // TODO FAIRE LA PAGE DE REDIRECTION  
          }
          else if (xhr.readyState === 4 && xhr.status !== 200) {
            var msg = "Cette adresse e-mail est déjà utilisée";
            (document.getElementById("msg")as HTMLInputElement).innerHTML= msg;
          }
        })
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