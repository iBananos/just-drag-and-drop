import React from 'react';

const ViewHistory = () => {

    function loadAnalyze(){
        var title = (document.getElementById("title")as HTMLInputElement).value;
        var date = (document.getElementById("date")as HTMLInputElement).value;
        var database = (document.getElementById("database")as HTMLInputElement).value;
        var algo = (document.getElementById("algo")as HTMLInputElement).value;
        var param = (document.getElementById("param")as HTMLInputElement).value;
        if(title !== ""){
            
        }

    }

    return (
        <div id="ViewHistory" className="ViewHistory">
            <button className="loadButton" id="loadButton" onClick={loadAnalyze}>Load analyze</button>
            <div id="title"></div>
            <div id="date"></div>
            <div id="database"></div>
            <div id="algo"></div>
            <div id="param"></div>
        </div>
    );
};

export default ViewHistory;