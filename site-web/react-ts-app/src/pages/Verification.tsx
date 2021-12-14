var pathUrl =  window.location
let hostname : string = "";
if (pathUrl.origin === "http://localhost:3000") {
    hostname =  "http://localhost:4000";
}


const Verification = () => {

    window.onload = function() {
        getVerif();
        startTimer();
    }
    
    function getVerif() {
        let url = hostname + '/api/auth/verification' + pathUrl.search;
        var urlencoded = new URLSearchParams();
        fetch(url, { method: 'POST', body: urlencoded, redirect: 'follow' })
            .then(response => response.text())
            .then(result => {
                let res = JSON.parse(result);
                (document.getElementById("verif") as HTMLInputElement).innerHTML = res.message;
            })
            .catch(error => console.log('error', error));

        
    }


    function startTimer() {
        var timer = 5;
        setInterval(function () {
            (document.getElementById("time") as HTMLInputElement).innerHTML = timer.toString();
            if (--timer < 0) {
                timer = 0;
                document.location.href = "http://localhost:3000"; 
            }
        }, 1000);
    }



    return (
        <div className="verification">
            <h1>Scanylab</h1>

            <div id="verif"></div>
            <div>Vous allez être redirigé automatiquement dans : <span id="time"></span></div>
        </div>
    );
};

export default Verification;