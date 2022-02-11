import pandas as pd
import numpy as np
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier,GradientBoostingClassifier
from sklearn.metrics import accuracy_score
from xgboost import XGBClassifier
from sklearn.linear_model import LogisticRegression
import plotly.graph_objs as go
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import confusion_matrix,classification_report
import pickle

from sklearn.model_selection import RepeatedStratifiedKFold
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import StackingClassifier

def get_stacking():
	# define the base models
	level0 = list()
	level0.append(('lr', KNeighborsClassifier()))
	level0.append(('bousting', LogisticRegression()))
	level0.append(('cart', DecisionTreeClassifier()))
	level0.append(('RandomForest', RandomForestClassifier()))
	level0.append(('boost', XGBClassifier()))

	# define meta learner model
	level1 = XGBClassifier()
	# define the stacking ensemble
	model = StackingClassifier(estimators=level0, final_estimator=level1, cv=5)
	return model
init=pd.read_csv('readyformeatalearning.csv')
init=init.drop(' iq_range.mean',axis=1)
init=init.drop(' iq_range.sd',axis=1)
init=init.drop(' can_cor.mean',axis=1)
init=init.drop(' can_cor.sd',axis=1)
init=init.drop(' lh_trace',axis=1)
init=init.drop(' attr_ent.mean',axis=1)
init=init.drop(' attr_ent.sd',axis=1)
init=init.drop(' class_ent',axis=1)
init=init.drop(' h_mean.mean',axis=1)
init=init.drop(' h_mean.sd',axis=1)
init=init.drop(' nr_cat',axis=1)
init=init.drop(' nr_disc',axis=1)
init=init.drop(' p_trace', axis=1)
init=init.drop(' roy_root', axis=1)
init=init.drop(' w_lambda', axis=1)
init2=init[init["TOP1"]==True]
fig = px.histogram(init2, x="algo")
fig.show()
obj_df = init.select_dtypes(include=['object']).copy()
lb_make = LabelEncoder()
for i in range(len(obj_df.columns.values)):
    obj_df[obj_df.columns.values[i]] = lb_make.fit_transform(obj_df[obj_df.columns.values[i]])
    init[obj_df.columns.values[i]] = obj_df[obj_df.columns.values[i]]

init=init.dropna(axis=0)
init=init.sort_values(['test_label'])
uniqueindex=init['test_label'].unique()
uniqueindex=np.random.choice(uniqueindex,int(len(uniqueindex)/1.25))
init=init.set_index('test_label')
init2=init[init["TOP1"]==True]
fig = px.histogram(init2, x="algo")
fig.show()
trainingset=init.loc[uniqueindex]

testset=init.drop(trainingset.index)

X_train=trainingset

X_train=X_train.drop('TOP1',axis=1)
#X_train=X_train.drop('test_label',axis=1)
X_train=X_train.drop('classification',axis=1)
X_train=X_train.drop('TOP2',axis=1)
X_train=X_train.drop('r2',axis=1)
X_train=X_train.drop('Gonebeagoodprediction',axis=1)

#X=df[['attr_conc.mean',' roy_root',' lh_trace', ' attr_conc.sd', ' attr_ent.mean', ' attr_ent.sd', ' attr_to_inst', ' can_cor.mean', ' can_cor.sd', ' cat_to_num', ' class_conc.mean', ' class_conc.sd', ' class_ent', ' cor.mean', ' cor.sd', ' cov.mean', ' cov.sd', ' eigenvalues.mean', ' eigenvalues.sd', ' eq_num_attr', ' freq_class.mean', ' freq_class.sd', ' g_mean.mean', ' g_mean.sd', ' gravity', ' h_mean.mean', ' h_mean.sd', ' inst_to_attr', ' iq_range.mean', ' iq_range.sd', ' joint_ent.mean', ' joint_ent.sd', ' kurtosis.mean', ' kurtosis.sd', ' mad.mean', ' mad.sd', ' max.mean', ' max.sd',' mean.mean',' mean.sd',' median.mean',' median.sd',' min.mean',' min.sd', ' mut_inf.mean', ' mut_inf.sd', ' nr_attr', ' nr_bin', ' nr_cat', ' nr_class', ' nr_cor_attr', ' nr_disc', ' nr_inst', ' nr_norm', ' nr_num', ' nr_outliers', ' ns_ratio', ' p_trace', ' range.mean', ' range.sd', ' sd.mean', ' sd.sd', ' skewness.mean', ' skewness.sd', ' sparsity.mean', ' sparsity.sd', ' t_mean.mean', ' t_mean.sd', ' var.mean', ' var.sd', ' w_lambda']]
#X_train = (X_train-X_train.mean())/X_train.std()
y_train=trainingset['Gonebeagoodprediction']
print(len(X_train.columns))


