var pathUrl =  window.location
let hostname : string = "";

if (pathUrl.origin === "http://localhost:3000"){
    hostname =  "http://localhost:4000";
}

class Utils {
    
    public static checkToken() {
        let xsrfToken = localStorage.getItem("xsrfToken");
        let accessTokenExpires = localStorage.getItem("accessTokenExpires");
        let refreshTokenExpires = localStorage.getItem("refreshTokenExpires");

        if (!xsrfToken || !accessTokenExpires || !refreshTokenExpires){
            return false;
        }
            

        if (parseInt(accessTokenExpires, 10) > Date.now()) 
            return true;
    }


    public static checkRefreshToken() {
        let refreshTokenExpires = localStorage.getItem("refreshTokenExpires");

        if (!refreshTokenExpires)
            return false;

        if (parseInt(refreshTokenExpires, 10) > Date.now())
            return true;
        return false;
    }


    public static async sendRequestWithToken(methode : string, url : string, data : string, callback : any) {
        if (!Utils.checkToken()){
            return false;
        }
        if (!Utils.checkRefreshToken()){ 
            return false;
        }

        var xhr = new XMLHttpRequest()
        xhr.open(methode, hostname+url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        

        xhr.setRequestHeader("x-xsrf-token", localStorage.getItem("xsrfToken") || '{}');
        xhr.withCredentials = true;
      
        xhr.addEventListener('readystatechange', function(e) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(this.response);
            }
            else if (xhr.readyState === 4 && xhr.status !== 200) {
                JSON.parse(this.response);
            }
        });
        xhr.send(data);
    }
    public static async sendRequestDemo(methode : string, url : string, data : string, callback : any) {
        var xhr = new XMLHttpRequest()
        xhr.open(methode, hostname+url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        

        //xhr.setRequestHeader("x-xsrf-token", localStorage.getItem("xsrfToken") || '{}');
        xhr.withCredentials = true;
      
        xhr.addEventListener('readystatechange', function(e) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if(xhr.response==="Vous devez d'abord confirmer votre adresse email."){
                    Utils.doAlert("danger","Vous devez d'abord confirmer votre adresse email.")
                }else{
                    callback(this.response);
                }
                
            }
            else if (xhr.readyState === 4 && xhr.status !== 200) {
                JSON.parse(this.response);
            }
        });
        xhr.send(data);
    }

    public static doAlert(type : string, msg : string){
        var containeralerte = document.getElementById('containerAlert') as HTMLDivElement
        var alerte = document.createElement("div")
        alerte.id ="alert"
        var alerteHead = document.createElement("span")
        alerteHead.id ="alertHead"
        alerteHead.className = "alertHead"
        var alerteMsg = document.createElement("span")
        alerteMsg.id ="alertMsg"
        
        if(type==="warning"){
            alerte.className = "alert-warning"
            alerteHead.innerHTML = "Warning ! "
        }else if (type==="info"){
            alerte.className = "alert-info"
            alerteHead.innerHTML = "Information ! "
        }else if (type==="success"){
            alerte.className = "alert-success"
            alerteHead.innerHTML = "Success ! "
        }else if (type==="danger"){
            alerte.className = "alert-danger"
            alerteHead.innerHTML = "Error ! "
        }else if (type==="primary"){
            alerte.className = "alert-primary"
            alerteHead.innerHTML = "? ! "
        }
        alerteMsg.innerHTML = msg
        alerte.appendChild(alerteHead)
        alerte.appendChild(alerteMsg)
        containeralerte.appendChild(alerte)
        setTimeout(() => {
            alerteHead.innerHTML = ""
            alerteMsg.innerHTML = ""
            alerte.className =""
        }, 4000);
    }

    public static async sendFileWithToken(methode : string, url : string, data : File, name : string , date :Date,separator:string, callback : any) {
        if (!Utils.checkToken()){
            return false;
        }
        if (!Utils.checkRefreshToken()){ 
            return false;
        }
        var formData = new FormData()
        var xhr = new XMLHttpRequest()
        xhr.open(methode, hostname+url, true);
        
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

        xhr.setRequestHeader("x-xsrf-token", localStorage.getItem("xsrfToken") || '{}');
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', function(e) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(this.response);
            }
            else if (xhr.readyState === 4 && xhr.status !== 200) {
                JSON.parse(this.response);
            }
        });
        formData.append('name', name)
        formData.append('date', date.toString())
        formData.append('file', data)
        formData.append('separator', separator)
        xhr.send(formData)
    }


    public static refreshToken() {
        var xhr = new XMLHttpRequest()
        xhr.open('POST', hostname + '/api/auth/refresh', true);
        xhr.withCredentials = true;
        xhr.addEventListener('readystatechange', function(e) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var res = JSON.parse(this.response);
                localStorage.setItem("xsrfToken", res.xsrfToken);
                localStorage.setItem("accessTokenExpires", res.accessTokenExpires);
                localStorage.setItem("refreshTokenExpires", res.refreshTokenExpires);
            }
            else if (xhr.readyState === 4 && xhr.status !== 200) {
                return false;
            }
        });
        xhr.send();
    }
}


export default Utils;