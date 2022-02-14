import sys
from numpy import save
import pandas as pd
from pandas_profiling import ProfileReport

from io import StringIO
from aesCipher import AESCipher


filename = sys.argv[1]
extension = sys.argv[2]
separator = sys.argv[3]
savePath = sys.argv[4]
key = sys.argv[5]
toEncrypt = sys.argv[6]


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

def principal_fonction(data,savepath,separator) :
    file=parse_data(data,separator)
    if toEncrypt == "true" :
        file.drop(file.tail(1).index,inplace=True) # drop last n rows
    profile = ProfileReport(file,minimal=True)
    profile.to_file(savepath)

    return " "


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
    print(principal_fonction(data,savePath,separator))