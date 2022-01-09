import pandas as pd
from pymfe.mfe import MFE
import joblib
from sklearn.preprocessing import LabelEncoder
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import AdaBoostClassifier
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import SGDClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import confusion_matrix
from sklearn.model_selection import GridSearchCV,RandomizedSearchCV
from aesCipher import AESCipher
from io import StringIO

import warnings
import sys

warnings.filterwarnings("ignore")

filename = sys.argv[1]
extension = sys.argv[2]
features = sys.argv[3]
pred = sys.argv[4]

demo = sys.argv[5]
if demo == "false" :
    key = sys.argv[6]
    toEncrypt = sys.argv[7]
else : 
    key = ""
    toEncrypt = ""

def parse_data(filename):

    if extension == "csv" :
            # Assume that the user uploaded a CSV or TXT file
        try:
            df = pd.read_csv(filename,index_col=False, delimiter=',')
        except:
            df = pd.read_csv(filename, delimiter=',')
    elif extension == 'xlsx':
            # Assume that the user uploaded an excel file
        df = pd.read_excel(filename,index_col=0)
    elif extension == 'txt' :
            # Assume that the user upl, delimiter = r'\s+'oaded an excel file
        df = pd.read_csv(filename, delimiter = r'\s+',index_col=0)
    elif extension == 'json' :
        df = pd.read_json(filename)
    else :
        print("There was an error while processing this file")
    
    return df
