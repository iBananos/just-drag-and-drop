
const ViewHistory = () => {

    function loadAnalyze(){
        var url =  (document.getElementById("informationRequesturl")as HTMLInputElement).innerHTML;
        var type =  (document.getElementById("informationRequesttype")as HTMLInputElement).innerHTML;
        if(type !== ""){
            var algo = (document.getElementById("algo") as HTMLElement).innerHTML
            var auto;
            if(algo === "Algorithme : Automatic"){
                auto = "true"
            }else{
                auto = "false"
            }
            window.open(
                "/analyzeView?url="+url+"&type="+type+"&history=true"+"&auto="+auto,
                '_blank' // <- This is what makes it open in a new window.
              );
        }

    }

    return (
        <div id="ViewHistory" className="ViewHistory">
            <div id="ViewImage" className="ViewImage"></div>
            <button className="loadButton" id="loadButton" onClick={loadAnalyze}>Load analyze</button>
            <div id="title"></div>
            <div id="date"></div>
            <div id="database"></div>
            <div id="type"></div>
            <div id="algo"></div>
            <div id="param"></div>
            <div id="informationRequesturl" className="informationRequest"></div>
            <div id="informationRequesttype" className="informationRequest"></div>
            <div id="trashDiv"></div>
        </div>
    );
};

export default ViewHistory;