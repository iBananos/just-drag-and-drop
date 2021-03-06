import sys
import pandas as pd
import time

from io import StringIO
from aesCipher import AESCipher


filename = sys.argv[1]
extension = sys.argv[2]
separator = sys.argv[3]
key = sys.argv[4]
toEncrypt = sys.argv[5]



def parse_data(filename,separator):
    if separator==' ':
        separator=r'\s+'
    if extension == "csv" :
            # Assume that the user uploaded a CSV or TXT file
        try:
            df = pd.read_csv(filename,index_col=False, delimiter=separator)
        except:
            df = pd.read_csv(filename, delimiter=separator)
        if len(df.columns)==1:
            return 'Error_ Your DataFrame contains only one column please check your separator or change the data '
    elif extension == 'xlsx':
        # Assume that the user uploaded an excel file
        df = pd.read_excel(filename,index_col=False)
    elif extension == 'txt' :
            # Assume that the user upl, delimiter = r'\s+'oaded an excel file
        df = pd.read_csv(filename, delimiter = r'\s+',index_col=False)
    elif extension == 'json' :
        df = pd.read_json(filename)
    else :
        print("There was an error while processing this file")
    return df

def principal_fonction(filename,separator) :
    df = parse_data(filename,separator)
    try:
        if df=='Error_ Your DataFrame contains only one column please check your separator or change the data ':
            return 'Error_ Your DataFrame contains only one column please check your separator or change the data '
    except:
        if toEncrypt == "true" :
                df.drop(df.tail(1).index,inplace=True) # drop last n rows
        for i,j in enumerate(df.columns):
            try:
                df[j]=df[j].astype(float)
            except:
                continue
        dataexclude=df.select_dtypes(exclude=['object'])
        obj_df = df.select_dtypes(include=['object']).copy()
        for i in range(len(dataexclude.columns.values)):
            if len(dataexclude[dataexclude.columns.values[i]].unique())<10:
                obj_df = pd.concat([obj_df,dataexclude[dataexclude.columns.values[i]]],axis=1)
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
    print(principal_fonction(data,separator))