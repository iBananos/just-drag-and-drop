import React from 'react';

const ViewHistory = () => {

    function loadAnalyze(){
        var url =  (document.getElementById("informationRequesturl")as HTMLInputElement).innerHTML;
        var type =  (document.getElementById("informationRequesttype")as HTMLInputElement).innerHTML;
        if(type !== ""){
            window.location.href = "/analyzeView?url="+url+"&type="+type
        }

    }

    return (
        <div id="ViewHistory" className="ViewHistory">
            <button className="loadButton" id="loadButton" onClick={loadAnalyze}>Load analyze</button>
            <div id="title"></div>
            <div id="date"></div>
            <div id="database"></div>
            <div id="type"></div>
            <div id="first"></div>
            <div id="second"></div>
            <div id="third"></div>
            <div id="algo"></div>
            <div id="param"></div>
            <div id="informationRequesturl" className="informationRequest"></div>
            <div id="informationRequesttype" className="informationRequest"></div>
        </div>
    );
};

export default ViewHistory;