rf=RandomForestClassifier(bootstrap=False, ccp_alpha=0.0, class_weight=None,
                       criterion='gini', max_depth=220, max_features='sqrt',
                       max_leaf_nodes=None, max_samples=None,
                       min_impurity_decrease=0.0, min_impurity_split=None,
                       min_samples_leaf=1, min_samples_split=2,
                       min_weight_fraction_leaf=0.0, n_estimators=166,
                       n_jobs=None, oob_score=False, random_state=None,
                       verbose=0, warm_start=False)
#rf = RandomizedSearchCV(estimator = rf, param_distributions = random_grid, n_iter = 300,cv=3,verbose=2, n_jobs = -1)
# Random search of parameters, using 3 fold cross validation, 
# search across 100 different combinations, and use all available cores
#rf = RandomizedSearchCV(estimator = rf, param_distributions = random_grid, n_iter = 100, cv = 3, random_state=42, n_jobs = -1)
# Fit the random search model
rf.fit(X_train, y_train)
filename = 'Goodpredictor.sav'
pickle.dump(rf, open(filename, 'wb'))
X_test=testset
X_test=X_test.drop('TOP1',axis=1)
X_test=X_test.drop('TOP2',axis=1)
X_test=X_test.drop('classification',axis=1)
X_test=X_test.drop('r2',axis=1)
X_test=X_test.drop('Gonebeagoodprediction',axis=1)
print(X_test.columns)
#X_test = (X_test-X_test.mean())/X_test.std()
y_test=testset['Gonebeagoodprediction']
testset['pred']=rf.predict(X_test)
print(str(accuracy_score(y_test,rf.predict(X_test))))
cf_matrix= confusion_matrix(y_test, rf.predict(X_test))
print(classification_report(y_test, rf.predict(X_test)))
print(cf_matrix)
testset['classif_exact']=testset['pred'] == testset['Gonebeagoodprediction']

confuindex=testset[testset['pred']==True]
import plotly.express as px
testset2=testset[testset["Gonebeagoodprediction"]==True]
fig = px.histogram(testset2, x="algo")
fig.show()
testset2=testset[testset["pred"]==True]
fig = px.histogram(testset2, x="algo")
fig.show()

testset=testset.drop(confuindex.index)
print(testset[testset['pred']==True])
print(testset)


obj_df = testset.select_dtypes(include=['object']).copy()
lb_make = LabelEncoder()
for i in range(len(obj_df.columns.values)):
    obj_df[obj_df.columns.values[i]] = lb_make.fit_transform(obj_df[obj_df.columns.values[i]])
    testset[obj_df.columns.values[i]] = obj_df[obj_df.columns.values[i]]
uniqueindex=testset.index.unique()
uniqueindex=np.random.choice(uniqueindex,int(len(uniqueindex)/1.25))

trainingset=testset.loc[uniqueindex]

testset=testset.drop(trainingset.index)

X_train=trainingset
X_train=X_train.drop('r2',axis=1)
#X_train=X_train.drop('test_label',axis=1)
X_train=X_train.drop('classification',axis=1)
X_train=X_train.drop('TOP2',axis=1)
X_train=X_train.drop('TOP1',axis=1)
X_train=X_train.drop('pred',axis=1)
X_train=X_train.drop('classif_exact',axis=1)
X_train=X_train.drop('Gonebeagoodprediction',axis=1)

