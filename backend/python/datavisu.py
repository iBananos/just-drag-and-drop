import sys
from numpy import False_, fabs
import pandas as pd
import time

filename = sys.argv[1]
first = sys.argv[2]
second = sys.argv[3]
third = sys.argv[4]
sample = sys.argv[5]

def parse_data(filename):

    if '.csv' in filename:
            # Assume that the user uploaded a CSV or TXT file
        df = pd.read_csv(filename,index_col=False, delimiter=',', encoding="utf-8")
    elif '.xlsx' in filename:
            # Assume that the user uploaded an excel file
        df = pd.read_excel(filename,index_col=0,encoding="utf-8")
    elif '.txt' or '.tsv' in filename:
            # Assume that the user upl, delimiter = r'\s+'oaded an excel file
        df = pd.read_csv(filename, delimiter = r'\s+',index_col=0, encoding="utf-8")
    elif '.json' in filename:
        df = pd.read_json(filename)
    else :
        print("There was an error while processing this file")
    
    return df

def principal_fonction(filename,first,second,third,sample) :
    df = parse_data(filename)
    index = df.index
    number_of_rows = len(index)
    number = float(number_of_rows)/float(100)*float(sample)
    if(third == 'AucuneColoration') : 
        return df[[str(first),str(second)]].sample(n=int(number)).to_csv(index=False)
    return df[[first,second,third]].sample(n=int(number)).to_csv(index=False)
    #return df[[first,second,third]].to_csv(index=False)
   


if __name__ == "__main__":
    print(principal_fonction(filename,first,second,third,sample))
