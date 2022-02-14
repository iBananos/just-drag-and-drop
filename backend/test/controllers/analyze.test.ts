import request from 'supertest';
import app from '../../src/app';



describe('POST /api/analyze/parametersDemo', () => {
    test('reponse avec code 401 car il manque des informations', async () => {
        const res = await request(app)
            .post('/api/analyze/parametersDemo')
            .set('Accept', 'application/json')
            .send({"nameAnalyze":"",
            "database":"diamonds.csv",
            "date":"2022-02-14T01:49:14.743Z",
            "pred":"carat","feature":["price"],
            "category":"Regression",
            "algo":"GradientBoosting",
            "params":{  "learning_rate":"0.1",
                        "n_estimators":"100",
                        "max_depth":"3",
                        "min_samples_split":"2"}});
        jest.setTimeout(90 * 1000);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("ok");
        expect(res.body.category).toBe("Regression");

    })
});

describe('POST /api/analyze/parametersDemo', () => {
    test('reponse : feature n\'existe pas', async () => {
        const res = await request(app)
            .post('/api/analyze/parametersDemo')
            .set('Accept', 'application/json')
            .send({"nameAnalyze":"",
            "database":"diamonds.csv",
            "date":"2022-02-14T01:49:14.743Z",
            "pred":"carat",
            "category":"Regression",
            "algo":"GradientBoosting",
            "params":{  "learning_rate":"0.1",
                        "n_estimators":"100",
                        "max_depth":"3",
                        "min_samples_split":"2"}});
        jest.setTimeout(90 * 1000);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("features is not a list");

    })
});

describe('POST /api/analyze/parametersDemo', () => {
    test('reponse : feature est vide', async () => {
        const res = await request(app)
            .post('/api/analyze/parametersDemo')
            .set('Accept', 'application/json')
            .send({"nameAnalyze":"",
            "database":"diamonds.csv",
            "date":"2022-02-14T01:49:14.743Z",
            "pred":"carat","feature":[],
            "category":"Regression",
            "algo":"GradientBoosting",
            "params":{  "learning_rate":"0.1",
                        "n_estimators":"100",
                        "max_depth":"3",
                        "min_samples_split":"2"}});
        jest.setTimeout(90 * 1000);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("features is empty");

    })
});

describe('POST /api/analyze/parametersDemo', () => {
    test('reponse : feature a une colonne inexistante', async () => {
        const res = await request(app)
            .post('/api/analyze/parametersDemo')
            .set('Accept', 'application/json')
            .send({"nameAnalyze":"",
            "database":"diamonds.csv",
            "date":"2022-02-14T01:49:14.743Z",
            "pred":"carat","feature":["cetteColonneExistPas"],
            "category":"Regression",
            "algo":"GradientBoosting",
            "params":{  "learning_rate":"0.1",
                        "n_estimators":"100",
                        "max_depth":"3",
                        "min_samples_split":"2"}});
        jest.setTimeout(90 * 1000);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("a feature column does not exist");

    })
});

describe('POST /api/analyze/parametersDemo', () => {
    test('reponse : feature a une colonne non string', async () => {
        const res = await request(app)
            .post('/api/analyze/parametersDemo')
            .set('Accept', 'application/json')
            .send({"nameAnalyze":"",
            "database":"diamonds.csv",
            "date":"2022-02-14T01:49:14.743Z",
            "pred":"carat","feature":[42],
            "category":"Regression",
            "algo":"GradientBoosting",
            "params":{  "learning_rate":"0.1",
                        "n_estimators":"100",
                        "max_depth":"3",
                        "min_samples_split":"2"}});
        jest.setTimeout(90 * 1000);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("a feature column is not a column name");

    })
});

