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
def autoselection(feature,predict,filename):
    data=pd.read_csv(filename)
    data=data.dropna()
    n=min(len(data),1000)
    dataselect=data.sample(n=n)
    meta_feature=pd.read_csv('meta_featuretest.csv')
    y=dataselect[predict]
    X=dataselect[feature]
    X=X.to_numpy()
    y=y.to_numpy()
    mfe = MFE(groups=["general", "statistical", "info-theory"])#features=["min","max","sd","attr_to_inst","mean","cat_to_num","nr_attr", "nr_bin", "nr_cat","nr_inst",'nr_num',"num_to_cat", "nr_class","attr_ent",'cor','cov',"nr_cor_attr",'mad',"nr_outliers","skewness"])
    mfe.fit(X, y)
    ft = mfe.extract()
    df = pd.DataFrame(ft, columns=ft[0])
    df=df.replace([np.inf, -np.inf], np.nan)
    df.values[1]=df.values[1].astype(float)
    df=df.drop(df.index[[0]])
    df=df.reset_index(drop=True)
    FirstModel = joblib.load('FirstTOP1.sav')
    SecondaryModel = joblib.load('SecondaryTOP1.sav')
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
    testone=testone.drop('sd_ratio',axis=1)
    testone=testone.drop('num_to_cat',axis=1)
    
    pred1=FirstModel.predict(testone)
    testone['pred2']=SecondaryModel.predict(testone)
    testone['pred']=pred1
    algoselection=testone[testone['pred']==True]
    algoselection=algoselection['algo']

    algoselection2=testone[testone['pred2']==True]
    algoselection2=algoselection2['algo']
    if len(algoselection2)==0:
        testone['pred2']=[True,True,True,True,True,True,True]
        algoselection2=testone[testone['pred2']==True]
        algoselection2=algoselection2['algo']
    obj_df = data.select_dtypes(include=['object']).copy()
    lb_make = LabelEncoder()
    for i in range(len(obj_df.columns.values)):
        try:
            obj_df[obj_df.columns.values[i]] = lb_make.fit_transform(obj_df[obj_df.columns.values[i]])
            data[obj_df.columns.values[i]] = obj_df[obj_df.columns.values[i]]
        except:
            print(obj_df.columns.values[i]+' contient des NaN')
    
    X=data[feature]
    X = (X-X.mean())/X.std()
    y=data[predict]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    for i,j in enumerate(algoselection.values):
        scoring=[]
        algobest=[]
        print(j)
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
        loss = ['ls', 'lad', 'huber']
        n_estimators = [100, 500, 900, 1100, 1500]
        max_depth = [2, 3, 5, 10, 15]
        min_samples_leaf = [1, 2, 4, 6, 8] 
        min_samples_split = [2, 4, 6, 10]
        max_features = ['auto', 'sqrt', 'log2', None]

        # Define the grid of hyperparameters to search
        hyperparameter_grid = {'loss': loss,
            'n_estimators': n_estimators,
            'max_depth': max_depth,
            'min_samples_leaf': min_samples_leaf,
            'min_samples_split': min_samples_split,
            'max_features': max_features}

        # Set up the random search with 4-fold cross validation
        reg = RandomizedSearchCV(estimator=GradientBoostingRegressor(),
                    param_distributions=hyperparameter_grid,
                    cv=3, n_iter=50,
                    scoring = 'neg_mean_absolute_error',n_jobs = 4,
                    return_train_score = True,
                    random_state=42)
        reg.fit(X_train, y_train)
    if bestalgo=='KNeighborsRegressor':
        param_grid = {'n_neighbors': list(range(4,25)),
              'weights': ['uniform', 'distance']}
        knn = KNeighborsRegressor()
        reg = GridSearchCV(knn, param_grid, cv=3)
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
        reg = RandomizedSearchCV(estimator = rf, param_distributions = random_grid, n_iter = 10, cv = 3)
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
    print(r2_score(y_test,reg.predict(X_test)))
    return reg.predict(X_test)
