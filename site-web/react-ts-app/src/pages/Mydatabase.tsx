
import BarreLaterale from '../components/BarreLaterale';
import Navigation from '../components/Navigation';
import * as utils from "../Utils";
import downIcone from "../assets/down.png";
import trashIcone from "../assets/trash.png";
import downloadIcone from "../assets/download.png";
import downIconeL from "../assets/downLight.png";
import trashIconeL from "../assets/trashLight.png";
import downloadIconeL from "../assets/downloadLight.png";
const Mydatabase = () => {
    window.onload= function(){
        console.log("demande")
        utils.default.sendRequestWithToken('POST', '/api/upload/getInfo', "", requestDatabases);
    }
    function displayInfo(ev : any){
        let id = ev.target.id.split("_")[0] ;
        let div = document.getElementById(id) as HTMLDivElement;
        if(div.className === "titleOpen"){
            div.className = "titleClose";
        }else{
            div.className = "titleOpen";
        }
    }

    let sourceTrash:string;
    if(!localStorage.getItem("theme") || localStorage.getItem("theme")==='dark'){sourceTrash = trashIcone}else{sourceTrash = trashIconeL}

    let sourceDownload:string;
    if(!localStorage.getItem("theme") || localStorage.getItem("theme")==='dark'){sourceDownload = downloadIcone}else{sourceDownload = downloadIconeL}

    let sourceDown:string;
    if(!localStorage.getItem("theme") || localStorage.getItem("theme")==='dark'){sourceDown = downIcone}else{sourceDown = downIconeL}
  
    function requestDatabases(response : any){
        let listData= JSON.parse(response).liste;
        for(let i: number = 0 ; i < listData.length; i++){
            let data = listData[i]
            let cell = document.createElement("div");
            cell.className = "cell"
            let title = document.createElement("div");
            
            title.id = data.name;
            title.className="titleBase";
            let p = document.createElement("span");
            p.innerHTML = data.name;
            title.appendChild(p);
            let image = document.createElement("img");
            image.src = sourceDown;
            image.id = data.name+"_image";
            image.alt = "";
            image.className = "imagedown";
            image.onclick = displayInfo;
            title.appendChild(image);
            let hr = document.createElement("hr");
            title.appendChild(hr);

            let date = document.createElement("p");
            date.innerHTML = "Uploaded : " +data.date;
            date.id=data.name+"_date";
            let size = document.createElement("p");
            size.innerHTML = "Size : " +data.size + " octets";
            size.id=data.name+"_size";
            let extension = document.createElement("p");
            extension.innerHTML = "Type : " + data.extension;
            extension.id = data.name+"_extension";
            title.appendChild(date)
            title.appendChild(size)
            title.appendChild(extension)

            let download = document.createElement("img");
            download.src = sourceDownload;
            download.id = data.name+"_download";
            download.alt = "";
            download.className = "download";
            download.onclick = downloadBase;

            let trash = document.createElement("img");
            trash.src = sourceTrash;
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
        let id = ev.target.id.split("_")[0] ;
        let extension = ((document.getElementById(id+"_extension") as HTMLDivElement).innerHTML).split(" ")[2];
        let file =  JSON.stringify({"path" : id+"."+extension});
        (document.getElementById(id) as HTMLDivElement).style.display ="none";
        utils.default.sendRequestWithToken('POST', '/api/upload/deleteData', file, callbackDelete);
    }

    function callbackDelete(response:Response){
        console.log(response)
    }

    function downloadBase(ev : any){
        let id = ev.target.id.split("_")[0] ;
        let extension = ((document.getElementById(id+"_extension") as HTMLDivElement).innerHTML).split(" ")[2];
        let file =  JSON.stringify({"path" : id+"."+extension});
        utils.default.sendRequestWithToken('POST', '/api/upload/downloadData', file, callbackDownload);
    }

    function downloader(filename:string, text:string) {
            let element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
          
            element.style.display = 'none';
            document.body.appendChild(element);
          
            element.click();
          
            document.body.removeChild(element);
    }
      

    function callbackDownload(response : string){
        let data = JSON.parse(response)
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