describe('POST /api/analyze/parametersDemo', () => {
    test('reponse : database non un nom de fichier', async () => {
        const res = await request(app)
            .post('/api/analyze/parametersDemo')
            .set('Accept', 'application/json')
            .send({"nameAnalyze":"",
            "database":42,
            "date":"2022-02-14T01:49:14.743Z",
            "pred":"carat","feature":["price"],
            "category":"Regression",
            "algo":"GradientBoosting",
            "params":{  "learning_rate":"0.1",
                        "n_estimators":"100",
                        "max_depth":"3",
                        "min_samples_split":"2"}});
        jest.setTimeout(90 * 1000);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("database name is not a file name");

    })
});

describe('POST /api/analyze/parametersDemo', () => {
    test('reponse : database existe pas ', async () => {
        const res = await request(app)
            .post('/api/analyze/parametersDemo')
            .set('Accept', 'application/json')
            .send({"nameAnalyze":"",
            "database":"aaaaa",
            "date":"2022-02-14T01:49:14.743Z",
            "pred":"carat","feature":["price"],
            "category":"Regression",
            "algo":"GradientBoosting",
            "params":{  "learning_rate":"0.1",
                        "n_estimators":"100",
                        "max_depth":"3",
                        "min_samples_split":"2"}});
        jest.setTimeout(90 * 1000);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("database does not exist");

    })
});

describe('POST /api/analyze/parametersDemo', () => {
    test('reponse : pred has no column name ', async () => {
        const res = await request(app)
            .post('/api/analyze/parametersDemo')
            .set('Accept', 'application/json')
            .send({"nameAnalyze":"",
            "database":"diamonds.csv",
            "date":"2022-02-14T01:49:14.743Z",
            "pred":42,"feature":["price"],
            "category":"Regression",
            "algo":"GradientBoosting",
            "params":{  "learning_rate":"0.1",
                        "n_estimators":"100",
                        "max_depth":"3",
                        "min_samples_split":"2"}});
        jest.setTimeout(90 * 1000);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("pred has no column name");

    })
});

describe('POST /api/analyze/parametersDemo', () => {
    test('reponse :prediction column does not exist', async () => {
        const res = await request(app)
            .post('/api/analyze/parametersDemo')
            .set('Accept', 'application/json')
            .send({"nameAnalyze":"",
            "database":"diamonds.csv",
            "date":"2022-02-14T01:49:14.743Z",
            "pred":"cettePredExistePas","feature":["price"],
            "category":"Regression",
            "algo":"GradientBoosting",
            "params":{  "learning_rate":"0.1",
                        "n_estimators":"100",
                        "max_depth":"3",
                        "min_samples_split":"2"}});
        jest.setTimeout(90 * 1000);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("prediction column does not exist");

    })
});

describe('POST /api/analyze/parametersDemo', () => {
    test('reponse : analyze_choice is not a string', async () => {
        const res = await request(app)
            .post('/api/analyze/parametersDemo')
            .set('Accept', 'application/json')
            .send({"nameAnalyze":"",
            "database":"diamonds.csv",
            "date":"2022-02-14T01:49:14.743Z",
            "pred":"carat","feature":["price"],
            "category":42,
            "algo":"GradientBoosting",
            "params":{  "learning_rate":"0.1",
                        "n_estimators":"100",
                        "max_depth":"3",
                        "min_samples_split":"2"}});
        jest.setTimeout(90 * 1000);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("analyze_choice is not a string");

    })
});


describe('POST /api/analyze/parametersDemo', () => {
    test('reponse : analyze_choice is not a valid analysis', async () => {
        const res = await request(app)
            .post('/api/analyze/parametersDemo')
            .set('Accept', 'application/json')
            .send({"nameAnalyze":"",
            "database":"diamonds.csv",
            "date":"2022-02-14T01:49:14.743Z",
            "pred":"carat","feature":["price"],
            "category":"unTruc",
            "algo":"GradientBoosting",
            "params":{  "learning_rate":"0.1",
                        "n_estimators":"100",
                        "max_depth":"3",
                        "min_samples_split":"2"}});
        jest.setTimeout(90 * 1000);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("analyze_choice is not a valid analysis");

    })
});


