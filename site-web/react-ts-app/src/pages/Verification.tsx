var pathUrl =  window.location
let hostname : string = "";
if (pathUrl.origin === "http://localhost:3000") {
    hostname =  "http://localhost:4000";
}


const Verification = () => {

    window.onload = function() {
        getVerif();
    }
    
    function getVerif() {
        let url = hostname + '/api/auth/verification' + pathUrl.search;
        var urlencoded = new URLSearchParams();
        fetch(url, { method: 'POST', body: urlencoded, redirect: 'follow' })
            .then(response => response.text())
            .then(result => {
                console.log(result);
                (document.getElementById("verif") as HTMLInputElement).innerHTML = result;
            })
            .catch(error => console.log('error', error));
    }



    return (
        <div className="verification">
            <h1>Scanylab</h1>

            <div id="verif">
            </div>
        </div>
    );
};

export default Verification;