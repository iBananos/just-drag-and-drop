import ReactDOM from "react-dom";
import BarreLaterale from "../components/BarreLaterale";
import Navigation from "../components/Navigation";
import ViewHistory from "../components/ViewHistory";
import * as utils from "../Utils"

const History = () =>  {

    var list = new Map();


    function askForView(ev:any){
        var name : string = ev.target.id;
        console.log(name)
        var props = list.get(name);
        var title = (document.getElementById("title")as HTMLInputElement);
        var date = (document.getElementById("date")as HTMLInputElement);
        var database = (document.getElementById("database")as HTMLInputElement);
        if(name === undefined){
            title.innerHTML = "";
            date.innerHTML = "";
            database.innerHTML = "";
            (document.getElementById("loadButton")as HTMLInputElement).style.display ="none";
        }else{
            title.innerHTML = "Title : " +name as string;
            date.innerHTML = "Date : " +props.get('date') as string;
            database.innerHTML = "Database : "+props.get('nomBase') as string;
            (document.getElementById("loadButton")as HTMLInputElement).style.display ="block";
        }
        

    }

    window.onload= function(){
        console.log("demande")
        utils.default.sendRequestWithToken('POST', 'http://localhost:4000/analyze/databases', "", createCells);
    }

    function createCells(response : any){
        var listeData : JSON = JSON.parse(response)
        console.log(listeData)
        Object.entries(listeData).forEach(([key,value])=>{response=value}) ;
        for(var i: number = 0 ; i < response.length; i++){
            var propscell = new Map();
            propscell.set('date', "AVANT HIERfsfsfsqfsqfsqfqs")
            propscell.set("nomBase","BASE 1fsfsqfsqfsdqfsqfsdfsq")
            list.set(response[i], propscell);
            var cell = document.createElement("div");
            cell.className ="HistoryCell"; 
            cell.id = response[i]
            cell.onclick = askForView;

            var p = document.createElement("p");
            p.className = "title";
            p.id=response[i]
            p.innerHTML = response[i];
            
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