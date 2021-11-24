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
        xhr.open(methode, url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        

        xhr.setRequestHeader("x-xsrf-token", localStorage.getItem("xsrfToken") || '{}');
        xhr.withCredentials = true;
      
        xhr.addEventListener('readystatechange', function(e) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(this.response);
            }
            else if (xhr.readyState === 4 && xhr.status !== 200) {
                var res = JSON.parse(this.response);
            }
        });
        xhr.send(data);
    }

    public static async sendFileWithToken(methode : string, url : string, data : File, callback : any) {
        if (!Utils.checkToken()){
            return false;
        }
        if (!Utils.checkRefreshToken()){ 
            return false;
        }
        var formData = new FormData()
        var xhr = new XMLHttpRequest()
        xhr.open(methode, url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        

        xhr.setRequestHeader("x-xsrf-token", localStorage.getItem("xsrfToken") || '{}');
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', function(e) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(this.response);
            }
            else if (xhr.readyState === 4 && xhr.status !== 200) {
                var res = JSON.parse(this.response);
            }
        });

        formData.append('file', data)
        xhr.send(formData)
    }


    public static refreshToken() {
        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://localhost:4000/api/auth/refresh', true);
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