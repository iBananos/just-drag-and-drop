import BarreLaterale from "../components/BarreLaterale";
import Navigation from "../components/Navigation";
import ViewHistory from "../components/ViewHistory";
import * as utils from "../Utils"
import trashIcone from "../assets/trash.png";
import trashIconeL from "../assets/trashLight.png";
const History = () =>  {

    let list : any[]= [];
    let listImg : any[]= [];
    function deleteAnalyze(ev : any){
        let id = ev.target.id.split("_")[0] ;
        let file =  JSON.stringify({"path" : id});
        utils.default.sendRequestWithToken('POST', '/api/analyze/deleteData', file, callbackDelete);
        window.location.reload()
    }
    function callbackDelete(response:Response){
        window.location.reload()
    }
    let sourceTrash:string;
    if(!localStorage.getItem("theme") || localStorage.getItem("theme")==='dark'){sourceTrash = trashIcone}else{sourceTrash = trashIconeL}

    function askForView(ev:any){
        let id : number = parseInt(ev.target.id,10) ;
        let title = (document.getElementById("title")as HTMLDivElement);
        let img = (document.getElementById("ViewImage")as HTMLDivElement);
        let date = (document.getElementById("date")as HTMLDivElement);
        let database = (document.getElementById("database")as HTMLDivElement);
        let algo = (document.getElementById("algo")as HTMLDivElement);
        let param = (document.getElementById("param")as HTMLDivElement);
        let type = (document.getElementById("type")as HTMLDivElement);
        let trashdiv = (document.getElementById("trashDiv")as HTMLDivElement);
        trashdiv.innerHTML = "";
        img.innerHTML = "";
        title.innerHTML = "";
        date.innerHTML = "";
        (document.getElementById("informationRequesttype")as HTMLDivElement).innerHTML ="";
        (document.getElementById("informationRequesturl")as HTMLDivElement).innerHTML ="";
        database.innerHTML = "";
        algo.innerHTML = "";
        param.innerHTML = "";
        type.innerHTML = "";
        (document.getElementById("loadButton")as HTMLInputElement).style.display ="none";
            
        if(id !== undefined){
                let image = document.createElement("img");
                image.className = "previewView";
                image.src=listImg[id];
                img.appendChild(image)
                title.innerHTML = "Title : " + list[id].nameAnalyze ;
                title.innerHTML = "Title : " + list[id].nameAnalyze ;
                date.innerHTML = "Date : " +  list[id].date;
                database.innerHTML = "Database : "+  list[id].database;
                type.innerHTML = "Type : " +  list[id].type;
                algo.innerHTML = "Algorithm : " +  list[id].algo;
                let trash = document.createElement("img");
                trash.src = sourceTrash;
                trash.id =  list[id].nameAnalyze+"_trash";
                trash.alt = "";
                trash.className = "trashAnalyze";
                trash.onclick = deleteAnalyze;
                trashdiv.appendChild(trash)
                param.innerHTML = "Parameters : ";
                Object.entries(list[id].params).forEach(([key,value])=>{
                    console.log(list[id].params)
                    let p = document.createElement("p");
                    console.log(key + " : " + value)
                    p.innerHTML = key + " : " + value;
                    param.appendChild(p);

                });
            (document.getElementById("informationRequesturl")as HTMLDivElement).innerHTML =  list[id].nameAnalyze;
            (document.getElementById("informationRequesttype")as HTMLDivElement).innerHTML = list[id].category;
            
            (document.getElementById("loadButton")as HTMLInputElement).style.display ="block";
        }
        

    }

    window.onload= function(){
        console.log("FAFZEGRHSFGF")
        utils.default.sendRequestWithToken('POST', '/api/analyze/informations', "", createCells);
    }

    function createCells(response : any){
        let listData= JSON.parse(response).liste;
        let listImages= JSON.parse(response).images;
        console.log(listImages)
        for(let i: number = 0 ; i < listData.length; i++){

            let data= listData[i]
            list.push(data);
            let dataImg= listImages[i]
            listImg.push(dataImg);
            
            let cell = document.createElement("div");
            cell.className ="HistoryCell"; 
            cell.id = i.toString();
            cell.onclick = askForView;

            let img = document.createElement("img");
            img.className = "preview";
            img.id=i.toString();
            img.src=listImages[i]
            cell.appendChild(img)

            let p = document.createElement("p");
            p.className = "title";
            p.id=i.toString();
            p.innerHTML = data.nameAnalyze;
            
            cell.appendChild(p);
            (document.getElementById("view") as HTMLDivElement).appendChild(cell);
        }
    }
    return (
        <div className="History">
            <div id="view" className="view">
                <h1 className="title">History page</h1>
            </div>
            <ViewHistory />
            <BarreLaterale />
            <Navigation />
        </div>
    )
}

export default History;