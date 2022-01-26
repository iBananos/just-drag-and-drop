import pandas as pd
from pymfe.mfe import MFE
import joblib
from sklearn.preprocessing import LabelEncoder
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor,RandomForestRegressor 
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
from sklearn import linear_model
from sklearn.preprocessing import LabelEncoder
from sklearn.neighbors import KNeighborsRegressor
from sklearn.model_selection import GridSearchCV,RandomizedSearchCV

from aesCipher import AESCipher
import time
import sys
from io import StringIO
import warnings
warnings.filterwarnings("ignore")

filename = sys.argv[1]
extension = sys.argv[2]
features = sys.argv[3]
pred = sys.argv[4]
separator = sys.argv[5]
demo = sys.argv[5]
if demo == "false" :
    key = sys.argv[6]
    toEncrypt = sys.argv[7]
else : 
    key = ""
    toEncrypt = ""

def parse_data(filename,separator):

    if extension == "csv" :
            # Assume that the user uploaded a CSV or TXT file
        try:
            df = pd.read_csv(filename,index_col=False, delimiter=separator)
        except:
            df = pd.read_csv(filename, delimiter=separator)
    elif extension == 'xlsx':
            # Assume that the user uploaded an excel file
        df = pd.read_excel(filename,index_col=False)
    elif extension == 'txt' :
            # Assume that the user upl, delimiter = r'\s+'oaded an excel file
        df = pd.read_csv(filename, delimiter = r'\s+',index_col=0)
    elif extension == 'json' :
        df = pd.read_json(filename)
    else :
        print("There was an error while processing this file")
    
    return df


