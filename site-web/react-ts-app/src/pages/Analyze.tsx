import BarreLaterale from "../components/BarreLaterale";
import InputNumber from "../components/InputNumber";
import Navigation from "../components/Navigation";
import help from "../assets/help.png";
import * as utils from "../Utils";

const Analyze = () =>  {
    

    function displayParameter(ev :any){
        console.log(ev.target.value)
        var algo = ev.target.value;
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
        console.log(requestAnalyze);

        utils.default.sendRequestWithToken('POST', 'http://localhost:4000/analyze/parameters', requestAnalyze, callbackRequest);
    }

    function callbackRequest(response : any) {
        console.log(response);
    }

    return (
        <div className="Analyze">
            <div className="view" id="view">
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
						<label className="for-checkbox-tools" htmlFor="tool-1" title="GRADIENT BOOOOSTING">
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
                <div className="Parametre">
                <div className="GradientBoosting" id="GradientBoosting">
                <table>
                    <tr><td>learning_rate <img src={help} className="help" alt="" title="Learning rate shrinks the contribution of each tree by learning_rate.
There is a trade-off between learning_rate and n_estimators."/></td><td><InputNumber  min="0"  step="0.1" defaultValue={0.1} id="learning_rate1"/></td>
                    <td>n_estimator <img src={help} className="help" alt="" title="The number of boosting stages to perform. Gradient boosting is fairly
robust to over-fitting so a large number usually results in better performance."/></td><td><InputNumber  min="0" step="100" defaultValue={100} id="n_estimator1"/></td></tr>
                    <tr><td>max_depth <img src={help} className="help" alt="" title="Maximum depth of the individual regression estimators. 
                    The maximum depth limits the number of nodes in the tree. 
                    Tune this parameter for best performance; 
                    the best value depends on the interaction of the input variables."/></td><td><InputNumber  min="0" step="3" defaultValue={3} id="max_depth1"/></td><td>min_samples_split <img src={help} className="help" alt="" title="The minimum number of samples required to split an internal node:
- If int, then consider min_samples_split as the minimum number.
- If float, then min_samples_split is a fraction and ceil(min_samples_split * n_samples) are the minimum number of samples for each split.
"/></td><td><InputNumber  min="0" step="2" defaultValue={2} id="min_samples_split1"/></td></tr>
                </table>
                <button value="GradientBoosting" onClick={sendRequest} className="boutonSend">Analyze</button>
                </div>
                <div className="RandomForest" id="RandomForest">
                <table>
                    <tr><td>n_estimators <img src={help} className="help" alt="" title="The number of trees in the forest."/></td><td><InputNumber  min="0" step="100" defaultValue={100} id="n_estimators2"/></td><td>max_depth <img src={help} className="help" alt="" title="The maximum depth of the tree. If None, then nodes are expanded
until all leaves are pure or until all leaves contain less than
min_samples_split samples.
"/></td><td><InputNumber  min="0" step="1" defaultValue={0} id="max_depth2"/></td></tr>
                    <tr><td>min_samples_split <img src={help} className="help" alt="" title="The minimum number of samples required to split an internal node:
- If int, then consider min_samples_split as the minimum number.
- If float, then min_samples_split is a fraction and ceil(min_samples_split * n_samples) 
    are the minimum number of samples for each split.
"/></td><td><InputNumber  min="0" step="2"defaultValue={2}  id="min_samples_split2"/></td></tr>
                </table>
                <button value="RandomForest" onClick={sendRequest} className="boutonSend">Analyze</button>
                </div>
                <div className="Ridge" id="Ridge">
                <table>
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
                    </table>
                    <button value="Ridge" onClick={sendRequest} className="boutonSend">Analyze</button>
                </div>
                <div className="BayesianARDRegression" id="BayesianARDRegression">
                <table>
                <tr><td>n_iter <img src={help} className="help" alt="" title="Maximum number of iterations."/></td><td><InputNumber  min="0" step="300" defaultValue={300} id="n_iter4"/></td><td>tol <img src={help} className="help" alt="" title="Stop the algorithm if w has converged."/></td><td><InputNumber  min="0" step="0.001" defaultValue={0.001} id="tol4"/></td></tr>
                <tr><td>alpha_1 <img src={help} className="help" alt="" title="Hyper-parameter : shape parameter for the Gamma distribution prior
over the alpha parameter."/></td><td><InputNumber  min="0" step="0.000001" defaultValue={0.000001} id="alpha_14"/></td><td>alpha_2 <img src={help} className="help" alt="" title="Hyper-parameter : inverse scale parameter (rate parameter) for the
Gamma distribution prior over the alpha parameter."/></td><td><InputNumber  min="0" step="0.000001" defaultValue={0.000001} id="alpha_24"/></td></tr>
                <tr><td>lambda_1 <img src={help} className="help" alt="" title="Hyper-parameter : shape parameter for the Gamma distribution prior
over the lambda parameter."/></td><td><InputNumber  min="0" step="0.000001" defaultValue={0.000001} id="lambda_14"/></td><td>lambda_2 <img src={help} className="help" alt="" title="Hyper-parameter : inverse scale parameter (rate parameter) for the
Gamma distribution prior over the lambda parameter."/></td><td><InputNumber  min="0" step="0.000001" defaultValue={0.000001} id="lambda_24"/></td></tr>
                    </table>
                    <button value="BayesianARDRegression" onClick={sendRequest} className="boutonSend">Analyze</button>
                </div>
                <div className="LinearSVC" id="LinearSVC">
                    <table>
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
                        <option value="dict">dict</option>
                        <option value="balanced">balanced</option></select></td></tr>
                        </table>
                        <button value="LinearSVC" onClick={sendRequest} className="boutonSend">Analyze</button>
                </div>
                <div className="AdaBoost" id="AdaBoost">
                <table>
                <tr><td>n_estimators <img src={help} className="help" alt="" title="The maximum number of estimators at which boosting is terminated.
In case of perfect fit, the learning procedure is stopped early."/></td><td><InputNumber  min="0" step="50" defaultValue={50} id="n_estimators6"/></td><td>learning_rate <img src={help} className="help" alt="" title="Weight applied to each classifier at each boosting iteration. A higher
learning rate increases the contribution of each classifier. There is a
trade-off between the learning_rate and n_estimators parameters."/></td><td><InputNumber  min="0" step="1"  defaultValue={1} id="learning_rate6"/></td></tr>
                    </table>
                    <button value="AdaBoost" onClick={sendRequest} className="boutonSend">Analyze</button>
                </div>
                <div className="GradientBoosting2" id="GradientBoosting2">
                <table>
                <tr><td>learning_rate <img src={help} className="help" alt="" title=""/></td><td><InputNumber  min="0" step="0.1" defaultValue={0.1} id="learning_rate7"/></td><td>n_estimators <img src={help} className="help" alt="" title=""/></td><td><InputNumber  min="0" step="100" defaultValue={100} id="n_estimators7"/></td></tr>
                <tr><td>max_depth <img src={help} className="help" alt="" title=""/></td><td><InputNumber  min="0" step="3" defaultValue={3} id="max_depth7"/></td><td>min_samples_split <img src={help} className="help" alt="" title=""/></td><td><InputNumber  min="0" step="2" defaultValue={2} id="min_samples_split7"/></td></tr>
                    </table>
                    <button value="GradientBoosting2" onClick={sendRequest} className="boutonSend">Analyze</button>
                </div>
                <div className="RandomForest2" id="RandomForest2">
                <table>
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
                        <option value="balanced_subsample">balanced_subsample</option></select></td></tr>
                        </table>
                        <button value="RandomForest2" onClick={sendRequest} className="boutonSend">Analyze</button>
                </div>
                <div className="LogisticRegression" id="LogisticRegression">
                <table>
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
                        <option value="dict">dict</option>
                        <option value="balanced">balanced</option></select></td></tr>
                        <tr><td>max_iter <img src={help} className="help" alt="" title="Maximum number of iterations taken for the solvers to converge."/></td><td><InputNumber  min="0" step="100" defaultValue={100} id="max_iter9"/></td></tr>
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