describe('POST /api/analyze/parametersDemo', () => {
    test('reponse : the prediction column is not valid for a regression', async () => {
        const res = await request(app)
            .post('/api/analyze/parametersDemo')
            .set('Accept', 'application/json')
            .send({"nameAnalyze":"",
            "database":"diamonds.csv",
            "date":"2022-02-14T01:49:14.743Z",
            "pred":"cut","feature":["price"],
            "category":"Regression",
            "algo":"GradientBoosting",
            "params":{  "learning_rate":"0.1",
                        "n_estimators":"100",
                        "max_depth":"3",
                        "min_samples_split":"2"}});
        jest.setTimeout(90 * 1000);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("the prediction column is not valid for a regression");

    })
});


describe('POST /api/analyze/parametersDemo', () => {
    test('reponse : algo_choice is not a string', async () => {
        const res = await request(app)
            .post('/api/analyze/parametersDemo')
            .set('Accept', 'application/json')
            .send({"nameAnalyze":"",
            "database":"diamonds.csv",
            "date":"2022-02-14T01:49:14.743Z",
            "pred":"carat","feature":["price"],
            "category":"Regression",
            "algo":42,
            "params":{  "learning_rate":"0.1",
                        "n_estimators":"100",
                        "max_depth":"3",
                        "min_samples_split":"2"}});
        jest.setTimeout(90 * 1000);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("algo_choice is not a string");

    })
});


describe('POST /api/analyze/parametersDemo', () => {
    test('reponse : algo_choice is not a valid algo for regression', async () => {
        const res = await request(app)
            .post('/api/analyze/parametersDemo')
            .set('Accept', 'application/json')
            .send({"nameAnalyze":"",
            "database":"diamonds.csv",
            "date":"2022-02-14T01:49:14.743Z",
            "pred":"carat","feature":["price"],
            "category":"Regression",
            "algo":"Automatic2",
            "params":{  "learning_rate":"0.1",
                        "n_estimators":"100",
                        "max_depth":"3",
                        "min_samples_split":"2"}});
        jest.setTimeout(90 * 1000);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("algo_choice is not a valid algo for regression");

    })
});


describe('POST /api/analyze/parametersDemo', () => {
    test('reponse : algo_choice is not a valid algo for classification', async () => {
        const res = await request(app)
            .post('/api/analyze/parametersDemo')
            .set('Accept', 'application/json')
            .send({"nameAnalyze":"",
            "database":"diamonds.csv",
            "date":"2022-02-14T02:40:05.571Z",
            "pred":"cut","feature":["carat"],
            "category":"Classification",
            "algo":"GradientBoosting",
            "params":{"n_estimators":"50",
                        "learning_rate":"1"}});
        jest.setTimeout(90 * 1000);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("algo_choice is not a valid algo for classification");

    })
});


describe('POST /api/analyze/parametersDemo', () => {
    test('reponse : params are not valid for the choosen algo 1', async () => {
        const res = await request(app)
            .post('/api/analyze/parametersDemo')
            .set('Accept', 'application/json')
            .send({"nameAnalyze":"",
            "database":"diamonds.csv",
            "date":"2022-02-14T01:49:14.743Z",
            "pred":"carat","feature":["price"],
            "category":"Regression",
            "algo":"GradientBoosting",
            "params":{  "learning_rate":-9,
                        "n_estimators":"100",
                        "max_depth":"3",
                        "min_samples_split":"2"}});
        jest.setTimeout(90 * 1000);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("params are not valid for the choosen algo");

    })
});