def autoselection(feature,predict,filename):
    data=pd.read_csv(filename)
    n=min(len(data),1000)
    dataselect=data.sample(frac=0.2)
    featurepredict=np.concatenate((predict, feature), axis=None)
    dataselect=dataselect[featurepredict]
    dataselect=dataselect.dropna()

    target_name=pd.unique(dataselect[predict].values.flatten())
    target_name=sorted(target_name)

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
    FirstModel = joblib.load('FirstTOP1_class.sav')
    SecondaryModel = joblib.load('SecondaryTOP1_class.sav')
    earlystop = joblib.load('Goodpredictor_class.sav')
    earlystop2 = joblib.load('SecondaryGoodPredictor_class.sav')
    index = [0, 0, 0, 0, 0, 0, 0]
    algo = pd.DataFrame(['AdaBoostClassifier','DecisionTreeClassifier','GradientBoostingClassifier','KNeighborsClassifier','LogisticRegression','RandomForestClassifier','SGDClassifier'], columns=['algo'],index=index)
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
        return 'You will not getting good prediction with your dataset'
    pred1=FirstModel.predict(testone)
    testone['pred2']=SecondaryModel.predict(testone)
    testone['pred']=pred1
    algoselection=testone[testone['pred']==True]
    algoselection=algoselection['algo']

    algoselection2=testone[testone['pred2']==True]
    algoselection2=algoselection2['algo']
    if len(algoselection2)==0 and len(algoselection)==0:
        print('warning its going to be long')
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
        if j==0:
            reg = AdaBoostClassifier()
            reg.fit(X_train, y_train)
            scoring.append(accuracy_score(y_test,reg.predict(X_test)))
            algobest.append('AdaBoostClassifier')
        if j==1:
            reg = DecisionTreeClassifier()
            reg.fit(X_train, y_train)
            scoring.append(accuracy_score(y_test,reg.predict(X_test)))
            algobest.append('DecisionTreeClassifier')
        if j==2:
            reg = GradientBoostingClassifier()
            reg.fit(X_train, y_train)
            scoring.append(accuracy_score(y_test,reg.predict(X_test)))
            algobest.append('GradientBoostingClassifier')
        if j==3:
            reg = KNeighborsClassifier()
            reg.fit(X_train, y_train)
            scoring.append(accuracy_score(y_test,reg.predict(X_test)))
            algobest.append('KNeighborsClassifier')
        if j==4:
            reg = LogisticRegression()
            reg.fit(X_train, y_train)
            scoring.append(accuracy_score(y_test,reg.predict(X_test)))
            algobest.append('LogisticRegression')
        if j==5:
            reg = RandomForestClassifier()
            reg.fit(X_train, y_train)
            scoring.append(accuracy_score(y_test,reg.predict(X_test)))
            algobest.append('RandomForestClassifier')
        if j==6:
            reg = SGDClassifier()
            reg.fit(X_train, y_train)
            scoring.append(accuracy_score(y_test,reg.predict(X_test)))
            algobest.append('SGDRegressor')
    try:
        alltesting = pd.DataFrame(scoring, columns=['r2'],index=algobest)
        bestalgo=alltesting.idxmax()[0]
    except:
        for i,j in enumerate(algoselection2.values):
            scoring=[]
            algobest=[]
            if j==0:
                reg = AdaBoostClassifier()
                reg.fit(X_train, y_train)
                scoring.append(accuracy_score(y_test,reg.predict(X_test)))
                algobest.append('AdaBoostClassifier')
            if j==1:
                reg = DecisionTreeClassifier()
                reg.fit(X_train, y_train)
                scoring.append(accuracy_score(y_test,reg.predict(X_test)))
                algobest.append('DecisionTreeClassifier')
            if j==2:
                reg = GradientBoostingClassifier()
                reg.fit(X_train, y_train)
                scoring.append(accuracy_score(y_test,reg.predict(X_test)))
                algobest.append('GradientBoostingClassifier')
            if j==3:
                reg = KNeighborsClassifier()
                reg.fit(X_train, y_train)
                scoring.append(accuracy_score(y_test,reg.predict(X_test)))
                algobest.append('KNeighborsClassifier')
            if j==4:
                reg = LogisticRegression()
                reg.fit(X_train, y_train)
                scoring.append(accuracy_score(y_test,reg.predict(X_test)))
                algobest.append('LogisticRegression')
            if j==5:
                reg = RandomForestClassifier()
                reg.fit(X_train, y_train)
                scoring.append(accuracy_score(y_test,reg.predict(X_test)))
                algobest.append('RandomForestClassifier')
            if j==6:
                reg = SGDClassifier()
                reg.fit(X_train, y_train)
                scoring.append(accuracy_score(y_test,reg.predict(X_test)))
                algobest.append('SGDClassifier')
            alltesting = pd.DataFrame(scoring, columns=['r2'],index=algobest)
            bestalgo=alltesting.idxmax()[0]

    if bestalgo=='AdaBoostClassifier':
        model = AdaBoostClassifier()
        # define the grid of values to search
        grid = dict()
        grid['n_estimators'] = [10, 50, 100, 500]
        grid['learning_rate'] = [0.001, 0.01, 0.1]
        # define the grid search procedure
        classif = GridSearchCV(estimator=model, param_grid=grid, n_jobs=-1, cv=3, scoring='accuracy')
        classif.fit(X_train, y_train)
        
    if bestalgo=='DecisionTreeClassifier':
        param_grid = {'max_features': ['auto', 'sqrt', 'log2'],
              'ccp_alpha': [0.1, .01, .001],
              'max_depth' : [5, 6, 9, 12],
              'criterion' :['gini', 'entropy']
             }
        tree_clas = DecisionTreeClassifier()
        classif = GridSearchCV(estimator=tree_clas, param_grid=param_grid, cv=3, verbose=False)
        classif.fit(X_train, y_train)
        
    if bestalgo=='GradientBoostingClassifier':
        model=GradientBoostingClassifier()
        param_dist = dict(max_depth=[3,6,10],
                  n_estimators=[50,100,500],
                  min_samples_split=[2,5,8],
                  learning_rate=[0.01,0.05,0.1],
                  max_features=['sqrt', 'log2']
                  )
        classif = RandomizedSearchCV(model, param_distributions=param_dist,cv=3)
        classif.fit(X_train, y_train)
    if bestalgo=='KNeighborsClassifier':
        knn = KNeighborsClassifier()
        k_range = list(range(1, 31))
        param_grid = dict(n_neighbors=k_range)
        
        # defining parameter range
        classif = GridSearchCV(knn, param_grid, cv=3, scoring='accuracy',verbose=False)
        
        # fitting the model for grid search
        classif.fit(X_train, y_train)
    if bestalgo=='LogisticRegression':
        grid={"C":np.logspace(-3,3,7), "penalty":["l1","l2"]}# l1 lasso l2 ridge
        logreg=LogisticRegression()
        classif=GridSearchCV(logreg,grid,cv=10)
        classif.fit(X_train,y_train)
    if bestalgo=='RandomForestClassifier':  
        # Number of trees in random forest
        n_estimators = [int(x) for x in np.linspace(start = 100, stop = 300, num = 50)]
        # Number of features to consider at every split
        
        # Maximum number of levels in tree
        max_depth = [3,6,9]
        # Minimum number of samples required to split a node
        min_samples_split = [2, 5]
        # Minimum number of samples required at each leaf node
        min_samples_leaf = [2, 5]
        # Method of selecting samples for training each tree
        # Create the param grid
        param_grid = {'n_estimators': n_estimators,
                    'max_depth': max_depth,
                    'min_samples_split': min_samples_split,
                    'min_samples_leaf': min_samples_leaf}
        model = RandomForestClassifier()
        classif = GridSearchCV(estimator = model, param_grid = param_grid, cv = 3, verbose=False, n_jobs = -1)
        classif.fit(X_train, y_train)
    if bestalgo=='SGDClassifier': 
        params = {
        "loss" : ["hinge", "log", "squared_hinge"],
        "alpha" : [0.0001, 0.001, 0.01, 0.1],
        "penalty" : ["l2", "l1"],
        }
        model = SGDClassifier()
        classif = GridSearchCV(model, param_grid=params, cv = 3)
        classif.fit(X_train, y_train)
    prediction=classif.predict(X_test)
    try:
        importance = classif.best_estimator_.coef_
    except:
        importance = classif.best_estimator_.feature_importances_
    importance=pd.DataFrame(importance,columns=['importance'])
    features = pd.DataFrame(feature, columns=['features'])
    importance_frame = pd.concat([features,importance], axis=1)
    importance_frame = importance_frame.T
    confusion_matrix2 = confusion_matrix(y_test, prediction)

    matrixoutput=pd.DataFrame(confusion_matrix2,columns=target_name,index=target_name)
    print(bestalgo)
    print(classif.best_params_)
    print(importance_frame.to_csv(header=False, index=False))
    return matrixoutput.to_csv(index=False)

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
    print(autoselection(features.split(","),pred,data))
