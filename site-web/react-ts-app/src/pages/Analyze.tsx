import BarreLaterale from "../components/BarreLaterale";
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

    return (
        <div className="Analyze">
            <div className="view">
                <h1 className="title">Analyze page</h1>
                <select name="database" className="SelectDB">
                    <option value="" disabled selected>Choose a database</option>
                    <option value="database1">database1</option>
                    <option value="database2">database2</option>
                    <option value="database3">database3</option>
                    <option value="database4">database4</option>
                    <option value="database5">database5</option>
                    <option value="database6">database6</option>
                </select>
                <select name="category" id="category"  onChange={displayAlgorithmes} className="SelectCat">
                    <option value="" disabled selected>Choose a category</option>
                    <option value="Regression">Regression</option>
                    <option value="Classification">Classification</option>
                </select>
                <br />
                <div className="Algos1" id="Algos1">
                <input type="radio" name="algoPick" onClick={displayParameter} value="GradientBoosting"/> Gradient Boosting 
                <input type="radio" name="algoPick" onClick={displayParameter} value="RandomForest"/> Random Forest 
                <input type="radio" name="algoPick" onClick={displayParameter} value="Ridge"/> Ridge 
                <input type="radio" name="algoPick" onClick={displayParameter} value="BayesianARDRegression"/> Bayesian ARD Regression
                </div>
                <div className="Algos2" id="Algos2">
                <input type="radio" name="algoPick" onClick={displayParameter} value="LinearSVC"/> LinearSVC 
                <input type="radio" name="algoPick" onClick={displayParameter} value="AdaBoost"/> AdaBoost 
                <input type="radio" name="algoPick" onClick={displayParameter} value="GradientBoosting2"/> Gradient Boosting
                <input type="radio" name="algoPick" onClick={displayParameter} value="RandomForest2"/> Random Forest 
                <input type="radio" name="algoPick" onClick={displayParameter} value="LogisticRegression"/> Logistic Regression 
                </div>
                <h3 id="textalgo"></h3>
                <div className="Parametre">
                <div className="GradientBoosting" id="GradientBoosting">
                <table>
                    <tr><td>learning_rate</td><td><input type="number" min="0" className="inputNumber" step="0.1" defaultValue={0.1} id="learning_rate"/></td></tr>
                    <tr><td>n_estimator</td><td><input type="number" min="0"className="inputNumber" step="100" defaultValue={100} id="n_estimator"/></td></tr>
                    <tr><td>max_depth</td><td><input type="number" min="0"className="inputNumber" step="3" defaultValue={3} id="max_depth"/></td></tr>
                    <tr><td>min_samples_split</td><td><input type="number" min="0"className="inputNumber" step="2" defaultValue={2} id="min_samples_split"/></td></tr>
                </table>
                </div>
                <div className="RandomForest" id="RandomForest">
                <table>
                    <tr><td>n_estimators</td><td><input type="number" min="0"className="inputNumber" step="100" defaultValue={100} id="learning_rate"/></td></tr>
                    <tr><td>max_depth</td><td><input type="number" min="0"className="inputNumber" step="1" defaultValue={0} id="n_estimator"/></td></tr>
                    <tr><td>min_samples_split</td><td><input type="number" min="0"className="inputNumber" step="2"defaultValue={2}  id="max_depth"/></td></tr>
                </table>
                </div>
                <div className="Ridge" id="Ridge">
                <table>
                    <tr><td>tol</td><td><input type="number" min="0"className="inputNumber" step="0.001" defaultValue={0.001} id="learning_rate"/></td></tr>
                    <tr><td>solver</td><td><select  id="solver" name="solver">
                        <option value="auto">auto</option>
                        <option value="svd">svd</option>
                        <option value="cholesky">cholesky</option>
                        <option value="lsqr">lsqr</option>
                        <option value="sparse_cg">sparse_cg</option>
                        <option value="sag">sag</option>
                        <option value="saga">saga</option>
                        <option value="lbfgs">lbfgs</option> </select></td></tr>
                    <tr><td>alpha</td><td><input type="number" min="0" step="1"className="inputNumber" defaultValue={1} id="alpha"/></td></tr>
                    </table>
                </div>
                <div className="BayesianARDRegression" id="BayesianARDRegression">
                <table>
                <tr><td>n_iter</td><td><input type="number" min="0"className="inputNumber" step="300" defaultValue={300} id="n_iter"/></td></tr>
                <tr><td>tol</td><td><input type="number" min="0"className="inputNumber" step="0.001" defaultValue={0.001} id="tol"/></td></tr>
                <tr><td>alpha_1</td><td><input type="number" min="0"className="inputNumber" step="0.000001" defaultValue={0.000001} id="alpha_1"/></td></tr>
                <tr><td>alpha_2</td><td><input type="number" min="0"className="inputNumber" step="0.000001" defaultValue={0.000001} id="alpha_2"/></td></tr>
                <tr><td>lambda_1</td><td><input type="number" min="0"className="inputNumber" step="0.000001" defaultValue={0.000001} id="lambda_1"/></td></tr>
                <tr><td>lambda_2</td><td><input type="number" min="0"className="inputNumber" step="0.000001" defaultValue={0.000001} id="lambda_2"/></td></tr>
                    </table>
                </div>
                <div className="LinearSVC" id="LinearSVC">
                    <table>
                    <tr><td>penalty</td><td><select  id="penalty" name="penalty">
                        <option value="l2">l2</option>
                        <option value="l1">l1</option></select></td></tr>
                        <tr><td>tol</td><td><input type="number" min="0"className="inputNumber" step="0.0001" defaultValue={0.0001} id="tol"/></td></tr>
                        <tr><td>C</td><td><input type="number" min="0"className="inputNumber" step="1" defaultValue={1} id="C"/></td></tr>
                        <tr><td>class_weight</td><td><select  id="class_weight" name="class_weight">
                        <option value="none">none</option>
                        <option value="dict">dict</option>
                        <option value="balanced">balanced</option></select></td></tr>
                        </table>
                </div>
                <div className="AdaBoost" id="AdaBoost">
                <table>
                <tr><td>n_estimators</td><td><input type="number" min="0"className="inputNumber" step="50" defaultValue={50} id="n_estimators"/></td></tr>
                <tr><td>learning_rate</td><td><input type="number" min="0"className="inputNumber" step="1"  defaultValue={1} id="learning_rate"/></td></tr>
                    </table>
                </div>
                <div className="GradientBoosting2" id="GradientBoosting2">
                <table>
                <tr><td>learning_rate</td><td><input type="number" min="0"className="inputNumber" step="0.1" defaultValue={0.1} id="learning_rate"/></td></tr>
                <tr><td>n_estimators</td><td><input type="number" min="0" className="inputNumber"step="100" defaultValue={100} id="n_estimators"/></td></tr>
                <tr><td>max_depth</td><td><input type="number" min="0" className="inputNumber"step="3" defaultValue={3} id="max_depth"/></td></tr>
                <tr><td>min_samples_split</td><td><input type="number" min="0"className="inputNumber" step="2" defaultValue={2} id="min_samples_split"/></td></tr>
                    </table>
                </div>
                <div className="RandomForest2" id="RandomForest2">
                <table>
                <tr><td>n_estimators</td><td><input type="number" min="0"className="inputNumber" step="100" defaultValue={100} id="n_estimators"/></td></tr>
                <tr><td>max_depth</td><td><input type="number" min="0"className="inputNumber" step="1" defaultValue={3} id="max_depth"/></td></tr>
                <tr><td>min_samples_split</td><td><input type="number" min="0"className="inputNumber" step="2" defaultValue={2} id="min_samples_split"/></td></tr>
                <tr><td>class_weight</td><td><select  id="class_weight" name="class_weight">
                        <option value="none">none</option>
                        <option value="balanced">balanced</option>
                        <option value="balanced_subsample">balanced_subsample</option></select></td></tr>
                        </table>
                </div>
                <div className="LogisticRegression" id="LogisticRegression">
                <table>
                <tr><td>penalty</td><td><select  id="penalty" name="penalty">
                        <option value="l2">l2</option>
                        <option value="l1">l1</option>
                        <option value="elasticnet">elasticnet</option>
                        <option value="none">none</option></select></td></tr>
                        <tr><td>tol</td><td><input type="number" min="0"className="inputNumber" step="0.0001" defaultValue={0.0001} id="tol"/></td></tr>
                        <tr><td>c</td><td><input type="number" min="0"className="inputNumber" step="1" defaultValue={1} id="c"/></td></tr>
                        <tr><td>class_weight</td><td><select  id="class_weight" name="class_weight">
                        <option value="none">none</option>
                        <option value="dict">dict</option>
                        <option value="balanced">balanced</option></select></td></tr>
                        <tr><td>max_iter</td><td><input type="number" min="0" className="inputNumber"step="100" defaultValue={100} id="max_iter"/></td></tr>
                    </table>
                </div>
                </div>
            </div>
            <BarreLaterale />
            <Navigation />
        </div>
    )
}

export default Analyze;