import pandas as pd
from sklearn.model_selection import train_test_split
import time
from sklearn.svm import LinearSVC
from sklearn.ensemble import AdaBoostClassifier, GradientBoostingClassifier, RandomForestClassifier, GradientBoostingRegressor
from sklearn.linear_model import LogisticRegression, Ridge, ARDRegression
from sklearn.metrics import r2_score
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import confusion_matrix


####fonction pour pouvoir lire les databases et les transformer en dataframes

def parse_data(filename):

    if 'csv' in filename:
            # Assume that the user uploaded a CSV or TXT file
        df = pd.read_csv(filename,index_col=0, delimiter=',', encoding="utf-8")
    elif 'xlsx' in filename:
            # Assume that the user uploaded an excel file
        df = pd.read_excel(filename,index_col=0,encoding="utf-8")
    elif 'txt' or 'tsv' in filename:
            # Assume that the user upl, delimiter = r'\s+'oaded an excel file
        df = pd.read_csv(filename, delimiter = r'\s+',index_col=0, encoding="utf-8")
    elif 'json' in filename:
        df = pd.read_json(filename)
    else :
        print("There was an error while processing this file")
    
    return df

####fonction qui vérifie le type des colonnes et transforme les string en float si possible
####(cette fonction est appelee dans correlation_matrix et get_describe, si tu veux pas l'utiliser,
####faudra l'enlever aussi de ces deux fonctions mais tu me diras au pire (nico voulait que je te les envoie au cas ou))

def check_type(filename) :
    data=parse_data(filename)
    obj_df = data.select_dtypes(include=['object']).copy()
    for i in range(len(obj_df.columns.values)):
        try:
            obj_df[obj_df.columns.values[i]] = obj_df[obj_df.columns.values[i]].astype(float)
            data[obj_df.columns.values[i]] = obj_df[obj_df.columns.values[i]]
            return True
        except:
            obj_df[obj_df.columns.values[i]]=obj_df[obj_df.columns.values[i]]
    return True

###fonction qui retourne une liste contenant la matrice de correlation de la database

def correlation_matrix(filename) : 
    df = parse_data(filename)
    if check_type(filename) == True : 
        cm = df.corr()
        list_corr = [cm.columns.tolist()] + cm.reset_index().values.tolist()
    else :
        print("issue with data types")
    return list_corr

###fonction qui retourne une liste contenant la description de la database

def get_describe(filename,choice) :
    df = parse_data(filename)
    if check_type(filename) == True : 
        des = df.describe()
        list_des = [des.columns.tolist()] + des.reset_index().values.tolist()
    else : 
        print("issue with data types")
    return list_des

###fonction pour pouvoir récupérer les parametres par default

def get_parameters_default(algo_choice):
    if algo_choice == "LinearSVC":
        list_parameters_default = ["l2",1e-14,1.0,None]
    elif algo_choice == "AdaBoost" :
        list_parameters_default = [50,1.0]
    elif algo_choice == "Gradient Boosting" :
        list_parameters_default = [0.1,100,3,2]
    elif algo_choice == "Random Forest" :
        list_parameters_default = [100,None,2,None]
    elif algo_choice == "Logistic Regression" :
        list_parameters_default = ["l2",1e-14,1.0,None,100]
    elif algo_choice == "Ridge" :
        list_parameters_default = [1e-13,"auto",1.0]
    elif algo_choice == "Bayesian ARD Regression" :
        list_parameters_default = [300,1e-3,1e-6,1e-6,1e-6,1e-6,]
    else : 
        print("choose an available algorithm")
    return list_parameters_default

###fonction qui permet de recuperer la liste des parametres apres avoir verifie pour chaque parametre si c'est celui
###par default ou non

def get_list_parameters(algo_choice,list_parameters) : 
    list_parameters_default = get_parameters_default(algo_choice)
    for i in range(len(list_parameters)) :
        if list_parameters[i] == None : ###si c'est un param par default
            list_parameters[i] = list_parameters_default[i]
        else : 
            list_parameters[i] = list_parameters[i] 
    return list_parameters


