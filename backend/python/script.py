import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.svm import LinearSVC
from sklearn.ensemble import AdaBoostClassifier, GradientBoostingClassifier, RandomForestClassifier, GradientBoostingRegressor,RandomForestRegressor
from sklearn.linear_model import LogisticRegression, Ridge, ARDRegression
from sklearn.metrics import r2_score
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import confusion_matrix
from io import StringIO
from aesCipher import AESCipher
import time
import sys


filename = sys.argv[1]
extension = sys.argv[2]
features = sys.argv[3]
pred = sys.argv[4]
list_param = sys.argv[5]
analyze_choice = sys.argv[6]
algo_choice = sys.argv[7]
key = sys.argv[8]
toEncrypt = sys.argv[9]


####fonction pour pouvoir lire les databases et les transformer en dataframes

def parse_data(filename):

    if extension == "csv" :
            # Assume that the user uploaded a CSV or TXT file
        df = pd.read_csv(filename,index_col=0, delimiter=',', encoding="utf-8")
    elif extension == 'xlsx' :
            # Assume that the user uploaded an excel file
        df = pd.read_excel(filename,index_col=0,encoding="utf-8")
    elif extension == 'txt' or extension == 'tsv' :
            # Assume that the user upl, delimiter = r'\s+'oaded an excel file
        df = pd.read_csv(filename, delimiter = r'\s+',index_col=0, encoding="utf-8")
    elif extension == 'json' :
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
    else :
        print("issue with data types")
    return cm.to_csv(index=False)

###fonction qui retourne une liste contenant la description de la database

def get_describe(filename,choice) :
    df = parse_data(filename)
    if check_type(filename) == True : 
        des = df.describe()
    else : 
        print("issue with data types")
    return des.to_csv()

###fonction pour pouvoir récupérer les parametres par default

def get_parameters_default(algo_choice):
    if algo_choice == "LinearSVC":
        list_parameters_default = ["l2",1e-14,1.0,None]
    elif algo_choice == "AdaBoost" :
        list_parameters_default = [50,1.0]
    elif algo_choice == "GradientBoosting" :
        list_parameters_default = [0.1,100,3,2]
    elif algo_choice == "RandomForest" :
        list_parameters_default = [100,None,2,None]
    elif algo_choice == "LogisticRegression" :
        list_parameters_default = ["l2",1e-14,1.0,None,100]
    elif algo_choice == "Ridge" :
        list_parameters_default = [1e-13,"auto",1.0]
    elif algo_choice == "BayesianARDRegression" :
        list_parameters_default = [300,1e-3,1e-6,1e-6,1e-6,1e-6,]
    else : 
        print("choose an available algorithm")
    return list_parameters_default

###fonction qui permet de recuperer la liste des parametres apres avoir verifie pour chaque parametre si c'est celui
###par default ou non

def get_list_parameters(algo_choice,list_parameters) : 
    list_parameters_default = get_parameters_default(algo_choice)
    #for i in range(len(list_parameters)) :
    #    if list_parameters[i] == None : ###si c'est un param par default
    #        list_parameters[i] = list_parameters_default[i]
    #    else : 
    #        list_parameters[i] = list_parameters[i] 
    ##return list_parameters
    return list_parameters_default


def principal_fonction(filename,features,pred,list_param,analyze_choice,algo_choice) :
    df = parse_data(filename)
    X=df[features]
    y=df[pred]
    df=pd.concat([X,y],axis=1)
    df=df.dropna()
    df=df.reset_index(drop=True)
    if analyze_choice == "Classification" :
        target_name=pd.unique(df[pred].values.flatten())
        target_name=sorted(target_name)
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
            model = GradientBoostingRegressor(learning_rate=float(parameters[0]), n_estimators=int(parameters[1]), max_depth=int(parameters[2]), min_samples_split=int(parameters[3]))
            model.fit(X_train, y_train)
            prediction = model.predict(X_test)
            score = r2_score(y_test,model.predict(X_test))
        elif algo_choice == "RandomForest" :
            model = RandomForestRegressor(n_estimators=int(parameters[0]), max_depth=int(parameters[1]), min_samples_split=int(parameters[2]))
            model.fit(X_train,y_train)
            prediction = model.predict(X_test)
            score = r2_score(y_test,model.predict(X_test))
        elif algo_choice == "Ridge" :
            model = Ridge(tol=float(parameters[0]), solver=parameters[1],alpha=float(parameters[2]))
            model.fit(X_train,y_train)
            prediction = model.predict(X_test)
            score = r2_score(y_test,model.predict(X_test))
        else : 
            print("choose an available alogrithm")

        prediction=pd.DataFrame(prediction,columns=['prediction'])
        
        y_test=y_test.reset_index(drop=True)
        prediction_and_true=pd.concat([prediction,y_test],axis=1)
        prediction_and_true = prediction_and_true.sample(n=100)
        return prediction_and_true.to_csv(index=False)
                             
    elif analyze_choice == "Classification" :
        parameters = get_list_parameters(algo_choice,list_param)
        
        if algo_choice == "LinearSVC" :
            model = LinearSVC(penalty=parameters[0], tol=float(parameters[1]), C=float(parameters[2]), class_weight=parameters[3])
            model.fit(X_train, y_train)
            prediction = model.predict(X_test)
        elif algo_choice == "AdaBoost" :
            model = AdaBoostClassifier(n_estimators=int(parameters[0]), learning_rate=float(parameters[1]))
            model.fit(X_train, y_train)
            prediction = model.predict(X_test)
        elif algo_choice == "GradientBoosting2" :
            model = GradientBoostingClassifier(learning_rate=float(parameters[0]), n_estimators=int(parameters[1]), max_depth=int(parameters[2]), min_samples_split=int(parameters[3]))
            model.fit(X_train, y_train)
            prediction = model.predict(X_test)
        elif algo_choice == "RandomForest2" :
            model = RandomForestClassifier(n_estimators=int(parameters[0]), max_depth=int(parameters[1]), min_samples_split=int(parameters[2]), class_weight=int(parameters[3]))
            model.fit(X_train, y_train)
            prediction = model.predict(X_test)
        elif algo_choice == "LogisticRegression" :
            model = LogisticRegression(penalty=parameters[0], tol=float(parameters[1]),C=float(parameters[2]), class_weight=parameters[3], max_iter=int(parameters[4]))
            model.fit(X_train, y_train)
            prediction = model.predict(X_test)
        else : 
            print("choose an available alogrithm")
                             
        confusion_matrix2 = confusion_matrix(y_test, prediction)
        #print(confusion_matrix2)
        #print(target_name)
        matrixoutput=pd.DataFrame(confusion_matrix2,columns=target_name,index=target_name)
        return matrixoutput.to_csv(index=False)
                             
    else : 
        print("wrong choice")



def decryptFile(filename) :
    aesCipher = AESCipher(key)
    encryptData = open(filename,'r').read()
    csvPlainText = aesCipher.decrypt(encryptData)
    return StringIO(csvPlainText)


if __name__ == "__main__":
    #print("HELLO world")
    #print(filename,features.split(","),pred,list_param.split(","),analyze_choice,algo_choice)
    if toEncrypt == "true" :
        data = decryptFile(filename)
    else :
        data = filename
    print(principal_fonction(data, features.split(","), pred, list_param, analyze_choice, algo_choice))
