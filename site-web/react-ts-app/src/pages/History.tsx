import BarreLaterale from "../components/BarreLaterale";
import Navigation from "../components/Navigation";
import ViewHistory from "../components/ViewHistory";
import * as utils from "../Utils"
import trashIcone from "../assets/trash.png";
const History = () =>  {

    var list : any[]= [];
    var listImg : any[]= [];
    function deleteAnalyze(ev : any){
        var id = ev.target.id.split("_")[0] ;
        var file =  JSON.stringify({"path" : id});
        utils.default.sendRequestWithToken('POST', '/api/analyze/deleteData', file, callbackDelete);
    }
    function callbackDelete(response:Response){
        window.location.reload()
    }
    function askForView(ev:any){
        var id : number = parseInt(ev.target.id,10) ;
        var title = (document.getElementById("title")as HTMLDivElement);
        var img = (document.getElementById("ViewImage")as HTMLDivElement);
        var date = (document.getElementById("date")as HTMLDivElement);
        var database = (document.getElementById("database")as HTMLDivElement);
        var algo = (document.getElementById("algo")as HTMLDivElement);
        var param = (document.getElementById("param")as HTMLDivElement);
        var type = (document.getElementById("type")as HTMLDivElement);
        var trashdiv = (document.getElementById("trashDiv")as HTMLDivElement);
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
                var image = document.createElement("img");
                image.className = "previewView";
                image.src=listImg[id];
                img.appendChild(image)
                title.innerHTML = "Title : " + list[id].nameAnalyze ;
                title.innerHTML = "Title : " + list[id].nameAnalyze ;
                date.innerHTML = "Date : " +  list[id].date;
                database.innerHTML = "Database : "+  list[id].database;
                type.innerHTML = "Type : " +  list[id].type;
                algo.innerHTML = "Algorithme : " +  list[id].algo;
                var trash = document.createElement("img");
                trash.src = trashIcone;
                trash.id =  list[id].nameAnalyze+"_trash";
                trash.alt = "";
                trash.className = "trashAnalyze";
                trash.onclick = deleteAnalyze;
                trashdiv.appendChild(trash)
                param.innerHTML = "Paramètres : ";
                Object.entries(list[id].params).forEach(([key,value])=>{
                    console.log(list[id].params)
                    var p = document.createElement("p");
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
        var listData= JSON.parse(response).liste;
        var listImages= JSON.parse(response).images;
        console.log(listImages)
        for(var i: number = 0 ; i < listData.length; i++){

            var data= listData[i]
            list.push(data);
            var dataImg= listImages[i]
            listImg.push(dataImg);
            
            var cell = document.createElement("div");
            cell.className ="HistoryCell"; 
            cell.id = i.toString();
            cell.onclick = askForView;

            var img = document.createElement("img");
            img.className = "preview";
            img.id=i.toString();
            img.src=listImages[i]
            cell.appendChild(img)

            var p = document.createElement("p");
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