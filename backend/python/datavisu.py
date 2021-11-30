import sys
import pandas as pd
import time

filename = sys.argv[1]
first = sys.argv[2]
second = sys.argv[3]
third = sys.argv[4]

def parse_data(filename):

    if '.csv' in filename:
            # Assume that the user uploaded a CSV or TXT file
        df = pd.read_csv(filename,index_col=0, delimiter=',', encoding="utf-8")
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

def principal_fonction(filename,first,second,third) :
    df = parse_data(filename)
    return (df[[first,second,third]].sample(n=100).to_string())
   


if __name__ == "__main__":
    print(principal_fonction(filename,first,second,third))
