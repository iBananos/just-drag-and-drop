import pandas as pd
from io import StringIO
from aesCipher import AESCipher
import sys

filename = sys.argv[1]
extension = sys.argv[2]
demo = sys.argv[3]
if demo == "false" :
    key = sys.argv[4]
    toEncrypt = sys.argv[5]
else : 
    key = ""
    toEncrypt = ""


def parse_data(filename):
    
    if extension == "csv" :
            # Assume that the user uploaded a CSV or TXT file
        try:
            df = pd.read_csv(filename,index_col=0, delimiter=',', encoding="utf-8")
        except:
            df = pd.read_csv(filename, delimiter=',', encoding="utf-8")
    elif extension == 'xlsx' or extension == 'xls':
            # Assume that the user uploaded an excel file
        df = pd.read_excel(filename,index_col=0)
    elif extension == 'txt' or extension == 'tsv' :
            # Assume that the user upl, delimiter = r'\s+'oaded an excel file
        df = pd.read_csv(filename, delimiter = r'\s+',index_col=0, encoding="utf-8")
    elif extension == 'json' :
        df = pd.read_json(filename)
    else :
        print("There was an error while processing this file")
    
    return df

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

def correlation_matrix(filename) : 
    df = parse_data(filename)
    if check_type(filename) == True : 
        cm = df.corr()
    else :
        print("issue with data types")
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
    print(correlation_matrix(data))
