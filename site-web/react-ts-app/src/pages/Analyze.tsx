import BarreLaterale from "../components/BarreLaterale";
import InputNumber from "../components/InputNumber";
import Navigation from "../components/Navigation";
import help from "../assets/help.png";
import * as utils from "../Utils";
var list : any[]= [];
const Analyze = () =>  {    

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


    function displayParameter(ev :any){
        var algo = ev.target.value;
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
    var demo:any;
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
        var first = (document.getElementById("firstOne") as HTMLSelectElement).value;
        var base = (document.getElementById("SelectDB")as HTMLSelectElement).value;
        var algos1 = (document.getElementById("Algos1") as HTMLDivElement);
        var algos2 = (document.getElementById("Algos2") as HTMLDivElement);
        for(var i: number = 0 ; i < list.length; i++){
            if(list[i].name+"."+list[i].extension === base){
                var colonnesString = list[i].colonnesString;
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
        var firstOne = (document.getElementById("firstOne")as HTMLSelectElement)
        var base = (document.getElementById("SelectDB")as HTMLSelectElement).value;
        for(var i: number = 0 ; i < list.length; i++){
            
            if(list[i].name+"."+list[i].extension === base){
                var colonnes = list[i].colonnes;
                firstOne.innerHTML = "";
                var optiondefault = document.createElement("option");
                optiondefault.innerHTML = "Choose a column";
                optiondefault.value = "Choose a column";
                optiondefault.disabled = true;
                optiondefault.defaultSelected = true;
                document.getElementById("firstOne")?.appendChild(optiondefault);
                var fauxSelect =document.getElementById("divSelectMultiple") as HTMLDivElement;
                fauxSelect.innerHTML = "";
                
                for(var y: number = 0 ; y < colonnes.length; y++){
                    if(colonnes[y] !==""){
                        var option = document.createElement("option");
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
        var base = (document.getElementById("SelectDB")as HTMLSelectElement).value;
        var firstOne = (document.getElementById("firstOne")as HTMLSelectElement);
        for(var i: number = 0 ; i < list.length; i++){
            if(list[i].name+"."+list[i].extension === base){
                var colonnes = list[i].colonnes;
                var fauxSelect =document.getElementById("divSelectMultiple") as HTMLDivElement;
                fauxSelect.innerHTML = "";
                
                
                for(var y: number = 0 ; y < colonnes.length; y++){
                    if(colonnes[y] !== firstOne.value && colonnes[y]!==""){
                        var option = document.createElement("input");
                        option.className = "otherParam";
                        option.id = colonnes[y].toString();
                        option.type = "checkbox";
                        option.value = colonnes[y].toString();
                        option.name = "params"

                        var label = document.createElement('label');
                        label.htmlFor = colonnes[y].toString();
                        label.className ="parametersCheckbox";
                        label.innerHTML = colonnes[y].toString();
                        var br = document.createElement("br");

                        fauxSelect.appendChild(option);
                        fauxSelect.appendChild(label);
                        fauxSelect.appendChild(br);
                    }
                }
                fauxSelect.style.height = "0";
            }           
        }
    }

    var algoSend:string;
    function sendRequest(ev :any){
        var elements = document.getElementsByClassName("boutonSendanalyze");
        for(var x = 0; x < elements.length; x++) {
            (elements[x] as HTMLButtonElement).disabled = true;
        }
        //(document.getElementById("boutonSendanalyze") as HTMLButtonElement).disabled = true;
        algoSend = ev.target.value
        var database = (document.getElementById("SelectDB") as HTMLSelectElement).value
        var requestAnalyze : string ="";
        var name = (document.getElementById("analyzeName") as HTMLInputElement).value;
        var date = new Date(Date.now()); 
        var pred : string = (document.getElementById("firstOne") as HTMLSelectElement).value;
        var features :string[]= []
        for(var i: number = 0 ; i < list.length; i++){
            if(list[i].name+"."+list[i].extension === database){
                var colonnes = list[i].colonnes;
                for(var y: number = 0 ; y < colonnes.length; y++){
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
        
        
        if(demo === "true"){
            utils.default.sendRequestDemo('POST', '/api/analyze/parametersDemo', requestAnalyze, callbackRequest); 
        }else{
            utils.default.sendRequestWithToken('POST', '/api/analyze/parameters', requestAnalyze, callbackRequest);
        }
        
    }

    function callbackRequest(response : any) {
        console.log(response);
        var reponse = JSON.parse(response);
        var elements = document.getElementsByClassName("boutonSendanalyze");
        var auto = "false";
        if(algoSend === "Automatic"){
            auto = "true"
        }
        for (var i = 0; i < elements.length; i++) {
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
        var div = document.getElementById("divSelectMultiple") as HTMLDivElement;
        if(div.className === "divSelectMultipleOpen"){
            div.className = "divSelectMultipleClose";
        }else{
            div.className = "divSelectMultipleOpen";
        }
    }

    return (
        
        <div className="Analyze">
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
                    <p>This is a beta option.</p>
                <button value="Automatic" onClick={sendRequest} className="boutonSendanalyze" id="boutonSendanalyze">Analyze</button>
                </div>

                <div className="GradientBoosting" id="GradientBoosting">
                <table><tbody>
                    <tr><td>learning_rate <img src={help} className="help" alt="" title="Learning rate shrinks the contribution of each tree by learning_rate.
There is a trade-off between learning_rate and n_estimators."/></td><td><InputNumber  min="0"  step="0.1" defaultValue={0.1} id="learning_rate1"/></td>
                    <td>n_estimators <img src={help} className="help" alt="" title="The number of boosting stages to perform. Gradient boosting is fairly
robust to over-fitting so a large number usually results in better performance."/></td><td><InputNumber  min="0" step="100" defaultValue={100} id="n_estimators1"/></td></tr>
                    <tr><td>max_depth <img src={help} className="help" alt="" title="Maximum depth of the individual regression estimators. 
                    The maximum depth limits the number of nodes in the tree. 
                    Tune this parameter for best performance; 
                    the best value depends on the interaction of the input variables."/></td><td><InputNumber  min="0" step="3" defaultValue={3} id="max_depth1"/></td><td>min_samples_split <img src={help} className="help" alt="" title="The minimum number of samples required to split an internal node:
- If int, then consider min_samples_split as the minimum number.
- If float, then min_samples_split is a fraction and ceil(min_samples_split * n_samples) are the minimum number of samples for each split.
"/></td><td><InputNumber  min="0" step="2" defaultValue={2} id="min_samples_split1"/></td></tr>
                </tbody></table>
                <button value="GradientBoosting" onClick={sendRequest} className="boutonSendanalyze" id="boutonSendanalyze">Analyze</button>
                </div>
                <div className="RandomForest" id="RandomForest">
                <table><tbody>
                    <tr><td>n_estimators <img src={help} className="help" alt="" title="The number of trees in the forest."/></td><td><InputNumber  min="0" step="100" defaultValue={100} id="n_estimators2"/></td><td>max_depth <img src={help} className="help" alt="" title="The maximum depth of the tree. If None, then nodes are expanded
until all leaves are pure or until all leaves contain less than
min_samples_split samples.
"/></td><td><InputNumber  min="0" step="1" defaultValue={0} id="max_depth2"/></td></tr>
                    <tr><td>min_samples_split <img src={help} className="help" alt="" title="The minimum number of samples required to split an internal node:
- If int, then consider min_samples_split as the minimum number.
- If float, then min_samples_split is a fraction and ceil(min_samples_split * n_samples) 
    are the minimum number of samples for each split.
"/></td><td><InputNumber  min="0" step="2"defaultValue={2}  id="min_samples_split2"/></td></tr>
                </tbody></table>
                <button value="RandomForest" onClick={sendRequest} className="boutonSendanalyze" id="boutonSendanalyze">Analyze</button>
                </div>
                <div className="Ridge" id="Ridge">
                <table><tbody>
                    <tr><td>tol <img src={help} className="help" alt="" title="Precision of the solution."/></td><td><InputNumber  min="0" step="0.001" defaultValue={0.001} id="tol3"/></td><td>solver <img src={help} className="help" alt="" title="Solver to use in the computational routines:
- ‘auto’ chooses the solver automatically based on the type of data.
- ‘svd’ uses a Singular Value Decomposition of X to compute the Ridge coefficients. More stable for singular matrices than ‘cholesky’.
- ‘cholesky’ uses the standard scipy.linalg.solve function to obtain a closed-form solution.
- ‘sparse_cg’ uses the conjugate gradient solver as found in scipy.sparse.linalg.cg. As an iterative algorithm, this solver is more appropriate than ‘cholesky’ for large-scale data (possibility to set tol and max_iter).
- ‘lsqr’ uses the dedicated regularized least-squares routine scipy.sparse.linalg.lsqr. It is the fastest and uses an iterative procedure.
- ‘sag’ uses a Stochastic Average Gradient descent, and ‘saga’ uses its improved, unbiased version named SAGA. Both methods also use an iterative procedure, and are often faster than other solvers when both n_samples and n_features are large. Note that ‘sag’ and ‘saga’ fast convergence is only guaranteed on features with approximately the same scale. You can preprocess the data with a scaler from sklearn.preprocessing.
- ‘lbfgs’ uses L-BFGS-B algorithm implemented in scipy.optimize.minimize. It can be used only when positive is True.
All last six solvers support both dense and sparse data. However, only ‘sag’, ‘sparse_cg’, and ‘lbfgs’ support sparse input when fit_intercept is True.
"/></td><td><select  id="solver3" name="solver">
                        <option value="auto">auto</option>
                        <option value="svd">svd</option>
                        <option value="cholesky">cholesky</option>
                        <option value="lsqr">lsqr</option>
                        <option value="sparse_cg">sparse_cg</option>
                        <option value="sag">sag</option>
                        <option value="saga">saga</option>
                        <option value="lbfgs">lbfgs</option> </select></td></tr>
                    <tr><td>alpha <img src={help} className="help" alt="" title="Regularization strength; must be a positive float. Regularization
improves the conditioning of the problem and reduces the variance of
the estimates. Larger values specify stronger regularization. Alpha 
corresponds to 1 / (2C) in other linear models such
as LogisticRegression or LinearSVC. If an array is passed, penalties are
assumed to be specific to the targets. Hence they must correspond in
number."/></td><td><InputNumber  min="0" step="1" defaultValue={1} id="alpha3"/></td></tr>
                    </tbody></table>
                    <button value="Ridge" onClick={sendRequest} className="boutonSendanalyze" id="boutonSendanalyze">Analyze</button>
                </div>
                <div className="Automatic2" id="Automatic2">
                    <p>This is a beta option.</p>
                <button value="Automatic2" onClick={sendRequest} className="boutonSendanalyze" id="boutonSendanalyze">Analyze</button>
                </div>
                <div className="BayesianARDRegression" id="BayesianARDRegression">
                <table><tbody>
                <tr><td>n_iter <img src={help} className="help" alt="" title="Maximum number of iterations."/></td><td><InputNumber  min="0" step="300" defaultValue={300} id="n_iter4"/></td><td>tol <img src={help} className="help" alt="" title="Stop the algorithm if w has converged."/></td><td><InputNumber  min="0" step="0.001" defaultValue={0.001} id="tol4"/></td></tr>
                <tr><td>alpha_1 <img src={help} className="help" alt="" title="Hyper-parameter : shape parameter for the Gamma distribution prior
over the alpha parameter."/></td><td><InputNumber  min="0" step="0.000001" defaultValue={0.000001} id="alpha_14"/></td><td>alpha_2 <img src={help} className="help" alt="" title="Hyper-parameter : inverse scale parameter (rate parameter) for the
Gamma distribution prior over the alpha parameter."/></td><td><InputNumber  min="0" step="0.000001" defaultValue={0.000001} id="alpha_24"/></td></tr>
                <tr><td>lambda_1 <img src={help} className="help" alt="" title="Hyper-parameter : shape parameter for the Gamma distribution prior
over the lambda parameter."/></td><td><InputNumber  min="0" step="0.000001" defaultValue={0.000001} id="lambda_14"/></td><td>lambda_2 <img src={help} className="help" alt="" title="Hyper-parameter : inverse scale parameter (rate parameter) for the
Gamma distribution prior over the lambda parameter."/></td><td><InputNumber  min="0" step="0.000001" defaultValue={0.000001} id="lambda_24"/></td></tr>
                    </tbody></table>
                    <button value="BayesianARDRegression" onClick={sendRequest} className="boutonSendanalyze" id="boutonSendanalyze">Analyze</button>
                </div>
                <div className="LinearSVC" id="LinearSVC">
                    <table><tbody>
                    <tr><td>penalty <img src={help} className="help" alt="" title="Specifies the norm used in the penalization. The ‘l2’ penalty is the
standard used in SVC. The ‘l1’ leads to coef_ vectors that are sparse."/></td><td><select  id="penalty5" name="penalty">
                        <option value="l2">l2</option>
                        <option value="l1">l1</option></select></td><td>tol <img src={help} className="help" alt="" title="Tolerance for stopping criteria."/></td><td><InputNumber  min="0" step="0.0001" defaultValue={0.0001} id="tol5"/></td></tr>
                        <tr><td>C <img src={help} className="help" alt="" title="Regularization parameter. The strength of the regularization is
inversely proportional to C. Must be strictly positive.
"/></td><td><InputNumber  min="0" step="1" defaultValue={1} id="C5"/></td><td>class_weight <img src={help} className="help" alt="" title="Set the parameter C of class i to class_weight[i]*C for SVC. If not given,
all classes are supposed to have weight one. The “balanced” mode uses the
values of y to automatically adjust weights inversely proportional to class
frequencies in the input data as n_samples / (n_classes * np.bincount(y))."/></td><td><select  id="class_weight5" name="class_weight">
                        <option value="none">none</option>
                        <option value="balanced">balanced</option></select></td></tr>
                        </tbody></table>
                        <button value="LinearSVC" onClick={sendRequest} className="boutonSendanalyze" id="boutonSendanalyze">Analyze</button>
                </div>
                <div className="AdaBoost" id="AdaBoost">
                <table><tbody>
                <tr><td>n_estimators <img src={help} className="help" alt="" title="The maximum number of estimators at which boosting is terminated.
In case of perfect fit, the learning procedure is stopped early."/></td><td><InputNumber  min="0" step="50" defaultValue={50} id="n_estimators6"/></td><td>learning_rate <img src={help} className="help" alt="" title="Weight applied to each classifier at each boosting iteration. A higher
learning rate increases the contribution of each classifier. There is a
trade-off between the learning_rate and n_estimators parameters."/></td><td><InputNumber  min="0" step="1"  defaultValue={1} id="learning_rate6"/></td></tr>
                    </tbody></table>
                    <button value="AdaBoost" onClick={sendRequest} className="boutonSendanalyze" id="boutonSendanalyze">Analyze</button>
                </div>
                <div className="GradientBoosting2" id="GradientBoosting2">
                <table><tbody>
                <tr><td>learning_rate <img src={help} className="help" alt="" title=""/></td><td><InputNumber  min="0" step="0.1" defaultValue={0.1} id="learning_rate7"/></td><td>n_estimators <img src={help} className="help" alt="" title=""/></td><td><InputNumber  min="0" step="100" defaultValue={100} id="n_estimators7"/></td></tr>
                <tr><td>max_depth <img src={help} className="help" alt="" title=""/></td><td><InputNumber  min="0" step="3" defaultValue={3} id="max_depth7"/></td><td>min_samples_split <img src={help} className="help" alt="" title=""/></td><td><InputNumber  min="0" step="2" defaultValue={2} id="min_samples_split7"/></td></tr>
                    </tbody></table>
                    <button value="GradientBoosting2" onClick={sendRequest} className="boutonSendanalyze" id="boutonSendanalyze">Analyze</button>
                </div>
                <div className="RandomForest2" id="RandomForest2">
                <table><tbody>
                <tr><td>n_estimators <img src={help} className="help" alt="" title=""/></td><td><InputNumber  min="0" step="100" defaultValue={100} id="n_estimators8"/></td><td>max_depth <img src={help} className="help" alt="" title=""/></td><td><InputNumber  min="0" step="1" defaultValue={3} id="max_depth8"/></td></tr>
                <tr><td>min_samples_split <img src={help} className="help" alt="" title=""/></td><td><InputNumber  min="0" step="2" defaultValue={2} id="min_samples_split8"/></td><td>class_weight <img src={help} className="help" alt="" title="Weights associated with classes in the form
{class_label: weight}. If not given, all classes are supposed to have
weight one. For multi-output problems, a list of dicts can be provided
in the same order as the columns of y. Note that for multioutput
(including multilabel) weights should be defined for each class of every
column in its own dict. For example, for four-class multilabel
classification weights should be [{0: 1, 1: 1}, {0: 1, 1: 5}, {0: 1, 1: 1}, {0:
1, 1: 1}] instead of [{1:1}, {2:5}, {3:1}, {4:1}]. The “balanced” mode uses
the values of y to automatically adjust weights inversely proportional
to class frequencies in the input data as n_samples / (n_classes *
np.bincount(y)) The “balanced_subsample” mode is the same as
“balanced” except that weights are computed based on the bootstrap
sample for every tree grown. For multi-output, the weights of each
column of y will be multiplied. Note that these weights will be
multiplied with sample_weight (passed through the fit method) if
sample_weight is specified.
"/></td><td><select  id="class_weight8" name="class_weight">
                        <option value="none">none</option>
                        <option value="balanced">balanced</option>
                        </select></td></tr>
                        </tbody></table>
                        <button value="RandomForest2" onClick={sendRequest} className="boutonSendanalyze" id="boutonSendanalyze">Analyze</button>
                </div>
                <div className="LogisticRegression" id="LogisticRegression">
                <table><tbody>
                <tr><td>penalty <img src={help} className="help" alt="" title="Specify the norm
of the penalty: 'none': no penalty is added; 'l2': add a L2 penalty term
and it is the default choice; 'l1': add a L1 penalty term; 'elasticnet':
both L1 and L2 penalty terms are added."/></td><td><select  id="penalty9" name="penalty">
                        <option value="l2">l2</option>
                        <option value="l1">l1</option>
                        <option value="elasticnet">elasticnet</option>
                        <option value="none">none</option></select></td><td>tol <img src={help} className="help" alt="" title="Tolerance for stopping criteria. "/></td><td><InputNumber  min="0" step="0.0001" defaultValue={0.0001} id="tol9"/></td></tr>
                        <tr><td>c <img src={help} className="help" alt="" title="Inverse of regularization strength; must be a positive float. Like in
support vector machines, smaller values specify stronger
regularization."/></td><td><InputNumber  min="0" step="1" defaultValue={1} id="c9"/></td><td>class_weight <img src={help} className="help" alt="" title="Weights associated
with classes in the form {class_label: weight}. If not given, all classes
are supposed to have weight one. The “balanced” mode uses the
values of y to automatically adjust weights inversely proportional to
class frequencies in the input data as n_samples / (n_classes *
np.bincount(y)). Note that these weights will be multiplied with
sample_weight (passed through the fit method) if sample_weight is
specified. New in version 0.17: class_weight=’balanced’"/></td><td><select  id="class_weight9" name="class_weight">
                        <option value="none">none</option>
                        <option value="balanced">balanced</option></select></td></tr>
                        <tr><td>max_iter <img src={help} className="help" alt="" title="Maximum number of iterations taken for the solvers to converge."/></td><td><InputNumber  min="0" step="100" defaultValue={100} id="max_iter9"/></td></tr>
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
            <BarreLaterale />
            <Navigation />
        </div>
    )
}

export default Analyze;