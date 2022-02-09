import pickle
import gzip
with gzip.open('FirstTOP1.sav', 'rb') as ifp:
    print(pickle.load(ifp))