def principal_fonction(filename,features,pred,list_param,analyze_choice,algo_choice) :
    df = parse_data(filename)
    X=df[features]
    y=df[pred]
    df=pd.concat([X,y],axis=1)
    df=df.dropna()
    df=df.reset_index(drop=True)
    obj_df = df.select_dtypes(include=['object']).copy()
    lb_make = LabelEncoder()
    for i in range(len(obj_df.columns.values)):
                obj_df[obj_df.columns.values[i]] = lb_make.fit_transform(obj_df[obj_df.columns.values[i]])
                df[obj_df.columns.values[i]] = obj_df[obj_df.columns.values[i]]
    X=df[features]
    y=df[pred]
    
    X = (X-X.mean())/X.std()
    X_train, X_test, y_train, y_test =  train_test_split(X, y, test_size=0.2, random_state=42)
    if analyze_choice == "Regression" : 
        
        parameters = get_list_parameters(algo_choice,list_param)
        
        if algo_choice == "GradientBoosting" :
            model = GradientBoostingRegressor(learning_rate=parameters[0], n_estimators=parameters[1], max_depth=parameters[2], min_samples_split=parameters[3])
            model.fit(X_train, y_train)
            prediction = model.predict(X_test)
            score = r2_score(y_test,model.predict(X_test))
        elif algo_choice == "RandomForest" :
            model = RandomForestClassifier(n_estimators=parameters[0], max_depth=parameters[1], min_samples_split=parameters[2])
            model.fit(X_train,y_train)
            prediction = model.predict(X_test)
            score = r2_score(y_test,model.predict(X_test))
        elif algo_choice == "Ridge" :
            model = Ridge(tol=parameters[0], solver=parameters[1],alpha=parameters[2])
            model.fit(X_train,y_train)
            prediction = model.predict(X_test)
            score = r2_score(y_test,model.predict(X_test))
        elif algo_choice == "BayesianARDRegression" :
            model = ARDRegression(n_iter=parameters[0], tol=parameters[1],alpha_1=parameters[2], alpha_2=parameters[3], lambda_1=parameters[4], lambda_2=parametetrs[5])
            model.fit(X_train,y_train)
            prediction = model.predict(X_test)
            score = r2_score(y_test,model.predict(X_test))
        else : 
            print("choose an available alogrithm")

        prediction=pd.DataFrame(prediction,columns=['prediction'])
        
        y_test=y_test.reset_index(drop=True)
        print(prediction)
        print(y_test)
        prediction_and_true=pd.concat([prediction,y_test],axis=1)
        print(prediction_and_true)
        return prediction_and_true.to_csv(['prediction_true.csv'])
                             
    elif analyze_choice == "Classification" :
        target_name=pd.unique(df[pred].values.flatten())
        target_name=sorted(target_name)
    
        parameters = get_list_parameters(algo_choice,list_param)
        
        if algo_choice == "LinearSVC" :
            model = LinearSVC(penalty=parameters[0], tol=parameters[1], C=parameters[2], class_weight=parameters[3])
            model.fit(X_train, y_train)
            prediction = model.predict(X_test)
        elif algo_choice == "AdaBoost" :
            model = AdaBoostClassifier(n_estimators=parameters[0], learning_rate=parameters[1])
            model.fit(X_train, y_train)
            prediction = model.predict(X_test)
        elif algo_choice == "GradientBoosting2" :
            model = GradientBoostingClassifier(learning_rate=parameters[0], n_estimators=parameters[1], max_depth=parameters[2], min_samples_split=parameters[3])
            model.fit(X_train, y_train)
            prediction = model.predict(X_test)
        elif algo_choice == "RandomForest2" :
            model = RandomForestClassifier(n_estimators=parameters[0], max_depth=parameters[1], min_samples_split=parameters[2], class_weight=parameters[3])
            model.fit(X_train, y_train)
            prediction = model.predict(X_test)
        elif algo_choice == "LogisticRegression" :
            model = LogisticRegression(penalty=parameters[0], tol=parameters[1],C=parameters[2], class_weight=parameters[3], max_iter=parameters[4])
            model.fit(X_train, y_train)
            prediction = model.predict(X_test)
        else : 
            print("choose an available alogrithm")
                             
        confusion_matrix2 = confusion_matrix(y_test, prediction)
        print(confusion_matrix2)
        confusion_matrix2 = confusion_matrix2.astype(float)
        print(target_name)
        return confusion_matrix2,target_name
                             
    else : 
        print("wrong choice")

