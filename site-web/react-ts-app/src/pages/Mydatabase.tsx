
import BarreLaterale from '../components/BarreLaterale';
import Navigation from '../components/Navigation';
import * as utils from "../Utils";
import downIcone from "../assets/down.png";
import trashIcone from "../assets/trash.png";
import downloadIcone from "../assets/download.png";

const Mydatabase = () => {
    window.onload= function(){
        console.log("demande")
        utils.default.sendRequestWithToken('POST', '/api/upload/getInfo', "", requestDatabases);
    }
    function displayInfo(ev : any){
        var id = ev.target.id.split("_")[0] ;
        var div = document.getElementById(id) as HTMLDivElement;
        if(div.className === "titleOpen"){
            div.className = "titleClose";
        }else{
            div.className = "titleOpen";
        }
    }

    function requestDatabases(response : any){
        var listData= JSON.parse(response).liste;
        for(var i: number = 0 ; i < listData.length; i++){
            var data = listData[i]
            var cell = document.createElement("div");
            cell.className = "cell"
            var title = document.createElement("div");
            
            title.id = data.name;
            title.className="titleBase";
            var p = document.createElement("span");
            p.innerHTML = data.name;
            title.appendChild(p);
            var image = document.createElement("img");
            image.src = downIcone;
            image.id = data.name+"_image";
            image.alt = "";
            image.className = "imagedown";
            image.onclick = displayInfo;
            title.appendChild(image);
            var hr = document.createElement("hr");
            title.appendChild(hr);

            var date = document.createElement("p");
            date.innerHTML = "Uploaded : " +data.date;
            date.id=data.name+"_date";
            var size = document.createElement("p");
            size.innerHTML = "Size : " +data.size + " octets";
            size.id=data.name+"_size";
            var extension = document.createElement("p");
            extension.innerHTML = "Type : " + data.extension;
            extension.id = data.name+"_extension";
            title.appendChild(date)
            title.appendChild(size)
            title.appendChild(extension)

            var download = document.createElement("img");
            download.src = downloadIcone;
            download.id = data.name+"_download";
            download.alt = "";
            download.className = "download";
            download.onclick = downloadBase;

            var trash = document.createElement("img");
            trash.src = trashIcone;
            trash.id = data.name+"_trash";
            trash.alt = "";
            trash.className = "trash";
            trash.onclick = deleteDatabase;

            title.appendChild(download);
            title.appendChild(trash);
            cell.appendChild(title);
            document.getElementById("view")?.appendChild(cell);
        }
    }
    function deleteDatabase(ev : any){
        var id = ev.target.id.split("_")[0] ;
        var extension = ((document.getElementById(id+"_extension") as HTMLDivElement).innerHTML).split(" ")[2];
        var file =  JSON.stringify({"path" : id+"."+extension});
        (document.getElementById(id) as HTMLDivElement).style.display ="none";
        utils.default.sendRequestWithToken('POST', '/api/upload/deleteData', file, callbackDelete);
    }

    function callbackDelete(response:Response){
        console.log(response)
    }

    function downloadBase(ev : any){
        var id = ev.target.id.split("_")[0] ;
        var extension = ((document.getElementById(id+"_extension") as HTMLDivElement).innerHTML).split(" ")[2];
        var file =  JSON.stringify({"path" : id+"."+extension});
        utils.default.sendRequestWithToken('POST', '/api/upload/downloadData', file, callbackDownload);
    }

    function downloader(filename:string, text:string) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
          
            element.style.display = 'none';
            document.body.appendChild(element);
          
            element.click();
          
            document.body.removeChild(element);
    }
      

    function callbackDownload(response : string){
        var data = JSON.parse(response)
        downloader(data.name,data.file)
    }
    return (
        <div className="Mydatabase" id="Mydatabase">
            <div className="view" id="view">
                <div id="gridCells" className="gridCells"></div>
            </div>
            <BarreLaterale />
            <Navigation />
        </div>
    );
};

export default Mydatabase;