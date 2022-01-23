import sys
import pandas as pd

from io import StringIO
from aesCipher import AESCipher


filename = sys.argv[1]
extension = sys.argv[2]
separator = sys.argv[3]
savePath = sys.argv[4]
key = sys.argv[5]
toEncrypt = sys.argv[6]



def parse_data(data):

    if extension == "csv" :
            # Assume that the user uploaded a CSV or TXT file
        df = pd.read_csv(data, delimiter=',')
    elif extension == 'xlsx' :
            # Assume that the user uploaded an excel file
        df = pd.read_excel(data)
    elif extension == 'txt' :
            # Assume that the user upl, delimiter = r'\s+'oaded an excel file
        df = pd.read_csv(data, delimiter = r'\s+')
    elif extension == 'json' :
        df = pd.read_json(data)
    else :
        print("There was an error while processing this file")
    
    return df

def principal_fonction(data,savepath) :
    return ''


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
    print(principal_fonction(data,savePath))