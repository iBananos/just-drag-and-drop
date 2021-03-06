import BarreLaterale from "../components/BarreLaterale";
import InputNumber from "../components/InputNumber";
import Navigation from "../components/Navigation";
import help from "../assets/help.png";
import helpL from "../assets/helpLight.png";
import * as utils from "../Utils";
let list : any[]= [];
const Analyze = () =>  {    

    function requestDatabases(response : any){
        let listData= JSON.parse(response).liste;
        for(let i: number = 0 ; i < listData.length; i++){

            let data= listData[i];
            list.push(data);
            let option = document.createElement("option");
            option.innerHTML = data.name+"."+data.extension;
            option.value = data.name+"."+data.extension;
            document.getElementById("SelectDB")?.appendChild(option);
        }
    }


    function displayParameter(ev :any){
        let algo = ev.target.value;
        (document.getElementById("Automatic")as HTMLElement).style.display = "none";
        (document.getElementById("GradientBoosting")as HTMLElement).style.display = "none";
        (document.getElementById("RandomForest")as HTMLElement).style.display = "none";
        (document.getElementById("Ridge")as HTMLElement).style.display = "none";
        //(document.getElementById("BayesianARDRegression")as HTMLElement).style.display = "none";
        (document.getElementById("Automatic2")as HTMLElement).style.display = "none";
        (document.getElementById("LinearSVC")as HTMLElement).style.display = "none";
        (document.getElementById("AdaBoost")as HTMLElement).style.display = "none";
        (document.getElementById("GradientBoosting2")as HTMLElement).style.display = "none";
        (document.getElementById("RandomForest2")as HTMLElement).style.display = "none";
        (document.getElementById("LogisticRegression")as HTMLElement).style.display = "none";
        (document.getElementById('divinput') as HTMLInputElement).style.display = "block";
            if(algo === "Automatic"){
                (document.getElementById("Automatic")as HTMLElement).style.display = "block";
            }else if(algo === "GradientBoosting"){
                (document.getElementById("GradientBoosting")as HTMLElement).style.display = "block";
            }else if(algo === "RandomForest"){
                (document.getElementById("RandomForest")as HTMLElement).style.display = "block";
            }else if(algo === "Ridge"){
                (document.getElementById("Ridge")as HTMLElement).style.display = "block";
            }else if(algo === "BayesianARDRegression"){
                (document.getElementById("BayesianARDRegression")as HTMLElement).style.display = "block";
            }else if(algo === "Automatic2"){
                (document.getElementById("Automatic2")as HTMLElement).style.display = "block";
            }else if(algo === "LinearSVC"){
                (document.getElementById("LinearSVC")as HTMLElement).style.display = "block";
            }else if(algo === "AdaBoost"){
                (document.getElementById("AdaBoost")as HTMLElement).style.display = "block";
            }else if(algo === "GradientBoosting2"){
                (document.getElementById("GradientBoosting2")as HTMLElement).style.display = "block";
            }else if(algo === "RandomForest2"){
                (document.getElementById("RandomForest2")as HTMLElement).style.display = "block";
            }else if(algo === "LogisticRegression"){
                (document.getElementById("LogisticRegression")as HTMLElement).style.display = "block";
            }
         
    }
    let demo:any;
    window.onload= function(){
        const search = window.location.search; // returns the URL query String
        const params = new URLSearchParams(search); 
        demo = params.get('demo'); 
        if(demo === "true"){
            utils.default.sendRequestDemo('POST', '/api/analyze/databasesDemo', "", requestDatabases); 
        }else{
            utils.default.sendRequestWithToken('POST', '/api/analyze/databases', "", requestDatabases);
        }
        
    }

    function displayAlgorithmes(){
        let first = (document.getElementById("firstOne") as HTMLSelectElement).value;
        let base = (document.getElementById("SelectDB")as HTMLSelectElement).value;
        let algos1 = (document.getElementById("Algos1") as HTMLDivElement);
        let algos2 = (document.getElementById("Algos2") as HTMLDivElement);
        for(let i: number = 0 ; i < list.length; i++){
            if(list[i].name+"."+list[i].extension === base){
                let colonnesString = list[i].colonnesString;
                if(colonnesString.includes(first)){
                    algos1.style.display ="none";
                    algos2.style.display ="block";
                }else{
                    algos1.style.display ="block";
                    algos2.style.display ="none";
                }
                return
            }
        }
    }

    function enableCategory(){
        createSelectorForColonnes();
    }

    function createSelectorForColonnes(){
        let firstOne = (document.getElementById("firstOne")as HTMLSelectElement)
        let base = (document.getElementById("SelectDB")as HTMLSelectElement).value;
        for(let i: number = 0 ; i < list.length; i++){
            
            if(list[i].name+"."+list[i].extension === base){
                let colonnes = list[i].colonnes;
                firstOne.innerHTML = "";
                let optiondefault = document.createElement("option");
                optiondefault.innerHTML = "Choose a column";
                optiondefault.value = "Choose a column";
                optiondefault.disabled = true;
                optiondefault.defaultSelected = true;
                document.getElementById("firstOne")?.appendChild(optiondefault);
                let fauxSelect =document.getElementById("divSelectMultiple") as HTMLDivElement;
                fauxSelect.innerHTML = "";
                
                for(let y: number = 0 ; y < colonnes.length; y++){
                    if(colonnes[y] !==""){
                        let option = document.createElement("option");
                        option.innerHTML = colonnes[y];
                        option.value = colonnes[y];
                        document.getElementById("firstOne")?.appendChild(option);   
                    }
                    
                }
            }           
        }
        firstOne.disabled = false;
        
    }

    function enableSecondOne(){
        displayAlgorithmes()
        createSelectorForOthersColonnes()
    }

    function createSelectorForOthersColonnes(){
        let base = (document.getElementById("SelectDB")as HTMLSelectElement).value;
        let firstOne = (document.getElementById("firstOne")as HTMLSelectElement);
        for(let i: number = 0 ; i < list.length; i++){
            if(list[i].name+"."+list[i].extension === base){
                let colonnes = list[i].colonnes;
                let fauxSelect =document.getElementById("divSelectMultiple") as HTMLDivElement;
                fauxSelect.innerHTML = "";
                
                
                for(let y: number = 0 ; y < colonnes.length; y++){
                    if(colonnes[y] !== firstOne.value && colonnes[y]!==""){
                        let option = document.createElement("input");
                        option.className = "otherParam";
                        option.id = colonnes[y].toString();
                        option.type = "checkbox";
                        option.value = colonnes[y].toString();
                        option.name = "params"

                        let label = document.createElement('label');
                        label.htmlFor = colonnes[y].toString();
                        label.className ="parametersCheckbox";
                        label.innerHTML = colonnes[y].toString();
                        let br = document.createElement("br");

                        fauxSelect.appendChild(option);
                        fauxSelect.appendChild(label);
                        fauxSelect.appendChild(br);
                    }
                }
                fauxSelect.style.height = "0";
            }           
        }
    }

    let algoSend:string;
    function sendRequest(ev :any){
        let elements = document.getElementsByClassName("boutonSendanalyze");
        for(let x = 0; x < elements.length; x++) {
            (elements[x] as HTMLButtonElement).disabled = true;
        }
        //(document.getElementById("boutonSendanalyze") as HTMLButtonElement).disabled = true;
        algoSend = ev.target.value
        let database = (document.getElementById("SelectDB") as HTMLSelectElement).value
        let requestAnalyze : string ="";
        let name = (document.getElementById("analyzeName") as HTMLInputElement).value;
        let date = new Date(Date.now()); 
        let pred : string = (document.getElementById("firstOne") as HTMLSelectElement).value;
        let features :string[]= []
        for(let i: number = 0 ; i < list.length; i++){
            if(list[i].name+"."+list[i].extension === database){
                let colonnes = list[i].colonnes;
                for(let y: number = 0 ; y < colonnes.length; y++){
                    if((document.getElementById(colonnes[y]) as any)?.checked ===true){
                        features.push(colonnes[y])
                    }
                }
            }
        }
        if(algoSend === "Automatic"){
            requestAnalyze = JSON.stringify({"nameAnalyze":name,
                                            "database" : database,
                                            "date":date,
                                            "pred":pred,
                                            "feature":features,
                                            "category":"Regression",
                                            "algo":algoSend, 
                                            "params" : {
                                                
                                            }});
        }else if(algoSend === "GradientBoosting"){
                requestAnalyze = JSON.stringify({"nameAnalyze":name,
                                                "database" : database,
                                                "date":date,
                                                "pred":pred,
                                                "feature":features,
                                                "category":"Regression",
                                                "algo":algoSend, 
                                                "params" : {
                                                    "learning_rate" : (document.getElementById("learning_rate1")as HTMLInputElement).value,
                                                    "n_estimators" : (document.getElementById("n_estimators1")as HTMLInputElement).value,
                                                    "max_depth" : (document.getElementById("max_depth1")as HTMLInputElement).value,
                                                    "min_samples_split" : (document.getElementById("min_samples_split1")as HTMLInputElement).value
                                                }});
            }else if(algoSend === "RandomForest"){
                requestAnalyze = JSON.stringify({"nameAnalyze":name,
                                                "database" : database,
                                                "date":date,
                                                "pred":pred,
                                                "feature":features,
                                                "category":"Regression",
                                                "algo":algoSend, 
                                                "params" : {
                                                    "n_estimators" : (document.getElementById("n_estimators2")as HTMLInputElement).value,
                                                    "max_depth" : (document.getElementById("max_depth2")as HTMLInputElement).value,
                                                    "min_samples_split" : (document.getElementById("min_samples_split2")as HTMLInputElement).value
                                                }});
            }else if(algoSend === "Ridge"){
                requestAnalyze = JSON.stringify({"nameAnalyze":name,
                                                "database" : database,
                                                "date":date,
                                                "pred":pred,
                                                "feature":features,
                                                "category":"Regression",
                                                "algo":algoSend, 
                                                "params" : {
                                                    "tol" : (document.getElementById("tol3")as HTMLInputElement).value,
                                                    "solver" : (document.getElementById("solver3")as HTMLSelectElement).value,
                                                    "alpha" : (document.getElementById("alpha3")as HTMLInputElement).value}
                                                });
            }else if(algoSend === "Automatic2"){
                requestAnalyze = JSON.stringify({"nameAnalyze":name,
                                                "database" : database,
                                                "date":date,
                                                "pred":pred,
                                                "feature":features,
                                                "category":"Classification",
                                                "algo":algoSend, 
                                                "params" : {
                                                }});
            }else if(algoSend === "BayesianARDRegression"){
                requestAnalyze = JSON.stringify({"nameAnalyze":name,
                                                "database" : database,
                                                "date":date,
                                                "pred":pred,
                                                "feature":features,
                                                "category":"Regression",
                                                "algo":algoSend, 
                                                "params" : {
                                                    "n_iter" : (document.getElementById("n_iter4")as HTMLInputElement).value,
                                                    "tol" : (document.getElementById("tol4")as HTMLInputElement).value,
                                                    "alpha_1" : (document.getElementById("alpha_14")as HTMLInputElement).value,
                                                    "alpha_2" : (document.getElementById("alpha_24")as HTMLInputElement).value,
                                                    "lambda_1" : (document.getElementById("lambda_14")as HTMLInputElement).value,
                                                    "lambda_2" : (document.getElementById("lambda_24")as HTMLInputElement).value
                                                }});
            }
            if(algoSend === "LinearSVC"){
                requestAnalyze = JSON.stringify({"nameAnalyze":name,
                                                "database" : database,
                                                "date":date,
                                                "pred":pred,
                                                "feature":features,
                                                "category":"Classification",
                                                "algo":algoSend, 
                                                "params" : {
                                                    "penalty" : (document.getElementById("penalty5")as HTMLSelectElement).value,
                                                    "tol" : (document.getElementById("tol5")as HTMLInputElement).value,
                                                    "C" : (document.getElementById("C5")as HTMLInputElement).value,
                                                    "class_weight" : (document.getElementById("class_weight5")as HTMLSelectElement).value
                                                }});
            }else if(algoSend === "AdaBoost"){
                requestAnalyze = JSON.stringify({"nameAnalyze":name,
                                                "database" : database,
                                                "date":date,
                                                "pred":pred,
                                                "feature":features,
                                                "category":"Classification",
                                                "algo":algoSend, 
                                                "params" : {
                                                    "n_estimators" : (document.getElementById("n_estimators6")as HTMLInputElement).value,
                                                    "learning_rate" : (document.getElementById("learning_rate6")as HTMLInputElement).value
                                                }});
            }else if(algoSend === "GradientBoosting2"){
                requestAnalyze = JSON.stringify({"nameAnalyze":name,
                                                "database" : database,
                                                "date":date,
                                                "pred":pred,
                                                "feature":features,
                                                "category":"Classification",
                                                "algo":algoSend, 
                                                "params" : {
                                                    "learning_rate" : (document.getElementById("learning_rate7")as HTMLInputElement).value,
                                                    "n_estimators" : (document.getElementById("n_estimators7")as HTMLInputElement).value,
                                                    "max_depth" : (document.getElementById("max_depth7")as HTMLInputElement).value,
                                                    "min_samples_split" : (document.getElementById("min_samples_split7")as HTMLInputElement).value
                                                }});
            }else if(algoSend === "RandomForest2"){
                requestAnalyze = JSON.stringify({"nameAnalyze":name,
                                                "database" : database,
                                                "date":date,
                                                "pred":pred,
                                                "feature":features,
                                                "category":"Classification",
                                                "algo":algoSend, 
                                                "params" : {
                                                    "n_estimators" : (document.getElementById("n_estimators8")as HTMLInputElement).value,
                                                    "max_depth" : (document.getElementById("max_depth8")as HTMLInputElement).value,
                                                    "min_samples_split" : (document.getElementById("min_samples_split8")as HTMLInputElement).value,
                                                    "class_weight" : (document.getElementById("class_weight8")as HTMLSelectElement).value
                                                }});
            }else if(algoSend === "LogisticRegression"){
                requestAnalyze = JSON.stringify({"nameAnalyze":name,
                                                "database" : database,
                                                "date":date,
                                                "pred":pred,
                                                "feature":features,
                                                "category":"Classification",
                                                "algo":algoSend, 
                                                "params" : {
                                                    "penalty" : (document.getElementById("penalty9")as HTMLSelectElement).value,
                                                    "tol" : (document.getElementById("tol9")as HTMLInputElement).value,
                                                    "c" : (document.getElementById("c9")as HTMLInputElement).value,
                                                    "class_weight" : (document.getElementById("class_weight9")as HTMLSelectElement).value,
                                                    "max_iter" : (document.getElementById("max_iter9")as HTMLInputElement).value
                                                }});
        }
        console.log(requestAnalyze);
        (document.getElementById("reponseServeur") as HTMLParagraphElement).innerHTML = "Sending request, please wait...";
        
        (document.getElementById("loading") as HTMLDivElement).style.display = "block"
        if(demo === "true"){
            utils.default.sendRequestDemo('POST', '/api/analyze/parametersDemo', requestAnalyze, callbackRequest); 
        }else{
            utils.default.sendRequestWithToken('POST', '/api/analyze/parameters', requestAnalyze, callbackRequest);
        }
        
    }

    function callbackRequest(response : any) {
        (document.getElementById("loading") as HTMLDivElement).style.display = "none"
        console.log(response);
        let reponse = JSON.parse(response);
        let elements = document.getElementsByClassName("boutonSendanalyze");
        let auto = "false";
        if(algoSend === "Automatic"||algoSend === "Automatic2"){
            auto = "true"
        }
        for (let i = 0; i < elements.length; i++) {
            (elements[i] as HTMLButtonElement).disabled = false;
        }
        if (reponse.status !== "ok") {
            utils.default.doAlert("warning",reponse.message);
            (document.getElementById("reponseServeur") as HTMLParagraphElement).innerHTML = "";
        } else{
            //(document.getElementById("view") as HTMLDivElement).style.display = "none";
            //(document.getElementById("loading") as HTMLDivElement).style.display = "block";
            utils.default.doAlert("success","Check the new tab for the result !");
            (document.getElementById("reponseServeur") as HTMLParagraphElement).innerHTML = "Check the new tab for the result !";
            window.open(
                "/analyzeView?type="+reponse.category+"&url="+reponse.name+"&demo="+demo+"&history=false&auto="+auto,
                '_blank' // <- This is what makes it open in a new window.
              );
            //window.location.href = "/analyzeView?type="+reponse.category+"&url="+reponse.name;
        }
        
    }
    
    function developper(ev : any){
        let div = document.getElementById("divSelectMultiple") as HTMLDivElement;
        if(div.className === "divSelectMultipleOpen"){
            div.className = "divSelectMultipleClose";
        }else{
            div.className = "divSelectMultipleOpen";
        }
    }
    let sourceHelp;
    if(!localStorage.getItem("theme") || localStorage.getItem("theme")==='dark'){sourceHelp = help}else{sourceHelp = helpL}
  

    return (
        
        <div className="Analyze">
            
            <div className="view" id="view">
                <div className="blurAnalyze">
                <h1 className="title">Analyze page</h1>
                <select name="database" id="SelectDB"defaultValue="Choose a database" className="SelectDB" onChange={enableCategory}>
                    <option value="Choose a database" disabled >Choose a database</option>
                </select>
              
                <select name="firstOne" id="firstOne"defaultValue="Choose a column" className="first" onChange={enableSecondOne} disabled>
                    <option value="Choose a column" disabled >Choose a column</option>
                </select>
                <div className="boutonselect"onClick={developper}>Choose other parameters</div>
                <div id="divSelectMultiple" className="divSelectMultiple">
                
                </div>
                <br />
                
                <br />
                <div className="Algos1" id="Algos1">
                    <input className="checkbox-tools" type="radio" onClick={displayParameter}value="Automatic" name="algoPick" id="tool-0" />
						<label className="for-checkbox-tools" htmlFor="tool-0" >
                        Automatic
						</label>
                    <input className="checkbox-tools" type="radio" onClick={displayParameter}value="GradientBoosting" name="algoPick" id="tool-1" />
						<label className="for-checkbox-tools" htmlFor="tool-1" >
                        Gradient Boosting
						</label>
                    <input className="checkbox-tools" onClick={displayParameter}value="RandomForest" type="radio" name="algoPick" id="tool-2"/>
						<label className="for-checkbox-tools" htmlFor="tool-2">
                        Random Forest
						</label>
                    <input className="checkbox-tools" onClick={displayParameter}value="Ridge" type="radio" name="algoPick" id="tool-3"/>
					    <label className="for-checkbox-tools" htmlFor="tool-3">
                        Ridge
						</label>
                    
                </div>
                <div className="Algos2" id="Algos2">  
                    <input className="checkbox-tools" type="radio" onClick={displayParameter}value="Automatic2" name="algoPick" id="tool-10" />
						<label className="for-checkbox-tools" htmlFor="tool-10" >
                        Automatic
						</label>  
                    <input className="checkbox-tools" onClick={displayParameter}value="LinearSVC" type="radio" name="algoPick" id="tool-5"/>
						<label className="for-checkbox-tools" htmlFor="tool-5">
                        LinearSVC
						</label>
                    <input className="checkbox-tools" onClick={displayParameter} value="AdaBoost" type="radio" name="algoPick" id="tool-6"/>
						<label className="for-checkbox-tools" htmlFor="tool-6">
                        AdaBoost
						</label>
                    <input className="checkbox-tools" onClick={displayParameter}value="GradientBoosting2" type="radio" name="algoPick" id="tool-7"/>
						<label className="for-checkbox-tools" htmlFor="tool-7">
                        Gradient Boosting
						</label>
                    <input className="checkbox-tools" onClick={displayParameter}value="RandomForest2" type="radio" name="algoPick" id="tool-8"/>
						<label className="for-checkbox-tools" htmlFor="tool-8">
                        Random Forest
						</label>
                    <input className="checkbox-tools" onClick={displayParameter}value="LogisticRegression" type="radio" name="algoPick" id="tool-9"/>
						<label className="for-checkbox-tools" htmlFor="tool-9">
                        Logistic Regression
						</label>
                </div>
                <div className="Parametre">
                <div className="Automatic" id="Automatic">
                    <p className="infoAlgo">This is option chooses the best algorithm to get the best result.</p>
                <button value="Automatic" onClick={sendRequest} className="boutonSendanalyze" id="boutonSendanalyze">Analyze</button>
                </div>

                <div className="GradientBoosting" id="GradientBoosting">
                <p className="infoAlgo">Gradient boosting is a type of machine learning boost. It relies heavily on the prediction that the next model will reduce prediction errors when mixed with the previous ones. The main idea is to establish target results for this next model in order to minimize errors.</p>
                <table><tbody>
                    <tr><td>learning_rate <img src={sourceHelp} className="help" alt="" title="Determines the step size at each iteration while moving toward a minimum of a loss function"/></td><td><InputNumber  min="0"  step="0.1" defaultValue={0.1} id="learning_rate1"/></td>
                    <td>n_estimators <img src={sourceHelp} className="help" alt="" title="The number of boosting stages to perform"/></td><td><InputNumber  min="0" step="100" defaultValue={100} id="n_estimators1"/></td></tr>
                    <tr><td>max_depth <img src={sourceHelp} className="help" alt="" title="Maximum depth of the individual regression estimators"/></td><td><InputNumber  min="0" step="3" defaultValue={3} id="max_depth1"/>
                    </td><td>min_samples_split <img src={sourceHelp} className="help" alt="" title="The minimum number of samples required to split an internal node"/></td><td><InputNumber  min="0" step="2" defaultValue={2} id="min_samples_split1"/></td></tr>
                </tbody></table>
                <button value="GradientBoosting" onClick={sendRequest} className="boutonSendanalyze" id="boutonSendanalyze">Analyze</button>
                </div>
                <div className="RandomForest" id="RandomForest">
                <p className="infoAlgo">A random forest is a meta estimator that fits a number of classifying decision trees on various sub-samples of the dataset and uses averaging to improve the predictive accuracy and control over-fitting. </p>
                <table><tbody>
                    <tr><td>n_estimators <img src={sourceHelp} className="help" alt="" title="The number of trees in the forest"/></td><td><InputNumber  min="0" step="100" defaultValue={100} id="n_estimators2"/></td><td>max_depth <img src={sourceHelp} className="help" alt="" title="The maximum depth of the tree. If 0, then nodes are expanded until all leaves are pure or until all leaves contain less than min_samples_split samples"/></td><td><InputNumber  min="0" step="1" defaultValue={0} id="max_depth2"/></td></tr>
                    <tr><td>min_samples_split <img src={sourceHelp} className="help" alt="" title="The minimum number of samples required to split an internal node"/></td><td><InputNumber  min="0" step="2"defaultValue={2}  id="min_samples_split2"/></td></tr>
                </tbody></table>
                <button value="RandomForest" onClick={sendRequest} className="boutonSendanalyze" id="boutonSendanalyze">Analyze</button>
                </div>
                <div className="Ridge" id="Ridge">
                <p className="infoAlgo">This model solves a regression model where the loss function is the linear least squares function and regularization is given by the l2-norm.</p>
                <table><tbody>
                <tr><td>tol <img src={sourceHelp} className="help" alt="" title="Precision of the solution"/></td><td><InputNumber  min="0" step="0.001" defaultValue={0.001} id="tol3"/></td>
                    <td>solver <img src={sourceHelp} className="help" alt="" title="Solver to use in the computational routines"/></td><td><select  id="solver3" name="solver">
                        <option value="auto">auto</option>
                        <option value="svd">svd</option>
                        <option value="cholesky">cholesky</option>
                        <option value="lsqr">lsqr</option>
                        <option value="sparse_cg">sparse_cg</option>
                        <option value="sag">sag</option>
                        <option value="saga">saga</option>
                        <option value="lbfgs">lbfgs</option> </select></td></tr>
                    <tr><td>alpha <img src={sourceHelp} className="help" alt="" title="Regularization strength"/></td><td><InputNumber  min="0" step="1" defaultValue={1} id="alpha3"/></td></tr>
                    </tbody></table>
                    <button value="Ridge" onClick={sendRequest} className="boutonSendanalyze" id="boutonSendanalyze">Analyze</button>
                </div>
                <div className="Automatic2" id="Automatic2">
                <p className="infoAlgo">This is option chooses the best algorithm to get the best result.</p>
                <button value="Automatic2" onClick={sendRequest} className="boutonSendanalyze" id="boutonSendanalyze">Analyze</button>
                </div>
                <div className="BayesianARDRegression" id="BayesianARDRegression">
                <p className="infoAlgo">This is a Christel option.</p>
                <table><tbody>
                <tr><td>n_iter <img src={sourceHelp} className="help" alt="" title="Christel"/></td><td><InputNumber  min="0" step="300" defaultValue={300} id="n_iter4"/></td><td>tol <img src={sourceHelp} className="help" alt="" title="Christel"/></td><td><InputNumber  min="0" step="0.001" defaultValue={0.001} id="tol4"/></td></tr>
                <tr><td>alpha_1 <img src={sourceHelp} className="help" alt="" title="Christel"/></td><td><InputNumber  min="0" step="0.000001" defaultValue={0.000001} id="alpha_14"/></td><td>alpha_2 <img src={sourceHelp} className="help" alt="" title="Christel"/></td><td><InputNumber  min="0" step="0.000001" defaultValue={0.000001} id="alpha_24"/></td></tr>
                <tr><td>lambda_1 <img src={sourceHelp} className="help" alt="" title="Christel"/></td><td><InputNumber  min="0" step="0.000001" defaultValue={0.000001} id="lambda_14"/></td><td>lambda_2 <img src={sourceHelp} className="help" alt="" title="Christel"/></td><td><InputNumber  min="0" step="0.000001" defaultValue={0.000001} id="lambda_24"/></td></tr>
                    </tbody></table>
                    <button value="BayesianARDRegression" onClick={sendRequest} className="boutonSendanalyze" id="boutonSendanalyze">Analyze</button>
                </div>
                <div className="LinearSVC" id="LinearSVC">
                <p className="infoAlgo">Linear Support Vector Classification.</p>
                    <table><tbody>
                    <tr><td>penalty <img src={sourceHelp} className="help" alt="" title="Specifies the norm used in the penalization"/></td><td><select  id="penalty5" name="penalty">
                        <option value="l2">l2</option>
                        <option value="l1">l1</option></select></td><td>tol <img src={sourceHelp} className="help" alt="" title="Tolerance for stopping criteria"/></td><td><InputNumber  min="0" step="0.0001" defaultValue={0.0001} id="tol5"/></td></tr>
                        <tr><td>C <img src={sourceHelp} className="help" alt="" title="Regularization parameter"/></td><td><InputNumber  min="0" step="1" defaultValue={1} id="C5"/></td><td>class_weight <img src={sourceHelp} className="help" alt="" title="Attributes weight to each class"/></td><td><select  id="class_weight5" name="class_weight">
                        <option value="none">none</option>
                        <option value="balanced">balanced</option></select></td></tr>
                        </tbody></table>
                        <button value="LinearSVC" onClick={sendRequest} className="boutonSendanalyze" id="boutonSendanalyze">Analyze</button>
                </div>
                <div className="AdaBoost" id="AdaBoost">
                <p className="infoAlgo">An AdaBoost classifier is a meta-estimator that begins by fitting a classifier on the original dataset and then fits additional copies of the classifier on the same dataset but where the weights of incorrectly classified instances are adjusted such that subsequent classifiers focus more on difficult cases.</p>
                <table><tbody>
                <tr><td>n_estimators <img src={sourceHelp} className="help" alt="" title="The maximum number of estimators at which boosting is terminated"/></td><td><InputNumber  min="0" step="50" defaultValue={50} id="n_estimators6"/></td><td>learning_rate <img src={sourceHelp} className="help" alt="" title="Weight applied to each classifier at each boosting iteration"/></td><td><InputNumber  min="0" step="1"  defaultValue={1} id="learning_rate6"/></td></tr>
                    </tbody></table>
                    <button value="AdaBoost" onClick={sendRequest} className="boutonSendanalyze" id="boutonSendanalyze">Analyze</button>
                </div>
                <div className="GradientBoosting2" id="GradientBoosting2">
                <p className="infoAlgo">Gradient boosting is a type of machine learning boost. It relies heavily on the prediction that the next model will reduce prediction errors when mixed with the previous ones. The main idea is to establish target results for this next model in order to minimize errors.</p>
                <table><tbody>
                <tr><td>learning_rate <img src={sourceHelp} className="help" alt="" title="Determines the step size at each iteration while moving toward a minimum of a loss function"/></td><td><InputNumber  min="0" step="0.1" defaultValue={0.1} id="learning_rate7"/></td><td>n_estimators <img src={sourceHelp} className="help" alt="" title="The number of boosting stages to perform"/></td><td><InputNumber  min="0" step="100" defaultValue={100} id="n_estimators7"/></td></tr>
                <tr><td>max_depth <img src={sourceHelp} className="help" alt="" title="The maximum depth of the individual regression estimators"/></td><td><InputNumber  min="0" step="3" defaultValue={3} id="max_depth7"/></td><td>min_samples_split <img src={sourceHelp} className="help" alt="" title="The minimum number of samples required to be at a leaf node"/></td><td><InputNumber  min="0" step="2" defaultValue={2} id="min_samples_split7"/></td></tr>
                    </tbody></table>
                    <button value="GradientBoosting2" onClick={sendRequest} className="boutonSendanalyze" id="boutonSendanalyze">Analyze</button>
                </div>
                <div className="RandomForest2" id="RandomForest2">
                <p className="infoAlgo">A random forest is a meta estimator that fits a number of decision tree classifiers on various sub-samples of the dataset and uses averaging to improve the predictive accuracy and control over-fitting.</p>
                <table><tbody>
                <tr><td>n_estimators <img src={sourceHelp} className="help" alt="" title="The number of trees in the forest"/></td><td><InputNumber  min="0" step="100" defaultValue={100} id="n_estimators8"/></td><td>max_depth <img src={sourceHelp} className="help" alt="" title="The maximum depth of the individual regression estimators"/></td><td><InputNumber  min="0" step="1" defaultValue={3} id="max_depth8"/></td></tr>
                <tr><td>min_samples_split <img src={sourceHelp} className="help" alt="" title="The minimum number of samples required to split an internal node"/></td><td><InputNumber  min="0" step="2" defaultValue={2} id="min_samples_split8"/></td><td>class_weight <img src={sourceHelp} className="help" alt="" title="The maximum depth of the individual regression estimators"/></td><td><select  id="class_weight8" name="class_weight">
                        <option value="none">none</option>
                        <option value="balanced">balanced</option>
                        </select></td></tr>
                        </tbody></table>
                        <button value="RandomForest2" onClick={sendRequest} className="boutonSendanalyze" id="boutonSendanalyze">Analyze</button>
                </div>
                <div className="LogisticRegression" id="LogisticRegression">
                <p className="infoAlgo">Logistic regression models the probabilities for classification problems with two possible outcomes. It???s an extension of the linear regression model for classification problems.</p>
                <table><tbody>
                <tr><td>penalty <img src={sourceHelp} className="help" alt="" title="Specifies the norm used in the penalization"/></td><td><select  id="penalty9" name="penalty">
                        <option value="l2">l2</option>
                        <option value="l1">l1</option>
                        <option value="elasticnet">elasticnet</option>
                        <option value="none">none</option></select></td><td>tol <img src={sourceHelp} className="help" alt="" title="Tolerance for stopping criteria"/></td><td><InputNumber  min="0" step="0.0001" defaultValue={0.0001} id="tol9"/></td></tr>
                        <tr><td>c <img src={sourceHelp} className="help" alt="" title="Inverse of regularization strength"/></td><td><InputNumber  min="0" step="1" defaultValue={1} id="c9"/></td><td>class_weight <img src={sourceHelp} className="help" alt="" title="Weights associated with classes"/></td><td><select  id="class_weight9" name="class_weight">
                        <option value="none">none</option>
                        <option value="balanced">balanced</option></select></td></tr>
                        <tr><td>max_iter <img src={sourceHelp} className="help" alt="" title="Maximum number of iterations taken for the solvers to converge"/></td><td><InputNumber  min="0" step="100" defaultValue={100} id="max_iter9"/></td></tr>
                    </tbody></table>
                    <button value="LogisticRegression" onClick={sendRequest} className="boutonSendanalyze" id="boutonSendanalyze">Analyze</button>
                </div>
                </div>
                <div className="divinput" id="divinput">
                    <input type="text" className="analyzeName" id="analyzeName" placeholder="Analyze name..."></input>
                    <p id="reponseServeur"></p>
                </div>

            </div>
            </div>
            <div id="loading" className="loading">
            <div className="loading-content">
            <div className="loading-content__center-part">
            </div>
            <div className="loading-content__loader">
                <div className="loading-content__loader-content"></div>
            </div>
            </div>
            </div>
            <BarreLaterale />
            <Navigation />
        </div>
    )
}

export default Analyze;