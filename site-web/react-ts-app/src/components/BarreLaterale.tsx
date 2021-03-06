import * as utils from "../Utils";

const BarreLaterale = () => {

    //window.onload = function(){
    if(localStorage.getItem("xsrfToken") && localStorage.getItem("accessTokenExpires") && localStorage.getItem("refreshTokenExpires")){
        utils.default.sendRequestWithToken('POST', '/api/profile/getInformation', "" , callbackUser)
    }
    //}

    function callbackUser(response : any){
        let reponse = JSON.parse(response);
        let profileMail = document.getElementById("profileMail") as HTMLDivElement;
        let profileName = document.getElementById("profileName") as HTMLDivElement;
        profileMail.innerHTML = reponse.mail;
        profileName.innerHTML = reponse.name +" " +reponse.surname;
    }
    return (
        <div id="barreLaterale" className="barreLaterale">
            <div className = "profileInformations">
            <div id="profileName" className="profileName"></div>
            <div id="profileMail" className="profileMail"></div>
            </div>
        </div>
    );
};

export default BarreLaterale;