def autoselection(feature,predict,filename,separator):
    data=parse_data(filename,separator)
    n=min(len(data),1000)
    dataselect=data.sample(frac=0.2)
    featurepredict=np.concatenate((predict, feature), axis=None)
    dataselect=dataselect[featurepredict]
    dataselect=dataselect.dropna()
    y=dataselect[predict]
    X=dataselect[feature]
    X=X.to_numpy()
    y=y.to_numpy()
    #mfe = MFE(groups=["general", "statistical", "info-theory"])#features=["min","max","sd","attr_to_inst","mean","cat_to_num","nr_attr", "nr_bin", "nr_cat","nr_inst",'nr_num',"num_to_cat", "nr_class","attr_ent",'cor','cov',"nr_cor_attr",'mad',"nr_outliers","skewness"])
    mfe=MFE(features=['attr_conc', 'attr_to_inst', 'cat_to_num','class_conc', 'cor', 'cov',  'eigenvalues', 'eq_num_attr', 'freq_class',  'g_mean', 'gravity', 'inst_to_attr','joint_ent','kurtosis', 'mad','max', 'mean', 'median', 'min', 'mut_inf', 'nr_attr', 'nr_bin', 'nr_class', 'nr_cor_attr','nr_inst', 'nr_norm', 'nr_num', 'nr_outliers', 'ns_ratio','range', 'sd', 'skewness', 'sparsity', 't_mean', 'var'])
    mfe.fit(X, y)
    ft = mfe.extract()
    df = pd.DataFrame(ft, columns=ft[0])
    df=df.replace([np.inf, -np.inf], np.nan)
    df.values[1]=df.values[1].astype(float)
    df=df.drop(df.index[[0]])
    df=df.reset_index(drop=True)
    FirstModel = joblib.load('python_script/FirstTOP1.sav')
    SecondaryModel = joblib.load('python_script/SecondaryTOP1.sav')
    earlystop = joblib.load('python_script/Goodpredictor.sav')
    earlystop2 = joblib.load('python_script/SecondaryGoodPredictor.sav')
    index = [0, 0, 0, 0, 0, 0, 0]
    algo = pd.DataFrame(['SGDRegressor','Lasso','Ridge','Gradient','RandomForest','ElasticNet','KNeighborsRegressor'], columns=['algo'],index=index)
    testone=pd.concat([df,algo],axis=1)
    for i,j in enumerate(testone.columns):
        try:
            testone[j]=testone[j].astype(float)
        except:
            break
    obj_df = testone.select_dtypes(include=['object']).copy()
    lb_make = LabelEncoder()
    for i in range(len(obj_df.columns.values)):
        obj_df[obj_df.columns.values[i]] = lb_make.fit_transform(obj_df[obj_df.columns.values[i]])
        testone[obj_df.columns.values[i]] = obj_df[obj_df.columns.values[i]]
    testone=testone.fillna(-1)
    stopcalcul=earlystop.predict(testone)
    stopcalcul2=earlystop2.predict(testone)
    if stopcalcul[0]==False and stopcalcul[1]==False and stopcalcul[2]==False and stopcalcul[3]==False and stopcalcul[4]==False and stopcalcul[5]==False and stopcalcul[6]==False and stopcalcul2[0]==False and stopcalcul2[1]==False and stopcalcul2[2]==False and stopcalcul2[3]==False and stopcalcul2[4]==False and stopcalcul2[5]==False and stopcalcul2[6]==False:
        return 'Error_You will not get good prediction with your dataset'
    #print(testone.columns)
    pred1=FirstModel.predict(testone)
    testone['pred2']=SecondaryModel.predict(testone)
    testone['pred']=pred1
    algoselection=testone[testone['pred']==True]
    algoselection=algoselection['algo']

    algoselection2=testone[testone['pred2']==True]
    algoselection2=algoselection2['algo']
    if len(algoselection2)==0 and len(algoselection)==0:
        #print('warning its going to be long')
        testone['pred2']=[True,True,True,True,True,True,True]
        algoselection2=testone[testone['pred2']==True]
        algoselection2=algoselection2['algo']
    obj_df = data.select_dtypes(include=['object']).copy()
    dataexclude=data.select_dtypes(exclude=['object'])
    for i in range(len(dataexclude.columns.values)):
        if len(dataexclude[dataexclude.columns.values[i]].unique())<10:
            obj_df = pd.concat([obj_df,dataexclude[dataexclude.columns.values[i]]],axis=1)
    lb_make = LabelEncoder()
    for i in range(len(obj_df.columns.values)):
                obj_df[obj_df.columns.values[i]] = lb_make.fit_transform(obj_df[obj_df.columns.values[i]])
                data[obj_df.columns.values[i]] = obj_df[obj_df.columns.values[i]]
    
    X=data[feature]
    X = (X-X.mean())/X.std()
    y=data[predict]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    for i,j in enumerate(algoselection.values):
        scoring=[]
        algobest=[]
        #print(j)
        if j==1:
            reg = linear_model.ElasticNet()
            reg.fit(X_train, y_train)
            scoring.append(r2_score(y_test,reg.predict(X_test)))
            algobest.append('ElasticNet')
        if j==2:
            reg = GradientBoostingRegressor()
            reg.fit(X_train, y_train)
            scoring.append(r2_score(y_test,reg.predict(X_test)))
            algobest.append('GradientBoostingRegressor')
        if j==3:
            reg = KNeighborsRegressor()
            reg.fit(X_train, y_train)
            scoring.append(r2_score(y_test,reg.predict(X_test)))
            algobest.append('KNeighborsRegressor')
        if j==4:
            reg = linear_model.Lasso()
            reg.fit(X_train, y_train)
            scoring.append(r2_score(y_test,reg.predict(X_test)))
            algobest.append('Lasso')
        if j==5:
            reg = RandomForestRegressor()
            reg.fit(X_train, y_train)
            scoring.append(r2_score(y_test,reg.predict(X_test)))
            algobest.append('RandomForestRegressor')
        if j==6:
            reg = linear_model.Ridge()
            reg.fit(X_train, y_train)
            scoring.append(r2_score(y_test,reg.predict(X_test)))
            algobest.append('Ridge')
        if j==7:
            reg = linear_model.SGDRegressor()
            reg.fit(X_train, y_train)
            scoring.append(r2_score(y_test,reg.predict(X_test)))
            algobest.append('SGDRegressor')
    try:
        alltesting = pd.DataFrame(scoring, columns=['r2'],index=algobest)

        bestalgo=alltesting.idxmax()[0]
    except:
        for i,j in enumerate(algoselection2.values):
            scoring=[]
            algobest=[]
            #print(j)
            if j==1:
                reg = linear_model.ElasticNet()
                reg.fit(X_train, y_train)
                scoring.append(r2_score(y_test,reg.predict(X_test)))
                algobest.append('ElasticNet')
            if j==2:
                reg = GradientBoostingRegressor()
                reg.fit(X_train, y_train)
                scoring.append(r2_score(y_test,reg.predict(X_test)))
                algobest.append('GradientBoostingRegressor')
            if j==3:
                reg = KNeighborsRegressor()
                reg.fit(X_train, y_train)
                scoring.append(r2_score(y_test,reg.predict(X_test)))
                algobest.append('KNeighborsRegressor')
            if j==4:
                reg = linear_model.Lasso()
                reg.fit(X_train, y_train)
                scoring.append(r2_score(y_test,reg.predict(X_test)))
                algobest.append('Lasso')
            if j==5:
                reg = RandomForestRegressor()
                reg.fit(X_train, y_train)
                scoring.append(r2_score(y_test,reg.predict(X_test)))
                algobest.append('RandomForestRegressor')
            if j==6:
                reg = linear_model.Ridge()
                reg.fit(X_train, y_train)
                scoring.append(r2_score(y_test,reg.predict(X_test)))
                algobest.append('Ridge')
            if j==7:
                reg = linear_model.SGDRegressor()
                reg.fit(X_train, y_train)
                scoring.append(r2_score(y_test,reg.predict(X_test)))
                algobest.append('SGDRegressor')
            alltesting = pd.DataFrame(scoring, columns=['r2'],index=algobest)
            bestalgo=alltesting.idxmax()[0]

    if bestalgo=='ElasticNet':
        parametersGrid = {"max_iter": [1, 5, 10,20],
                      "alpha": [0.001, 0.01, 0.1, 1, 10, 100],
                      "l1_ratio": np.arange(0.0, 1.0, 0.1)}
        eNet = linear_model.ElasticNet()
        reg = GridSearchCV(eNet, parametersGrid, scoring='neg_mean_squared_error', cv=3)
        reg.fit(X_train, y_train)
        
    if bestalgo=='GradientBoostingRegressor':
        n_estimators = [100, 500, 900, 1100]
        max_depth = [3, 5, 10, 15]
        min_samples_leaf = [1, 2, 4, 8] 
        min_samples_split = [2, 4, 6]
        max_features = ['auto', 'sqrt', 'log2', None]

        # Define the grid of hyperparameters to search
        hyperparameter_grid = {
            'n_estimators': n_estimators,
            'max_depth': max_depth,
            'min_samples_leaf': min_samples_leaf,
            'min_samples_split': min_samples_split,
            'max_features': max_features}

        # Set up the random search with 4-fold cross validation
        reg = RandomizedSearchCV(estimator=GradientBoostingRegressor(),
                    param_distributions=hyperparameter_grid,
                    n_iter=10,
                    scoring = 'neg_mean_absolute_error',
                    random_state=42,n_jobs = -1)
        reg.fit(X_train, y_train)
       
    if bestalgo=='KNeighborsRegressor':
        param_grid = {'n_neighbors': list(range(4,25)),
              'weights': ['uniform', 'distance']}
        knn = KNeighborsRegressor()
        reg = GridSearchCV(knn, param_grid)
        reg.fit(X_train, y_train)
        
    if bestalgo=='Lasso':
        lasso_params = {'alpha':[0.02, 0.03, 0.05, 0.08, 0.1, 0.15, 0.2, 0.3, 0.5, 0.8]}
        Lasso=linear_model.Lasso()
        reg = GridSearchCV(Lasso, lasso_params, cv=3)
        reg.fit(X_train, y_train)
       
  
    if bestalgo=='RandomForestRegressor':
        # Number of trees in random forest
        n_estimators = [int(x) for x in np.linspace(start = 100, stop = 400, num = 10)]
        # Number of features to consider at every split
        max_features = ['auto', 'sqrt']
        # Maximum number of levels in tree
        max_depth = [int(x) for x in np.linspace(100, 300, num = 11)]
        max_depth.append(None)
        # Minimum number of samples required to split a node
        min_samples_split = [1,2, 5]
        # Minimum number of samples required at each leaf node
        min_samples_leaf = [1, 2,5]
        # Method of selecting samples for training each tree
        bootstrap = [True,False]
        random_grid = {'n_estimators': n_estimators,
                    'max_features': max_features,
                    'max_depth': max_depth,
                    'min_samples_split': min_samples_split,
                    'min_samples_leaf': min_samples_leaf,
                    'bootstrap': bootstrap}
        rf=RandomForestRegressor()
        reg = RandomizedSearchCV(estimator = rf, param_distributions = random_grid, n_iter = 10,n_jobs = -1)
        reg.fit(X_train, y_train)
        

    if bestalgo=='Ridge':  
        ridge_params = {'alpha':[0.02, 0.03, 0.05, 0.08, 0.1, 0.15, 0.2, 0.3, 0.5, 0.8]}
        Ridge=linear_model.Ridge()
        reg = GridSearchCV(Ridge, ridge_params, cv=3) 
        reg.fit(X_train, y_train)
       
    
    if bestalgo=='SGDRegressor': 
        SGD_params = {'alpha':[0.001,0.02, 0.03, 0.05, 0.08, 0.1, 0.15, 0.2, 0.3, 0.5, 0.8]}
        SGDReg=linear_model.SGDRegressor()
        reg = GridSearchCV(SGDReg, SGD_params, cv=3)  
        reg.fit(X_train, y_train)
        
    
    
    pred=reg.predict(X_test)
    print(r2_score(y_test,pred))
    prediction=pd.DataFrame(pred,columns=['prediction'])
    
    try:
        importance = reg.best_estimator_.coef_[0]
    except:
        importance = reg.best_estimator_.feature_importances_
    importance=pd.DataFrame(importance,columns=['importance'])
    features = pd.DataFrame(feature, columns=['features'])
    importance_frame = pd.concat([features,importance], axis=1)
    importance_frame = importance_frame.T
    y_test=y_test.reset_index(drop=True)
    prediction_and_true=pd.concat([prediction,y_test],axis=1)
    prediction_and_true = prediction_and_true.sample(n=100)
    
    print(bestalgo)
    print(reg.best_params_)
    print(importance_frame.to_csv(header=False, index=False))
    return prediction_and_true.to_csv(index=False)

def decryptFile(filename) :
    aesCipher = AESCipher(key)
    encryptData = open(filename,'r').read()
    csvPlainText = aesCipher.decrypt(encryptData)
    return StringIO(csvPlainText)


if __name__ == "__main__":
    if demo == "false" : 
        if toEncrypt == "true" :
            data = decryptFile(filename)
        else :
            data = filename
    else :
        data = filename
    #print(features.split(","),pred,filename)
    print(autoselection(features.split(","),pred,data,separator))
