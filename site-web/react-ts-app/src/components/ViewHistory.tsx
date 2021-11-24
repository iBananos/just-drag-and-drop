import React from 'react';

const ViewHistory = () => {

    function loadAnalyze(){
        var title = (document.getElementById("title")as HTMLInputElement).value;
        var date = (document.getElementById("date")as HTMLInputElement).value;
        var database = (document.getElementById("database")as HTMLInputElement).value;
        if(title !== ""){
            
        }

    }

    return (
        <div id="ViewHistory" className="ViewHistory">
            <button className="loadButton" id="loadButton" onClick={loadAnalyze}>Load analyze</button>
            <p id="title"></p>
            <p id="date"></p>
            <p id="database"></p>
        </div>
    );
};

export default ViewHistory;