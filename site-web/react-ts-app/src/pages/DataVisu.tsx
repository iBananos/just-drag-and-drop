import BarreLaterale from "../components/BarreLaterale";
import Navigation from "../components/Navigation";
import * as utils from "../Utils";
var list : any[]= [];
const DataVisu = () =>  {    

    function requestDatabases(response : any){
        var listData= JSON.parse(response).liste;
        for(var i: number = 0 ; i < listData.length; i++){
            var data= listData[i];
            list.push(data);
            var option = document.createElement("option");
            option.innerHTML = data.name+"."+data.extension;
            option.value = data.name+"."+data.extension;
            document.getElementById("SelectDB")?.appendChild(option);
        }
    }

    window.onload= function(){
        utils.default.sendRequestWithToken('POST', 'http://localhost:4000/analyze/databases', "", requestDatabases);
    }


    function createSelectorForColonnes(){
        var firstcolumn = (document.getElementById("firstOne")as HTMLSelectElement);
        var secondcolumn = (document.getElementById("secondOne")as HTMLSelectElement);
        var thirdcolumn = (document.getElementById("thirdOne")as HTMLSelectElement);
        var base = (document.getElementById("SelectDB")as HTMLSelectElement).value;
        for(var i: number = 0 ; i < list.length; i++){
            if(list[i].name+"."+list[i].extension === base){
                var colonnes = list[i].colonnes;
                var colonnesString = list[i].colonnesString;
                firstcolumn.innerHTML = "";
                secondcolumn.innerHTML = "";
                thirdcolumn.innerHTML = "";
                var optiondefault = document.createElement("option");
                optiondefault.innerHTML = "Choose a column";
                optiondefault.value = "Choose a column";
                optiondefault.disabled = true;
                optiondefault.defaultSelected = true;
                var optiondefault2 = document.createElement("option");
                optiondefault2.innerHTML = "Choose a column";
                optiondefault2.value = "Choose a column";
                optiondefault2.disabled = true;
                optiondefault2.defaultSelected = true;
                var optiondefault3 = document.createElement("option");
                optiondefault3.innerHTML = "Choose a column";
                optiondefault3.value = "Choose a column";
                optiondefault3.disabled = true;
                optiondefault3.defaultSelected = true;
                firstcolumn.appendChild(optiondefault);
                secondcolumn.appendChild(optiondefault2);
                thirdcolumn.appendChild(optiondefault3);
                for(var y: number = 0 ; y < colonnes.length; y++){
                    if(!colonnesString.includes(colonnes[y]) && colonnes[y]!==""){
                        var option = document.createElement("option");
                        option.innerHTML = colonnes[y];
                        option.value = colonnes[y];
                        firstcolumn.appendChild(option);
                    }
                }
            }           
        }
        firstcolumn.disabled = false;
        secondcolumn.disabled = true;
        thirdcolumn.disabled = true;
        (document.getElementById("boutonSend")as HTMLButtonElement).disabled = true;
        
    }

    

    function createSelectorForSecondColonnes(){
        var firstcolumn = (document.getElementById("firstOne")as HTMLSelectElement);
        var secondcolumn = (document.getElementById("secondOne")as HTMLSelectElement);
        var thirdcolumn = (document.getElementById("thirdOne")as HTMLSelectElement);
        var base = (document.getElementById("SelectDB")as HTMLSelectElement).value;
        for(var i: number = 0 ; i < list.length; i++){
            if(list[i].name+"."+list[i].extension === base){
                var colonnes = list[i].colonnes;
                var colonnesString = list[i].colonnesString;
                secondcolumn.innerHTML = "";
                thirdcolumn.innerHTML = "";
                var optiondefault2 = document.createElement("option");
                optiondefault2.innerHTML = "Choose a column";
                optiondefault2.value = "Choose a column";
                optiondefault2.disabled = true;
                optiondefault2.defaultSelected = true;
                var optiondefault3 = document.createElement("option");
                optiondefault3.innerHTML = "Choose a column";
                optiondefault3.value = "Choose a column";
                optiondefault3.disabled = true;
                optiondefault3.defaultSelected = true;
                secondcolumn.appendChild(optiondefault2);
                thirdcolumn.appendChild(optiondefault3);
                for(var y: number = 0 ; y < colonnes.length; y++){
                    if(firstcolumn.value !== colonnes[y] && !colonnesString.includes(colonnes[y]) && colonnes[y]!==""){
                        var option = document.createElement("option");
                        option.innerHTML = colonnes[y];
                        option.value = colonnes[y];
                        secondcolumn.appendChild(option);
                    } 
                }
            }           
        }
        secondcolumn.disabled = false;
        thirdcolumn.disabled = true;
        (document.getElementById("boutonSend")as HTMLButtonElement).disabled = true;
    }

    function createSelectorForThirdColonnes(){
        var firstcolumn = (document.getElementById("firstOne")as HTMLSelectElement);
        var secondcolumn = (document.getElementById("secondOne")as HTMLSelectElement);
        var thirdcolumn = (document.getElementById("thirdOne")as HTMLSelectElement);
        var base = (document.getElementById("SelectDB")as HTMLSelectElement).value;
        for(var i: number = 0 ; i < list.length; i++){
            if(list[i].name+"."+list[i].extension === base){
                var colonnes = list[i].colonnesString;
                thirdcolumn.innerHTML = "";
                var optiondefault3 = document.createElement("option");
                optiondefault3.innerHTML = "Choose a column";
                optiondefault3.value = "Choose a column";
                optiondefault3.disabled = true;
                optiondefault3.defaultSelected = true;
                thirdcolumn.appendChild(optiondefault3);
                for(var y: number = 0 ; y < colonnes.length; y++){
                    if(firstcolumn.value !== colonnes[y] && secondcolumn.value !== colonnes[y] && colonnes[y]!==""){
                        var option = document.createElement("option");
                        option.innerHTML = colonnes[y];
                        option.value = colonnes[y];
                        thirdcolumn.appendChild(option);
                    } 
                }
            }           
        }
        thirdcolumn.disabled = false;
        (document.getElementById("boutonSend")as HTMLButtonElement).disabled = true;
    }


    function enableFirstOne(){
        createSelectorForColonnes()
    }
    function enableSecondOne(){
        createSelectorForSecondColonnes()
    }
    function enableThirdOne(){
        createSelectorForThirdColonnes()
    }
    
    function enableSubmit(){
        (document.getElementById("boutonSend")as HTMLButtonElement).disabled = false;
        (document.getElementById("boutonSend")as HTMLButtonElement).onclick = sendRequest;
    }

    
    function sendRequest(ev :any){
        console.log("envoie")
        var database = (document.getElementById("SelectDB") as HTMLSelectElement).value
        var firstOne = (document.getElementById("firstOne") as HTMLSelectElement).value
        var secondOne = (document.getElementById("secondOne") as HTMLSelectElement).value
        var thirdOne = (document.getElementById("thirdOne") as HTMLSelectElement).value
        var name = (document.getElementById("analyzeName") as HTMLInputElement).value;
        var date = new Date(Date.now()); 
        var requestAnalyze = JSON.stringify({
                                            "nameAnalyze":name,
                                            "database" : database,
                                            "date":date, 
                                            "firstOne":firstOne,
                                            "secondOne":secondOne,
                                            "thirdOne":thirdOne});
        (document.getElementById("view") as HTMLDivElement).style.display = "none";
        (document.getElementById("loading") as HTMLDivElement).style.display = "block";
        utils.default.sendRequestWithToken('POST', 'http://localhost:4000/dataVisu/parameters', requestAnalyze, callbackRequest);
        
    }
    function callbackRequest(response : any) {
        window.location.href = "http://localhost:3000/analyzeView?type=dataVisu&url="+response;
    }
    
   
    
    return (
        
        <div className="DataVisu">
            <div id="loading" className="loading">
            <div className="loading-content">
            <div className="loading-content__center-part">
            </div>
            <div className="loading-content__loader">
                <div className="loading-content__loader-content"></div>
            </div>
        </div>
            </div>
            <div className="view" id="view">
                <h1 className="title">Data Visualisation page</h1>
                <select name="database" id="SelectDB"defaultValue="Choose a database" className="SelectDB" onChange={enableFirstOne}>
                    <option value="Choose a database" disabled >Choose a database</option>
                </select>
              
                <select name="firstOne" id="firstOne"defaultValue="Choose a column" className="firstOne" onChange={enableSecondOne} disabled>
                    <option value="Choose a column" disabled >Choose a column</option>
                </select>
                <select name="secondOne" id="secondOne" defaultValue="Choose a column" className="firstOne" onChange={enableThirdOne} disabled>
                    <option value="Choose a column" disabled >Choose a column</option>
                </select>
                <select name="thirdOne" id="thirdOne" defaultValue="Choose a column" className="firstOne" onChange={enableSubmit} disabled>
                    <option value="Choose a column" disabled >Choose a column</option>
                </select>
                <br />
                
                <br />
                <div className="divDataVisuName" id="divinput">
                    <input type="text" className="dataVisuName" id="analyzeName" placeholder="Analyze name..." ></input>
                </div>

                <button  onClick={sendRequest} className="boutonSend" id="boutonSend" disabled>Analyze</button>
            </div>
            <BarreLaterale />
            <Navigation />
        </div>
    )
}

export default DataVisu;