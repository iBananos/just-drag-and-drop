import pandas as pd
from io import StringIO
from aesCipher import AESCipher
import sys

filename = sys.argv[1]
extension = sys.argv[2]
demo = sys.argv[3]
separator = sys.argv[4]
if demo == "false" :
    key = sys.argv[5]
    toEncrypt = sys.argv[6]
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

def check_type(filename,separator) :
    data=parse_data(filename,separator)
    if toEncrypt == "true" :
        data.drop(data.tail(1).index,inplace=True) # drop last n rows
    obj_df = data.select_dtypes(include=['object']).copy()
    for i in range(len(obj_df.columns.values)):
        try:
            obj_df[obj_df.columns.values[i]] = obj_df[obj_df.columns.values[i]].astype(float)
            data[obj_df.columns.values[i]] = obj_df[obj_df.columns.values[i]]
            return True
        except:
            obj_df[obj_df.columns.values[i]]=obj_df[obj_df.columns.values[i]]
    return True

def correlation_matrix(filename,separator) : 
    df = parse_data(filename,separator)
    #if check_type(filename,separator) == True : 
    cm = df.corr()
    #else :
    #    print("issue with data types")
    return cm.to_csv(index=False)

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
    print(correlation_matrix(data,separator))
