import sys
import pandas as pd
import time

filename = sys.argv[1]

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

def principal_fonction(filename) :
    df = parse_data(filename)
    obj_df = df.select_dtypes(include=['object']).copy()
    return (obj_df.columns.values)
   


if __name__ == "__main__":
    print(principal_fonction(filename))
