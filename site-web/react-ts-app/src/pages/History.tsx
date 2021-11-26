import ReactDOM from "react-dom";
import { Interface } from "readline";
import BarreLaterale from "../components/BarreLaterale";
import Navigation from "../components/Navigation";
import ViewHistory from "../components/ViewHistory";
import * as utils from "../Utils"

const History = () =>  {

    var list : any[]= [];


    function askForView(ev:any){
        var id : number = parseInt(ev.target.id,10) ;
        var title = (document.getElementById("title")as HTMLDivElement);
        var date = (document.getElementById("date")as HTMLDivElement);
        var database = (document.getElementById("database")as HTMLDivElement);
        var algo = (document.getElementById("algo")as HTMLDivElement);
        var param = (document.getElementById("param")as HTMLDivElement);
        if(id === undefined){
            title.innerHTML = "";
            date.innerHTML = "";
            database.innerHTML = "";
            algo.innerHTML = "";
            param.innerHTML = "";
            (document.getElementById("loadButton")as HTMLInputElement).style.display ="none";
        }else{
            title.innerHTML = "Title : " + list[id].nameAnalyze ;
            date.innerHTML = "Date : " +  list[id].date;
            database.innerHTML = "Database : "+  list[id].database;
            algo.innerHTML = "Algorithme : " +  list[id].algo;
            param.innerHTML = "Paramètres : ";
            Object.entries(list[id].params).forEach(([key,value])=>{
                console.log(list[id].params)
                var p = document.createElement("p");
                console.log(key + " : " + value)
                p.innerHTML = key + " : " + value;
                param.appendChild(p);
            });
            
            (document.getElementById("loadButton")as HTMLInputElement).style.display ="block";
        }
        

    }

    window.onload= function(){
        utils.default.sendRequestWithToken('POST', 'http://localhost:4000/analyze/informations', "", createCells);
    }

    function createCells(response : any){
        var listData= JSON.parse(response).liste;
        for(var i: number = 0 ; i < listData.length; i++){

            var data= listData[i]
            list.push(data);
            
            var cell = document.createElement("div");
            cell.className ="HistoryCell"; 
            cell.id = i.toString();
            cell.onclick = askForView;

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