describe('POST /api/analyze/parametersDemo', () => {
    test('reponse : params are not valid for the choosen algo 2', async () => {
        const res = await request(app)
            .post('/api/analyze/parametersDemo')
            .set('Accept', 'application/json')
            .send({"nameAnalyze":"",
            "database":"diamonds.csv",
            "date":"2022-02-14T01:49:14.743Z",
            "pred":"carat","feature":["price"],
            "category":"Regression",
            "algo":"GradientBoosting",
            "params":{  "max_depth2":"0.1",
                        "n_estimators":"100",
                        "max_depth":"3",
                        "min_samples_split":"2"}});
        jest.setTimeout(90 * 1000);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("params are not valid for the choosen algo");

    })
});


describe('POST /api/analyze/parametersDemo', () => {
    test('reponse : params are not valid for the choosen algo 3', async () => {
        const res = await request(app)
            .post('/api/analyze/parametersDemo')
            .set('Accept', 'application/json')
            .send({"nameAnalyze":"",
            "database":"diamonds.csv",
            "date":"2022-02-14T01:49:14.743Z",
            "pred":"carat","feature":["price"],
            "category":"Regression",
            "algo":"GradientBoosting",
            "params":{  "learning_rate":"0.1",
                        "n_estimators":"-500",
                        "max_depth":"3",
                        "min_samples_split":"2"}});
        jest.setTimeout(90 * 1000);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("params are not valid for the choosen algo");

    })
});

describe('POST /api/analyze/parametersDemo', () => {
    test('reponse : params are not valid for the choosen algo 4', async () => {
        const res = await request(app)
            .post('/api/analyze/parametersDemo')
            .set('Accept', 'application/json')
            .send({"nameAnalyze":"",
            "database":"diamonds.csv",
            "date":"2022-02-14T01:49:14.743Z",
            "pred":"carat","feature":["price"],
            "category":"Regression",
            "algo":"GradientBoosting",
            "params":{  "learning_rate":"0.1",
                        "max_depth":"3",
                        "min_samples_split":"2"}});
        jest.setTimeout(90 * 1000);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("params are not valid for the choosen algo");

    })
});

describe('POST /api/analyze/parametersDemo', () => {
    test('reponse : params are not valid for the choosen algo 5', async () => {
        const res = await request(app)
            .post('/api/analyze/parametersDemo')
            .set('Accept', 'application/json')
            .send({"nameAnalyze":"",
            "database":"diamonds.csv",
            "date":"2022-02-14T01:49:14.743Z",
            "pred":"carat","feature":["price"],
            "category":"Regression",
            "algo":"GradientBoosting",
            "params":{  "learning_rate":"0.1",
                        "n_estimators":"100",
                        "max_depth":"3",
                        "min_samples_split":"none"}});
        jest.setTimeout(90 * 1000);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("params are not valid for the choosen algo");

    })
});

describe('POST /api/analyze/parametersDemo', () => {
    test('reponse : params are not valid for the choosen algo 6', async () => {
        const res = await request(app)
            .post('/api/analyze/parametersDemo')
            .set('Accept', 'application/json')
            .send({"nameAnalyze":"",
            "database":"diamonds.csv",
            "date":"2022-02-14T01:49:14.743Z",
            "pred":"carat","feature":["price"],
            "category":"Regression",
            "algo":"GradientBoosting",
            "params":{  "rate":"0.1",
                        "n_estimators":"100",
                        "max_depth":"3",
                        "min_samples_split":"2"}});
        jest.setTimeout(90 * 1000);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("params are not valid for the choosen algo");

    })
});

describe('POST /api/analyze/databasesDemo', () => {
    test('ask for database list', async () => {
        const res = await request(app)
            .post('/api/analyze/databasesDemo')
            .set('Accept', 'application/json')
            .send({});
        jest.setTimeout(90 * 1000);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.liste).toStrictEqual([{"colonnes": ["", "carat", "cut", "color", "clarity", "depth", "table", "price", "x", "y", "z"], "colonnesString": ["cut", "color", "clarity"], "date": "Thu Dec 16 2021 22:26:54 GMT+0100 (heure normale d’Europe centrale)", "extension": "csv", "name": "diamonds", "separator": ",", "size": 3192560}]);
        

    })
});