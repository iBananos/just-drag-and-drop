import React from 'react';
import BarreLaterale from '../components/BarreLaterale';
import Navigation from '../components/Navigation';
import * as utils from "../Utils"

const Mydatabase = () => {
    window.onload= function(){
        console.log("demande")
        utils.default.sendRequestWithToken('POST', 'http://localhost:4000/analyze/databases', "", requestDatabases);
    }
    function requestDatabases(response : any){
        var listeData : JSON = JSON.parse(response)
        console.log(listeData)
        Object.entries(listeData).forEach(([key,value])=>{response=value}) ;
        for(var i: number = 0 ; i < response.length; i++){
            var cell = document.createElement("div");
            cell.id = response[i];
            cell.className = "cell"
            cell.innerHTML = response[i];
            document.getElementById("view")?.appendChild(cell);
        }
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