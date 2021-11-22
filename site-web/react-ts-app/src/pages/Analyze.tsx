import { stringify } from "querystring";
import BarreLaterale from "../components/BarreLaterale";
import InputNumber from "../components/InputNumber";
import Navigation from "../components/Navigation";

const Analyze = () =>  {
    

    function displayParameter(ev :any){
        console.log(ev.target.value)
        var algo = ev.target.value
        var textH3 = (document.getElementById("textalgo") as HTMLElement)
        textH3.innerHTML = "Paramètre pour l'algorithme "+algo;
        (document.getElementById("GradientBoosting")as HTMLElement).style.display = "none";
        (document.getElementById("RandomForest")as HTMLElement).style.display = "none";
        (document.getElementById("Ridge")as HTMLElement).style.display = "none";
        (document.getElementById("BayesianARDRegression")as HTMLElement).style.display = "none";
        (document.getElementById("LinearSVC")as HTMLElement).style.display = "none";
        (document.getElementById("AdaBoost")as HTMLElement).style.display = "none";
        (document.getElementById("GradientBoosting2")as HTMLElement).style.display = "none";
        (document.getElementById("RandomForest2")as HTMLElement).style.display = "none";
        (document.getElementById("LogisticRegression")as HTMLElement).style.display = "none";
        if(algo === "GradientBoosting"){
            (document.getElementById("GradientBoosting")as HTMLElement).style.display = "block";
        }else if(algo === "RandomForest"){
            (document.getElementById("RandomForest")as HTMLElement).style.display = "block";
        }else if(algo === "Ridge"){
            (document.getElementById("Ridge")as HTMLElement).style.display = "block";
        }else if(algo === "BayesianARDRegression"){
            (document.getElementById("BayesianARDRegression")as HTMLElement).style.display = "block";
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

    function displayAlgorithmes(){
        var category = (document.getElementById("category") as HTMLSelectElement).value;
        var algos1 = (document.getElementById("Algos1") as HTMLDivElement);
        var algos2 = (document.getElementById("Algos2") as HTMLDivElement);
        if(category ==="Regression"){
            algos1.style.display ="block";
            algos2.style.display ="none";
        }else{
            algos1.style.display ="none";
            algos2.style.display ="block";
        }

    }

    function enableCategory(){
        (document.getElementById("category") as HTMLSelectElement).disabled = false;
    }

    function sendRequest(ev :any){
        console.log(ev.target.value)
        var algo = ev.target.value
        var requestAnalyze : string ="";
        if(algo === "GradientBoosting"){
            requestAnalyze = JSON.stringify({"algo":algo, 
                                            "learning_rate" : (document.getElementById("learning_rate1")as HTMLInputElement).value,
                                            "n_estimator" : (document.getElementById("n_estimator1")as HTMLInputElement).value,
                                            "max_depth" : (document.getElementById("max_depth1")as HTMLInputElement).value,
                                            "min_samples_split" : (document.getElementById("min_samples_split1")as HTMLInputElement).value
                                        });
        }else if(algo === "RandomForest"){
            requestAnalyze = JSON.stringify({"algo":algo, 
                                            "n_estimators" : (document.getElementById("n_estimators2")as HTMLInputElement).value,
                                            "max_depth" : (document.getElementById("max_depth2")as HTMLInputElement).value,
                                            "min_samples_split" : (document.getElementById("min_samples_split2")as HTMLInputElement).value
                                        });
        }else if(algo === "Ridge"){
            requestAnalyze = JSON.stringify({"algo":algo, 
                                            "tol" : (document.getElementById("tol3")as HTMLInputElement).value,
                                            "solver" : (document.getElementById("solver3")as HTMLSelectElement).value,
                                            "alpha" : (document.getElementById("alpha3")as HTMLInputElement).value
                                        });
        }else if(algo === "BayesianARDRegression"){
            requestAnalyze = JSON.stringify({"algo":algo, 
                                            "n_iter" : (document.getElementById("n_iter4")as HTMLInputElement).value,
                                            "tol" : (document.getElementById("tol4")as HTMLInputElement).value,
                                            "alpha_1" : (document.getElementById("alpha_14")as HTMLInputElement).value,
                                            "alpha_2" : (document.getElementById("alpha_24")as HTMLInputElement).value,
                                            "lambda_1" : (document.getElementById("lambda_14")as HTMLInputElement).value,
                                            "lambda_2" : (document.getElementById("lambda_24")as HTMLInputElement).value
                                        });
        }else if(algo === "LinearSVC"){
            requestAnalyze = JSON.stringify({"algo":algo, 
                                            "penalty" : (document.getElementById("penalty5")as HTMLSelectElement).value,
                                            "tol" : (document.getElementById("tol5")as HTMLInputElement).value,
                                            "C" : (document.getElementById("C5")as HTMLInputElement).value,
                                            "class_weight" : (document.getElementById("class_weight5")as HTMLSelectElement).value
                                        });
        }else if(algo === "AdaBoost"){
            requestAnalyze = JSON.stringify({"algo":algo, 
                                            "n_estimators" : (document.getElementById("n_estimators6")as HTMLInputElement).value,
                                            "learning_rate" : (document.getElementById("learning_rate6")as HTMLInputElement).value
                                        });
        }else if(algo === "GradientBoosting2"){
            requestAnalyze = JSON.stringify({"algo":algo, 
                                            "learning_rate" : (document.getElementById("learning_rate7")as HTMLInputElement).value,
                                            "n_estimators" : (document.getElementById("n_estimators7")as HTMLInputElement).value,
                                            "max_depth" : (document.getElementById("max_depth7")as HTMLInputElement).value,
                                            "min_samples_split" : (document.getElementById("min_samples_split7")as HTMLInputElement).value
                                        });
        }else if(algo === "RandomForest2"){
            requestAnalyze = JSON.stringify({"algo":algo, 
                                            "n_estimators" : (document.getElementById("n_estimators8")as HTMLInputElement).value,
                                            "max_depth" : (document.getElementById("max_depth8")as HTMLInputElement).value,
                                            "min_samples_split" : (document.getElementById("min_samples_split8")as HTMLInputElement).value,
                                            "class_weight" : (document.getElementById("class_weight8")as HTMLSelectElement).value
                                        });
        }else if(algo === "LogisticRegression"){
            requestAnalyze = JSON.stringify({"algo":algo, 
                                            "penalty" : (document.getElementById("penalty9")as HTMLSelectElement).value,
                                            "tol" : (document.getElementById("tol9")as HTMLInputElement).value,
                                            "c" : (document.getElementById("c9")as HTMLInputElement).value,
                                            "class_weight" : (document.getElementById("class_weight9")as HTMLSelectElement).value,
                                            "max_iter" : (document.getElementById("max_iter9")as HTMLInputElement).value
                                        });
        }
        console.log(requestAnalyze)
    }

    return (
        <div className="Analyze">
            <div className="view">
                <h1 className="title">Analyze page</h1>
                <select name="database" className="SelectDB" onChange={enableCategory}>
                    <option value="" disabled selected>Choose a database</option>
                    <option value="database1">database1</option>
                    <option value="database2">database2</option>
                    <option value="database3">database3</option>
                    <option value="database4">database4</option>
                    <option value="database5">database5</option>
                    <option value="database6">database6</option>
                </select>
                <select name="category" id="category"  onChange={displayAlgorithmes} className="SelectCat" disabled>
                    <option value="" disabled selected>Choose a category</option>
                    <option value="Regression">Regression</option>
                    <option value="Classification">Classification</option>
                </select>
                <br />
                <div className="Algos1" id="Algos1">
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
                    <input className="checkbox-tools" onClick={displayParameter}value="BayesianARDRegression" type="radio" name="algoPick" id="tool-4"/>
						<label className="for-checkbox-tools"htmlFor="tool-4" >
                        Bayesian ARD Regression
						</label>
                </div>
                <div className="Algos2" id="Algos2">    
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
                <h3 id="textalgo"></h3>
                <div className="Parametre">
                <div className="GradientBoosting" id="GradientBoosting">
                <table>
                    <tr><td>learning_rate</td><td><InputNumber  min="0"  step="0.1" defaultValue={0.1} id="learning_rate1"/></td></tr>
                    <tr><td>n_estimator</td><td><InputNumber  min="0" step="100" defaultValue={100} id="n_estimator1"/></td></tr>
                    <tr><td>max_depth</td><td><InputNumber  min="0" step="3" defaultValue={3} id="max_depth1"/></td></tr>
                    <tr><td>min_samples_split</td><td><InputNumber  min="0" step="2" defaultValue={2} id="min_samples_split1"/></td></tr>
                </table>
                <button value="GradientBoosting" onClick={sendRequest} className="boutonSend">Analyze</button>
                </div>
                <div className="RandomForest" id="RandomForest">
                <table>
                    <tr><td>n_estimators</td><td><InputNumber  min="0" step="100" defaultValue={100} id="n_estimators2"/></td></tr>
                    <tr><td>max_depth</td><td><InputNumber  min="0" step="1" defaultValue={0} id="max_depth2"/></td></tr>
                    <tr><td>min_samples_split</td><td><InputNumber  min="0" step="2"defaultValue={2}  id="min_samples_split2"/></td></tr>
                </table>
                <button value="RandomForest" onClick={sendRequest} className="boutonSend">Analyze</button>
                </div>
                <div className="Ridge" id="Ridge">
                <table>
                    <tr><td>tol</td><td><InputNumber  min="0" step="0.001" defaultValue={0.001} id="tol3"/></td></tr>
                    <tr><td>solver</td><td><select  id="solver3" name="solver">
                        <option value="auto">auto</option>
                        <option value="svd">svd</option>
                        <option value="cholesky">cholesky</option>
                        <option value="lsqr">lsqr</option>
                        <option value="sparse_cg">sparse_cg</option>
                        <option value="sag">sag</option>
                        <option value="saga">saga</option>
                        <option value="lbfgs">lbfgs</option> </select></td></tr>
                    <tr><td>alpha</td><td><InputNumber  min="0" step="1" defaultValue={1} id="alpha3"/></td></tr>
                    </table>
                    <button value="Ridge" onClick={sendRequest} className="boutonSend">Analyze</button>
                </div>
                <div className="BayesianARDRegression" id="BayesianARDRegression">
                <table>
                <tr><td>n_iter</td><td><InputNumber  min="0" step="300" defaultValue={300} id="n_iter4"/></td></tr>
                <tr><td>tol</td><td><InputNumber  min="0" step="0.001" defaultValue={0.001} id="tol4"/></td></tr>
                <tr><td>alpha_1</td><td><InputNumber  min="0" step="0.000001" defaultValue={0.000001} id="alpha_14"/></td></tr>
                <tr><td>alpha_2</td><td><InputNumber  min="0" step="0.000001" defaultValue={0.000001} id="alpha_24"/></td></tr>
                <tr><td>lambda_1</td><td><InputNumber  min="0" step="0.000001" defaultValue={0.000001} id="lambda_14"/></td></tr>
                <tr><td>lambda_2</td><td><InputNumber  min="0" step="0.000001" defaultValue={0.000001} id="lambda_24"/></td></tr>
                    </table>
                    <button value="BayesianARDRegression" onClick={sendRequest} className="boutonSend">Analyze</button>
                </div>
                <div className="LinearSVC" id="LinearSVC">
                    <table>
                    <tr><td>penalty</td><td><select  id="penalty5" name="penalty">
                        <option value="l2">l2</option>
                        <option value="l1">l1</option></select></td></tr>
                        <tr><td>tol</td><td><InputNumber  min="0" step="0.0001" defaultValue={0.0001} id="tol5"/></td></tr>
                        <tr><td>C</td><td><InputNumber  min="0" step="1" defaultValue={1} id="C5"/></td></tr>
                        <tr><td>class_weight</td><td><select  id="class_weight5" name="class_weight">
                        <option value="none">none</option>
                        <option value="dict">dict</option>
                        <option value="balanced">balanced</option></select></td></tr>
                        </table>
                        <button value="LinearSVC" onClick={sendRequest} className="boutonSend">Analyze</button>
                </div>
                <div className="AdaBoost" id="AdaBoost">
                <table>
                <tr><td>n_estimators</td><td><InputNumber  min="0" step="50" defaultValue={50} id="n_estimators6"/></td></tr>
                <tr><td>learning_rate</td><td><InputNumber  min="0" step="1"  defaultValue={1} id="learning_rate6"/></td></tr>
                    </table>
                    <button value="AdaBoost" onClick={sendRequest} className="boutonSend">Analyze</button>
                </div>
                <div className="GradientBoosting2" id="GradientBoosting2">
                <table>
                <tr><td>learning_rate</td><td><InputNumber  min="0" step="0.1" defaultValue={0.1} id="learning_rate7"/></td></tr>
                <tr><td>n_estimators</td><td><InputNumber  min="0" step="100" defaultValue={100} id="n_estimators7"/></td></tr>
                <tr><td>max_depth</td><td><InputNumber  min="0" step="3" defaultValue={3} id="max_depth7"/></td></tr>
                <tr><td>min_samples_split</td><td><InputNumber  min="0" step="2" defaultValue={2} id="min_samples_split7"/></td></tr>
                    </table>
                    <button value="GradientBoosting2" onClick={sendRequest} className="boutonSend">Analyze</button>
                </div>
                <div className="RandomForest2" id="RandomForest2">
                <table>
                <tr><td>n_estimators</td><td><InputNumber  min="0" step="100" defaultValue={100} id="n_estimators8"/></td></tr>
                <tr><td>max_depth</td><td><InputNumber  min="0" step="1" defaultValue={3} id="max_depth8"/></td></tr>
                <tr><td>min_samples_split</td><td><InputNumber  min="0" step="2" defaultValue={2} id="min_samples_split8"/></td></tr>
                <tr><td>class_weight</td><td><select  id="class_weight8" name="class_weight">
                        <option value="none">none</option>
                        <option value="balanced">balanced</option>
                        <option value="balanced_subsample">balanced_subsample</option></select></td></tr>
                        </table>
                        <button value="RandomForest2" onClick={sendRequest} className="boutonSend">Analyze</button>
                </div>
                <div className="LogisticRegression" id="LogisticRegression">
                <table>
                <tr><td>penalty</td><td><select  id="penalty9" name="penalty">
                        <option value="l2">l2</option>
                        <option value="l1">l1</option>
                        <option value="elasticnet">elasticnet</option>
                        <option value="none">none</option></select></td></tr>
                        <tr><td>tol</td><td><InputNumber  min="0" step="0.0001" defaultValue={0.0001} id="tol9"/></td></tr>
                        <tr><td>c</td><td><InputNumber  min="0" step="1" defaultValue={1} id="c9"/></td></tr>
                        <tr><td>class_weight</td><td><select  id="class_weight9" name="class_weight">
                        <option value="none">none</option>
                        <option value="dict">dict</option>
                        <option value="balanced">balanced</option></select></td></tr>
                        <tr><td>max_iter</td><td><InputNumber  min="0" step="100" defaultValue={100} id="max_iter9"/></td></tr>
                    </table>
                    <button value="LogisticRegression" onClick={sendRequest} className="boutonSend">Analyze</button>
                </div>
                </div>
            </div>
            <BarreLaterale />
            <Navigation />
        </div>
    )
}

export default Analyze;