#X=df[['attr_conc.mean',' roy_root',' lh_trace', ' attr_conc.sd', ' attr_ent.mean', ' attr_ent.sd', ' attr_to_inst', ' can_cor.mean', ' can_cor.sd', ' cat_to_num', ' class_conc.mean', ' class_conc.sd', ' class_ent', ' cor.mean', ' cor.sd', ' cov.mean', ' cov.sd', ' eigenvalues.mean', ' eigenvalues.sd', ' eq_num_attr', ' freq_class.mean', ' freq_class.sd', ' g_mean.mean', ' g_mean.sd', ' gravity', ' h_mean.mean', ' h_mean.sd', ' inst_to_attr', ' iq_range.mean', ' iq_range.sd', ' joint_ent.mean', ' joint_ent.sd', ' kurtosis.mean', ' kurtosis.sd', ' mad.mean', ' mad.sd', ' max.mean', ' max.sd',' mean.mean',' mean.sd',' median.mean',' median.sd',' min.mean',' min.sd', ' mut_inf.mean', ' mut_inf.sd', ' nr_attr', ' nr_bin', ' nr_cat', ' nr_class', ' nr_cor_attr', ' nr_disc', ' nr_inst', ' nr_norm', ' nr_num', ' nr_outliers', ' ns_ratio', ' p_trace', ' range.mean', ' range.sd', ' sd.mean', ' sd.sd', ' skewness.mean', ' skewness.sd', ' sparsity.mean', ' sparsity.sd', ' t_mean.mean', ' t_mean.sd', ' var.mean', ' var.sd', ' w_lambda']]
#X_train = (X_train-X_train.mean())/X_train.std()
y_train=trainingset['Gonebeagoodprediction']



rf = get_stacking()

# Random search of parameters, using 3 fold cross validation, 
# search across 100 different combinations, and use all available cores
#rf = RandomizedSearchCV(estimator = rf, param_distributions = random_grid, n_iter = 100, cv = 3, random_state=42, n_jobs = -1)
# Fit the random search model
rf.fit(X_train, y_train)
filename = 'SecondaryGoodPredictor.sav'
pickle.dump(rf, open(filename, 'wb'))

X_test=testset
X_test=X_test.drop('r2',axis=1)
X_test=X_test.drop('TOP2',axis=1)
X_test=X_test.drop('classification',axis=1)
X_test=X_test.drop('TOP1',axis=1)
X_test=X_test.drop('pred',axis=1)
X_test=X_test.drop('classif_exact',axis=1)
X_test=X_test.drop('Gonebeagoodprediction',axis=1)

print(X_test.columns)
#X_test = (X_test-X_test.mean())/X_test.std()
y_test=testset['Gonebeagoodprediction']
testset['pred']=rf.predict(X_test)
print(str(accuracy_score(y_test,rf.predict(X_test))))
cf_matrix= confusion_matrix(y_test, rf.predict(X_test))
print(classification_report(y_test, rf.predict(X_test)))
print(cf_matrix)

testset['classif_exact']=testset['pred'] == testset['Gonebeagoodprediction']

confuindex=testset[testset['pred']==True]
#confuindex=confuindex[confuindex['TOP2']==True]
#confuindex=confuindex[confuindex['TOP1']==False]
print(confuindex)
#confuindex1=confuindex.groupby(confuindex.index).count()
#confuindex1=confuindex1[confuindex1['classification']==1]
print(len(confuindex.index))
testset=testset.drop(confuindex.index)

print(len(testset.index.unique()))
testset['classif_exact']=testset['pred'] == testset['Gonebeagoodprediction']
false=testset[testset['classif_exact']==False]
fig = px.histogram(false, x="algo")
fig.show()
fig=px.scatter(false.index,false['r2'],color=false['algo'])
fig.show()

'''

testset.to_csv("to_improuve.csv")

'''
