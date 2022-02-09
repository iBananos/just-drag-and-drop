import sys
from numpy import False_, fabs
import pandas as pd
import time

from io import StringIO
from aesCipher import AESCipher

filename = sys.argv[1]
extension = sys.argv[2]
first = sys.argv[3]
second = sys.argv[4]
third = sys.argv[5]
sample = sys.argv[6]
demo = sys.argv[7]
separator = sys.argv[8]
if demo == "false" :
    key = sys.argv[9]
    toEncrypt = sys.argv[10]
else : 
    key = ""
    toEncrypt = ""

    
def parse_data(filename,separator):

    if extension == "csv" :
            # Assume that the user uploaded a CSV or TXT file
        try:
            df = pd.read_csv(filename,index_col=0, delimiter=separator)
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

def principal_fonction(filename,first,second,third,sample,separator) :
    df = parse_data(filename,separator)
    index = df.index
    number_of_rows = len(index)
    number = float(number_of_rows)/float(100)*float(sample)
    if(third == 'AucuneColoration') : 
        return df[[str(first),str(second)]].sample(n=int(number)).to_csv(index=False)
    return df[[first,second,third]].sample(n=int(number)).to_csv(index=False)
    #return df[[first,second,third]].to_csv(index=False)


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
    print(principal_fonction(data, first, second, third, sample,separator))
