import sys
import pandas as pd
import time

from io import StringIO
from aesCipher import AESCipher


filename = sys.argv[1]
extension = sys.argv[2]
key = sys.argv[3]
toEncrypt = sys.argv[4]



def parse_data(data):

    if extension == "csv" :
            # Assume that the user uploaded a CSV or TXT file
        df = pd.read_csv(data, index_col=0, delimiter=',', encoding="utf-8")
    elif extension == 'xlsx' :
            # Assume that the user uploaded an excel file
        df = pd.read_excel(data,index_col=0,encoding="utf-8")
    elif extension == 'txt' or extension == 'tsv' :
            # Assume that the user upl, delimiter = r'\s+'oaded an excel file
        df = pd.read_csv(data, delimiter = r'\s+',index_col=0, encoding="utf-8")
    elif extension == 'json' :
        df = pd.read_json(data)
    else :
        print("There was an error while processing this file")
    
    return df

def principal_fonction(data) :
    df = parse_data(data)
    obj_df = df.select_dtypes(include=['object']).copy()
    return (obj_df.columns.values)


def decryptFile(filename) :
    aesCipher = AESCipher(key)
    encryptData = open(filename,'r').read()
    csvPlainText = aesCipher.decrypt(encryptData)
    return StringIO(csvPlainText)
   


if __name__ == "__main__":
    if toEncrypt == "true" :
        data = decryptFile(filename)
    else :
        data = filename
    print(principal_fonction(data))